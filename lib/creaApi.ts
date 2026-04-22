// CREA DDF OData v2 API client — uses DDF_* env vars (primary)
const TOKEN_URL =
  process.env.CREA_TOKEN_URL || "https://identity.crea.ca/connect/token";
const ODATA_URL =
  process.env.CREA_ODATA_URL || "https://ddf.realtor.ca/api/v2";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface Listing {
  ListingKey: string;
  MlsNumber: string;
  ListPrice: number;
  BedroomsTotal: number;
  BathroomsTotal: number;
  PublicRemarks: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  PropertyType: string;
  Media: Array<{ MediaURL: string }>;
  ListingContractDate: string;
  LivingArea: number;
  UnparsedAddress: string;
  Latitude: number;
  Longitude: number;
}

export interface ListingsParams {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  beds?: number;
  baths?: number;
  top?: number;
}

// ─── Token cache ──────────────────────────────────────────────────────────────

interface CachedToken {
  token: string;
  expiresAt: number;
}

const _cache = new Map<string, CachedToken>();

// ─── getAccessToken ───────────────────────────────────────────────────────────

export async function getAccessToken(useNSP = true): Promise<string> {
  const key = useNSP ? "nsp" : "member";
  const cached = _cache.get(key);
  if (cached && Date.now() < cached.expiresAt) return cached.token;

  // DDF_* vars are primary; CREA_* kept as fallback
  const clientId = useNSP
    ? (process.env.DDF_NSP_USERNAME || process.env.CREA_NSP_USERNAME)
    : (process.env.DDF_USERNAME || process.env.CREA_MEMBER_USERNAME);
  const clientSecret = useNSP
    ? (process.env.DDF_NSP_PASSWORD || process.env.CREA_NSP_PASSWORD)
    : (process.env.DDF_PASSWORD || process.env.CREA_MEMBER_PASSWORD);

  if (!clientId || !clientSecret) {
    throw new Error(
      `[creaApi] Missing credentials for ${key} feed. ` +
        `Set DDF_${useNSP ? "NSP_USERNAME" : "USERNAME"} and DDF_${useNSP ? "NSP_PASSWORD" : "PASSWORD"}.`
    );
  }

  console.log(
    `[creaApi] Fetching CREA token with client_id: ${clientId.slice(0, 6)}... ` +
    `url: ${TOKEN_URL}`
  );

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  console.log(`[creaApi] CREA token fetch response status: ${res.status}`);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[creaApi] OAuth ${key} error body: ${body.slice(0, 300)}`);
    throw new Error(`[creaApi] OAuth ${key} failed HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  const token = json.access_token;
  if (!token) throw new Error(`[creaApi] OAuth ${key} response missing access_token`);

  const ttl = (json.expires_in ?? 3600) - 60; // refresh 60s before expiry
  _cache.set(key, { token, expiresAt: Date.now() + ttl * 1000 });
  return token;
}

// ─── OData helpers ────────────────────────────────────────────────────────────

function escapeOData(v: string) {
  return v.replace(/'/g, "''");
}

function buildFilter(params: ListingsParams): string {
  const clauses: string[] = ["StateOrProvince eq 'Ontario'"];
  if (params.city) clauses.push(`City eq '${escapeOData(params.city)}'`);
  if (params.minPrice) clauses.push(`ListPrice ge ${params.minPrice}`);
  if (params.maxPrice) clauses.push(`ListPrice le ${params.maxPrice}`);
  if (params.beds) clauses.push(`BedroomsTotal ge ${params.beds}`);
  if (params.baths) clauses.push(`BathroomsTotalInteger ge ${params.baths}`);
  if (params.propertyType && params.propertyType !== "All") {
    clauses.push(`PropertySubType eq '${escapeOData(params.propertyType)}'`);
  }
  return clauses.join(" and ");
}

// ─── getListings ──────────────────────────────────────────────────────────────

export async function getListings(params: ListingsParams = {}): Promise<Listing[]> {
  let token: string;
  try {
    token = await getAccessToken(true); // try NSP first
  } catch {
    try {
      token = await getAccessToken(false); // fall back to member feed
    } catch (err) {
      console.error("[creaApi] getListings: both feeds unavailable —", err);
      return [];
    }
  }

  const url = new URL(`${ODATA_URL}/Property`);
  url.searchParams.set("$filter", buildFilter(params));
  url.searchParams.set("$top", String(params.top ?? 24));
  url.searchParams.set("$orderby", "OriginalEntryTimestamp desc");

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[creaApi] getListings HTTP ${res.status}: ${body.slice(0, 200)}`);
      return [];
    }

    const data = (await res.json()) as { value?: Record<string, unknown>[] };
    return (data.value ?? []).map(mapToListing);
  } catch (err) {
    console.error("[creaApi] getListings error:", err);
    return [];
  }
}

// ─── getListingByMlsNumber ────────────────────────────────────────────────────

export async function getListingByMlsNumber(mlsNumber: string): Promise<Listing | null> {
  let token: string;
  try {
    token = await getAccessToken(true);
  } catch {
    try {
      token = await getAccessToken(false);
    } catch (err) {
      console.error("[creaApi] getListingByMlsNumber: no token —", err);
      return null;
    }
  }

  const url = new URL(`${ODATA_URL}/Property`);
  url.searchParams.set("$filter", `ListingId eq '${escapeOData(mlsNumber)}'`);
  url.searchParams.set("$top", "1");

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[creaApi] getListingByMlsNumber HTTP ${res.status}: ${body.slice(0, 200)}`);
      return null;
    }

    const data = (await res.json()) as { value?: Record<string, unknown>[] };
    const item = data.value?.[0];
    return item ? mapToListing(item) : null;
  } catch (err) {
    console.error("[creaApi] getListingByMlsNumber error:", err);
    return null;
  }
}

// ─── Raw → Listing mapper ─────────────────────────────────────────────────────

function mapToListing(raw: Record<string, unknown>): Listing {
  const media = Array.isArray(raw.Media)
    ? (raw.Media as Array<{ MediaURL?: string }>).filter((m) => m?.MediaURL)
    : [];

  return {
    ListingKey: String(raw.ListingKey ?? raw.ListingId ?? ""),
    MlsNumber: String(raw.ListingId ?? ""),
    ListPrice: Number(raw.ListPrice ?? 0),
    BedroomsTotal: Number(raw.BedroomsTotal ?? 0),
    BathroomsTotal: Number(raw.BathroomsTotalInteger ?? raw.BathroomsPartial ?? 0),
    PublicRemarks: String(raw.PublicRemarks ?? ""),
    City: String(raw.City ?? ""),
    StateOrProvince: String(raw.StateOrProvince ?? ""),
    PostalCode: String(raw.PostalCode ?? ""),
    PropertyType: String(raw.PropertySubType ?? raw.PropertyType ?? ""),
    Media: media.map((m) => ({ MediaURL: m.MediaURL as string })),
    ListingContractDate: String(raw.ListingContractDate ?? raw.OriginalEntryTimestamp ?? ""),
    LivingArea: Number(raw.LivingArea ?? raw.BuildingAreaTotal ?? 0),
    UnparsedAddress: String(raw.UnparsedAddress ?? ""),
    Latitude: Number(raw.Latitude ?? 0),
    Longitude: Number(raw.Longitude ?? 0),
  };
}
