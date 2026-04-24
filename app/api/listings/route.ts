import { NextRequest, NextResponse } from "next/server";
import { fetchListings } from "@/lib/ddf";
import type { FeedRegion } from "@/lib/regions";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 30) return false;
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
  const topParam = sp.get("top") ?? sp.get("limit");

  const regionParam = sp.get("region");
  const region: FeedRegion =
    regionParam === "ontario" || regionParam === "all" ? regionParam : "gta";

  const params = {
    city: sp.get("city") ?? undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    beds: sp.get("beds") ? Number(sp.get("beds")) : undefined,
    type: sp.get("type") ?? undefined,
    mls: sp.get("mls") ?? undefined,
    top: topParam ? Number(topParam) : 50,
    page: sp.get("page") ? Number(sp.get("page")) : 1,
    region,
  };

  console.log(
    `[api/listings] GET — city=${params.city ?? "any"} region=${region} type=${params.type ?? "any"} mls=${params.mls ?? "-"} beds=${params.beds ?? "-"} top=${params.top} page=${params.page}`
  );

  const { listings, source } = await fetchListings(params);

  console.log(
    `[api/listings] Returning ${listings.length} listings from source: ${source}`
  );

  return NextResponse.json({
    listings,
    total: listings.length,
    count: listings.length,
    source,
  });
}
