import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Sliders,
  Wallet,
  TrendingUp,
  Search,
  Star,
  FileText,
  Repeat,
  AlertTriangle,
  ShieldOff,
  Receipt,
  FileWarning,
  CheckCircle2,
} from "lucide-react";
import PlatinumForm from "./PlatinumForm";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schemas";

const CANONICAL = "https://www.maxrealtysolutions.com/services/pre-construction";

export const metadata: Metadata = {
  title: "Pre-Construction & Platinum Access",
  description:
    "VIP and Platinum pre-construction allocations from top GTA developers. Get first access to new condo, townhome, and detached projects before public launch. Senior agent representation throughout.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Pre-Construction & Platinum Access | Max Realty Solutions",
    description:
      "VIP and Platinum pre-construction allocations from top GTA developers. Senior agent representation throughout.",
    url: CANONICAL,
    type: "website",
    siteName: "Max Realty Solutions",
    images: [
      {
        url: "https://www.maxrealtysolutions.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Pre-Construction & Platinum Access — Max Realty Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre-Construction & Platinum Access | Max Realty Solutions",
    description:
      "VIP and Platinum pre-construction allocations from top GTA developers.",
    images: ["https://www.maxrealtysolutions.com/og-default.jpg"],
  },
};

const BENEFITS = [
  {
    icon: Lock,
    title: "Lock In Today's Prices",
    body: "Pre-construction lets you secure a unit at today's price for delivery in 2-4 years. Build equity during construction phase, especially in appreciating GTA markets.",
  },
  {
    icon: Sliders,
    title: "Customize Your Unit",
    body: "Choose your floor, exposure, finishes, and upgrades while units are still available. Public launch buyers get what's left.",
  },
  {
    icon: Wallet,
    title: "Lower Deposit Structures",
    body: "Pre-construction deposits are typically structured 5%-20% over time, not all at closing. Lower upfront capital requirements vs. resale.",
  },
  {
    icon: TrendingUp,
    title: "Investment Leverage",
    body: "Deposits leverage future value appreciation. For investor buyers, pre-construction can produce strong returns through deposit structure and assignment options.",
  },
];

const SERVICES = [
  {
    icon: Search,
    title: "Curate Worthwhile Projects",
    body: "We say no to a lot. Not every pre-construction project is worth your money — we vet developer track record, location, pricing, and project economics before recommending any opportunity.",
  },
  {
    icon: Star,
    title: "Platinum / VIP Allocation Access",
    body: "Direct relationships with major GTA developers gets our clients into Platinum and VIP allocation rounds — first pick of units before public launch, often with better pricing and incentives.",
  },
  {
    icon: Sliders,
    title: "Negotiate Deposit Structure & Incentives",
    body: "Capped development fees, parking, lockers, decorator credits, extended deposit timelines, free assignment rights. We negotiate the terms beyond just unit price.",
  },
  {
    icon: FileText,
    title: "Agreement of Purchase and Sale Review",
    body: "Pre-construction APS contracts are dense and developer-friendly by default. We coordinate review with experienced real estate lawyers in our network so you understand what you're signing.",
  },
  {
    icon: Repeat,
    title: "Assignment Sale Management",
    body: "Circumstances change. If you need to assign your contract before closing, we manage the assignment sale process — finding qualified buyers, negotiating, and coordinating with the developer.",
  },
];

const RISKS = [
  {
    icon: AlertTriangle,
    title: "Project Delays or Cancellation",
    body: "GTA pre-construction has seen multi-year delays and outright cancellations. We vet developer financial strength and track record before recommending any project.",
  },
  {
    icon: ShieldOff,
    title: "Weak Developer Track Record",
    body: "First-time or under-capitalized developers sometimes can't deliver. We work with established developers with proven completion records.",
  },
  {
    icon: Receipt,
    title: "HST and Closing Cost Surprises",
    body: "Pre-construction closings often include HST, development levies, occupancy fees, and other costs not in the purchase price. We make sure you understand the full cost picture before you commit.",
  },
  {
    icon: FileWarning,
    title: "Restrictive Assignment Clauses",
    body: "Some developer contracts severely limit your ability to assign or sell before closing. We negotiate assignment rights upfront and explain restrictions clearly.",
  },
];

export default function PreConstructionPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Pre-Construction & Platinum Access",
          description:
            "VIP and Platinum pre-construction allocations from top GTA developers. First access to new condo, townhome, and detached projects before public launch.",
          slug: "pre-construction",
          serviceType: "Pre-Construction Real Estate",
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
              Pre-Construction &amp; Platinum Access
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Get In Before the Public
            </h1>
            <p className="text-base lg:text-lg text-[#E8E4DE]/85 leading-relaxed mb-8">
              Early VIP allocations from top GTA developers. Better pricing, better unit selection,
              better terms than waiting for public launch.
            </p>
            <Link
              href="#platinum-form"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
            >
              Get on Our Platinum Access List <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Pre-Construction */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">The Case</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              Why Buy Pre-Construction
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
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

      {/* What We Do */}
      <section className="bg-stone-warm py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">Our Role</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">
              What We Do for Pre-Construction Buyers
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {SERVICES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-stone-border rounded-lg p-6 flex gap-5 items-start"
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

      {/* Risks We Help You Avoid */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label">Risk Management</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-3">
              Risks We Help You Avoid
            </h2>
            <p className="text-charcoal/65 leading-relaxed">
              Pre-construction has unique risks. Here&apos;s how we protect you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {RISKS.map(({ icon: Icon, title, body }) => (
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

      {/* Active Project Access */}
      <section className="bg-burgundy py-16">
        <div className="container max-w-4xl">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-4">
              Current Inventory
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-5 leading-tight">
              Active Project Access
            </h2>
            <p className="text-[#E8E4DE]/90 leading-relaxed mb-7 max-w-2xl">
              Max Realty represents buyers on multiple GTA pre-construction projects across condo,
              townhome, and detached new builds. Available inventory rotates frequently as projects
              launch and sell out. Contact us to see what&apos;s currently available in your target
              area and price range.
            </p>
            <Link
              href="#platinum-form"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/50 rounded-md hover:bg-white/10 transition-colors"
            >
              See Available Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* For Investors */}
      <section className="bg-stone-warm py-16">
        <div className="container max-w-3xl">
          <div className="text-center mb-6">
            <p className="section-label">For Investors</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Pre-Construction for Investors
            </h2>
          </div>
          <p className="text-charcoal/70 leading-relaxed mb-6 text-center">
            Pre-construction can be a powerful portfolio tool. Leveraged returns through deposit
            structure, optional assignment exits, and rental income from interim occupancy through
            closing. We work with investor clients to identify pre-construction projects that fit
            their broader portfolio strategy.
          </p>
          <p className="text-center">
            <Link
              href="/services/investment-advisory"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy hover:underline"
            >
              Combine pre-construction with our broader Investment Advisory services
              <ArrowRight size={13} />
            </Link>
          </p>
        </div>
      </section>

      {/* Platinum List Form */}
      <section className="bg-charcoal py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8E4DE]/80 mb-3">
              Get Started
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-3">
              Get on Our Platinum Access List
            </h2>
            <p className="text-[#E8E4DE]/75 leading-relaxed">
              We&apos;ll keep you informed of upcoming launches that match your criteria. No spam,
              no pressure.
            </p>
          </div>

          <PlatinumForm />

          <ul className="mt-8 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#E8E4DE]/65">
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> VIP / Platinum allocations</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> Senior agent</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-burgundy" /> Response within one business day</li>
          </ul>
        </div>
      </section>
    </>
  );
}
