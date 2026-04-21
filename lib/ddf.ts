/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Property } from "@/lib/types";

const TOKEN_ENDPOINT = "https://identity.crea.ca/connect/token";
const DDF_ENDPOINT = "https://ddfapi.realtor.ca/odata/v1/Property";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop";

// Module-level token cache (server process lifetime)
interface TokenCache { token: string; expiresAt: number }
const tokenCache = new Map<string, TokenCache>();

async function getAccessToken(useNSP: boolean): Promise<string | null> {
  const cacheKey = useNSP ? "nsp" : "member";
  const cached = tokenCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) return cached.token;

  const clientId = useNSP ? process.env.DDF_NSP_USERNAME : process.env.DDF_USERNAME;
  const clientSecret = useNSP ? process.env.DDF_NSP_PASSWORD : process.env.DDF_PASSWORD;
  if (!clientId || !clientSecret) return null;

  try {
    const basicAuth =
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`DDF OAuth ${cacheKey} failed: ${res.status}`);
      return null;
    }
    const data = await res.json();
    const token: string | undefined = data.access_token;
    if (!token) return null;
    const ttl: number = (data.expires_in ?? 3600) - 60;
    tokenCache.set(cacheKey, { token, expiresAt: Date.now() + ttl * 1000 });
    return token;
  } catch (err) {
    console.error(`DDF token fetch error (${cacheKey}):`, err);
    return null;
  }
}

function parseCityNeighbourhood(raw: string): { city: string; neighbourhood: string } {
  // DDF sends "Toronto (Bridle Path-Sunnybrook)" — split into city and neighbourhood
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformListing(raw: Record<string, any>): Property {
  const media: Array<{ MediaURL?: string }> = Array.isArray(raw.Media) ? raw.Media : [];
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
  const clauses: string[] = ["StateOrProvince eq 'Ontario'"];

  if (params.city && params.city !== "All") {
    clauses.push(`City eq '${escapeOData(params.city)}'`);
  }
  // Price filter: DDF leases use TotalActualRent (ListPrice is null for them)
  // Only apply price filters when explicitly set
  if (params.minPrice && params.minPrice > 0) {
    clauses.push(
      `(ListPrice ge ${params.minPrice} or TotalActualRent ge ${params.minPrice})`
    );
  }
  if (params.maxPrice && params.maxPrice > 0) {
    clauses.push(
      `(ListPrice le ${params.maxPrice} or TotalActualRent le ${params.maxPrice})`
    );
  }
  if (params.beds && params.beds > 0) {
    clauses.push(`BedroomsTotal ge ${params.beds}`);
  }
  if (params.baths && params.baths > 0) {
    clauses.push(`BathroomsTotalInteger ge ${params.baths}`);
  }
  // Note: PropertyType doesn't exist in CREA DDF OData — type is derived from PropertySubType
  // Type filtering is done client-side in the API route

  return clauses.join(" and ");
}

export async function fetchListings(
  params: ListingsParams = {},
  useNSP = true
): Promise<{ listings: Property[]; total: number; feed: string }> {
  const token = await getAccessToken(useNSP);

  if (!token) {
    // NSP credentials unavailable or invalid — fall back to member feed
    if (useNSP) return fetchListings(params, false);
    return { listings: [], total: 0, feed: "none" };
  }

  const limit = params.limit ?? 20;
  const skip = ((params.page ?? 1) - 1) * limit;

  const url = new URL(DDF_ENDPOINT);
  url.searchParams.set("$filter", buildFilter(params));
  url.searchParams.set("$top", String(limit));
  url.searchParams.set("$skip", String(skip));
  url.searchParams.set("$orderby", "OriginalEntryTimestamp desc");
  url.searchParams.set("$count", "true");
  // Note: $expand=Media slows queries; fetch Media in the single-listing call only

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`DDF ${useNSP ? "NSP" : "Member"} API error: ${res.status}`);
      if (useNSP) return fetchListings(params, false);
      return { listings: [], total: 0, feed: "error" };
    }

    const data = await res.json();
    const values: Record<string, unknown>[] = data.value ?? [];
    const total: number = data["@odata.count"] ?? values.length;

    if (values.length === 0 && useNSP) {
      return fetchListings(params, false);
    }

    // Client-side type filter (PropertyType doesn't exist in DDF OData)
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
  } catch (err) {
    console.error(`DDF fetch error (${useNSP ? "NSP" : "Member"}):`, err);
    if (useNSP) return fetchListings(params, false);
    return { listings: [], total: 0, feed: "error" };
  }
}

export async function fetchListing(id: string): Promise<Property | null> {
  for (const useNSP of [true, false]) {
    const token = await getAccessToken(useNSP);
    if (!token) continue;

    try {
      // Try entity key lookup — DDF uses string keys
      const url = `${DDF_ENDPOINT}('${encodeURIComponent(id)}')?$expand=Media`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.ListingKey || data?.ListingId) {
          return transformListing(data);
        }
      }

      // Fallback: filter query by ListingKey
      const filterUrl = new URL(DDF_ENDPOINT);
      filterUrl.searchParams.set("$filter", `ListingKey eq '${escapeOData(id)}'`);
      filterUrl.searchParams.set("$top", "1");
      filterUrl.searchParams.set("$expand", "Media");

      const res2 = await fetch(filterUrl.toString(), {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        next: { revalidate: 300 },
      });

      if (res2.ok) {
        const data2 = await res2.json();
        const item = data2?.value?.[0];
        if (item) return transformListing(item);
      }
    } catch {
      continue;
    }
  }
  return null;
}
