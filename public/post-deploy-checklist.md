# Post-Deploy Cache Flush Checklist

After any significant content or metadata change deploys to production, force-refresh external caches so social platforms and search engines pick up the new version.

## 1. Facebook OG Cache (Critical)

URL: https://developers.facebook.com/tools/debug/

- Paste each updated URL
- Click "Scrape Again"
- Confirms new OG image and metadata

Do this for: homepage, services pages, blog posts, off-market listings, /join

## 2. LinkedIn Post Inspector

URL: https://linkedin.com/post-inspector/inspect/

- Paste each updated URL
- Click "Inspect"
- Invalidates LinkedIn's preview cache

## 3. Google Search Console

URL: https://search.google.com/search-console

- Use URL Inspection tool for changed pages
- Click "Request Indexing" for major content changes

## 4. iMessage / WhatsApp Cache

These caches naturally expire over 24-48 hours and CANNOT be manually purged.

To test refresh:
- Send the URL in a NEW iMessage/WhatsApp conversation (not one where you've shared it before)
- Old conversations will continue showing the cached old preview until they naturally refresh

## 5. Vercel Edge Cache

For static assets (SVGs, JPGs, etc.):
- Vercel's CDN caches static assets aggressively
- Force-refresh by deploying with rm -rf .next first
- Or rename the asset (cache-bust via filename change) for guaranteed refresh
