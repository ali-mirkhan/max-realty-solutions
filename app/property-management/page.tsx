import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, DollarSign, Wrench, FileText, Shield, BarChart3, CheckCircle2 } from "lucide-react";
import PropertyManagementCTA from "./PropertyManagementCTA";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management",
  description: "Commercial-led property management across the Greater Toronto Area — retail plazas, mixed-use, multi-unit residential, and condos. 38 years of brokerage experience backing every engagement.",
};

const COMMERCIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/commercial-plaza-d5RPaNypjMPznC5dYLNvEH.webp";

const services = [
  {
    icon: Building2,
    title: "Tenant Screening & Placement",
    desc: "Rigorous background checks, credit verification, employment confirmation, and reference checks to place reliable, long-term tenants in your property.",
  },
  {
    icon: DollarSign,
    title: "Rent Collection & Financial Reporting",
    desc: "Automated rent collection, monthly financial statements, annual reporting, and direct deposit to your account. Full transparency on every dollar.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    desc: "Reliable maintenance coordination through licensed trades. Preventive maintenance schedules, responsive turnaround on requests, and detailed work order tracking.",
  },
  {
    icon: FileText,
    title: "Lease Administration",
    desc: "Lease drafting, renewals, rent increase coordination consistent with applicable Ontario regulations, and full documentation management.",
  },
  {
    icon: Shield,
    title: "Compliance & Records",
    desc: "Documented records, lease compliance tracking, and coordination with the landlord's legal counsel where applicable. We do not provide legal advice or representation in proceedings.",
  },
  {
    icon: BarChart3,
    title: "Vacancy Marketing",
    desc: "Professional photography, MLS listing, online advertising, and showings to minimize vacancy periods and attract quality tenants fast.",
  },
];

const propertyTypes = [
  {
    title: "Commercial Properties",
    desc: "Retail plazas, strip malls, office buildings, and mixed-use properties. Backed by 38 years of GTA commercial real estate experience and $750M+ in real estate transacted.",
  },
  {
    title: "Multi-Unit Residential",
    desc: "Apartment buildings, multi-unit rental properties, and small residential portfolios. Tenant screening, rent collection, lease administration, and full reporting.",
  },
  {
    title: "Condo Units",
    desc: "Individual condo units and small condo portfolios. Owner-friendly reporting, vetted maintenance coordination, and tenant management.",
  },
  {
    title: "Single-Family Residential",
    desc: "Individual rental homes and small residential holdings. Same standard of service, scaled to your portfolio.",
  },
];

const checklist = [
  "No hidden fees — transparent pricing structure",
  "Dedicated property manager for your portfolio",
  "Online owner portal with real-time reporting",
  "Vetted contractor network for cost-effective repairs",
  "Coordinated documentation and recordkeeping",
  "Commercial and residential under one roof",
];

export default function PropertyManagementPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://www.maxrealtysolutions.com/property-management/#service",
          name: "Property Management",
          description:
            "Commercial-led property management for retail, mixed-use, multi-unit residential, and condo properties across the Greater Toronto Area. Tenant screening, rent collection, maintenance coordination, lease administration, and financial reporting.",
          serviceType: "Property Management",
          url: "https://www.maxrealtysolutions.com/property-management",
          provider: {
            "@type": "RealEstateAgent",
            "@id": "https://www.maxrealtysolutions.com/#organization",
          },
          areaServed: [
            "Toronto", "North York", "Scarborough", "Etobicoke", "Mississauga",
            "Brampton", "Markham", "Richmond Hill", "Vaughan", "Thornhill",
            "Aurora", "Newmarket", "Oakville", "Burlington", "Whitby",
            "Pickering", "Ajax", "King City", "Stouffville", "Caledon",
          ].map((name) => ({ "@type": "City", name })),
        }}
      />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={COMMERCIAL_IMG} alt="Commercial retail plaza" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-white/90 mb-3" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>Property Management</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Professional Property Management Across the GTA
            </h1>
            <p className="text-sm text-[#E8E4DE]/75 leading-relaxed mb-5">
              Commercial-led property management for retail plazas, mixed-use buildings, multi-unit
              residential, and condo portfolios across the Greater Toronto Area. For institutional asset
              oversight, mortgage enforcement support, or estate-property coordination, see our{" "}
              <Link
                href="/services/property-management"
                className="text-white underline decoration-burgundy/60 underline-offset-2 hover:decoration-burgundy"
              >
                Asset Oversight &amp; Lender Services service
              </Link>
              .
            </p>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed mb-8">
              We protect your investment, maximize your returns, and handle every detail so you don&apos;t
              have to — across retail plazas, office and mixed-use buildings, multi-unit residential, condo
              portfolios, and single-family rentals.
            </p>
            <PropertyManagementCTA />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-stone-border">
        <div className="container py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "Commercial-Led", label: "Property Management" },
              { value: "$750M+", label: "Real Estate Transacted" },
              { value: "1988", label: "Brokerage Established" },
              { value: "GTA-Wide", label: "Coverage Area" },
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
            <p className="section-label">What We Handle For You</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Property Management Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
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

      {/* Property Types */}
      <section className="py-20 lg:py-28 bg-stone-light">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Our Expertise</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Property Types We Manage</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {propertyTypes.map((type) => (
              <div key={type.title} className="bg-white border border-stone-border rounded-lg p-6 hover:border-burgundy/20 transition-colors">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{type.title}</h3>
                <p className="text-sm text-charcoal/60">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="section-label">The Max Realty Advantage</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-6">
                Property Management Backed by Real Brokerage Experience
              </h2>
              <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed">
                <p>
                  Most property management companies have never bought or sold a building. Our team has.
                  With $750M+ in real estate transacted across commercial, residential, and
                  investment-grade properties — including extensive retail plaza and mixed-use experience —
                  we understand what makes a property perform. We manage yours with that same investment
                  mindset.
                </p>
                <p>
                  We don&apos;t just collect rent. We protect your asset, optimize your returns, and keep you
                  informed every step of the way.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-burgundy shrink-0 mt-0.5" />
                  <p className="text-sm text-charcoal/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-4">
            Ready to Hand Off the Stress?
          </h2>
          <p className="text-[#E8E4DE]/70 max-w-xl mx-auto mb-8">
            Get a free property management consultation. We&apos;ll assess your property, discuss your goals,
            and provide a clear proposal with no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PropertyManagementCTA />
            <Link href="tel:+14162266008" className="btn-ghost-white">
              Call 416-226-6008
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
