import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, TrendingUp, Users, Building2, DollarSign,
  Briefcase, Home as HomeIcon, BarChart3, Star, CheckCircle2, Shield,
  ChevronDown,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/lib/types";
import { fetchListings } from "@/lib/ddf";

export const metadata: Metadata = {
  title: "Max Realty Solutions | Real Estate Brokerage in Thornhill & GTA",
  description:
    "Find your home in the Greater Toronto Area. Expert guidance for GTA buyers, sellers & investors. Residential, commercial, and investment properties.",
};

const HERO_IMG = "https://www.maxrealtysolutions.com/files/flashbanner/411282/Toronto_1.jpg";
const AGENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/agent-meeting-CjY9jHheSwuevRu6dL7bU8.webp";
const COMMERCIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/commercial-plaza-d5RPaNypjMPznC5dYLNvEH.webp";
const SKYLINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/toronto-skyline-bNv4TFBMJJt45Hb8RhfuqK.webp";

const neighbourhoods = [
  { name: "Thornhill", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80&auto=format&fit=crop" },
  { name: "Vaughan", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80&auto=format&fit=crop" },
  { name: "Markham", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&q=80&auto=format&fit=crop" },
  { name: "Richmond Hill", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80&auto=format&fit=crop" },
  { name: "Toronto", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80&auto=format&fit=crop" },
  { name: "Mississauga", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80&auto=format&fit=crop" },
];

const testimonials = [
  {
    name: "Michael T.", role: "Home Buyer", years: "Purchased in Thornhill 2025",
    quote: "The team at Max Realty made buying our first home seamless. They knew the Thornhill market inside out and negotiated a price well below asking. Couldn't be happier.",
  },
  {
    name: "Sarah M.", role: "Residential Agent", years: "8 years experience",
    quote: "Switching to Max Realty was the best career decision I've made. I keep significantly more of every deal, and the broker support is genuine — not just a promise on a website.",
  },
  {
    name: "David K.", role: "Commercial Specialist", years: "12 years experience",
    quote: "The commercial opportunities here are real. I've closed more plaza deals in my first year than in three years at my previous brokerage. The flexibility is unmatched.",
  },
  {
    name: "Priya R.", role: "New Agent (Mentored)", years: "2 years experience",
    quote: "As a newer agent, the mentorship program gave me the confidence and guidance I needed. I'm now closing deals independently and transitioning to a better split.",
  },
];

export default async function HomePage() {
  let featuredProperties: Property[] = [];
  try {
    const { listings } = await fetchListings({ limit: 4 });
    featuredProperties = listings;
  } catch {
    // show empty featured section if API unavailable
  }
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="Luxury home in the Greater Toronto Area" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container py-20 lg:py-32">
          <div className="max-w-2xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em] text-white border-l-2 border-burgundy pl-3 mb-5"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
            >
              Greater Toronto Area
            </p>
            <h1
              className="font-serif text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              Find Your Perfect Home or Investment Property
            </h1>
            <p
              className="text-base lg:text-lg text-white/85 leading-relaxed mb-8 max-w-lg"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              Your gateway to premium real estate investment opportunities across the GTA. Delivering expert
              guidance in residential, commercial, and investment real estate — backed by decades of
              distinguished experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/properties" className="btn-primary shadow-lg">
                Search Properties <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/40 rounded-md hover:bg-white/25 transition-colors"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <ChevronDown size={24} className="text-white opacity-60 animate-bounce" />
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <section className="bg-charcoal border-t-2 border-burgundy">
        <div className="container py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "$750M+", label: "In Total Transactions Since 2004" },
              { value: "3,000+", label: "Clients Served Since 2004" },
              { value: "37+ Years", label: "Industry Experience" },
              { value: "RECO", label: "Licensed & Regulated" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Our Listings</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Featured Properties</h2>
              <p className="text-charcoal/60 mt-2">Live listings from Max Realty Solutions — updated in real time</p>
            </div>
            <Link href="/properties" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
              View All Properties <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
              View All Properties <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DUAL VALUE ── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">How We Can Help You</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Built for Clients &amp; Agents
            </h2>
            <p className="text-charcoal/60 leading-relaxed">
              Whether you&apos;re searching for your next property or looking for a better brokerage — Max Realty Solutions delivers on both fronts.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* For Clients — first, prominent */}
            <div className="bg-stone-light rounded-lg p-8 lg:p-10">
              <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-6">
                <HomeIcon size={22} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4">For Clients</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Premium MLS & off-market opportunities across the GTA",
                  "Strategic advisory for investors, owners & businesses",
                  "Commercial, industrial & investment property expertise",
                  "Full-service property management solutions",
                  "Complimentary market valuations & private consultations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal/80">
                    <CheckCircle2 size={16} className="text-burgundy mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
                Browse Listings <ArrowRight size={14} />
              </Link>
            </div>
            {/* For Agents — second, less prominent */}
            <div className="bg-white border border-stone-border rounded-lg p-8 lg:p-10">
              <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-6">
                <Briefcase size={22} className="text-burgundy" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4">For Agents</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Flexible commission structures — keep more of every deal",
                  "Hands-on broker support from an experienced team",
                  "Exposure to commercial, industrial & investment real estate",
                  "Gain experience in asset & property management",
                  "Access to both commercial & residential opportunities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal/80">
                    <CheckCircle2 size={16} className="text-burgundy mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/join" className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
                Learn about our plans <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH BY AREA ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label">Explore the GTA</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Browse Properties by Neighbourhood
            </h2>
            <p className="text-charcoal/60">We serve buyers, sellers and investors across the Greater Toronto Area</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {neighbourhoods.map((n) => (
              <Link key={n.name} href="/properties" className="group relative rounded-lg overflow-hidden h-40 block">
                <Image
                  src={n.img}
                  alt={n.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-lg leading-tight">{n.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BUY OR SELL WITH US ── */}
      <section className="py-20 lg:py-28 bg-stone-light">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">The Max Realty Advantage</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Your Trusted GTA Real Estate Partner
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, title: "Market Expertise", desc: "Deep knowledge of GTA neighbourhoods, pricing trends, and investment opportunities built over decades of GTA transactions — operating since 2004 with roots going back to 1987." },
              { icon: Shield, title: "Fully Licensed & Regulated", desc: "RECO-registered brokerage with full compliance under TRESA. Your transaction is protected every step of the way." },
              { icon: Users, title: "Dedicated Agent Support", desc: "You work with one dedicated agent from search to close — not a call centre or rotating team." },
              { icon: BarChart3, title: "Free Tools & Resources", desc: "Use our free mortgage calculator, land transfer tax estimator, and affordability tools to plan your purchase with confidence." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-6 border border-stone-border">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-burgundy" />
                </div>
                <h3 className="font-sans text-sm font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary">
              Explore Our Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL HIGHLIGHT ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={COMMERCIAL_IMG} alt="Commercial retail plaza" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#E8E4DE]/60 mb-3">
              Commercial Real Estate
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-6">
              Investment-Grade Commercial Opportunities
            </h2>
            <p className="text-[#E8E4DE]/80 leading-relaxed mb-4">
              From retail plazas to leasing opportunities, Max Realty brings real commercial transaction
              experience to the table — including large-scale retail plaza transactions in the $10M–$35M+
              range across the GTA.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                "Retail plaza acquisitions & dispositions",
                "Investment analysis with ROI and cap rate guidance",
                "Commercial leasing for tenants and landlords",
                "Development-ready land opportunities",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#E8E4DE]/80">
                  <CheckCircle2 size={14} className="text-burgundy shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/commercial" className="btn-primary">
              Explore Commercial <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">What People Say About Us</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Hear From Our Clients &amp; Agents
            </h2>
            <p className="text-charcoal/60 leading-relaxed">
              Real stories from clients and agents who chose Max Realty Solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-stone-border rounded-lg p-8">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-burgundy fill-burgundy" />
                  ))}
                </div>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-sm font-semibold text-burgundy">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                    <p className="text-xs text-charcoal/50">{t.role} &middot; {t.years}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AGENTS SWITCH ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="section-label">For Real Estate Agents</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-6">
                Why Agents Make the Switch
              </h2>
              <p className="text-charcoal/60 leading-relaxed mb-8">
                Tired of high desk fees, corporate bureaucracy, and a lack of real support?
                You&apos;re not alone. Here&apos;s why agents are choosing Max Realty.
              </p>
              <div className="space-y-6">
                {[
                  { icon: DollarSign, title: "High Desk Fees Elsewhere", desc: "Stop losing a significant portion of your hard-earned commissions to excessive brokerage fees." },
                  { icon: Users, title: "Lack of Real Support", desc: "Get genuine broker guidance when you need it — not an automated system or a call centre." },
                  { icon: Building2, title: "Corporate Bureaucracy", desc: "Work in a lean, agile environment where decisions are made quickly and your voice matters." },
                  { icon: TrendingUp, title: "Limited Growth Opportunities", desc: "Access both residential and commercial deals, mentorship programs, and flexible commission structures." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-burgundy" />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-charcoal mb-1">{item.title}</h4>
                      <p className="text-sm text-charcoal/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/join" className="btn-primary">Apply to Join <ArrowRight size={16} /></Link>
                <Link href="/contact" className="btn-outline">Book a Call</Link>
              </div>
            </div>
            <div>
              <Image src={AGENT_IMG} alt="Real estate agents collaborating" width={600} height={450} className="w-full rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={SKYLINE_IMG} alt="Toronto GTA skyline" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative container text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[#E8E4DE]/80 max-w-xl mx-auto mb-8">
            Whether you&apos;re ready to buy, sell, or invest in the GTA — or an agent looking for a better
            brokerage — we&apos;re here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties" className="btn-primary">Search Properties <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn-ghost-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
