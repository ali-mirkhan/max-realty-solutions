// CREA DDF OData API - ddfapi.realtor.ca/odata/v1
import { NextRequest, NextResponse } from "next/server";
import { fetchListings, type ListingsParams } from "@/lib/ddf";

export const runtime = "nodejs";

// Rate limiting: 30 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const sp = request.nextUrl.searchParams;
  const top = sp.get("top") ? Number(sp.get("top")) : undefined;

  const params: ListingsParams = {
    city: sp.get("city") ?? undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    beds: sp.get("beds") ? Number(sp.get("beds")) : undefined,
    baths: sp.get("baths") ? Number(sp.get("baths")) : undefined,
    type: sp.get("type") ?? undefined,
    search: sp.get("search") ?? undefined,
    page: sp.get("page") ? Number(sp.get("page")) : 1,
    limit: top ?? (sp.get("limit") ? Number(sp.get("limit")) : 24),
  };

  const useNSP = sp.get("feed") !== "member";

  console.log(`[api/listings] GET — city=${params.city ?? "any"} type=${params.type ?? "any"} minPrice=${params.minPrice ?? "-"} maxPrice=${params.maxPrice ?? "-"} beds=${params.beds ?? "-"} limit=${params.limit} page=${params.page} feed=${useNSP ? "nsp" : "member"}`);

  try {
    const { listings, total, feed } = await fetchListings(params, useNSP);

    console.log(`[api/listings] CREA ${feed} feed returned ${listings.length} listings (total: ${total})`);

    return NextResponse.json({
      listings,
      total,
      count: listings.length,
      source: feed,
    });
  } catch (err) {
    console.error("[api/listings] fetchListings threw:", err);
    return NextResponse.json(
      { error: "Failed to fetch listings from CREA API.", listings: [], total: 0, count: 0 },
      { status: 500 }
    );
  }
}
