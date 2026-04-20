import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, TrendingUp, Users, Building2, DollarSign,
  Briefcase, Home as HomeIcon, BarChart3, Star, CheckCircle2,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import properties from "@/data/properties.json";
import type { Property } from "@/lib/types";

export const metadata: Metadata = {
  title: "Max Realty Solutions | Real Estate Brokerage in Thornhill & GTA",
  description:
    "Modern real estate brokerage in Thornhill, Ontario. 100% commission plans for agents. Expert guidance for GTA buyers, sellers & investors.",
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/hero-banner-TESXMtySZ9ZM5BSEABjZkG.webp";
const AGENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/agent-meeting-CjY9jHheSwuevRu6dL7bU8.webp";
const COMMERCIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/commercial-plaza-d5RPaNypjMPznC5dYLNvEH.webp";
const SKYLINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/toronto-skyline-bNv4TFBMJJt45Hb8RhfuqK.webp";

const featuredProperties = (properties as Property[]).slice(0, 4);

const testimonials = [
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

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="Luxury home in the Greater Toronto Area" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        </div>
        <div className="relative container py-20 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-[#E8E4DE]/80 text-sm font-medium uppercase tracking-widest mb-4">
              Thornhill &middot; Vaughan &middot; Greater Toronto Area
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Keep More of Your Commission
            </h1>
            <p className="text-lg lg:text-xl text-[#E8E4DE]/90 leading-relaxed mb-8 max-w-xl">
              A modern real estate brokerage built for independent agents and serious buyers,
              sellers &amp; investors across the GTA.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/join" className="btn-primary">
                Join Max Realty <ArrowRight size={16} />
              </Link>
              <Link href="/properties" className="btn-ghost-white">
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <section className="bg-white border-b border-stone-border">
        <div className="container py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "$35M+", label: "Commercial Deals Closed" },
              { value: "100%", label: "Commission Plans Available" },
              { value: "GTA-Wide", label: "Coverage Area" },
              { value: "RECO", label: "Licensed & Regulated" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl lg:text-3xl font-bold text-burgundy">{stat.value}</p>
                <p className="text-xs lg:text-sm text-charcoal/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL VALUE ── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Two Paths, One Brokerage</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Built for Agents &amp; Clients
            </h2>
            <p className="text-charcoal/60 leading-relaxed">
              Whether you&apos;re an agent looking for a better brokerage or a client seeking experienced
              guidance, Max Realty delivers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Briefcase, title: "For Agents", link: "/join", cta: "Learn about our plans",
                items: [
                  "Higher earnings — keep more of every deal",
                  "Flexible commission structures to fit your style",
                  "Real broker support, not corporate layers",
                  "Commercial + residential opportunities",
                ],
              },
              {
                icon: HomeIcon, title: "For Clients", link: "/properties", cta: "Browse properties",
                items: [
                  "Experienced guidance for buyers, sellers & investors",
                  "Residential + commercial expertise under one roof",
                  "Deep GTA market knowledge and local insight",
                  "Investment-minded approach to every transaction",
                ],
              },
            ].map((card) => (
              <div key={card.title} className="bg-stone-light rounded-lg p-8 lg:p-10">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-6">
                  <card.icon size={22} className="text-burgundy" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4">{card.title}</h3>
                <ul className="space-y-3 mb-6">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/80">
                      <CheckCircle2 size={16} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={card.link} className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
                  {card.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMISSION PLANS ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Commission Plans</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Choose the Plan That Fits You
            </h2>
            <p className="text-charcoal/60 leading-relaxed">
              Flexible structures designed for every stage of your career. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                label: "Plan 1", title: "Independent Agent", highlight: "100%",
                sub: "commission", featured: false,
                items: ["Monthly fee model", "100% commission kept by agent", "Per-transaction desk fee applies", "Full broker support included"],
              },
              {
                label: "Plan 2", title: "Traditional Split", highlight: "80/20",
                sub: "split", featured: true,
                items: ["Agent keeps 80% of commission", "No monthly fee", "Full broker support included", "Great for growing agents"],
              },
              {
                label: "Plan 3", title: "Mentored / New Agent", highlight: "50/50",
                sub: "split", featured: false,
                items: ["50/50 split for first 3–5 transactions", "Active broker mentorship & guidance", "Transitions to better split on completion", "Ideal for new licensees"],
              },
            ].map((plan) => (
              <div
                key={plan.label}
                className={`rounded-lg p-8 relative ${plan.featured ? "border-2 border-burgundy" : "border border-stone-border hover:border-burgundy/30 transition-colors"}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-burgundy text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-xs font-medium uppercase tracking-widest text-burgundy mb-2">{plan.label}</div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{plan.title}</h3>
                <p className="font-serif text-3xl font-bold text-burgundy mb-4">
                  {plan.highlight}
                  <span className="text-base font-normal text-charcoal/50 ml-1">{plan.sub}</span>
                </p>
                <ul className="space-y-2.5 mb-6">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-charcoal/70">
                      <CheckCircle2 size={14} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/join"
                  className={`block text-center py-2.5 text-sm font-semibold rounded-md transition-colors ${
                    plan.featured
                      ? "text-white bg-burgundy hover:bg-burgundy-dark"
                      : "text-burgundy border border-burgundy/30 hover:bg-burgundy/5"
                  }`}
                >
                  {plan.featured ? "Apply Now" : "Learn More"}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-charcoal/40 mt-8">
            * Commission figures shown are placeholder examples. Contact us for confirmed plan details.
          </p>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Featured Listings</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Properties</h2>
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Agent Testimonials</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Hear From Our Agents
            </h2>
            <p className="text-charcoal/60 leading-relaxed">
              Real stories from agents who made the switch to Max Realty Solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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
            Whether you&apos;re an agent looking for a better brokerage or a client ready to buy, sell,
            or invest — we&apos;re here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/join" className="btn-primary">Join Max Realty <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn-ghost-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
