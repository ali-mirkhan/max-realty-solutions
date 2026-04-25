import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  BarChart3,
  Briefcase,
  Layers,
  ShoppingBag,
  Warehouse,
  Stethoscope,
  Utensils,
  CheckCircle2,
  ArrowRight,
  Network,
  Clock,
  Globe,
  Award,
} from "lucide-react";
import InquiryForm from "./InquiryForm";

const CANONICAL = "https://www.maxrealtysolutions.com/services/leasing";

export const metadata: Metadata = {
  title: "Commercial Leasing — Tenant & Landlord Representation",
  description:
    "Commercial leasing services across the GTA. Tenant representation for businesses seeking space and landlord representation for property owners. 30+ years experience, no cost to tenants.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Commercial Leasing — Tenant & Landlord Representation | Max Realty Solutions",
    description:
      "Commercial leasing services across the GTA. Tenant and landlord representation, 30+ years experience.",
    url: CANONICAL,
    type: "website",
    siteName: "Max Realty Solutions",
    images: [
      {
        url: "https://www.maxrealtysolutions.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Commercial Leasing — Max Realty Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Leasing | Max Realty Solutions",
    description:
      "Commercial leasing services across the GTA. Tenant and landlord representation.",
    images: ["https://www.maxrealtysolutions.com/og-default.jpg"],
  },
};

const PROPERTY_TYPES = [
  { icon: ShoppingBag, label: "Retail Plazas" },
  { icon: Building2, label: "Office Buildings" },
  { icon: Warehouse, label: "Industrial / Warehouse" },
  { icon: Layers, label: "Mixed-Use" },
  { icon: Stethoscope, label: "Medical / Professional" },
  { icon: Utensils, label: "Restaurant Space" },
];

export default function LeasingPage() {
  return (
    <>
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
              Commercial Leasing
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Tenant &amp; Landlord Representation Across the GTA
            </h1>
            <p className="text-base lg:text-lg text-[#E8E4DE]/85 leading-relaxed mb-8">
              Whether you&apos;re a business looking for the right space or a property owner
              seeking AAA tenants, our commercial leasing team negotiates terms that protect
              your bottom line.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#tenant"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
              >
                I&apos;m a Tenant <ArrowRight size={14} />
              </Link>
              <Link
                href="#landlord"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-white/10 border border-white/40 rounded-md hover:bg-white/20 transition-colors"
              >
                I&apos;m a Landlord <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Path Selection */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">Two Paths</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Choose Your Path
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Tenant */}
            <div
              id="tenant"
              className="bg-stone-light border border-stone-border rounded-xl p-7 lg:p-9 flex flex-col"
            >
              <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center mb-5">
                <Briefcase size={20} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-1">
                Tenant Representation
              </h3>
              <p className="text-sm text-charcoal/55 mb-5">For businesses needing space</p>

              <ul className="space-y-2.5 text-sm text-charcoal/75 mb-6">
                {[
                  "Site selection across the GTA — office, retail, industrial, mixed-use",
                  "Market rate analysis so you don't overpay",
                  "Lease term negotiation: rent, free rent periods, TI allowance, renewal options, exit clauses",
                  "Lease document review with our network of commercial real estate lawyers",
                  "No cost to tenants — landlord pays our commission",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-serif text-base italic text-burgundy mb-6">
                &ldquo;We work for YOU, not the landlord.&rdquo;
              </p>

              <div className="mt-auto">
                <Link
                  href="#inquiry-tenant"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
                >
                  Find My Space <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Landlord */}
            <div
              id="landlord"
              className="bg-stone-light border border-stone-border rounded-xl p-7 lg:p-9 flex flex-col"
            >
              <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center mb-5">
                <BarChart3 size={20} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-1">
                Landlord Representation
              </h3>
              <p className="text-sm text-charcoal/55 mb-5">For property owners with vacancy</p>

              <ul className="space-y-2.5 text-sm text-charcoal/75 mb-6">
                {[
                  "Strategic listing and market positioning",
                  "Tenant prospecting through our active commercial network",
                  "Rigorous tenant qualification: credit, business financials, references",
                  "Lease structure aligned with your investment goals",
                  "Renewal negotiations and rent reset arbitration support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-serif text-base italic text-burgundy mb-6">
                &ldquo;We protect your asset and maximize NOI.&rdquo;
              </p>

              <div className="mt-auto">
                <Link
                  href="#inquiry-landlord"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
                >
                  Lease My Property <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="bg-stone-warm py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="section-label">Property Types</p>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal">
              Property Types We Specialize In
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {PROPERTY_TYPES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-white border border-stone-border rounded-lg p-5 flex flex-col items-center text-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                  <Icon size={18} className="text-burgundy" />
                </div>
                <p className="text-sm font-medium text-charcoal leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Max Realty */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">The Difference</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Why Max Realty for Commercial Leasing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="bg-stone-light border border-stone-border rounded-lg p-6 lg:p-7">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                <Award size={18} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                30+ Years of GTA Commercial Experience
              </h3>
              <p className="text-sm text-charcoal/65 leading-relaxed">
                Decades of relationships with major landlords, retailers, professional services
                tenants, and institutional owners across the GTA.
              </p>
            </div>

            <div className="bg-stone-light border border-stone-border rounded-lg p-6 lg:p-7">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                <Network size={18} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                Off-Market Network
              </h3>
              <p className="text-sm text-charcoal/65 leading-relaxed mb-3">
                Many of our deals never hit MLS. We have direct relationships with property owners
                and tenants exploring quiet transactions.
              </p>
              <Link
                href="/off-market"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:underline"
              >
                View our exclusive off-market commercial opportunities <ArrowRight size={12} />
              </Link>
            </div>

            <div className="bg-stone-light border border-stone-border rounded-lg p-6 lg:p-7">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                <Clock size={18} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                Direct Relationships, Faster Deals
              </h3>
              <p className="text-sm text-charcoal/65 leading-relaxed">
                We don&apos;t go through gatekeepers. Direct lines to decision-makers across the
                GTA&apos;s major commercial submarkets.
              </p>
            </div>

            <div className="bg-stone-light border border-stone-border rounded-lg p-6 lg:p-7">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                <Globe size={18} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                Bilingual Representation
              </h3>
              <p className="text-sm text-charcoal/65 leading-relaxed">
                Full service in English and Farsi. We work with international clients, foreign
                investors, and immigrant business owners across the GTA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-charcoal py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E4DE]/80 mb-3">
              Get Started
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-3">
              Discuss Your Leasing Needs
            </h2>
            <p className="text-[#E8E4DE]/75 leading-relaxed">
              Quick form. We&apos;ll respond within one business day.
            </p>
          </div>

          <InquiryForm />
        </div>
      </section>
    </>
  );
}
