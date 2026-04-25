import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Award,
  Languages,
  Building2,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import ConsultationForm from "./ConsultationForm";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, faqSchema } from "@/lib/schemas";

const CANONICAL = "https://www.maxrealtysolutions.com/services/selling";

export const metadata: Metadata = {
  title: "Sell Your Property",
  description:
    "Sell your home or commercial property in the GTA with senior-agent representation. Strategic pricing, professional marketing, expert negotiation. Free listing consultation.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Sell Your Property | Max Realty Solutions",
    description:
      "Sell your home or commercial property in the GTA with senior-agent representation. Free listing consultation.",
    url: CANONICAL,
    type: "website",
    siteName: "Max Realty Solutions",
    images: [
      {
        url: "https://www.maxrealtysolutions.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Sell Your Property — Max Realty Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Property | Max Realty Solutions",
    description:
      "Sell your home or commercial property in the GTA with senior-agent representation.",
    images: ["https://www.maxrealtysolutions.com/og-default.jpg"],
  },
};

const STAGES = [
  {
    num: "01",
    title: "Strategic Pricing",
    body: "Comparative market analysis specific to your block. Pricing too high kills early momentum and stigmatizes your listing. Pricing too low leaves money on the table. We find the sweet spot for your specific neighbourhood and current market conditions.",
  },
  {
    num: "02",
    title: "Pre-Market Preparation",
    body: "Professional photography, drone shots where appropriate, staging recommendations, and minor improvement suggestions with ROI estimates. We tell you what's worth doing — and what isn't.",
  },
  {
    num: "03",
    title: "Maximum Exposure Marketing",
    body: "MLS, Realtor.ca, social media advertising, our active buyer database, and broadcast through our agent network. Print and targeted advertising for high-end and unique properties.",
  },
  {
    num: "04",
    title: "Showings & Negotiation",
    body: "Coordinated showings, qualified buyer screening, multiple-offer strategy when applicable, and a firm hand at the negotiation table. We negotiate dozens of deals a year — yours benefits from that experience.",
  },
  {
    num: "05",
    title: "Closing Coordination",
    body: "Lawyer coordination, condition removal management, closing day logistics, and key handover. We stay engaged from acceptance through closing.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: UserCheck,
    title: "Senior-Agent Attention",
    body: "You won't be passed off to a junior. A senior Max Realty agent guides your sale from listing through closing.",
  },
  {
    icon: Award,
    title: "Honest Market Pricing",
    body: "We tell you what your home will likely sell for, not what you want to hear. Realistic pricing sells faster and for more.",
  },
  {
    icon: Languages,
    title: "Bilingual Reach",
    body: "Full service in English and Farsi. We market to international and immigrant buyer pools that other brokerages don't reach as effectively.",
  },
  {
    icon: Building2,
    title: "Commercial & Residential Capability",
    body: "Selling a residential property, commercial plaza, mixed-use building, or land? We have specialists across all asset classes.",
  },
];

const FAQS = [
  {
    q: "When's the best time to list my home?",
    a: "Spring and early fall are historically peak market windows in the GTA, but timing depends on your specific situation. We assess current conditions, your neighbourhood's micro-market, and your personal timeline before recommending a list date.",
  },
  {
    q: "What's the commission structure?",
    a: "Commission varies by property type, price point, and service level. We discuss commission transparently during your free listing consultation. Cooperating brokerage commission is paid to the buyer's agent at closing in addition to our listing fee.",
  },
  {
    q: "How long will my home take to sell?",
    a: "Days on market depends on price point, property condition, and current demand. Well-prepared and properly priced GTA listings often sell within 2-4 weeks; some sell in days with multiple offers. Slower markets and unique properties can take longer.",
  },
  {
    q: "Do I need to stage my home?",
    a: "Most homes benefit from at least light staging. We assess each property and recommend staging only where it'll have meaningful impact on sale price. Sometimes the best advice is just deep cleaning and decluttering.",
  },
  {
    q: "What if my home doesn't sell?",
    a: "We don't believe in 'list and pray.' If a listing isn't generating interest, we re-evaluate together — pricing, presentation, marketing, or market conditions. Most adjustments solve the issue.",
  },
  {
    q: "Do you sell commercial properties too?",
    a: "Yes. Max Realty has specialists in commercial sales including retail plazas, office, industrial, mixed-use, and development land. View our commercial services and active listings.",
  },
];

export default function SellingPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Sell Your Property",
          description:
            "Senior-agent representation through a 5-stage selling process: strategic pricing, pre-market preparation, maximum exposure marketing, expert negotiation, and closing coordination.",
          slug: "selling",
          serviceType: "Real Estate Listing Services",
        })}
      />
      <JsonLd
        data={faqSchema(FAQS.map((f) => ({ question: f.q, answer: f.a })))}
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
              Selling Your Property
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Sell Your Home for More — With Less Stress
            </h1>
            <p className="text-base lg:text-lg text-[#E8E4DE]/85 leading-relaxed mb-8">
              We don&apos;t just list and pray. Here&apos;s the process that gets our clients
              above-asking results across the GTA.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#consultation-form"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
              >
                Book a Free Listing Consultation <ArrowRight size={14} />
              </Link>
              <Link
                href="/services/home-evaluation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8E4DE]/85 hover:text-white transition-colors"
              >
                Not ready? Get a free evaluation first <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage Process */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">Our Process</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-3">
              The Max Realty Selling Process
            </h2>
            <p className="text-charcoal/65 leading-relaxed">
              A repeatable process refined over 30+ years of GTA transactions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {STAGES.map((stage) => (
              <div
                key={stage.num}
                className="bg-stone-light border border-stone-border rounded-lg p-6 lg:p-7 flex gap-5 items-start"
              >
                <span className="font-serif text-3xl font-bold text-burgundy leading-none shrink-0">
                  {stage.num}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{stage.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="bg-stone-warm py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label">Track Record</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-3">
              Recent Results
            </h2>
            <p className="text-charcoal/65 leading-relaxed">
              Selling for the highest possible price in the shortest reasonable time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { value: "$2B+", label: "Negotiated across our team's transactions" },
              { value: "30+ Years", label: "Combined GTA market experience" },
              {
                value: "Above Asking",
                label: "Frequently achieved on well-prepared listings in active market segments",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-stone-border rounded-lg p-6 text-center"
              >
                <p className="font-serif text-2xl lg:text-3xl font-bold text-burgundy mb-2">
                  {s.value}
                </p>
                <p className="text-xs text-charcoal/60 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Max Realty */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">The Difference</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Why Choose Max Realty
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-stone-light border border-stone-border rounded-lg p-6 lg:p-7"
              >
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-burgundy" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{title}</h3>
                <p className="text-sm text-charcoal/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone-warm py-16">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="section-label">FAQ</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Common Questions From Sellers
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group bg-white border border-stone-border rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none hover:bg-stone-light/60 transition-colors">
                  <span className="font-serif text-base font-semibold text-charcoal">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-charcoal/50 shrink-0 transition-transform duration-150 group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 text-sm text-charcoal/70 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="bg-charcoal py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E4DE]/80 mb-3">
              Get Started
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-3">
              Book a Free Listing Consultation
            </h2>
            <p className="text-[#E8E4DE]/75 leading-relaxed">
              30 minutes. We come to you, you come to us, or we meet by video call. No obligation.
            </p>
          </div>

          <ConsultationForm />

          <ul className="mt-8 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#E8E4DE]/65">
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> Senior agent</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> No obligation</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> Response within one business day</li>
          </ul>
        </div>
      </section>
    </>
  );
}
