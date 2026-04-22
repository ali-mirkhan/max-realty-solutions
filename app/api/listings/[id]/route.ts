import { NextRequest, NextResponse } from "next/server";
import { fetchListing } from "@/lib/ddf";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`[api/listings/${id}] GET request received`);

  try {
    const listing = await fetchListing(id);
    if (listing) {
      console.log(`[api/listings/${id}] returning CREA listing: ${listing.address}`);
      return NextResponse.json(listing);
    }

    console.warn(`[api/listings/${id}] not found in CREA DDF`);
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  } catch (err) {
    console.error(`[api/listings/${id}] error:`, err);
    return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 });
  }
}
