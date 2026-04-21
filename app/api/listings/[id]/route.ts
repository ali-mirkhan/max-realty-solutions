import { NextRequest, NextResponse } from "next/server";
import { fetchListing } from "@/lib/ddf";
import staticProperties from "@/data/properties.json";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const listing = await fetchListing(params.id);
  if (listing) return NextResponse.json(listing);

  const staticProp = (staticProperties as unknown[]).find(
    (p: unknown) => (p as { id: string }).id === params.id
  );
  if (staticProp) return NextResponse.json(staticProp);

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
