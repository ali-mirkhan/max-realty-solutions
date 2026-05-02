import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle2,
  XCircle,
  ClipboardList,
  UserCheck,
  Mail,
} from "lucide-react";
import EvaluationForm from "./EvaluationForm";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schemas";

const CANONICAL = "https://www.maxrealtysolutions.com/services/home-evaluation";

export const metadata: Metadata = {
  title: "Free Home Evaluation",
  description:
    "Get a free, no-obligation home evaluation from a senior Max Realty agent. Detailed comparable sales analysis, current GTA market conditions, and strategic pricing recommendation. Prepared within 24-48 hours.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Free Home Evaluation | Max Realty Solutions",
    description:
      "Get a free, no-obligation home evaluation from a senior Max Realty agent. Prepared within 24-48 hours.",
    url: CANONICAL,
    type: "website",
    siteName: "Max Realty Solutions",
    images: [
      {
        url: "https://www.maxrealtysolutions.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Free Home Evaluation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Home Evaluation | Max Realty Solutions",
    description:
      "Get a free, no-obligation home evaluation from a senior Max Realty agent.",
    images: ["https://www.maxrealtysolutions.com/og-default.jpg"],
  },
};

export default function HomeEvaluationPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Free Home Evaluation",
          description:
            "Free no-obligation home evaluation prepared by senior agents. Detailed comparable sales analysis, current GTA market conditions, and strategic pricing recommendation within 24-48 hours.",
          slug: "home-evaluation",
          serviceType: "Real Estate Valuation",
        })}
      />

      {/* Hero + Form */}
      <section className="bg-stone-warm border-b border-stone-border">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy mb-4">
                Free Evaluation · No Obligation
              </p>
              <h1 className="font-serif text-3xl lg:text-5xl font-bold text-charcoal leading-tight mb-5">
                What&apos;s Your Home Really Worth in Today&apos;s Market?
              </h1>
              <p className="text-base lg:text-lg text-charcoal/70 leading-relaxed mb-6">
                Get a free, no-obligation evaluation prepared by a senior agent who actually
                knows your neighbourhood — not an algorithm.
              </p>
              <ul className="space-y-2 text-sm text-charcoal/70">
                {[
                  "Comparable sold properties from the last 90 days",
                  "Current GTA market conditions in your segment",
                  "Strategic pricing recommendation — three scenarios",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-burgundy mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:max-w-xl lg:ml-auto w-full">
              <EvaluationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why Agent Beats Online Tools */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="section-label">Why It Matters</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-6">
                Why an Agent Evaluation Beats Online Tools
              </h2>
              <p className="text-charcoal/70 leading-relaxed">
                HouseSigma, Zolo, and Zillow algorithms can be off by 5-15% in volatile markets
                like the GTA. They don&apos;t see your specific block, off-MLS comparable sales,
                or current buyer demand at the street level. A senior agent at Max Realty walks
                your neighbourhood every week and prepares evaluations the way appraisers do —
                using comparable sales, market conditions, and judgment that algorithms
                can&apos;t replicate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-stone-light border border-stone-border rounded-lg p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3">
                  Online Estimator
                </p>
                <ul className="space-y-2 text-sm text-charcoal/70">
                  {[
                    "Algorithm-based",
                    "Often outdated",
                    "Doesn't know your block",
                    "No human review",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <XCircle size={14} className="text-charcoal/40 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-burgundy/5 border border-burgundy/20 rounded-lg p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-burgundy mb-3">
                  Max Realty Evaluation
                </p>
                <ul className="space-y-2 text-sm text-charcoal/80">
                  {[
                    "Senior agent prepared",
                    "Recent comparable sales",
                    "Local market knowledge",
                    "Written report you can act on",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-burgundy mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="bg-stone-light py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">What You&apos;ll Receive</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              A Real Report, Not a Number
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: BarChart3,
                title: "Comparable Sold Properties",
                body: "Detailed analysis of 3-7 comparable homes sold in your area within the last 90 days. We show you the actual sale prices, days on market, and how each comparable matches up to your property.",
              },
              {
                icon: TrendingUp,
                title: "Current Market Conditions",
                body: "Where the GTA market is heading right now in your specific segment. Buyer demand, average days on market, sale-to-list ratios, and pricing trends — all updated for the week your evaluation is prepared.",
              },
              {
                icon: Target,
                title: "Strategic Price Recommendation",
                body: "Three pricing scenarios: a conservative price for fast sale, a likely market price, and an aggressive price to test maximum value. You decide your strategy with full information.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-stone-border rounded-lg p-6 lg:p-7"
              >
                <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-burgundy" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{title}</h3>
                <p className="text-sm text-charcoal/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">The Process</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Three Steps, 24-48 Hours
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                icon: ClipboardList,
                title: "Submit Your Address",
                body: "Fill out the form above. Takes 60 seconds.",
              },
              {
                num: "02",
                icon: UserCheck,
                title: "Senior Agent Reviews",
                body: "A senior agent reviews recent comparable sales, current market conditions, and any specific details about your property. Takes 24-48 hours.",
              },
              {
                num: "03",
                icon: Mail,
                title: "Receive Your Report",
                body: "Get your written evaluation by email, plus an optional 15-minute phone walkthrough to discuss strategy if you're considering selling.",
              },
            ].map(({ num, icon: Icon, title, body }) => (
              <div key={num} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif text-2xl font-semibold text-burgundy">{num}</span>
                  <Icon size={18} className="text-charcoal/40" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{title}</h3>
                <p className="text-sm text-charcoal/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-charcoal py-16">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-white mb-3">
            Prepared by Max Realty Solutions Ltd., Brokerage
          </h2>
          <p className="text-[#E8E4DE]/75 mb-10 leading-relaxed">
            38 years of GTA market experience. $750M+ in real estate transacted.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "38 Years", label: "Combined GTA market experience" },
              { value: "$750M+", label: "In real estate transactions negotiated" },
              { value: "All of Ontario", label: "Service area, with focus on the GTA" },
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

      {/* Soft CTA */}
      <section className="bg-stone-warm py-16 text-center">
        <div className="container max-w-2xl">
          <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-3">
            Not ready to sell? Many homeowners get an evaluation annually.
          </h3>
          <p className="text-charcoal/70 mb-6 leading-relaxed">
            Knowing your largest asset&apos;s value is just smart. Whether for refinancing, estate
            planning, or peace of mind — there&apos;s no obligation, ever.
          </p>
          <Link
            href="#evaluation-form"
            className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline"
          >
            Request your evaluation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
