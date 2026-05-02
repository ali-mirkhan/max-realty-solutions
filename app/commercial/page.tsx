import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, TrendingUp, BarChart3, DollarSign, ArrowRight, MapPin, Lock } from "lucide-react";
import CommercialCTA from "./CommercialCTA";
import OffMarketCard from "@/components/OffMarketCard";
import { getPublishedOffMarketListings } from "@/data/offMarketListings";

export const metadata: Metadata = {
  title: "GTA Commercial Real Estate | Toronto Retail Plaza, Office, Industrial Properties",
  description: "Commercial real estate services across the GTA — retail plazas, investment properties, leasing and development land. Max Realty Solutions has $750M+ in transaction experience.",
  alternates: { canonical: "https://www.maxrealtysolutions.com/commercial" },
};

const COMMERCIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/commercial-plaza-d5RPaNypjMPznC5dYLNvEH.webp";

const deals = [
  {
    title: "8180–8220 Bayview Ave",
    location: "Markham, ON",
    type: "Retail Plaza",
    category: "Development Land",
    desc: "Multi-tenant retail shopping plaza with significant development land potential on Bayview Avenue in Markham.",
    image: "https://www.maxrealtysolutions.com/files/u411282/1(1).png",
  },
  {
    title: "3280 Dufferin St & 16 Orfus Rd",
    location: "Toronto, ON",
    type: "Commercial Complex",
    category: "Multi-Tenant",
    desc: "Large-scale multi-tenant commercial complex at the intersection of Dufferin Street and Orfus Road in Toronto.",
    image: "https://www.maxrealtysolutions.com/files/u411282/3.png",
  },
  {
    title: "5999–6023 Yonge St",
    location: "Toronto, ON",
    type: "Mixed-Use",
    category: "Commercial",
    desc: "Mixed-use commercial property spanning multiple units along Yonge Street in Toronto's mid-town corridor.",
    image: "https://www.maxrealtysolutions.com/files/u411282/5999-6023%20Yonge%20Street%20Toronto%20ON.png",
  },
  {
    title: "16599 Yonge St",
    location: "Newmarket, ON",
    type: "Retail Plaza",
    category: "Multi-Tenant",
    desc: "Multi-tenant retail plaza anchored by national brands including RBC Royal Bank, Dairy Queen, and Tim Hortons on Yonge Street in Newmarket.",
    image: "https://www.maxrealtysolutions.com/files/u411282/16599%20Yonge%20St%20Newmarket%20ON.png",
  },
];

export default function CommercialPage() {
  const offMarketListings = getPublishedOffMarketListings();
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={COMMERCIAL_IMG} alt="Commercial retail plaza" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-white/90 mb-3" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>Commercial Real Estate</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Investment-Grade Commercial Opportunities
            </h1>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed mb-8">
              Backed by real institutional-scale transaction experience in the GTA. Retail plazas,
              investment properties, and commercial leasing across the Greater Toronto Area.
            </p>
            <CommercialCTA />
          </div>
        </div>
      </section>

      {/* Off-Market Opportunities teaser */}
      <section className="bg-stone-light border-b border-stone-border">
        <div className="container py-12 lg:py-16">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-burgundy mb-3 inline-flex items-center gap-2">
                <Lock size={12} /> Exclusive
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-3">
                Off-Market Investment Opportunities
              </h2>
              <p className="text-sm lg:text-base text-charcoal/70 leading-relaxed">
                Max Realty maintains relationships with owners of institutional-grade commercial
                assets not listed on MLS. Qualified investors can request access to our current
                portfolio of off-market opportunities — including development sites, retail
                plazas, and grocery-anchored assets across Ontario.
              </p>
            </div>
            <Link href="/off-market" className="btn-primary">
              View Off-Market Opportunities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-stone-border">
        <div className="container py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "$750M+", label: "In Real Estate Transacted" },
              { value: "6.0%+", label: "Average Cap Rate" },
              { value: "100K+", label: "Sq Ft Managed" },
              { value: "GTA-Wide", label: "Market Coverage" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl lg:text-3xl font-bold text-burgundy">{s.value}</p>
                <p className="text-xs lg:text-sm text-charcoal/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">What We Do</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Commercial Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Retail Plaza Transactions", desc: "Acquisition and disposition of multi-tenant retail plazas with thorough due diligence and market analysis." },
              { icon: BarChart3, title: "Investment Analysis", desc: "Comprehensive ROI projections, cap rate analysis, and cash flow modelling for informed investment decisions." },
              { icon: DollarSign, title: "Commercial Leasing", desc: "Tenant representation and landlord services for retail, office, and industrial spaces across the GTA." },
              { icon: TrendingUp, title: "Development Opportunities", desc: "Identification and evaluation of development-ready land and value-add commercial properties." },
              { icon: Building2, title: "Property Management", desc: "Full-service management for retail plazas, mixed-use buildings, and commercial properties. Tenant relations, lease administration, maintenance, and financial reporting." },
            ].map((item) => (
              <div key={item.title} className="bg-stone-light rounded-lg p-6">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-burgundy" />
                </div>
                <h3 className="font-sans text-sm font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Showcase */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Track Record</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">Notable Transactions</h2>
            <p className="text-charcoal/60">A selection of commercial deals that demonstrate our expertise and market reach.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {deals.map((deal) => (
              <div key={deal.title} className="border border-stone-border rounded-lg overflow-hidden hover:border-burgundy/20 transition-colors">
                <div className="relative w-full aspect-video" style={{ backgroundColor: "#F7F5F0" }}>
                  <Image src={deal.image} alt={deal.title} fill className="object-contain" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 text-xs font-medium text-burgundy bg-burgundy/10 rounded">{deal.type}</span>
                    <span className="text-xs text-charcoal/40 flex items-center gap-1"><MapPin size={12} /> {deal.location}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{deal.title}</h3>
                  <p className="text-sm text-charcoal/60 mb-4">{deal.desc}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-border">
                    <div><p className="text-xs text-charcoal/40">Property Type</p><p className="text-sm font-semibold text-charcoal">{deal.type}</p></div>
                    <div><p className="text-xs text-charcoal/40">Category</p><p className="text-sm font-semibold text-charcoal">{deal.category}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Off-Market Listings */}
      {offMarketListings.length > 0 && (
        <section className="py-16 lg:py-20 bg-charcoal">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E4DE]/80 border-l-2 border-burgundy pl-3 mb-4 inline-flex items-center gap-2">
                <Lock size={11} />
                Exclusive · By Qualification
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-3">
                Off-Market Commercial Opportunities
              </h2>
              <p className="text-[#E8E4DE]/80 leading-relaxed">
                Confidential commercial listings available to qualified investors.
                NDA and qualification required for full details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offMarketListings.map((listing) => (
                <OffMarketCard key={listing.slug} listing={listing} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/off-market"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white border border-white/40 rounded-md hover:bg-white/10 transition-colors"
              >
                View All Off-Market Opportunities <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-4">
            Explore Commercial Opportunities
          </h2>
          <p className="text-[#E8E4DE]/70 max-w-xl mx-auto mb-8">
            Whether you&apos;re looking to acquire, dispose, or lease commercial property in the GTA,
            our team has the experience to deliver results.
          </p>
          <CommercialCTA />
        </div>
      </section>
    </>
  );
}
