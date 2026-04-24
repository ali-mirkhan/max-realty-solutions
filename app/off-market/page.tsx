import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Building2 } from "lucide-react";
import OffMarketCard from "@/components/OffMarketCard";
import { getPublishedOffMarketListings } from "@/data/offMarketListings";

// TODO: replace og-default.jpg with a branded 1200x630 export of the SVG placeholder
const OG_IMAGE = "https://www.maxrealtysolutions.com/og-default.jpg";
const CANONICAL = "https://www.maxrealtysolutions.com/off-market";

export const metadata: Metadata = {
  title: "Off-Market Investment Opportunities",
  description:
    "Exclusive off-MLS commercial investments curated for qualified investors. Institutional-grade retail plazas, development sites, and grocery-anchored assets across Ontario.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Off-Market Investment Opportunities | Max Realty Solutions",
    description:
      "Exclusive off-MLS commercial investments curated for qualified investors.",
    url: CANONICAL,
    type: "website",
    siteName: "Max Realty Solutions",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Off-Market Opportunities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Off-Market Investment Opportunities | Max Realty Solutions",
    description:
      "Exclusive off-MLS commercial investments curated for qualified investors.",
    images: [OG_IMAGE],
  },
};

export default function OffMarketLandingPage() {
  const listings = getPublishedOffMarketListings();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal border-t-2 border-burgundy overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative container py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-burgundy border-l-2 border-burgundy pl-3 mb-5">
              Exclusive · By Qualification
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Off-Market Investment Opportunities
            </h1>
            <p className="text-lg text-[#E8E4DE]/85 leading-relaxed mb-6">
              Exclusive, off-MLS commercial investments curated for qualified investors.
            </p>
            <p className="text-sm text-[#E8E4DE]/70 leading-relaxed max-w-2xl">
              These opportunities are not listed on MLS and are offered only to qualified
              principals and their licensed representatives. Completion of a brief qualification
              form is required before detailed financial and location information is released.
              All parties will be asked to sign a Non-Disclosure Agreement prior to any document
              exchange.
            </p>
          </div>
        </div>
      </section>

      {/* Listings grid */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="section-label">Current Portfolio</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
                Available Opportunities
              </h2>
              <p className="text-charcoal/60 mt-2">
                {listings.length} {listings.length === 1 ? "opportunity" : "opportunities"} currently available
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline"
            >
              Contact Investment Team <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <OffMarketCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* About Off-Market */}
      <section className="py-20 lg:py-28 bg-white border-t border-stone-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="section-label">For Investors</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-6">
              About Off-Market Investing
            </h2>
            <div className="space-y-4 text-charcoal/75 leading-relaxed">
              <p>
                Off-market commercial real estate refers to properties that are not advertised on
                MLS or public listing platforms. These assets are typically held by long-term
                owners who prefer discretion — often because of tenant sensitivity, strategic
                redevelopment planning, or relationship-driven dispositions.
              </p>
              <p>
                For qualified investors, off-market opportunities offer meaningful advantages:
                reduced competition, the ability to structure terms outside the pressure of a
                public bidding process, and access to assets that simply never reach the open
                market. Pricing on these opportunities is typically discussed directly between
                the owner and qualified parties, which is why you will see &ldquo;Price on Request&rdquo;
                rather than an asking price.
              </p>
              <p>
                Max Realty Solutions maintains direct relationships with owners of
                institutional-grade commercial assets across the Greater Toronto Area and
                broader Ontario market. Our role is to match serious, qualified investors with
                assets that align with their investment mandate — and to shepherd transactions
                through to close with the discretion and professionalism these assignments
                require.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <div className="bg-stone-light rounded-lg p-5">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center mb-3">
                  <Lock size={16} className="text-burgundy" />
                </div>
                <p className="text-sm font-semibold text-charcoal mb-1">Discretion First</p>
                <p className="text-xs text-charcoal/60">Confidentiality maintained at every stage. NDA required prior to release.</p>
              </div>
              <div className="bg-stone-light rounded-lg p-5">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center mb-3">
                  <ShieldCheck size={16} className="text-burgundy" />
                </div>
                <p className="text-sm font-semibold text-charcoal mb-1">Qualified Only</p>
                <p className="text-xs text-charcoal/60">Information released only to vetted principals and their licensed reps.</p>
              </div>
              <div className="bg-stone-light rounded-lg p-5">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center mb-3">
                  <Building2 size={16} className="text-burgundy" />
                </div>
                <p className="text-sm font-semibold text-charcoal mb-1">Institutional Scale</p>
                <p className="text-xs text-charcoal/60">Retail plazas, development sites, and grocery-anchored assets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-24 bg-stone-light">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Private Opportunity List
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Have a qualified investor relationship that would benefit from off-market access?
              Contact our investment team to be placed on our private opportunity list.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Investment Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
