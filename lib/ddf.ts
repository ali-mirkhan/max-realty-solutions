import type { Property } from "@/lib/types";

const TOKEN_URL = "https://identity.crea.ca/connect/token";
const ODATA_URL = "https://ddfapi.realtor.ca/odata/v1/Property";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop";

export interface ListingsParams {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  type?: string;       // UI sends "residential"|"commercial" — filtered client-side after fetch
  beds?: number;
  baths?: number;
  top?: number;
  limit?: number;      // alias for top, for backward compat
  page?: number;
  search?: string;
}

// ─── Token ────────────────────────────────────────────────────────────────────

async function getToken(
  clientId: string,
  clientSecret: string
): Promise<string | null> {
  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);

  console.log("[DDF] Token attempt with client_id:", clientId.slice(0, 8));

  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    });

    console.log("[DDF] Token response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[DDF] Token error body:", errorText);
      return null;
    }

    const json = (await res.json()) as { access_token?: string };
    return json.access_token ?? null;
  } catch (err) {
    console.error(
      "[DDF] Token fetch threw:",
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}

// ─── Normalisation ────────────────────────────────────────────────────────────

function normalizePropertyType(subType: string): "residential" | "commercial" {
  const s = (subType ?? "").toLowerCase();
  if (
    s.includes("office") ||
    s.includes("commercial") ||
    s.includes("industrial") ||
    s.includes("retail") ||
    s.includes("business") ||
    s.includes("store")
  ) {
    return "commercial";
  }
  return "residential";
}

function normalizeListing(
  raw: Record<string, unknown>,
  source: "nsp" | "member"
): Property {
  const media = Array.isArray(raw.Media)
    ? (raw.Media as Array<{ MediaURL?: string }>)
    : [];
  const images = media.filter((m) => m?.MediaURL).map((m) => m.MediaURL as string);

  const rawCity = (raw.City as string) ?? "";
  const cityMatch = rawCity.match(/^(.+?)\s*\((.+)\)$/);
  const city = cityMatch ? cityMatch[1].trim() : rawCity;
  const neighbourhood = cityMatch
    ? cityMatch[2].trim()
    : ((raw.CityRegion as string) ?? (raw.SubdivisionName as string) ?? city);

  const rentPerMonth =
    (raw.TotalActualRent as number | null) ??
    (raw.LeaseAmount as number | null) ??
    null;
  const price = (raw.ListPrice as number | null) ?? (rentPerMonth ?? 0);

  let status = (raw.StandardStatus as string) ?? "Active";
  if (rentPerMonth && rentPerMonth > 0) status = "For Lease";
  else if (status === "Active") status = "For Sale";
  else if (status === "Active Under Contract") status = "Under Contract";
  else if (status === "Closed") status = "Sold";

  return {
    id: String(raw.ListingKey ?? raw.ListingId ?? ""),
    mls: (raw.ListingId as string) ?? String(raw.ListingKey ?? ""),
    address:
      (raw.UnparsedAddress as string) ??
      [raw.StreetNumber, raw.StreetName, raw.StreetSuffix]
        .filter(Boolean)
        .join(" "),
    city,
    neighbourhood,
    province: (raw.StateOrProvince as string) ?? "",
    postalCode: (raw.PostalCode as string) ?? "",
    price: Number(price ?? 0),
    type: normalizePropertyType((raw.PropertySubType as string) ?? ""),
    status,
    beds: Number(raw.BedroomsTotal ?? 0),
    baths: Number(raw.BathroomsTotalInteger ?? raw.BathroomsPartial ?? 0),
    sqft: Number(
      raw.LivingArea ?? raw.BuildingAreaTotal ?? raw.AboveGradeFinishedArea ?? 0
    ),
    description: (raw.PublicRemarks as string) ?? "",
    image: images[0] ?? FALLBACK_IMAGE,
    images,
    features: [],
    yearBuilt: Number(raw.YearBuilt ?? 0),
    lotSize: (raw.LotSizeDimensions as string) ?? "",
    propertyTax: Number(raw.TaxAnnualAmount ?? 0),
    office: (raw.ListOfficeName as string) ?? "",
    parking: Number(raw.ParkingTotal ?? 0),
    agentName: (raw.ListAgentFullName as string) ?? "",
    listingDate: (raw.OriginalEntryTimestamp as string) ?? "",
    originalListPrice: raw.OriginalListPrice
      ? Number(raw.OriginalListPrice)
      : undefined,
    source,
  };
}

// ─── fetchListings ─────────────────────────────────────────────────────────────

async function fetchFromFeed(
  token: string,
  source: "nsp" | "member",
  params: ListingsParams
): Promise<Property[]> {
  const filters: string[] = [];
  if (params.city)
    filters.push(`contains(tolower(City), tolower('${params.city.replace(/'/g, "''")}'))`);
  if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`);
  if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`);
  if (params.beds) filters.push(`BedroomsTotal ge ${params.beds}`);

  const top = params.top ?? params.limit ?? 50;
  const skip = params.page && params.page > 1 ? (params.page - 1) * top : 0;

  const queryParts: string[] = [`$top=${top}`];
  if (skip > 0) queryParts.push(`$skip=${skip}`);
  if (filters.length)
    queryParts.push(`$filter=${encodeURIComponent(filters.join(" and "))}`);
  queryParts.push("$orderby=ModificationTimestamp%20desc");

  const url = `${ODATA_URL}?${queryParts.join("&")}`;
  console.log(`[DDF] OData URL (${source}):`, url);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });

    console.log(`[DDF] OData response (${source}):`, res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[DDF] OData error (${source}):`, errorText.slice(0, 500));
      return [];
    }

    const data = (await res.json()) as { value?: unknown[] };
    const values = Array.isArray(data.value) ? data.value : [];

    const listings: Property[] = [];
    for (const raw of values) {
      try {
        listings.push(normalizeListing(raw as Record<string, unknown>, source));
      } catch (e) {
        console.error(
          `[DDF] Failed to normalize listing (${source}):`,
          e instanceof Error ? e.message : String(e)
        );
      }
    }
    return listings;
  } catch (err) {
    console.error(
      `[DDF] fetchFromFeed (${source}) threw:`,
      err instanceof Error ? err.message : String(err)
    );
    return [];
  }
}

export async function fetchListings(
  params: ListingsParams = {}
): Promise<{ listings: Property[]; source: "nsp" | "member" | "member+nsp" | "error" }> {
  const nspId = process.env.DDF_NSP_USERNAME || process.env.CREA_NSP_USERNAME || "";
  const nspSecret = process.env.DDF_NSP_PASSWORD || process.env.CREA_NSP_PASSWORD || "";
  const memberId = process.env.DDF_USERNAME || process.env.CREA_MEMBER_USERNAME || "";
  const memberSecret = process.env.DDF_PASSWORD || process.env.CREA_MEMBER_PASSWORD || "";

  // Fetch both tokens in parallel
  const [nspToken, memberToken] = await Promise.all([
    nspId && nspSecret ? getToken(nspId, nspSecret) : Promise.resolve(null),
    memberId && memberSecret ? getToken(memberId, memberSecret) : Promise.resolve(null),
  ]);

  if (!nspToken && !memberToken) {
    console.error("[DDF] All token attempts failed — returning empty");
    return { listings: [], source: "error" };
  }

  // Fetch both feeds in parallel
  const [nspListings, memberListings] = await Promise.all([
    nspToken ? fetchFromFeed(nspToken, "nsp", params) : Promise.resolve([]),
    memberToken ? fetchFromFeed(memberToken, "member", params) : Promise.resolve([]),
  ]);

  console.log("[DDF] Member feed returned:", memberListings.length);
  console.log("[DDF] NSP feed returned:", nspListings.length);

  // Deduplicate: member listings win — remove from NSP any id that member already has
  const memberIds = new Set(memberListings.map((l) => l.id));
  const nspFiltered = nspListings.filter((l) => !memberIds.has(l.id));

  // Sort: member first (preserve order), then NSP by recency
  const nspSorted = nspFiltered.sort((a, b) => {
    const aTime = a.listingDate ? new Date(a.listingDate).getTime() : 0;
    const bTime = b.listingDate ? new Date(b.listingDate).getTime() : 0;
    return bTime - aTime;
  });

  const combined = [...memberListings, ...nspSorted];

  console.log(
    `[DDF] After dedup: ${combined.length} listings ( ${memberListings.length} member + ${nspFiltered.length} nsp )`
  );

  // Client-side type filter
  const typeFilter = (params.type ?? "").toLowerCase();
  const filtered =
    typeFilter && typeFilter !== "all"
      ? combined.filter((l) => l.type === typeFilter)
      : combined;

  // Apply top limit after dedup so member listings aren't lost
  const top = params.top ?? params.limit ?? 50;
  const result = filtered.slice(0, top);

  const source =
    memberListings.length > 0 && nspListings.length > 0
      ? "member+nsp"
      : memberListings.length > 0
      ? "member"
      : "nsp";

  return { listings: result, source };
}

// ─── fetchListing (single property detail) ────────────────────────────────────

export async function fetchListing(id: string): Promise<Property | null> {
  const credentials = [
    {
      id: process.env.DDF_NSP_USERNAME || process.env.CREA_NSP_USERNAME || "",
      secret: process.env.DDF_NSP_PASSWORD || process.env.CREA_NSP_PASSWORD || "",
      source: "nsp" as const,
    },
    {
      id: process.env.DDF_USERNAME || process.env.CREA_MEMBER_USERNAME || "",
      secret: process.env.DDF_PASSWORD || process.env.CREA_MEMBER_PASSWORD || "",
      source: "member" as const,
    },
  ].filter((c) => c.id && c.secret);

  for (const cred of credentials) {
    const token = await getToken(cred.id, cred.secret);
    if (!token) continue;

    const feed = cred.source === "nsp" ? "NSP" : "Member";

    try {
      // Primary: entity key lookup
      const entityUrl = `${ODATA_URL}('${encodeURIComponent(id)}')`;
      console.log(`[DDF] fetchListing entity lookup (${feed}): ${entityUrl}`);
      const res = await fetch(entityUrl, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as Record<string, unknown>;
        if (data?.ListingKey || data?.ListingId) {
          console.log(`[DDF] fetchListing found via ${feed} entity key`);
          return normalizeListing(data, cred.source);
        }
      } else {
        console.log(
          `[DDF] fetchListing entity ${feed} HTTP ${res.status}`
        );
      }

      // Fallback: $filter query
      const filterUrl = `${ODATA_URL}?$filter=ListingKey eq '${id.replace(/'/g, "''")}'&$top=1`;
      console.log(`[DDF] fetchListing filter fallback (${feed}): ${filterUrl}`);
      const res2 = await fetch(filterUrl, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        cache: "no-store",
      });
      if (res2.ok) {
        const data2 = (await res2.json()) as { value?: unknown[] };
        const item = data2?.value?.[0];
        if (item) {
          console.log(`[DDF] fetchListing found via ${feed} filter`);
          return normalizeListing(item as Record<string, unknown>, cred.source);
        }
        console.log(`[DDF] fetchListing ${feed} filter: 0 results`);
      }
    } catch (err) {
      console.error(
        `[DDF] fetchListing ${feed} error:`,
        err instanceof Error ? err.message : String(err)
      );
    }
  }

  console.log(`[DDF] fetchListing('${id}') not found in any feed`);
  return null;
}
