# Vercel Environment Variables Setup

Add these environment variables in your Vercel project dashboard under **Settings → Environment Variables**.

## Required Variables

| Variable | Description |
|---|---|
| `CREA_NSP_USERNAME` | CREA National Shared Pool client ID |
| `CREA_NSP_PASSWORD` | CREA National Shared Pool client secret |
| `CREA_MEMBER_USERNAME` | CREA Member Website Feed client ID |
| `CREA_MEMBER_PASSWORD` | CREA Member Website Feed client secret |
| `CREA_TOKEN_URL` | `https://identity.crea.ca/connect/token` |
| `CREA_ODATA_URL` | `https://ddf.realtor.ca/api/v2` |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `STORYBLOK_PREVIEW_TOKEN` | Storyblok preview token |
| `NEXT_PUBLIC_STORYBLOK_TOKEN` | Storyblok public token |
| `NEXT_PUBLIC_STORYBLOK_SPACE_ID` | Storyblok space ID |

## Notes

- Set all variables for **Production**, **Preview**, and **Development** environments.
- `CREA_TOKEN_URL` and `CREA_ODATA_URL` can use the default values shown above.
- The NSP feed is tried first; if it fails or returns 0 results, the Member feed is used as fallback.
- Listings are cached for 5 minutes (`revalidate: 300`) to reduce API calls.
