// Generate the branded /public/og-default.jpg for social link previews.
// Run: `node scripts/generate-og.mjs`
//
// Output: public/og-default.jpg @ 1200×630, JPEG quality 92.
//
// Design: burgundy gradient bg, logo on the left, brand text + tagline on
// the right with a gold accent divider. Bottom-right shows the website URL.

import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const W = 1200;
const H = 630;
const OUT = path.join(ROOT, "public", "og-default.jpg");
const LOGO_PATH = path.join(ROOT, "public", "logo.png");

// Background SVG — gradient + all text + divider + URL.
// The logo is composited on top via sharp (PNG with transparency stays clean).
const BACKGROUND_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7D1A2D"/>
      <stop offset="100%" stop-color="#5A0F1F"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A87410"/>
      <stop offset="50%" stop-color="#E5B649"/>
      <stop offset="100%" stop-color="#A87410"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- subtle decorative diagonal accent -->
  <g opacity="0.06">
    <line x1="0" y1="0" x2="${W}" y2="${H}" stroke="#E5B649" stroke-width="2"/>
    <line x1="${W}" y1="0" x2="0" y2="${H}" stroke="#E5B649" stroke-width="2"/>
  </g>

  <!-- Right-side text block.
       Logo will be composited at x=80, y=215 (200×200 area). Text starts at x=370. -->

  <!-- Line 1: brand name -->
  <text x="370" y="240"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="64" font-weight="700"
        fill="#FFFFFF">
    Max Realty Solutions
  </text>

  <!-- Line 2: legal suffix -->
  <text x="370" y="285"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="32" font-style="italic" font-weight="400"
        fill="#FDF8EE">
    Ltd., Brokerage
  </text>

  <!-- Line 3: gold divider -->
  <rect x="370" y="310" width="200" height="3" fill="url(#gold)"/>

  <!-- Line 4: services -->
  <text x="370" y="360"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="28" font-weight="400"
        fill="#FFFFFF">
    Real Estate · Commercial · Investment
  </text>

  <!-- Line 5: location + since 1988 (uppercase tracking) -->
  <text x="370" y="402"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="18" font-weight="600" letter-spacing="4"
        fill="#E5B649">
    GREATER TORONTO AREA · SINCE 1988
  </text>

  <!-- Bottom-right: URL -->
  <text x="${W - 16}" y="${H - 16}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="18" font-weight="500" text-anchor="end"
        fill="#E5B649" opacity="0.85">
    maxrealtysolutions.com
  </text>
</svg>
`;

async function main() {
  // Render the logo at ~200px wide preserving its native aspect ratio.
  // Position vertically centered around y=315 (image vertical centerline).
  const LOGO_W = 220;
  const logoBuf = await sharp(LOGO_PATH).resize({ width: LOGO_W }).toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();
  const logoH = logoMeta.height || 120;

  const logoLeft = 110;
  const logoTop = Math.round((H - logoH) / 2);

  const out = await sharp(Buffer.from(BACKGROUND_SVG))
    .composite([
      { input: logoBuf, left: logoLeft, top: logoTop },
    ])
    .jpeg({ quality: 92, progressive: true })
    .toBuffer();

  writeFileSync(OUT, out);
  const kb = Math.round(out.length / 1024);
  console.log(`Wrote ${OUT} (${W}×${H}, ${kb} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
