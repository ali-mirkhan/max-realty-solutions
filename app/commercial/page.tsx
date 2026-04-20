import type { Metadata } from "next";
import Image from "next/image";
import { Building2, TrendingUp, BarChart3, DollarSign, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import CommercialCTA from "./CommercialCTA";

export const metadata: Metadata = {
  title: "Commercial Real Estate",
  description: "Investment-grade commercial real estate in the GTA. Retail plazas, leasing, and investment analysis with $35M+ in transaction experience.",
};

const COMMERCIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/commercial-plaza-d5RPaNypjMPznC5dYLNvEH.webp";

const deals = [
  { title: "Multi-Tenant Retail Plaza", location: "Vaughan, ON", value: "$18.5M", type: "Acquisition", capRate: "6.2%", sqft: "28,000", desc: "12-unit retail plaza with national anchor tenant. Long-term leases with built-in escalations." },
  { title: "Highway 7 Commercial Complex", location: "Markham, ON", value: "$24M", type: "Disposition", capRate: "5.8%", sqft: "42,000", desc: "Mixed-use commercial complex with retail and office space. High-traffic corridor with excellent visibility." },
  { title: "Steeles Ave Retail Strip", location: "Thornhill, ON", value: "$12.2M", type: "Acquisition", capRate: "6.5%", sqft: "18,500", desc: "8-unit retail strip with strong tenant mix. Recently renovated with modern amenities." },
];

export default function CommercialPage() {
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
            <p className="text-xs font-medium uppercase tracking-widest text-[#E8E4DE]/60 mb-3">Commercial Real Estate</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Investment-Grade Commercial Opportunities
            </h1>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed mb-8">
              Backed by real transaction experience in the $10M–$35M+ range. Retail plazas, investment
              properties, and commercial leasing across the Greater Toronto Area.
            </p>
            <CommercialCTA />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-stone-border">
        <div className="container py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "$35M+", label: "Transaction Volume" },
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Retail Plaza Transactions", desc: "Acquisition and disposition of multi-tenant retail plazas with thorough due diligence and market analysis." },
              { icon: BarChart3, title: "Investment Analysis", desc: "Comprehensive ROI projections, cap rate analysis, and cash flow modelling for informed investment decisions." },
              { icon: DollarSign, title: "Commercial Leasing", desc: "Tenant representation and landlord services for retail, office, and industrial spaces across the GTA." },
              { icon: TrendingUp, title: "Development Opportunities", desc: "Identification and evaluation of development-ready land and value-add commercial properties." },
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
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {deals.map((deal) => (
              <div key={deal.title} className="border border-stone-border rounded-lg p-6 hover:border-burgundy/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-xs font-medium text-burgundy bg-burgundy/10 rounded">{deal.type}</span>
                  <span className="text-xs text-charcoal/40 flex items-center gap-1"><MapPin size={12} /> {deal.location}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{deal.title}</h3>
                <p className="text-sm text-charcoal/60 mb-4">{deal.desc}</p>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-border">
                  <div><p className="text-xs text-charcoal/40">Value</p><p className="text-sm font-semibold text-burgundy">{deal.value}</p></div>
                  <div><p className="text-xs text-charcoal/40">Cap Rate</p><p className="text-sm font-semibold text-charcoal">{deal.capRate}</p></div>
                  <div><p className="text-xs text-charcoal/40">Size</p><p className="text-sm font-semibold text-charcoal">{deal.sqft} sqft</p></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-charcoal/40 mt-6">
            * Transaction details shown are representative examples for illustration purposes.
          </p>
        </div>
      </section>

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
