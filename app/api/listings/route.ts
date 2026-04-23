// CREA DDF OData API - ddfapi.realtor.ca/odata/v1
import { NextRequest, NextResponse } from "next/server";
import { fetchListings, type ListingsParams } from "@/lib/ddf";
import type { Property } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

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

function tag(listings: Property[], source: "member" | "nsp"): Property[] {
  return listings.map((l) => ({ ...l, source }));
}

export async function HEAD() {
  const clientId = process.env.DDF_NSP_USERNAME || '';
  return new Response(null, {
    headers: { 'x-client-id-length': String(clientId.length) }
  });
}

export async function GET(request: NextRequest) {
  console.log('[DEBUG] ENV CHECK:', {
    hasDDFUsername: !!process.env.DDF_NSP_USERNAME,
    hasDDFPassword: !!process.env.DDF_NSP_PASSWORD,
    usernamePeek: process.env.DDF_NSP_USERNAME?.slice(0, 6),
    tokenUrl: process.env.CREA_TOKEN_URL || 'NOT SET',
    hasMemberUsername: !!process.env.DDF_USERNAME,
  });

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
  const sourceParam = sp.get("source") ?? "all"; // "member" | "nsp" | "all"

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

  console.log(`[api/listings] GET — city=${params.city ?? "any"} source=${sourceParam} type=${params.type ?? "any"} beds=${params.beds ?? "-"} limit=${params.limit} page=${params.page}`);

  try {
    let memberListings: Property[] = [];
    let nspListings: Property[] = [];

    if (sourceParam === "all") {
      // Fetch both feeds in parallel; noFallback=true prevents cross-contamination
      const [memberResult, nspResult] = await Promise.all([
        fetchListings(params, false, true),
        fetchListings(params, true, true),
      ]);
      memberListings = tag(memberResult.listings, "member");
      nspListings = tag(nspResult.listings, "nsp");
      console.log(`[api/listings] Member listings count: ${memberListings.length}`);
      console.log(`[api/listings] NSP listings count: ${nspListings.length}`);
    } else if (sourceParam === "member") {
      const result = await fetchListings(params, false, true);
      memberListings = tag(result.listings, "member");
    } else {
      const result = await fetchListings(params, true, true);
      nspListings = tag(result.listings, "nsp");
    }

    const total = memberListings.length + nspListings.length;

    return NextResponse.json({
      memberListings,
      nspListings,
      total,
      count: total,
    });
  } catch (err) {
    console.error("[api/listings] fetchListings threw:", err);
    return NextResponse.json({
      memberListings: [],
      nspListings: [],
      total: 0,
      count: 0,
      debug: err instanceof Error ? err.message : String(err),
    }, { status: 200 });
  }
}
