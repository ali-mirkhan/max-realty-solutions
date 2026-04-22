import { NextRequest, NextResponse } from "next/server";
import { fetchListing } from "@/lib/ddf";
import staticProperties from "@/data/properties.json";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`[api/listings/${id}] GET request received`);

  const listing = await fetchListing(id);
  if (listing) {
    console.log(`[api/listings/${id}] returning DDF listing: ${listing.address}`);
    return NextResponse.json(listing);
  }

  const staticProp = (staticProperties as unknown[]).find(
    (p: unknown) => (p as { id: string }).id === id
  );
  if (staticProp) {
    console.log(`[api/listings/${id}] returning static listing`);
    return NextResponse.json(staticProp);
  }

  console.warn(`[api/listings/${id}] not found in DDF or static data`);
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
