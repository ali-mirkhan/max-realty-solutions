# Post-Deploy Cache Flush Checklist

After deploys that change OG metadata, page metadata, or schema, force-refresh the following caches so external services pick up the changes:

## Facebook / Meta

1. Visit https://developers.facebook.com/tools/debug/
2. Paste the URL (e.g., https://www.maxrealtysolutions.com/)
3. Click "Scrape Again"
4. Confirm the new OG image and metadata appear in the preview

## LinkedIn

1. Visit https://www.linkedin.com/post-inspector/inspect/
2. Paste the URL
3. Click "Inspect"
4. The cache is invalidated and re-scraped

## Google Search Console

1. Visit https://search.google.com/search-console
2. Use the URL Inspection tool
3. Paste the URL and request indexing
4. For schema changes, also re-test in https://search.google.com/test/rich-results

## iMessage / Apple

- iMessage caches link previews for 24-48 hours and provides NO manual refresh option
- The cache will naturally clear over time
- After 48 hours, send the link in a new conversation to verify the new preview displays correctly

## WhatsApp

- Similar to iMessage — no manual refresh available
- Cache typically clears within 7 days
- Test in a new conversation after 24-48 hours

## Slack / Discord / Telegram

- Each handles cache differently
- Most clear within 24 hours of OG metadata changes
- Force-refresh by sending the link in a private DM to yourself

## Priority URLs to refresh after major deploys

- Homepage: https://www.maxrealtysolutions.com/
- Off-market hub: https://www.maxrealtysolutions.com/off-market
- Dufferin off-market detail: https://www.maxrealtysolutions.com/off-market/dufferin-orfus-plaza
- Blog index: https://www.maxrealtysolutions.com/blog
- Latest blog post

Refresh the homepage and key entry points on Facebook + LinkedIn debuggers to ensure new content appears correctly.
