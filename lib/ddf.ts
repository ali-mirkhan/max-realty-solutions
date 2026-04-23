import type { Property } from "@/lib/types";

const TOKEN_ENDPOINT =
  process.env.CREA_TOKEN_URL ?? "https://identity.crea.ca/connect/token";
const DDF_ENDPOINT = "https://ddfapi.realtor.ca/odata/v1/Property";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop";

// Typed shape of a raw DDF OData listing record
interface DDFMedia {
  MediaURL?: string;
}

interface DDFRawListing {
  ListingKey?: string | number;
  ListingId?: string;
  UnparsedAddress?: string;
  City?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  ListPrice?: number | null;
  TotalActualRent?: number | null;
  LeaseAmount?: number | null;
  PropertySubType?: string;
  StructureType?: string[];
  StandardStatus?: string;
  BedroomsTotal?: number | null;
  BathroomsTotalInteger?: number | null;
  BathroomsPartial?: number | null;
  LivingArea?: number | null;
  BuildingAreaTotal?: number | null;
  AboveGradeFinishedArea?: number | null;
  PublicRemarks?: string;
  Media?: DDFMedia[];
  ListOfficeName?: string;
  YearBuilt?: number | null;
  ParkingTotal?: number | null;
  ListAgentFullName?: string;
  LotSizeDimensions?: string;
  TaxAnnualAmount?: number | null;
  SubdivisionName?: string;
  OriginalEntryTimestamp?: string;
  OriginalListPrice?: number | null;
}

interface DDFListingsResponse {
  value?: DDFRawListing[];
  "@odata.context"?: string;
  "@odata.count"?: number;
  "@odata.nextLink"?: string;
}

interface TokenResponse {
  access_token?: string;
  expires_in?: number;
}

// Module-level token cache (server process lifetime)
interface TokenCache { token: string; expiresAt: number }
const tokenCache = new Map<string, TokenCache>();

async function getAccessToken(useNSP: boolean): Promise<string | null> {
  const cacheKey = useNSP ? "nsp" : "member";
  const cached = tokenCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) return cached.token;

  // DDF_* vars are primary; CREA_* kept as fallback for local dev
  const clientId = useNSP
    ? (process.env.DDF_NSP_USERNAME || process.env.CREA_NSP_USERNAME)
    : (process.env.DDF_USERNAME || process.env.CREA_MEMBER_USERNAME);
  const clientSecret = useNSP
    ? (process.env.DDF_NSP_PASSWORD || process.env.CREA_NSP_PASSWORD)
    : (process.env.DDF_PASSWORD || process.env.CREA_MEMBER_PASSWORD);

  if (!clientId || !clientSecret) {
    console.error(
      `[DDF] getAccessToken(${cacheKey}): credentials missing — ` +
      `DDF_${useNSP ? "NSP_USERNAME" : "USERNAME"} and DDF_${useNSP ? "NSP_PASSWORD" : "PASSWORD"} must be set`
    );
    return null;
  }

  if (useNSP) {
    const nspClientId = process.env.DDF_NSP_USERNAME || '';
    const nspClientSecret = process.env.DDF_NSP_PASSWORD || '';
    const tokenUrl = process.env.CREA_TOKEN_URL || 'https://identity.crea.ca/connect/token';
    console.log('[NSP AUTH DEBUG]', {
      clientIdLength: nspClientId.length,
      clientIdFirst8: nspClientId.slice(0, 8),
      clientIdLast4: nspClientId.slice(-4),
      secretLength: nspClientSecret.length,
      secretFirst4: nspClientSecret.slice(0, 4),
      tokenUrl,
    });
  }

  const maxAttempts = useNSP ? 2 : 1;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const bodyParams = new URLSearchParams();
      bodyParams.append('grant_type', 'client_credentials');
      bodyParams.append('client_id', clientId);
      bodyParams.append('client_secret', clientSecret);
      console.log(`[DDF] Token attempt ${attempt}/${maxAttempts} body length:`, bodyParams.toString().length, 'client_id length:', clientId.length);

      const tokenController = new AbortController();
      const tokenTimeout = setTimeout(() => tokenController.abort(), 8000);
      const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
        cache: "no-store",
        signal: tokenController.signal,
      });
      clearTimeout(tokenTimeout);

      console.log(`[DDF] Token attempt ${attempt} response status:`, res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[NSP AUTH 400 BODY] attempt ${attempt}:`, errorText);
        tokenCache.delete(cacheKey);
        if (attempt < maxAttempts) {
          console.log(`[DDF] Retrying token fetch (attempt ${attempt + 1})...`);
          continue;
        }
        throw new Error(`[DDF] OAuth token failed HTTP ${res.status}: ${errorText.slice(0, 200)}`);
      }

      const data = (await res.json()) as TokenResponse;
      const token = data.access_token;
      if (!token) {
        console.error(`[DDF] OAuth ${cacheKey} response missing access_token`);
        return null;
      }
      const ttl = (data.expires_in ?? 3600) - 60;
      tokenCache.set(cacheKey, { token, expiresAt: Date.now() + ttl * 1000 });
      console.log(`[DDF] CREA token cached (${cacheKey}), expires in ${ttl}s (attempt ${attempt})`);
      return token;
    } catch (err) {
      console.error(`[DDF] token fetch error attempt ${attempt} (${cacheKey}):`, (err as Error).message ?? err);
      if (attempt >= maxAttempts) return null;
    }
  }
  return null;
}

function parseCityNeighbourhood(raw: string): { city: string; neighbourhood: string } {
  const m = raw?.match(/^(.+?)\s*\((.+)\)$/);
  if (m) return { city: m[1].trim(), neighbourhood: m[2].trim() };
  return { city: raw ?? "", neighbourhood: "" };
}

function normalizeType(subType: string, structureType: string[]): "residential" | "commercial" {
  const sub = (subType ?? "").toLowerCase();
  const str = (structureType ?? []).join(" ").toLowerCase();
  const combined = `${sub} ${str}`;
  if (
    combined.includes("office") ||
    combined.includes("commercial") ||
    combined.includes("industrial") ||
    combined.includes("retail") ||
    combined.includes("business") ||
    combined.includes("store")
  ) {
    return "commercial";
  }
  return "residential";
}

function normalizeStatus(raw: string, rentPerMonth: number | null): string {
  if (rentPerMonth && rentPerMonth > 0) return "For Lease";
  if (!raw || raw === "Active") return "For Sale";
  if (raw === "Active Under Contract") return "Under Contract";
  if (raw === "Closed") return "Sold";
  return raw;
}

function transformListing(raw: DDFRawListing): Property {
  const media: DDFMedia[] = Array.isArray(raw.Media) ? raw.Media : [];
  const images = media.filter((m) => m?.MediaURL).map((m) => m.MediaURL as string);

  const { city, neighbourhood } = parseCityNeighbourhood(raw.City ?? "");
  const rentPerMonth = raw.TotalActualRent ?? raw.LeaseAmount ?? null;
  const price = raw.ListPrice ?? (rentPerMonth ? rentPerMonth : 0);

  return {
    id: String(raw.ListingKey ?? raw.ListingId ?? ""),
    address: raw.UnparsedAddress ?? "",
    city,
    neighbourhood: neighbourhood || raw.SubdivisionName || city,
    province: raw.StateOrProvince ?? "",
    postalCode: raw.PostalCode ?? "",
    price: Number(price ?? 0),
    type: normalizeType(raw.PropertySubType ?? "", raw.StructureType ?? []),
    status: normalizeStatus(raw.StandardStatus ?? "", rentPerMonth),
    beds: Number(raw.BedroomsTotal ?? 0),
    baths: Number(raw.BathroomsTotalInteger ?? raw.BathroomsPartial ?? 0),
    sqft: Number(raw.LivingArea ?? raw.BuildingAreaTotal ?? raw.AboveGradeFinishedArea ?? 0),
    description: raw.PublicRemarks ?? "",
    image: images[0] ?? FALLBACK_IMAGE,
    images,
    office: raw.ListOfficeName ?? "",
    yearBuilt: Number(raw.YearBuilt ?? 0),
    parking: Number(raw.ParkingTotal ?? 0),
    agentName: raw.ListAgentFullName ?? "",
    mls: raw.ListingId ?? "",
    features: [],
    lotSize: raw.LotSizeDimensions ?? "",
    propertyTax: Number(raw.TaxAnnualAmount ?? 0),
    listingDate: raw.OriginalEntryTimestamp ?? "",
    originalListPrice: raw.OriginalListPrice ? Number(raw.OriginalListPrice) : undefined,
  };
}

function escapeOData(val: string): string {
  return val.replace(/'/g, "''");
}

export interface ListingsParams {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function buildFilter(params: ListingsParams): string {
  const clauses: string[] = [];

  if (params.city && params.city !== "All") {
    clauses.push(`City eq '${escapeOData(params.city)}'`);
  }
  if (params.minPrice && params.minPrice > 0) {
    clauses.push(`ListPrice ge ${params.minPrice}`);
  }
  if (params.maxPrice && params.maxPrice > 0) {
    clauses.push(`ListPrice le ${params.maxPrice}`);
  }
  if (params.beds && params.beds > 0) {
    clauses.push(`BedroomsTotal ge ${params.beds}`);
  }
  if (params.baths && params.baths > 0) {
    clauses.push(`BathroomsTotalInteger ge ${params.baths}`);
  }

  return clauses.join(" and ");
}

export async function fetchListings(
  params: ListingsParams = {},
  useNSP = true,
  noFallback = false
): Promise<{ listings: Property[]; total: number; feed: string }> {
  const feedLabel = useNSP ? "NSP" : "MEMBER";
  console.log(`[${feedLabel}] fetchListings called — noFallback=${noFallback} city=${params.city ?? "any"}`);
  console.log(`[${feedLabel}] token endpoint: ${process.env.CREA_TOKEN_URL || "https://identity.crea.ca/connect/token"}`);

  const token = await getAccessToken(useNSP);

  if (!token) {
    console.error(`[${feedLabel}] NSP token fetch status: FAILED — no token returned`);
    if (useNSP && !noFallback) return fetchListings({ ...params, city: undefined }, false);
    return { listings: [], total: 0, feed: "none" };
  }

  console.log(`[${feedLabel}] NSP token fetch status: OK — token length ${token.length}`);

  const pageSize = useNSP ? 200 : (params.limit ?? 24);
  const skip = useNSP ? 0 : ((params.page ?? 1) - 1) * pageSize;

  const filter = buildFilter(params);

  async function fetchPage(pageUrl: string): Promise<DDFListingsResponse> {
    const odataController = new AbortController();
    const odataTimeout = setTimeout(() => odataController.abort(), 8000);
    const response = await fetch(pageUrl, {
      headers: { Authorization: `Bearer ${token!}`, Accept: "application/json" },
      cache: "no-store",
      signal: odataController.signal,
    });
    clearTimeout(odataTimeout);
    console.log(`[${feedLabel}] OData response status: ${response.status} ok: ${response.ok}`);
    if (!response.ok) {
      let errBody = "";
      try { errBody = await response.text(); } catch { /* ignore */ }
      console.error(`[${feedLabel}] OData HTTP ${response.status} error body:`, errBody);
      throw new Error(`HTTP ${response.status}: ${errBody.slice(0, 100)}`);
    }
    return response.json() as Promise<DDFListingsResponse>;
  }

  try {
    // Build first-page URL
    const firstUrl = new URL(DDF_ENDPOINT);
    if (filter) firstUrl.searchParams.set("$filter", filter);
    firstUrl.searchParams.set("$top", String(pageSize));
    firstUrl.searchParams.set("$skip", String(skip));
    firstUrl.searchParams.set("$orderby", "ListPrice desc");
    console.log(`[${feedLabel}] NSP OData URL used: ${firstUrl.toString()}`);

    let allValues: DDFRawListing[] = [];
    let data = await fetchPage(firstUrl.toString());
    allValues = allValues.concat(data.value ?? []);
    console.log(`[${feedLabel}] Page 1: ${data.value?.length ?? 0} records. nextLink present: ${!!data["@odata.nextLink"]}`);

    // Follow nextLink pages for NSP feed (max 4 more pages = 5 total, up to 1000 listings)
    if (useNSP) {
      let pageCount = 1;
      while (data["@odata.nextLink"] && pageCount < 5) {
        pageCount++;
        console.log(`[${feedLabel}] Following nextLink page ${pageCount}:`, data["@odata.nextLink"]);
        data = await fetchPage(data["@odata.nextLink"]!);
        allValues = allValues.concat(data.value ?? []);
        console.log(`[${feedLabel}] Page ${pageCount}: ${data.value?.length ?? 0} records, running total: ${allValues.length}`);
      }
    }

    console.log(`[${feedLabel}] NSP listings count: ${allValues.length}`);
    console.log(`[${feedLabel}] First record keys:`, allValues[0] ? Object.keys(allValues[0]).join(', ') : 'none');

    if (allValues.length === 0 && useNSP && !noFallback) {
      console.warn(`[${feedLabel}] NSP returned 0 results — falling back to Member feed`);
      return fetchListings({ ...params, city: undefined }, false);
    }

    let filtered = allValues.map(transformListing);
    if (params.type && params.type !== "All" && params.type !== "all") {
      const t = params.type.toLowerCase();
      filtered = filtered.filter((l) => l.type === t);
    }

    return {
      listings: filtered,
      total: filtered.length,
      feed: useNSP ? "nsp" : "member",
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[${feedLabel}] fetch failed: ${msg}`);
    if (useNSP && !noFallback) {
      return fetchListings({ ...params, city: undefined }, false);
    }
    return { listings: [], total: 0, feed: "error" };
  }
}

export async function fetchListing(id: string): Promise<Property | null> {
  // DDF: $expand=Media is NOT supported — Media is embedded in responses by default.
  // Entity key URL Property('id') works; filter $filter=ListingKey eq 'id' works as fallback.
  // Use cache:'no-store' to avoid ISR cache conflicts in dynamic server rendering.
  for (const useNSP of [true, false]) {
    const token = await getAccessToken(useNSP);
    if (!token) {
      console.log(`[DDF] fetchListing('${id}') — no token for ${useNSP ? "NSP" : "Member"} feed`);
      continue;
    }

    const feed = useNSP ? "NSP" : "Member";

    try {
      // Primary: entity key lookup — Media is embedded automatically
      const entityUrl = `${DDF_ENDPOINT}('${encodeURIComponent(id)}')`;
      console.log(`[DDF] fetchListing entity lookup: GET ${entityUrl}`);
      const res = await fetch(entityUrl, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        cache: "no-store",
      });

      if (res.ok) {
        const data = (await res.json()) as DDFRawListing;
        if (data?.ListingKey || data?.ListingId) {
          console.log(`[DDF] fetchListing('${id}') found via ${feed} entity key, photos: ${data.Media?.length ?? 0}`);
          return transformListing(data);
        }
      } else {
        let eb = "";
        try { eb = await res.text(); } catch { /* ignore */ }
        console.log(`[DDF] fetchListing entity ${feed} HTTP ${res.status}: ${eb.slice(0, 120)}`);
      }

      // Fallback: OData filter — Media is embedded automatically
      const filterUrl = new URL(DDF_ENDPOINT);
      filterUrl.searchParams.set("$filter", `ListingKey eq '${escapeOData(id)}'`);
      filterUrl.searchParams.set("$top", "1");

      console.log(`[DDF] fetchListing filter: GET ${filterUrl.toString()}`);
      const res2 = await fetch(filterUrl.toString(), {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        cache: "no-store",
      });

      if (res2.ok) {
        const data2 = (await res2.json()) as DDFListingsResponse;
        const item = data2?.value?.[0];
        if (item) {
          console.log(`[DDF] fetchListing('${id}') found via ${feed} filter, photos: ${item.Media?.length ?? 0}`);
          return transformListing(item);
        }
        console.log(`[DDF] fetchListing('${id}') ${feed} filter returned 0 results`);
      } else {
        let eb = "";
        try { eb = await res2.text(); } catch { /* ignore */ }
        console.error(`[DDF] fetchListing filter ${feed} HTTP ${res2.status}: ${eb.slice(0, 120)}`);
      }
    } catch (err) {
      console.error(`[DDF] fetchListing('${id}') ${feed} error:`, err);
      continue;
    }
  }

  console.log(`[DDF] fetchListing('${id}') not found in any feed`);
  return null;
}
