import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Building,
  Warehouse,
  Layers,
  Map,
  HardHat,
  Compass,
  Network,
  ClipboardCheck,
  TrendingUp,
  PieChart,
  CheckCircle2,
  FileText,
} from "lucide-react";
import StrategyForm from "./StrategyForm";
import BriefingForm from "./BriefingForm";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schemas";

const CANONICAL = "https://www.maxrealtysolutions.com/services/investment-advisory";

export const metadata: Metadata = {
  title: "Real Estate Investment Advisory",
  description:
    "Strategic real estate investment advisory across the GTA. Off-market deal access, cap rate analysis, multi-family, retail, industrial, and pre-construction opportunities. $2B+ in transactions negotiated.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Real Estate Investment Advisory | Max Realty Solutions",
    description:
      "Strategic real estate investment advisory across the GTA. Off-market deal access, cap rate analysis, $2B+ in transactions negotiated.",
    url: CANONICAL,
    type: "website",
    siteName: "Max Realty Solutions",
    images: [
      {
        url: "https://www.maxrealtysolutions.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate Investment Advisory — Max Realty Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Investment Advisory | Max Realty Solutions",
    description:
      "Strategic real estate investment advisory across the GTA. Off-market deal access and cap rate analysis.",
    images: ["https://www.maxrealtysolutions.com/og-default.jpg"],
  },
};

const ASSET_CLASSES = [
  {
    icon: Building,
    title: "Multi-Family",
    body: "Residential income properties from duplexes to apartment buildings",
  },
  {
    icon: Building2,
    title: "Retail Plazas",
    body: "Grocery-anchored, neighbourhood centres, mixed-tenant retail",
  },
  {
    icon: Layers,
    title: "Office & Mixed-Use",
    body: "Professional buildings, mixed retail/office/residential",
  },
  {
    icon: Warehouse,
    title: "Industrial & Warehouse",
    body: "Logistics, light manufacturing, flex space",
  },
  {
    icon: Map,
    title: "Land & Development",
    body: "Development land, redevelopment opportunities, assemblies",
  },
  {
    icon: HardHat,
    title: "Pre-Construction",
    body: "Platinum allocations on GTA new builds",
    href: "/services/pre-construction",
  },
];

const PROVIDED = [
  {
    icon: Compass,
    title: "Acquisition Strategy",
    body: "Cap rate analysis, NOI projections, market positioning. We help you build a thesis around every acquisition before you write the offer.",
  },
  {
    icon: Network,
    title: "Off-Market Deal Access",
    body: "Direct relationships with property owners, family offices, and institutional sellers across the GTA. Many transactions never hit MLS.",
  },
  {
    icon: ClipboardCheck,
    title: "Due Diligence Coordination",
    body: "Financial review, lease abstracts, environmental assessments, structural inspections. We coordinate the full DD process so nothing falls through the cracks.",
  },
  {
    icon: TrendingUp,
    title: "Disposition Strategy",
    body: "When it's time to exit, we structure the sale for maximum value. 1031 exchange-style strategies, tax planning coordination with your accountant.",
  },
  {
    icon: PieChart,
    title: "Portfolio Review",
    body: "For existing investors: annual portfolio reviews to evaluate hold/sell decisions, refinance opportunities, and reallocation across asset classes.",
  },
];

export default function InvestmentAdvisoryPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Real Estate Investment Advisory",
          description:
            "Strategic real estate investment advisory across the GTA. Off-market deal access, cap rate analysis, multi-family, retail, industrial, and pre-construction opportunities.",
          slug: "investment-advisory",
          serviceType: "Real Estate Investment Consulting",
        })}
      />

      {/* Hero */}
      <section className="relative bg-charcoal py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E4DE]/80 border-l-2 border-burgundy pl-3 mb-5">
              Investment Advisory
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Build Wealth Through Strategic Real Estate Investment
            </h1>
            <p className="text-base lg:text-lg text-[#E8E4DE]/85 leading-relaxed mb-8">
              Cash-flowing assets, strategic acquisitions, and access to off-market opportunities
              most investors never see.
            </p>
            <Link
              href="#strategy-form"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
            >
              Schedule an Investment Strategy Call <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">Our Clients</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Who We Work With
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "First-Time Investor",
                body: "Looking to acquire your first income property? We help you understand cap rates, cash flow, leverage, and avoid the mistakes most new investors make on their first deal.",
              },
              {
                title: "Active Investor",
                body: "Building or expanding a portfolio? We bring deal flow, market analysis, and exit strategy thinking. Our active clients see opportunities before the broader market.",
              },
              {
                title: "High-Net-Worth & Institutional",
                body: "Family offices, foreign investors, syndicates. Off-market access, full due diligence support, confidential transactions. Discretion guaranteed.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-stone-light border border-stone-border rounded-lg p-6 lg:p-7"
              >
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">
                  {c.title}
                </h3>
                <p className="text-sm text-charcoal/65 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Classes */}
      <section className="bg-stone-warm py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label">Asset Classes</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Asset Classes We Cover
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {ASSET_CLASSES.map(({ icon: Icon, title, body, href }) => {
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-burgundy" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-charcoal mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs text-charcoal/60 leading-relaxed">{body}</p>
                  {href && (
                    <p className="text-xs font-semibold text-burgundy mt-2 inline-flex items-center gap-1">
                      Learn more <ArrowRight size={11} />
                    </p>
                  )}
                </>
              );
              return href ? (
                <Link
                  key={title}
                  href={href}
                  className="bg-white border border-stone-border rounded-lg p-5 hover:border-burgundy/30 hover:shadow-md transition-all"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={title}
                  className="bg-white border border-stone-border rounded-lg p-5"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Off-Market Pull-Out */}
      <section className="bg-burgundy py-16">
        <div className="container max-w-4xl">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-4">
              Exclusive · By Qualification
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-5 leading-tight">
              Active Off-Market Commercial Opportunities
            </h2>
            <p className="text-[#E8E4DE]/90 leading-relaxed mb-7 max-w-2xl">
              We currently represent multiple off-market commercial assets across the GTA and
              Ontario. Properties are available only to qualified investors after NDA execution.
              Recent and current opportunities include grocery-anchored retail plazas, mixed-use
              development sites, and high-NOI assets across the GTA.
            </p>
            <Link
              href="/off-market"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/50 rounded-md hover:bg-white/10 transition-colors"
            >
              View Off-Market Opportunities <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">Our Services</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              What We Provide
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {PROVIDED.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-stone-light border border-stone-border rounded-lg p-6 flex gap-5 items-start"
              >
                <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-burgundy" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-1.5">
                    {title}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Intelligence */}
      <section className="bg-stone-warm py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="section-label">Market Intelligence</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Market Intelligence
            </h2>
            <p className="text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
              We track GTA commercial market conditions weekly. Cap rate ranges by asset class,
              recent transaction volume, capital flow trends, and emerging opportunity zones.
            </p>
          </div>

          <div className="bg-white border border-stone-border rounded-xl p-7 lg:p-9">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                <FileText size={20} className="text-burgundy" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-burgundy mb-1">
                  Investor Briefing
                </p>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                  The Off-Market Advantage
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  The framework Max Realty uses to evaluate every off-market opportunity in
                  the GTA. A 10-page briefing for serious investors deploying $1M to $100M
                  in commercial real estate.
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-border">
              <BriefingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-charcoal py-16">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-white mb-10">
            Why Investors Choose Max Realty
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "$750M+", label: "In transactions negotiated" },
              { value: "38 Years", label: "Of GTA market experience" },
              { value: "Active Deal Flow", label: "Across the GTA and Ontario" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-xl lg:text-2xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-[#E8E4DE]/60 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Call Form */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label">Schedule</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-3">
              Schedule an Investment Strategy Call
            </h2>
            <p className="text-charcoal/65 leading-relaxed">
              Quick conversation about your investment goals. No obligation.
            </p>
          </div>

          <StrategyForm />

          <ul className="mt-8 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-charcoal/55">
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> No obligation</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> Strict confidentiality</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> Response within one business day</li>
          </ul>
        </div>
      </section>
    </>
  );
}
