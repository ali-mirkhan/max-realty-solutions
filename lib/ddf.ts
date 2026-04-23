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

  console.log('[DDF] Requesting token, client_id starts with:', clientId?.slice(0, 8));

  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`,
      cache: "no-store",
    });

    console.log('[DDF] Token response status:', res.status);

    if (!res.ok) {
      const body = await res.text();
      console.error('[DDF] Token error body:', body.slice(0, 500));
      throw new Error(`[DDF] OAuth token failed HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = (await res.json()) as TokenResponse;
    const token = data.access_token;
    if (!token) {
      console.error(`[DDF] OAuth ${cacheKey} response missing access_token`);
      return null;
    }
    const ttl = (data.expires_in ?? 3600) - 60;
    tokenCache.set(cacheKey, { token, expiresAt: Date.now() + ttl * 1000 });
    console.log(`[DDF] CREA token cached (${cacheKey}), expires in ${ttl}s`);
    return token;
  } catch (err) {
    console.error(`[DDF] token fetch error (${cacheKey}):`, (err as Error).message ?? err);
    return null;
  }
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
  useNSP = true
): Promise<{ listings: Property[]; total: number; feed: string }> {
  console.log('[DDF] Starting token fetch, endpoint:', process.env.CREA_TOKEN_URL || 'https://identity.crea.ca/connect/token');

  const token = await getAccessToken(useNSP);

  if (!token) {
    console.warn(`[DDF] No token for ${useNSP ? "NSP" : "Member"} feed — trying fallback`);
    if (useNSP) return fetchListings(params, false);
    return { listings: [], total: 0, feed: "none" };
  }

  console.log('[DDF] Token OK, length:', token?.length);

  const limit = params.limit ?? 24;
  const skip = ((params.page ?? 1) - 1) * limit;

  const url = new URL(DDF_ENDPOINT);
  const filter = buildFilter(params);
  if (filter) url.searchParams.set("$filter", filter);
  url.searchParams.set("$top", String(limit));
  url.searchParams.set("$skip", String(skip));
  url.searchParams.set("$orderby", "ListPrice desc");

  console.log('[DDF] Fetching OData from:', url.toString());

  try {
    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate: 300 },
    });

    console.log('[DDF] OData response status:', response.status, 'ok:', response.ok);

    if (!response.ok) {
      let errBody = "";
      try { errBody = await response.text(); } catch { /* ignore */ }
      console.error(
        `[DDF] ${useNSP ? "NSP" : "Member"} API error HTTP ${response.status}: ${errBody.slice(0, 300)}`
      );
      if (useNSP) return fetchListings(params, false);
      return { listings: [], total: 0, feed: "error" };
    }

    const data = (await response.json()) as DDFListingsResponse;
    const values: DDFRawListing[] = data.value ?? [];
    const total: number = values.length;

    console.log('[DDF] Listings fetched:', values.length);
    console.log('[DDF] First record keys:', values[0] ? Object.keys(values[0]).join(', ') : 'none');
    console.log(`[DDF] ${useNSP ? "NSP" : "Member"} feed returned ${values.length} listings`);

    if (values.length === 0 && useNSP) {
      console.log("[DDF] NSP returned 0 results — falling back to Member feed");
      return fetchListings(params, false);
    }

    let filtered = values.map(transformListing);
    if (params.type && params.type !== "All" && params.type !== "all") {
      const t = params.type.toLowerCase();
      filtered = filtered.filter((l) => l.type === t);
    }

    return {
      listings: filtered,
      total: filtered.length < values.length ? filtered.length : total,
      feed: useNSP ? "nsp" : "member",
    };
  } catch (error) {
    console.error('[DDF] FULL ERROR:', error instanceof Error ? error.message : String(error));
    if (useNSP) return fetchListings(params, false);
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
