# OG Default Image — Branding Spec

The current `public/og-default.jpg` is a temporary fallback (the bare logo). Replace it with a properly branded social-share preview image.

## Specifications

- **Dimensions:** 1200 × 630 px (universal Open Graph standard)
- **Format:** JPG (best compatibility — iMessage, WhatsApp, Slack, Facebook, LinkedIn)
- **Quality:** 90+
- **Output path:** `public/og-default.jpg` (overwrite the existing file)

## Design

- **Background:** Burgundy gradient — `#7D1A2D` at top → `#5A0F1F` at bottom
- **Logo:** Max Realty logo placed left-of-center, ~200 px wide
- **Text composition (right-of-logo, vertically centered):**
  - Line 1 (large, bold serif): `Max Realty Solutions`
  - Line 2 (medium serif italic): `Ltd., Brokerage`
  - Line 3 (small spacing divider): horizontal gold line
  - Line 4 (medium): `Real Estate · Commercial · Investment`
  - Line 5 (small uppercase tracking): `GREATER TORONTO AREA · SINCE 1988`
- **Bottom-right corner:** small text `maxrealtysolutions.com` in subtle gold
- **Color palette:**
  - Burgundy background
  - White / cream text
  - Gold accents `#E5B649`
- **Typography:**
  - Serif for the brand name (Playfair Display / Georgia)
  - Sans-serif for the supporting lines

## Workflow Suggestions

**Canva** (fastest):
1. Open Canva → Custom size → 1200 × 630 px
2. Drop in the burgundy gradient + the logo file at `public/logo.png`
3. Lay out the text per the composition above
4. Export as JPG (90% quality)
5. Save the file at `public/og-default.jpg` and commit

**Programmatic** (for repeatability):
- Install Sharp: `npm i -D sharp`
- Build an SVG with the design, then `sharp(svg).jpeg({ quality: 90 }).toFile("public/og-default.jpg")`
- Run as a one-off script (`node scripts/generate-og.mjs`)

## After Replacing

1. Commit + push the new JPG.
2. Force-refresh the Facebook / LinkedIn caches (see `post-deploy-checklist.md`).
3. iMessage/WhatsApp will pick up the new preview after their natural cache expiration (24–48h for iMessage, ~7d for WhatsApp).

The OG metadata in `app/layout.tsx` is already wired to `/og-default.jpg` — no code change needed once the file is replaced.
