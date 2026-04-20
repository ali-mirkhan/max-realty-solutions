# Max Realty Solutions — Next.js Website

A modern real estate brokerage website built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Images**: Next.js `<Image />` (optimized)
- **Deployment**: Vercel (recommended)

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Header + Footer)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + Tailwind
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # robots.txt
│   ├── not-found.tsx           # 404 page
│   ├── about/
│   ├── blog/
│   │   └── [id]/               # Dynamic blog post pages
│   ├── commercial/
│   ├── contact/
│   ├── join/
│   ├── properties/
│   │   └── [id]/               # Dynamic property detail pages
│   ├── services/
│   └── tools/
├── components/
│   ├── Header.tsx              # Sticky nav with mobile menu
│   ├── Footer.tsx              # Footer with RECO disclaimer
│   ├── PropertyCard.tsx        # Reusable property card
│   └── ContactModal.tsx        # Lead capture modal
├── data/
│   ├── properties.json         # Placeholder listings (IDX/DDF-ready)
│   └── blogPosts.json          # Placeholder blog posts
├── lib/
│   ├── types.ts                # Shared TypeScript interfaces
│   └── utils.ts                # Utility functions (cn, formatCAD)
└── public/                     # Static assets (add logo here)
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy**

## Before Going Live — Checklist

### Replace placeholder content
- [ ] Phone number: `(905) 555-1234` → your real number
- [ ] Email: `info@maxrealtysolutions.ca` → your real email
- [ ] Office address in Footer and Contact page
- [ ] Commission plan figures (marked with `* placeholder` notes)
- [ ] Broker of Record name and bio on About page
- [ ] Broker headshot photo
- [ ] Agent testimonials (3 cards on Home page)
- [ ] Social media links in Footer

### Update branding
- [ ] Add your actual logo to `/public/logo.png` and update Header
- [ ] Update domain in `sitemap.ts` and `robots.ts`

### Form integration
All forms currently show a success state on submit. To wire them up:
- **Option A (simple)**: Use [Formspree](https://formspree.io) — free tier available
- **Option B (CRM)**: Add a webhook endpoint in the `handleSubmit` functions
- **Option C (email)**: Use a Next.js API route + Resend or Nodemailer

Forms to update:
- `app/contact/ContactForm.tsx`
- `app/join/JoinForm.tsx`
- `components/ContactModal.tsx`

### IDX / DDF Integration
Properties are loaded from `data/properties.json`. When ready to connect to live listings:
1. Replace the import in `app/properties/page.tsx` and `app/properties/[id]/page.tsx`
2. Fetch from TRREB IDX or CREA DDF API instead
3. Update `generateStaticParams` in the `[id]` page to use live IDs

### SEO
- Update `metadata` in `app/layout.tsx` with real Open Graph image
- Add Google Analytics via `next/script` in the root layout
- Update `sitemap.ts` with your real domain
