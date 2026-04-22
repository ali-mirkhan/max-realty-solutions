import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, DollarSign, Wrench, FileText, Shield, BarChart3, CheckCircle2 } from "lucide-react";
import PropertyManagementCTA from "./PropertyManagementCTA";

export const metadata: Metadata = {
  title: "Property Management",
  description: "Full-service property management across the GTA. Tenant screening, rent collection, maintenance, LTB compliance, and financial reporting for residential and commercial properties.",
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
    desc: "24/7 maintenance coordination with trusted contractors. Preventive maintenance schedules, emergency response, and detailed work order tracking.",
  },
  {
    icon: FileText,
    title: "Lease Administration",
    desc: "Lease drafting, renewals, rent increases in compliance with Ontario LTB guidelines, and full documentation management.",
  },
  {
    icon: Shield,
    title: "Legal & LTB Compliance",
    desc: "Expert navigation of Ontario's Residential Tenancies Act. We handle LTB applications, N-forms, hearings, and eviction proceedings when necessary.",
  },
  {
    icon: BarChart3,
    title: "Vacancy Marketing",
    desc: "Professional photography, MLS listing, online advertising, and showings to minimize vacancy periods and attract quality tenants fast.",
  },
];

const propertyTypes = [
  {
    title: "Residential Properties",
    desc: "Single-family homes, townhouses, semi-detached. We manage your home as if it were our own.",
  },
  {
    title: "Multi-Unit Residential",
    desc: "Duplexes, triplexes, and small apartment buildings. Streamlined management for multiple units under one roof.",
  },
  {
    title: "Commercial Properties",
    desc: "Retail plazas, strip malls, and mixed-use buildings. Backed by our $35M+ commercial transaction experience.",
  },
  {
    title: "Condo Units",
    desc: "Individual condo investment units across the GTA. We handle the tenant, the board, and everything in between.",
  },
];

const checklist = [
  "No hidden fees — transparent pricing structure",
  "Dedicated property manager for your portfolio",
  "Online owner portal with real-time reporting",
  "Vetted contractor network for cost-effective repairs",
  "Full LTB compliance and legal support",
  "Commercial and residential under one roof",
];

export default function PropertyManagementPage() {
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
            <p className="text-xs font-medium uppercase tracking-widest text-white/90 mb-3" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>Property Management</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Professional Property Management Across the GTA
            </h1>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed mb-8">
              From retail plazas to residential portfolios — we protect your investment, maximize your returns,
              and handle every detail so you don&apos;t have to.
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
              { value: "500+", label: "Units Managed" },
              { value: "98%", label: "Tenant Retention Rate" },
              { value: "24/7", label: "Emergency Response" },
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
                  With over $35M in commercial real estate transactions across the GTA, we understand what
                  makes an investment property perform — and we manage yours with that same investment mindset.
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
