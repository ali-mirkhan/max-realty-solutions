import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Users, TrendingUp, Building2, Briefcase, Shield, FileText, BarChart3, Info, Lock } from "lucide-react";
import JoinForm from "./JoinForm";

export const metadata: Metadata = {
  title: "Join Max Realty Solutions | Agent Careers",
  description: "Join Max Realty Solutions Ltd., Brokerage. Keep more of your commission with flexible plans for new agents, growing professionals, and independent practitioners across the GTA.",
  alternates: { canonical: "https://www.maxrealtysolutions.com/join" },
};

const AGENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/agent-meeting-CjY9jHheSwuevRu6dL7bU8.webp";

const faqs = [
  {
    q: "Which plan is right for me?",
    a: "If you are an experienced agent who values independence and full commission, the Independent Plan at $179/month is our most popular choice. If you are actively growing your business and want no monthly fees, the Growth Plan rewards production. If you are new to real estate, our Mentored Program pairs you with a senior broker to guide your first 5 transactions.",
  },
  {
    q: "What happens if I am inactive on the Growth Plan?",
    a: "A $99/month holding fee applies starting from your first month of inactivity. This fee is not lost — it is credited in full against your commission when your next deal closes. Your 80/20 split is never affected.",
  },
  {
    q: "What counts as a transaction in the Mentored Program?",
    a: "Any completed transaction counts — residential or commercial, purchase or lease. All deal types are treated equally toward your 5-transaction graduation requirement.",
  },
  {
    q: "Who is my mentor in the Mentored Program?",
    a: "Your mentor is a licensed broker with a minimum of 10 years of experience, personally assigned by the Principal Broker (Shahin Mirkhan). You will shadow and work directly under their supervision on all client interactions, showings, offers, and negotiations until you complete 5 transactions.",
  },
  {
    q: "What if I am inactive in the Mentored Program?",
    a: "Agents in the Mentored Program must complete at least 1 transaction every 6 months. If inactive for 6 months, a $49/month program fee applies and is credited back upon your next closing. Agents inactive for 12 consecutive months may be transitioned out of the program.",
  },
  {
    q: "Is the Independent Plan suitable for license parking?",
    a: "Yes. The Independent Plan at $179/month is designed for both active independent agents and agents who wish to maintain their license under a reputable, compliant brokerage without production requirements. A per-transaction administration fee applies on each completed transaction.",
  },
  {
    q: "Do I get broker support on the Independent Plan?",
    a: "The Independent Plan is designed for agents who operate independently and do not require broker assistance on transactions. Brokerage administrative support, E&O insurance coverage, and RECO compliance infrastructure are all included in the monthly fee.",
  },
  {
    q: "Can I switch plans?",
    a: "Plan changes are permitted once per contract term, at the time of your annual renewal. Mid-term plan changes are not available. This policy ensures fairness and commitment to the plan you selected when joining. To request a plan change at your next renewal, contact the brokerage at least 30 days before your renewal date.",
  },
  {
    q: "Who approves plan changes?",
    a: "All plan change requests must be reviewed and approved by the Broker of Record. Approval is not automatic and is based on your production history, compliance standing, and the brokerage's current capacity for each plan. The Broker of Record's decision is final.",
  },
];

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={AGENT_IMG} alt="Agent collaboration" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <p
              className="text-xs font-medium uppercase tracking-widest text-white/90 mb-3"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
            >
              Join Max Realty Solutions
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Join Max Realty Solutions
            </h1>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed mb-8">
              Build your real estate career with a brokerage that puts agents first. Flexible plans for new agents,
              growing professionals, and independent practitioners across the GTA.
            </p>
            <a href="#apply" className="btn-primary">Apply Now <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      {/* Commission Plan Cards */}
      <section className="py-20 lg:py-28 bg-stone-light">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Commission Plans</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Choose the Plan That Fits Your Career
            </h2>
            <p className="text-charcoal/60 leading-relaxed">
              Every agent is at a different stage. We offer three plans designed to match where you are and where you&apos;re going.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

            {/* Plan 1 — Growth (80/20) — Left, no badge */}
            <div className="flex flex-col bg-white border border-stone-border rounded-lg overflow-hidden">
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">Growth Plan</p>
                  <p className="font-serif text-4xl font-bold text-charcoal">80/20</p>
                  <p className="text-sm text-charcoal/50 mt-1">Split — keep 80% of every commission</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Keep 80% of every commission",
                    "No monthly fee while actively closing deals",
                    "Annual production requirement applies",
                    "Performance reviewed every 3 months",
                    "Plan commitment for full annual contract term — changes at renewal only",
                    "Full brokerage support and resources included",
                    "Access to all brokerage tools, systems, and training",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#apply"
                  className="block text-center px-5 py-2.5 text-sm font-semibold text-burgundy border border-burgundy/40 rounded-md hover:bg-burgundy/5 transition-colors"
                >
                  Apply for This Plan
                </a>
              </div>
            </div>

            {/* Plan 2 — Independent (100%) — Middle, Most Popular */}
            <div className="flex flex-col bg-white border-2 border-burgundy rounded-lg overflow-hidden shadow-xl lg:scale-[1.02] lg:z-10 relative">
              <div className="bg-burgundy px-8 py-2.5 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-white">Most Popular</span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">Independent Plan</p>
                  <p className="font-serif text-4xl font-bold text-charcoal">100%</p>
                  <p className="text-sm text-charcoal/50 mt-1">Commission — you keep it all</p>
                  <p className="text-sm font-semibold text-burgundy mt-2">$179/month flat fee</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Keep 100% of every commission earned",
                    "Flat $179/month brokerage fee — no surprises",
                    "A per-transaction administration fee applies on each completed transaction",
                    "No production requirements or minimum volume",
                    "Annual contract commitment — plan changes subject to renewal and approval",
                    "No broker involvement required on transactions",
                    "Complete independence — manage your own schedule and clients",
                    "Ideal for experienced agents and license parking arrangements",
                    "Access to brokerage systems, E&O coverage, and RECO compliance support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#apply"
                  className="block text-center px-5 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:bg-burgundy-dark transition-colors"
                >
                  Apply for This Plan
                </a>
              </div>
            </div>

            {/* Plan 3 — Mentored (50/50) — Right, New Agents badge */}
            <div className="flex flex-col bg-white border border-stone-border rounded-lg overflow-hidden">
              <div className="bg-stone-light border-b border-stone-border px-8 py-2.5 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-charcoal/50">New Agents</span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">Mentored Program</p>
                  <p className="font-serif text-4xl font-bold text-charcoal">50/50</p>
                  <p className="text-sm text-charcoal/50 mt-1">Split — for your first 5 transactions</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "50/50 commission split for your first 5 completed transactions",
                    "Transactions may be residential or commercial, purchase or lease — all count equally",
                    "Work under the direct supervision of a broker with a minimum of 10 years of experience, personally assigned by the Principal Broker",
                    "Shadow your assigned broker on live client meetings, showings, and negotiations",
                    "Mandatory broker review and sign-off on all offers, agreements, and documents",
                    "Structured learning covering contracts, compliance, client management, and negotiation",
                    "One-on-one mentorship sessions throughout the program",
                    "Upon completing 5 transactions, you automatically graduate to your choice of Growth Plan or Independent Plan — no renewal required for graduation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#apply"
                  className="block text-center px-5 py-2.5 text-sm font-semibold text-burgundy border border-burgundy/40 rounded-md hover:bg-burgundy/5 transition-colors"
                >
                  Apply for This Plan
                </a>
              </div>
            </div>

          </div>

          {/* Important Plan Details */}
          <div className="mt-10 bg-stone-warm rounded-xl p-8">
            <h3 className="font-serif text-xl font-semibold text-charcoal mb-6">Important Plan Details</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-5 border-l-4 border-amber-400">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Growth Plan — Inactivity Policy</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  Agents on the Growth Plan who close no transactions in a given month will be charged a $99/month holding fee starting from month one of inactivity. This fee is credited in full against your next commission once a deal closes. Your 80/20 split is never affected.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 border-l-4 border-amber-400">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Mentored Program — Activity Requirement</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  To remain in the Mentored Program, agents must complete at least 1 transaction every 6 months. If inactive beyond 6 months, a $49/month program fee applies and is credited back upon your next closing. Agents inactive for 12 consecutive months may be transitioned out of the program.
                </p>
              </div>
            </div>
            <p className="text-xs text-charcoal/50 text-center">
              The Independent Plan has no production requirements or inactivity fees. A per-transaction administration fee applies on each completed transaction. It is designed for self-sufficient agents and license parking arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Plan Comparison</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">Side-by-Side Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-stone-border rounded-lg overflow-hidden min-w-[640px]">
              <thead>
                <tr className="bg-burgundy text-white">
                  <th className="text-left px-6 py-4 font-semibold">Feature</th>
                  <th className="text-center px-6 py-4 font-semibold">Growth (80/20)</th>
                  <th className="text-center px-6 py-4 font-semibold">Independent (100%)</th>
                  <th className="text-center px-6 py-4 font-semibold">Mentored (50/50)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Commission Split",      p1: "80/20",                       p2: "100%",                          p3: "50/50" },
                  { feature: "Monthly Fee",            p1: "None while active",            p2: "$179/month flat + per-transaction admin fee", p3: "None" },
                  { feature: "Inactivity Fee",         p1: "$99/mo (credited back)",       p2: "None",                          p3: "$49/mo after 6 months (credited back)" },
                  { feature: "Minimum Production",     p1: "Annual requirement",           p2: "None",                          p3: "5 transactions to graduate" },
                  { feature: "Performance Reviews",    p1: "Every 3 months",               p2: "None",                          p3: "After each transaction" },
                  { feature: "Broker Involvement",     p1: "Optional",                     p2: "Not included",                  p3: "Mandatory on all deals" },
                  { feature: "Mentor Assignment",      p1: "No",                           p2: "No",                            p3: "Yes — 10+ year experienced broker" },
                  { feature: "Plan Changes",           p1: "At annual renewal only — subject to Broker of Record approval", p2: "At annual renewal only — subject to Broker of Record approval", p3: "Graduates to Growth or Independent upon completing 5 transactions" },
                  { feature: "Best For",               p1: "Growing agents",               p2: "Experienced & license parking", p3: "New agents" },
                ].map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-stone-warm" : "bg-white"}>
                    <td className="px-6 py-3.5 font-medium text-charcoal">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center text-charcoal/70">{row.p1}</td>
                    <td className="px-6 py-3.5 text-center text-charcoal/70 font-medium bg-burgundy/5">{row.p2}</td>
                    <td className="px-6 py-3.5 text-center text-charcoal/70">{row.p3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-charcoal/40 mt-4">
            Contact us for full plan details and current fee schedules before signing.
          </p>
        </div>
      </section>

      {/* Professional Standards */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Joining Max Realty</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">Our Professional Standards</h2>
            <p className="text-charcoal/60 leading-relaxed">
              All agents joining Max Realty Solutions Ltd., Brokerage agree to uphold the following professional
              standards regardless of their selected plan:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto [&>*:last-child:nth-child(odd)]:sm:col-span-2 [&>*:last-child:nth-child(odd)]:sm:max-w-md [&>*:last-child:nth-child(odd)]:sm:mx-auto">
            {[
              {
                icon: Shield,
                title: "RECO Compliance",
                desc: "All agents must maintain active RECO registration and comply with all requirements under TRESA. Failure to maintain compliance may result in immediate plan termination.",
              },
              {
                icon: FileText,
                title: "Transaction Submission",
                desc: "All offers, agreements, and deals must be submitted through the brokerage's established process. No exceptions regardless of plan type.",
              },
              {
                icon: BarChart3,
                title: "Activity & Plan Reviews",
                desc: "Production levels are reviewed periodically. Max Realty Solutions reserves the right to adjust plan eligibility based on activity levels and professional conduct.",
              },
              {
                icon: Users,
                title: "Professional Conduct",
                desc: "All agents represent Max Realty Solutions in the marketplace. We expect the highest standards of integrity, professionalism, and respect for clients and colleagues.",
              },
              {
                icon: Lock,
                title: "Plan Commitment & Renewal Policy",
                desc: "Agents are committed to their selected plan for the duration of their annual contract term. Plan changes are only permitted at renewal and require written approval from the Broker of Record. This policy protects the integrity of our commission structure and ensures fair terms for all agents.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-stone-light rounded-lg p-6 border border-stone-border">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-burgundy" />
                </div>
                <h3 className="font-sans text-sm font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 lg:py-28 bg-stone-light">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Who We&apos;re Looking For</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Is Max Realty Right for You?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Independent Experienced Agents", desc: "High-volume agents who want to keep 100% of every deal for a flat $179/month." },
              { icon: Users, title: "Growing Agents", desc: "Actively closing agents who prefer no monthly fee and an 80/20 split with full brokerage support." },
              { icon: Building2, title: "Commercial-Focused Agents", desc: "Agents specializing in retail plazas, investment properties, and commercial leasing across the GTA." },
              { icon: Briefcase, title: "New Licensees", desc: "Brand-new agents who want hands-on mentorship from a 10+ year experienced broker through their first 5 deals." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-stone-border rounded-lg p-6">
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

      {/* Mentorship Detail */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">Mentorship Program</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-6">
                Guided Growth for New Agents
              </h2>
              <p className="text-charcoal/60 leading-relaxed mb-6">
                Our mentorship program pairs new agents with experienced brokers who provide hands-on
                guidance through your first 5 transactions. This isn&apos;t a webinar series — it&apos;s real,
                deal-by-deal coaching from a broker with over a decade of experience.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "One-on-one mentorship from a 10+ year licensed broker",
                  "Shadow your mentor on client meetings, showings, and negotiations",
                  "Mandatory broker review and sign-off on all offers and documents",
                  "Structured learning: contracts, compliance, client management, and negotiation",
                  "Transition to Growth (80/20) or Independent (100%) upon completing 5 deals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                    <CheckCircle2 size={16} className="text-burgundy mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-stone-light rounded-lg p-8 lg:p-10">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">How It Works</h3>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Apply & Onboard", desc: "Submit your application and complete our streamlined onboarding process." },
                  { step: "02", title: "Get Paired", desc: "The Principal Broker personally assigns you a mentor with 10+ years of relevant experience." },
                  { step: "03", title: "Learn by Doing", desc: "Work through real transactions under direct broker supervision — every offer, every showing, every negotiation." },
                  { step: "04", title: "Graduate & Choose", desc: "After 5 completed transactions, you choose: Growth Plan (80/20) or Independent Plan (100%)." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="font-serif text-2xl font-bold text-burgundy/20 shrink-0">{s.step}</span>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-charcoal mb-1">{s.title}</h4>
                      <p className="text-sm text-charcoal/60">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + Application Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <p className="section-label">FAQ</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Common Questions</h2>
          </div>
          <JoinForm faqs={faqs} />
        </div>
      </section>
    </>
  );
}
