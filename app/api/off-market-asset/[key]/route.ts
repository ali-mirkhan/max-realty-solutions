import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Neutral URL keys → on-disk public asset paths. Keys are chosen so that the
// filename on disk never appears in any client-visible HTML, CSS, or JSON.
const ASSET_MAP: Record<string, { file: string; contentType: string }> = {
  "grocery-source": {
    file: "off-market/cambridge-hero-source.jpg",
    contentType: "image/jpeg",
  },
};

export async function GET(
  _request: Request,
  { params }: { params: { key: string } }
) {
  const entry = ASSET_MAP[params.key];
  if (!entry) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", entry.file);
    const data = await readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": entry.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
