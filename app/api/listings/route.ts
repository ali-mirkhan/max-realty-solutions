import { NextRequest, NextResponse } from "next/server";
import { fetchListings, type ListingsParams } from "@/lib/ddf";
import staticProperties from "@/data/properties.json";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const params: ListingsParams = {
    city: sp.get("city") ?? undefined,
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    beds: sp.get("beds") ? Number(sp.get("beds")) : undefined,
    baths: sp.get("baths") ? Number(sp.get("baths")) : undefined,
    type: sp.get("type") ?? undefined,
    search: sp.get("search") ?? undefined,
    page: sp.get("page") ? Number(sp.get("page")) : 1,
    limit: sp.get("limit") ? Number(sp.get("limit")) : 20,
  };

  const useNSP = sp.get("feed") !== "member";

  try {
    const { listings, total, feed } = await fetchListings(params, useNSP);

    if (listings.length === 0) {
      return NextResponse.json({
        listings: staticProperties,
        total: staticProperties.length,
        source: "static",
      });
    }

    return NextResponse.json({ listings, total, source: feed });
  } catch {
    return NextResponse.json({
      listings: staticProperties,
      total: staticProperties.length,
      source: "static",
    });
  }
}
