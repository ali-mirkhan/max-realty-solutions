import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, TrendingUp, Building2, Key, BarChart3, Hammer, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Full-service real estate in the GTA: buying, selling, leasing, commercial, investment advisory, and pre-construction.",
};

const NEIGHBORHOOD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/residential-neighborhood-Sf4DH3Nkk2ZKfoUcCAecZt.webp";

const services = [
  { icon: HomeIcon, title: "Buying", cta: "Find Your Home", link: "/properties", desc: "Whether you're a first-time buyer or upgrading to your dream home, our agents provide expert guidance through every step of the purchase process. From neighbourhood selection to closing, we ensure you make informed decisions in the competitive GTA market." },
  { icon: TrendingUp, title: "Selling", cta: "Get a Valuation", link: "/contact", desc: "Maximize your property's value with our strategic selling approach. We combine market analysis, professional staging guidance, and targeted marketing to attract qualified buyers and achieve the best possible price for your home." },
  { icon: Key, title: "Leasing", cta: "Explore Leasing", link: "/contact", desc: "Residential and commercial leasing services for tenants and landlords across the GTA. We handle everything from market analysis and tenant screening to lease negotiation and property management referrals." },
  { icon: Building2, title: "Commercial Real Estate", cta: "View Commercial", link: "/commercial", desc: "Our commercial division specializes in retail plazas, office spaces, and investment properties. With experience in large-scale transactions ranging from $10M to $35M+, we bring serious expertise to every commercial deal." },
  { icon: BarChart3, title: "Investment Advisory", cta: "Start Investing", link: "/contact", desc: "Build and grow your real estate portfolio with data-driven investment guidance. We analyze cap rates, ROI projections, and market trends to help you identify the most profitable opportunities in the GTA." },
  { icon: Hammer, title: "Pre-Construction", cta: "Learn More", link: "/contact", desc: "Access exclusive pre-construction opportunities across the Greater Toronto Area. We help investors and end-users navigate builder incentives, assignment clauses, and the unique considerations of buying before completion." },
  { icon: Building2, title: "Property Management", cta: "Learn More", link: "/property-management", desc: "Full-service property management for residential and commercial properties across the GTA. Tenant screening, rent collection, maintenance coordination, LTB compliance, and financial reporting — all handled for you." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={NEIGHBORHOOD_IMG} alt="GTA neighbourhood" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-white/90 mb-3" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>Our Services</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Full-Service Real Estate Expertise
            </h1>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed">
              From residential purchases to multi-million dollar commercial transactions, Max Realty
              Solutions provides comprehensive real estate services across the GTA.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white border border-stone-border rounded-lg p-8 hover:border-burgundy/20 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-6 group-hover:bg-burgundy/15 transition-colors">
                  <service.icon size={22} className="text-burgundy" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">{service.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-6">{service.desc}</p>
                <Link href={service.link} className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
                  {service.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-charcoal">
        <div className="container text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-4">Need Expert Guidance?</h2>
          <p className="text-[#E8E4DE]/70 max-w-xl mx-auto mb-8">
            Whether you&apos;re buying your first home or closing a multi-million dollar commercial deal,
            our team is ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Contact Us <ArrowRight size={16} /></Link>
            <Link href="/tools" className="btn-ghost-white">Try Our Calculators</Link>
          </div>
        </div>
      </section>
    </>
  );
}
