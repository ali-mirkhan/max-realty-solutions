# Max Realty Solutions — Project State

> **Living document.** Update this file at the end of every chat session that produces meaningful changes. New sessions should start by reading this file in full before any other action.

**Last updated:** 2026-05-01
**Last session:** Property & Asset Management Support — staged-private build, soft launch, residential PM cleanup.
**Current production commit:** `576a976` (verified via `git log --oneline -1`)
**Live URL:** https://www.maxrealtysolutions.com
**Repo:** https://github.com/ali-mirkhan/max-realty-solutions
**Local path:** `~/Projects/max-realty-next`

---

## 1. Project Overview

**What this is:** The public-facing website for Max Realty Solutions Ltd., Brokerage — an independent commercial real estate brokerage in the Greater Toronto Area, headquartered in Thornhill. Brokerage of record since 1988 (Shahin Mirkhan), legal entity since 2004, fully independent since 2010.

**Operator:** Ali Mirkhan (`ali.mirkhan@gmail.com`) — Operations Manager at Max Realty. Builds and ships everything technical, marketing, and growth-related.

**Broker of Record:** Shahin Mirkhan (`smirkhan@gmail.com`) — regulatory authority, public face of the brokerage. Email is REGULATORY ONLY, BCC-only on transactional emails, never expose publicly.

**Public contact:** `info@maxrealtysolutions.com` · 416-226-6008 · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2

**Standardized stats** (used site-wide, must stay consistent):
- Since 1988 (broker license year — used in marketing copy)
- 2004 (legal entity founding — schema.org foundingDate)
- 2010 (independence from HomeLife)
- 38 Years experience
- $750M+ transaction volume
- 3,000+ clients

**Brand colors:**
- Burgundy `#7D1A2D` (primary)
- Burgundy dark `#5A0F1F` (footer/accents)
- Gold `#C9972B` / Gold light `#E5B649` / Gold pale `#FFE89A`
- Cream `#FDF8EE` (backgrounds)
- Charcoal `#1F2937` / `#2C2C2C` (text)

**Brand voice:** Premium, considered, evergreen. NOT marketing-loud. Investor-grade.

---

## 2. Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Runtime:** React 18.3
- **Language:** TypeScript 5 (`strict: true` in `tsconfig.json`)
- **Styling:** Tailwind CSS 3.4 (no CSS modules)
- **Deployment:** Vercel (target inferred + confirmed by `VERCEL_ENV_SETUP.md`; no `vercel.json` checked in)
- **Email delivery:** Resend SDK (domain authenticated via DKIM/SPF/DMARC; sender `noreply@maxrealtysolutions.com`)
- **MLS feed:** CREA DDF (NSP + Member feeds), implemented in `lib/ddf.ts`
- **Images:** `next/image` used throughout `app/` and `components/` (zero raw `<img>` tags)
- **Markdown:** `react-markdown` for blog post bodies
- **Icons:** `lucide-react`
- **CMS:** Storyblok SDK installed and initialised in `lib/storyblok.ts`, but **currently unused** — no `app/` page calls `fetchStory`/`fetchStories`. Content lives in `data/*.json`, `data/offMarketListings.ts`, `lib/blogData.ts`, and JSX inline.
- **State management:** None — server components default, local `useState` only. No Zustand/Redux/Jotai/Context.
- **Domain:** name.com (registrar — deferred Cloudflare migration 6+ months out)
- **Workflow:** User → Claude prompt → Claude Code in terminal → Git push → Vercel auto-deploys

---

## 3. Project Structure (high-level)

```
~/Projects/max-realty-next/
├── app/
│   ├── api/                          # 11 route handlers: 8 form intake + 2 listings + 1 gated PDF/asset
│   │   ├── briefing-request/         # Investment Advisory lead magnet (reference impl for bot guards)
│   │   ├── investment-inquiry/       # Strategy Call form
│   │   ├── off-market-inquiry/
│   │   ├── selling-inquiry/
│   │   ├── leasing-inquiry/
│   │   ├── home-evaluation/
│   │   ├── pre-construction-inquiry/
│   │   ├── contact/                  # General contact + /join recruitment
│   │   ├── listings/                 # CREA DDF proxy (index + [id])
│   │   └── off-market-asset/[key]/   # Gated PDF/asset delivery
│   ├── about/                        # About page (HomeLife/independence narrative)
│   ├── agents/                       # Agent grid
│   ├── off-market/                   # Index page + [slug] dynamic routes
│   │   └── [slug]/                   # Off-market listing detail pages
│   ├── services/
│   │   ├── investment-advisory/      # Has BriefingForm + StrategyForm + thank-you sub-route
│   │   ├── selling/
│   │   ├── home-evaluation/
│   │   ├── leasing/
│   │   └── pre-construction/
│   └── page.tsx                      # Homepage
├── components/
│   ├── BriefingForm.tsx              # Lead magnet capture form
│   ├── ExclusiveStamp.tsx            # EXCLUSIVE badge for off-market cards
│   ├── seo/JsonLd.tsx                # Schema injection
│   └── ...
├── data/
│   ├── agents.json                   # 4 agents: shahin-mirkhan, hootan-ghovanloo, ali-mirkhan, fred-hamrahi
│   ├── offMarketListings.ts          # Source of truth for off-market listing content (3 published)
│   └── blogPosts.json                # ⚠ Conflicts with lib/blogData.ts — see "Audit Findings To Remember"
├── lib/
│   ├── ddf.ts                        # Major business logic — CREA DDF token + OData fetch + dual-feed merge
│   ├── seo.ts                        # BUSINESS_INFO constants (legalName, brokerLicensedSince: "1988", foundingYear: "2004")
│   ├── schemas.ts                    # JSON-LD schema generators (Organization, LocalBusiness, Product, Article, etc.)
│   ├── email-templates.ts            # Shared brandedEmailHtml + brandedEmailText helpers
│   ├── blogData.ts                   # Blog post content actually served by /blog/[slug] (3 posts)
│   └── storyblok.ts                  # SDK init — currently unused at runtime
├── public/
│   ├── logo.png                      # 1200x805, used in emails (referenced as absolute URL)
│   ├── logo.svg
│   ├── exclusive-stamp.svg           # Official EXCLUSIVE badge for off-market
│   ├── og-default.jpg                # 1200x630 branded OG image
│   ├── og-default.svg                # Master file for OG
│   ├── max-realty-off-market-advantage.pdf  # Investment Advisory lead magnet (199KB, 10 pages)
│   ├── email-signatures.md
│   ├── post-deploy-checklist.md
│   └── agents/                       # Agent headshots (preempt fix — see Outstanding Items)
└── PROJECT_STATE.md                  # This file
```

---

## 4. What's Live and Working

### Lead Magnet System ("The Off-Market Advantage")
- **PDF:** `/max-realty-off-market-advantage.pdf` — 10 pages, branded, sourced (Altus Group, Cushman & Wakefield, RE/MAX, CBRE Q1 2026 data)
- **Form:** `/services/investment-advisory#briefing` — 5 fields (First Name, Last Name, Email, Phone, "I am" dropdown)
- **API route:** `app/api/briefing-request/route.ts`
- **Bot protection:** 3-signal pattern (Origin/Referer check → JS-set token → time-on-page ≥1500ms). NO honeypot.
- **Lead email:** Subject "Your Investor Briefing — The Off-Market Advantage" with PDF download link
- **Internal email:** Subject "New briefing request: {Name} ({Role})" sent to `info@` BCC `smirkhan@`
- **Reply-to:** `info@maxrealtysolutions.com`
- **Thank-you page:** `/services/investment-advisory/thank-you` (noindex; instant PDF download + secondary CTA to schedule call)
- **Discovery paths:** Linked from `/off-market` index and each `/off-market/[slug]` detail page (contextual, not duplicated forms)

### SEO
- JSON-LD schema deployed and validated via Google Rich Results Test
- Schema types: Organization, LocalBusiness, RealEstateAgent, Product (CREA listings), RealEstateListing (off-market), Article (blog), Service (5 service pages), FAQPage (`/services/selling`), BreadcrumbList
- Sitemap submitted
- Office address (8220 Bayview) in schema with geo coords (43.8076, -79.4054), opening hours, faxNumber
- ~98% technical SEO complete

### Brand Assets
- **EXCLUSIVE badge:** `public/exclusive-stamp.svg` (~38KB, transparent, masked rings, burgundy text via .st14, 6 visible stars). Component: `components/ExclusiveStamp.tsx`. Placement: bottom-right corner on homepage off-market cards (180px), `/off-market` index cards (180px), `/off-market/[slug]` hero (260px). `unoptimized` prop on next/image.
- **Branded OG image:** `public/og-default.jpg` (1200×630, ~88KB, cream background, burgundy/gold accents, "Since 1988"). Wired into `app/layout.tsx` openGraph metadata. Fixes iMessage random-photo preview bug.

### Email Infrastructure
- **Shared template helper:** `lib/email-templates.ts` exports `brandedEmailHtml({ title, bodyHtml, preheader })` and `brandedEmailText({ bodyText })`
- **Design:** Card-on-canvas pattern. Outer wrapper neutral grey `#F0F0F0`. Inner card cream `#FDF8EE`, border-radius 8px, subtle border + shadow. Header: 140px logo + 80px gold rule + serif title in burgundy. Footer: charcoal `#2C2C2C` with rounded bottom corners.
- **Status:** All 7 transactional email handlers now use the shared `brandedEmailHtml` helper (briefing-request + 6 inquiry routes). Card-on-canvas pattern with cream card on neutral grey canvas, 140px logo, rounded corners, charcoal footer. Verified in commits `48cd319`, `74c61ac`, `b66f9bf`, `5106fe4`, `f93dbe9`.

### Verified Codebase Audit — 2026-05-01
- **Audit file:** `~/Desktop/cowork-output/2026-05-01-codebase-audit.md`
- **Audit commit:** `f93dbe9`
- **Strong technical foundation:** Next.js App Router, strict TypeScript, healthy bundle sizes (top route 117 kB First Load JS), clean kebab-case routing, 100% `next/image` adoption, structured SEO basics (per-page Metadata API, single H1 per page sampled, canonical URLs, JSON-LD via shared helpers).
- **Main business/system gaps surfaced by the audit:**
  - No CRM / DB / lead store — every lead is a Resend email only
  - No analytics provider verified anywhere in `app/`/`components/`/`lib/`
  - Uneven bot protection — only `briefing-request` enforces the 3-signal pattern; 8 other form routes are unprotected
  - Blog source-of-truth / sitemap mismatch (`lib/blogData.ts` vs `data/blogPosts.json`)
  - Storyblok SDK installed and required at deploy but unused at runtime
  - MLS calls use `cache: "no-store"` everywhere in `lib/ddf.ts` — kills CDN/ISR for `/` and listings pages
  - Property listings excluded from `app/sitemap.ts` (only static + blog + off-market are listed)
  - Hard-coded internal BCC (`smirkhan@gmail.com`) appears in multiple route files instead of an env var
  - No error tracking (no Sentry / DataDog / equivalent) — failed `resend.emails.send` only logs to stdout
  - No tests of any kind (no `*.test.ts`, no Playwright)

### Other Live Items
- About page rewrite (Re/Max Hallmark 1988 → HomeLife 2004 → Independent 2010 narrative)
- Shahin's polished bio
- Trust strip on homepage ("Since 1988 · RECO Licensed · TRESA Regulated · Thornhill-based")
- Site-wide stat normalization ($2B+ → $750M+, 30+ Years → 38 Years across homepage, About, all service pages, metadata descriptions), and a follow-up sweep of /property-management page + services index cards (commits `4239e4e`, `576a976`)
- About page agent photo bug fixed (commit `893ea79` — removed `quality={90}` prop forcing 404 from Next.js image optimizer; default `quality={75}` works)

### Property & Asset Management Support (institutional service line)
- **New page:** `/services/property-management` — institutional asset oversight, mortgage enforcement property support, estate property support, investor asset support, sale preparation. Coordinator-only model.
- **Form:** `components/PropertyManagementForm.tsx`, posts to `/api/property-management-inquiry`
- **API route:** `app/api/property-management-inquiry/route.ts` — mirrors briefing-request bot guard (3-signal: Origin + JS token + time-on-page) and two-send Resend pattern
- **Thank-you:** `/services/property-management/thank-you` (noindex)
- **Schema:** `propertyManagementServiceSchema()` in `lib/schemas.ts` with 5 sub-services as Offer items
- **Wiring:** Header dropdown, Footer quick-links, services index card (ShieldCheck icon), sitemap (priority 0.8)
- **Public soft launch:** Live, indexable, in nav. NO paid promotion until Phase A foundation work (insurance, legal, trades, reporting templates) complete.
- **Coexistence:** Two property-management pages now active. `/property-management` = residential PM (individual landlords). `/services/property-management` = institutional asset oversight (lenders, MICs, estate trustees). Reciprocal clarifying lines + cross-links on both.

---

## 5. Critical Patterns to Follow

### Bot Protection (use for ALL future lead-capture forms)
**DO NOT use hidden honeypot fields.** Browser autofill and password managers fill hidden inputs regardless of field name, silently rejecting real users. Symptom: form returns 200, no Resend API call ever made, lead never receives email.

Use the 3-signal pattern instead:
1. **Server-side Origin/Referer check** (loud 403 for bots that strip headers)
2. **JS-set token** in `useEffect` on mount, sent in payload (silent 200 if missing — bots that don't run JS fail this)
3. **Time-on-page check** rejecting submissions <1500ms (silent 200 if too fast)

Reference implementation: `app/api/briefing-request/route.ts` + `app/services/investment-advisory/BriefingForm.tsx` (commit `0be3090`).

### Email Template Pattern
ALL transactional emails go through `lib/email-templates.ts`. Each route should construct only the unique body content and pass it to `brandedEmailHtml({ title, bodyHtml })`. Do not invent new email designs per route.

### Resend Send Pattern (for routes with both lead + internal emails)
Two SEPARATE sends, in this order:
1. **SEND 1** — Lead acknowledgment to `to: lead.email`. NO bcc. If this fails, return 500 to client (the lead is the point of the form).
2. **SEND 2** — Internal notification to `to: info@maxrealtysolutions.com`, `bcc: smirkhan@gmail.com`, `replyTo: lead.email` (so team can reply directly). If this fails, log the error but return 200 success to client (lead already got their email).

ALWAYS inspect `{ data, error }` return from `resend.emails.send()`. Log both branches with `[<route>] entry`, `[<route>] about to send <X>`, `[<route>] <X> send result`. Silent failures are unacceptable in lead-capture code.

### Year/Stat Consistency
- "Since 1988" — broker license year (marketing copy)
- 2004 — legal entity (schema.org foundingDate)
- 2010 — independence from HomeLife
- $750M+, 38 Years, 3,000+ clients — never deviate from these on any page

### Code-Edit Workflow Rules (from Cowork dispatch instructions)
- Cowork = browser automation only. Never use Cowork for git/code edits.
- Code edits = Claude Code in terminal only.
- LinkedIn: confirm whether action targets personal profile or Max Realty company page before any post/reply/DM.
- File outputs save to `~/Desktop/cowork-output/` with `YYYY-MM-DD-` prefix.

### Patterns Established by 2026-05-01 Audit
- **All future form routes must use the shared bot guard helper once extracted** from `briefing-request`. Do not reimplement origin/JS-token/time-on-page checks per route.
- **All form routes must support consistent observability:** log `[<route>] entry`, validation failure reasons, Resend `{data, error}` send result for every send, and any unexpected exceptions. The `briefing-request` route is the reference implementation.
- **Blog content must have one source of truth only.** Currently `lib/blogData.ts` powers `/blog/[slug]` while `data/blogPosts.json` is read by `app/sitemap.ts` — this is a bug, not a pattern to follow.
- **Sitemap must read from the same source that actually powers live routes.** Adding a URL to the sitemap that doesn't resolve to a 200 is treated as a real SEO bug.
- **Do not add or expand Storyblok until a clear editorial workflow need exists.** The current install is dead code; either delete it or wire it deliberately — do not partially commit.

---

## 6. Outstanding Items (in priority order)

### High Priority

1. **Phase A operational foundation for Property & Asset Management Support**
   - CGL ($5M) + E&O ($2M) insurance bound
   - Master Service Agreement drafted by real estate / commercial litigator (Robins Appleby, Aird & Berlis, or Shahin's existing counsel)
   - Trade partner roster vetted (locksmith, cleaning, plumbing, electrical, roofing, restoration, landscaping, GC)
   - Standardized inspection report template + photo documentation protocol
   - Internal pricing model finalized
   - Until complete: page is live but no paid promotion, no direct outreach to MICs/lenders. Inquiry capture only.
   - Reference: `property-asset-management-brief-v3.docx` Section 11 + Section 15.

2. **Fix blog source-of-truth / sitemap bug**
   - `lib/blogData.ts` currently powers `/blog/[slug]` routes (3 posts: `interest-rates-gta-2026`, `gta-buyers-market-2026`, `gta-retail-plaza-investing`)
   - `data/blogPosts.json` appears to power `app/sitemap.ts` (3 different `post-001`-style IDs)
   - Pick one source of truth
   - Ensure sitemap only lists real live blog URLs
   - Verify all blog slugs return 200

3. **Add basic error alerting**
   - Either Sentry or a simple internal Resend alert for API route failures
   - Catches the next silent email failure before a real lead complains
   - Keep it simple and operator-useful

4. **Add analytics**
   - Add GA4 or GTM
   - Prefer GTM if future tracking flexibility is needed
   - Track page views and all form submissions
   - Do not overcomplicate attribution yet

5. **Apply bot protection to all form routes**
   - Extract the working 3-signal pattern from `briefing-request` into a shared helper (e.g., `lib/bot-guards.ts`)
   - Apply consistently to all lead-capture endpoints: `contact`, `investment-inquiry`, `off-market-inquiry`, `selling-inquiry`, `leasing-inquiry`, `home-evaluation`, `pre-construction-inquiry`, `property-management-inquiry`
   - No honeypots

6. **Standardize form handler observability**
   - Email template fan-out: COMPLETED across the 6 inquiry routes, verified in recent commits `48cd319`, `74c61ac`, `b66f9bf`, `5106fe4`, and `f93dbe9`
   - Remaining work: ensure every route inspects Resend `{data, error}`, uses the two-send pattern (lead first, internal second), and has consistent logging at entry / validation failure / Resend send result / unexpected errors
   - Audit each route against the `briefing-request` reference implementation

7. **Clean Storyblok decision**
   - Either remove Storyblok SDK + `lib/storyblok.ts` + `STORYBLOK_*` env references if not used
   - Or explicitly wire it to blog/content later
   - Current recommendation: do not expand Storyblok yet

8. **Improve MLS caching**
   - Replace `cache: "no-store"` in `lib/ddf.ts` where appropriate with `next: { revalidate: 300 }`
   - Be careful not to break property freshness on `/properties/[id]`

9. **Move hard-coded internal BCC to env var**
   - Use `INTERNAL_BCC` or `MAX_INTERNAL_BCC`
   - Keep public-facing contact as `info@maxrealtysolutions.com`

### Deferred (saved in memory, ready when triggered)
10. **Lead tracking upgrade** — currently leads only flow via Resend BCC. **Trigger after analytics/form standardization is complete.** Recommended first storage path is a Google Sheet or lightweight DB; CRM can come later.
    - **Path A (Apps Script + Google Sheet):** Add `fetch()` to Apps Script Web App URL inside each form route after Resend send. Payload: `{timestamp, firstName, lastName, email, phone, role, source}`. Extend pattern to all 8 form endpoints with shared helper + `source` column.
    - **Path B (Resend Audiences):** `resend.contacts.create({audienceId, email, firstName, lastName, unsubscribed: false})` after `resend.emails.send()`. Audience ID in `RESEND_AUDIENCE_ID` env var.
    - Trigger phrase: "wire up Sheet logging" or "wire up Resend Audiences"
11. **Formal NDA PDF** — broader brokerage forms work
12. **Domain transfer name.com → Cloudflare Registrar** — deferred 6+ months
13. **Custom quarterly market report PDF** — Path B Investment Advisory deliverable, deferred (evergreen Path A briefing already shipped)
14. **`/join` page upgrade** — current page already strong, no upgrade needed unless adding real agent testimonials or video from Shahin (requires authentic source material)

### Low Urgency / Watching
15. **Agent photo source files at `/files/agent_profile_pics/{ID}.jpg` are 404 at origin.** Vercel edge cache currently serving them; cache will eventually expire and break `/about` + `/agents` photos. **Pre-empt fix:** download photos while cache still serves them, drop into `public/agents/` with clean filenames (`shahin-mirkhan.jpg`, `hootan-ghovanloo.jpg`, `ali-mirkhan.jpg`, `fred-hamrahi.jpg`), update `data/agents.json` photo paths.
16. **Property listings excluded from sitemap.** CREA-fed `/properties/[id]` URLs are dynamic, so they aren't in `sitemap.xml`. Acceptable for now; revisit if organic property traffic becomes a real channel.
17. **Property JSON-LD uses `Product` schema** (`lib/schemas.ts:189`). Google's real-estate rich-result trigger expects `RealEstateListing`. Revisit when SEO of individual property pages becomes a priority.
18. **No UI primitive components** (Button/Input/Card). Forms re-declare the same `inputClass` literal in every file. Extract a primitive layer when the next form-heavy feature lands.
19. **Stale stats outside `/services` index** — homepage hero (`app/page.tsx:379` "$10M–$35M+"), About page (`app/about/page.tsx:50` "$10M–$35M+"), Commercial page (`app/commercial/page.tsx:69, 107` "$10M–$35M+" + "$35M+ Transaction Volume" stat), Selling page (`app/services/selling/page.tsx:231` "$2B+"), Home Evaluation page (`app/services/home-evaluation/page.tsx:255, 261` "$2B+" + "30+ years"). Site-wide normalization claim in Section 4 was incomplete; sweep these on a future copy pass.

---

## 7. Recent Commit History (newest first)

| Commit | Date | Description |
|---|---|---|
| `576a976` | May 1, 2026 | Normalize services index card stats: $2B+ and $35M+ → $750M+ framework |
| `1918509` | May 1, 2026 | Residential PM cleanup pass 2: hero subtitle aligned with clarifying line, CTA component audited (clean) |
| `5a4300e` | May 1, 2026 | Public soft launch: institutional `/services/property-management` page — remove noindex, add to nav + footer + services index + sitemap |
| `4239e4e` | May 1, 2026 | Cleanup residential PM page: remove 24/7 + LTB language, normalize stats to 38 Years / $750M+, add clarifying line + cross-link |
| `b2c124b` | May 1, 2026 | Add Property & Asset Management Support page (staged private — not linked from nav, sitemap, or other pages) |
| `0be3090` | Apr 26, 2026 | Briefing: replace honeypot with origin/JS-token/time-on-page bot checks (autofill kept silently rejecting real users) |
| `5c213ce` | Apr 26, 2026 | Briefing API: add diagnostic logging at every decision branch + rename honeypot field to avoid browser autofill misfire |
| `97617e7` | Apr 26, 2026 | Briefing API: split into two sends + inspect Resend responses + remove custom headers (fix silent email failure) |
| `668017a` | Apr 26, 2026 | Off-market pages: add contextual links to The Off-Market Advantage briefing (anchor to /services/investment-advisory#briefing) |
| `b0e4a95` | Apr 26, 2026 | Investment Advisory: fix $2B+ → $750M+ in metadata description and openGraph description |
| `ac3a00a` | Apr 26, 2026 | Investment Advisory: replace Coming Soon market report with working PDF lead magnet (Off-Market Advantage briefing) + fix stale stats |
| `893ea79` | Apr 26, 2026 | About page: remove `quality={90}` prop on team grid (Next.js 15.4+ requires qualities whitelist) |

---

## 8. Environment Variables (referenced — values in Vercel only)

Verified by repo-wide `process.env.*` grep across `app/`, `lib/`, `scripts/` on commit `f93dbe9`.

**Email**
- `RESEND_API_KEY` — Resend transactional email sending
- `RESEND_AUDIENCE_ID` — planned only (Path B lead tracking upgrade); not currently referenced

**CREA DDF**
- `CREA_NSP_USERNAME`
- `CREA_NSP_PASSWORD`
- `CREA_MEMBER_USERNAME`
- `CREA_MEMBER_PASSWORD`
- `CREA_TOKEN_URL`
- `CREA_ODATA_URL`
- `DDF_USERNAME` (legacy alias read by `lib/ddf.ts`)
- `DDF_PASSWORD` (legacy alias)
- `DDF_NSP_USERNAME` (legacy alias)
- `DDF_NSP_PASSWORD` (legacy alias)

**Storyblok** (currently unused at runtime — see Audit Findings)
- `STORYBLOK_PREVIEW_TOKEN`
- `STORYBLOK_MANAGEMENT_TOKEN`
- `NEXT_PUBLIC_STORYBLOK_SPACE_ID`

**Internal routing / planned**
- `INTERNAL_BCC` or `MAX_INTERNAL_BCC` — should be added later to replace hard-coded `smirkhan@gmail.com` BCC in route files. Does not exist yet; do not claim it does.

**Note:** Values live in Vercel only. Never commit secrets.

---

## 8a. Audit Findings To Remember

Carry these forward across sessions until they're closed:

- **No CRM/DB lead store yet** — every lead is a Resend email; lose inbox, lose history.
- **No analytics currently verified** — zero visibility into traffic, conversion, or which form converts.
- **Blog/sitemap mismatch is a real SEO bug** — sitemap advertises URLs that don't resolve. Fix before any other SEO work.
- **Storyblok installed but unused** — package, init code, and 3 envs ship with no callers in `app/`.
- **Forms need shared bot protection and consistent Resend handling** — only `briefing-request` is the reference; the others drift.
- **MLS caching should be improved carefully** — `cache: "no-store"` everywhere kills CDN/ISR; switching to `revalidate` must not break property freshness.
- **Listing schema should be revisited later** — `Product` is used for residential listings instead of `RealEstateListing`; not blocking but suboptimal.
- **UI primitives are absent** — useful refactor, not urgent. Defer until the next form-heavy feature.

---

## 9. Lessons Learned This Session (preserve these)

1. **Honeypot fields are obsolete in 2026.** Browser autofill / password managers fill hidden inputs regardless of field name. The 3-signal pattern (Origin + JS token + time-on-page) is the cross-browser-safe replacement.
2. **Always inspect Resend response.** `await resend.emails.send()` returns `{data, error}` — it does NOT throw on most failures. Code that ignores the response will silently succeed even when no email was sent. ALWAYS check `error` and log both branches.
3. **Email design: card-on-canvas pattern beats edge-to-edge.** Premium investor-facing emails use neutral outer wrapper + contained card with rounded corners + soft border/shadow. Cream throughout the card (header + body unified), charcoal footer with matching bottom radius. Logo at 140px, not 200px (140 reads as premium; 200 shouts).
4. **Test forms end-to-end before promoting.** UI confirmation (redirect to thank-you) is meaningless. Resend dashboard confirmation is the only ground truth. The valid test sequence: submit → check inbox AND spam → if no email in 60s, check Resend dashboard → if not in Resend dashboard, check Vercel logs.
5. **Quality whitelist in Next.js 15.4+.** `next/image` only allows `quality={75}` by default. Custom values (e.g., `quality={90}`) require explicit whitelisting in `next.config.js`. Without whitelisting, optimizer returns 404. Use default 75 unless absolutely necessary.
6. **A codebase audit must be verified by actual file inspection, not working memory.** Every claim in the audit has to point to a specific file/line; "we probably have X" gets you stale `PROJECT_STATE.md` and bad decisions.
7. **Documentation must be updated immediately after audits, otherwise future Claude sessions operate from stale assumptions.** Outstanding-Items, Tech Stack, and Env Vars rot the fastest — fix them in the same PR/session as the audit itself.
8. **Two coexisting property-management pages can serve two different audiences without confusion if reciprocal clarifying lines + cross-links are added on both.** Different URLs, different value props, different schema, with explicit "this is for residential / this is for institutional" framing in each hero.
9. **Never trust documentation that claims sweeping normalization is complete.** PROJECT_STATE.md Section 4 claimed site-wide stat unification was done; the services index card still carried "$2B+" and "$35M+", and the homepage / About / Commercial / Selling / Home Evaluation pages still carry similar stale stats. Verify with `grep -r` before claiming any cross-cutting cleanup is complete.

---

## 10. How to Update This File

At the end of every chat session that produces meaningful changes:

1. Update **Last updated** date at top
2. Update **Last session** description (one line)
3. Update **Current production commit** if commits were made
4. Add new entries to **What's Live and Working** for shipped features
5. Add new entries to **Critical Patterns to Follow** if new patterns were established
6. Move completed items OUT of **Outstanding Items**
7. Add new items to **Outstanding Items** in correct priority tier
8. Append new commits to **Recent Commit History** table
9. Add any new lessons to **Lessons Learned**
10. Commit the file: `git add PROJECT_STATE.md && git commit -m "Update PROJECT_STATE.md — <session description>" && git push`

---

*End of state file. New sessions: read this in full, then read `START_NEW_SESSION_PROMPT.txt` for the onboarding prompt to paste at chat start.*
