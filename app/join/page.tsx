import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Users, TrendingUp, Building2, Briefcase, Shield, FileText, BarChart3, Info } from "lucide-react";
import JoinForm from "./JoinForm";

export const metadata: Metadata = {
  title: "Join Max Realty Solutions",
  description:
    "Join Max Realty Solutions. Flexible commission plans, real broker support, and commercial opportunities for Ontario real estate agents.",
};

const AGENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/agent-meeting-CjY9jHheSwuevRu6dL7bU8.webp";

const faqs = [
  { q: "What fees are involved beyond the commission split?", a: "Depending on your plan, there may be a monthly desk fee and/or per-transaction fee. There are no hidden charges — we'll walk you through the full cost structure before you sign." },
  { q: "Do you provide E&O insurance?", a: "Yes, Errors & Omissions insurance is arranged through the brokerage. Details and costs will be provided during onboarding." },
  { q: "What tools and technology do you provide?", a: "We provide access to CRM tools, transaction management software, marketing templates, and a professional website presence. Specific tools may vary by plan." },
  { q: "Is Max Realty in good standing with RECO?", a: "Absolutely. Max Realty Solutions is a fully licensed and registered brokerage with the Real Estate Council of Ontario (RECO), in full compliance with TRESA." },
  { q: "Can I bring my current listings?", a: "Yes. We'll work with you and your current brokerage to ensure a smooth transition of all active listings and pending transactions." },
  { q: "How does the mentorship program work?", a: "New agents are paired with an experienced broker who provides hands-on guidance through your first 5 transactions. This includes deal structuring, negotiation support, and client management coaching. Upon completing 5 transactions, you graduate to the Growth Plan (80/20) or Independent Plan (100%)." },
  { q: "Do you support commercial transactions?", a: "Yes. Max Realty has deep experience in commercial real estate, including retail plaza transactions in the $10M–$35M+ range. We welcome agents focused on commercial deals." },
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
              Keep More of Your Commission
            </h1>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed mb-8">
              Flexible plans, real broker support, and commercial opportunities. Built for independent,
              high-performance agents.
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

            {/* Plan 1 — Independent */}
            <div className="flex flex-col bg-white border border-stone-border rounded-lg overflow-hidden">
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">Independent Plan</p>
                  <p className="font-serif text-4xl font-bold text-charcoal">100%</p>
                  <p className="text-sm text-charcoal/50 mt-1">Commission — you keep it all</p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "Keep 100% of every commission",
                    "Fixed monthly fee applies (contact us for current rate)",
                    "Per-transaction administration fee applies",
                    "No minimum production requirement",
                    "Full scheduling and client flexibility",
                    "Access to all brokerage resources and systems",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-stone-light rounded-lg p-4 mb-6 text-sm text-charcoal/60 leading-relaxed">
                  Designed for experienced, self-sufficient agents who want complete control over their business with no production requirements.
                </div>

                <a
                  href="#apply"
                  className="block text-center px-5 py-2.5 text-sm font-semibold text-burgundy border border-burgundy/40 rounded-md hover:bg-burgundy/5 transition-colors"
                >
                  Apply for This Plan
                </a>
              </div>
            </div>

            {/* Plan 2 — Growth (Most Popular) */}
            <div className="flex flex-col bg-white border-2 border-burgundy rounded-lg overflow-hidden shadow-xl lg:scale-[1.02] lg:z-10 relative">
              <div className="bg-burgundy px-8 py-2.5 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-white">Most Popular</span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">Growth Plan</p>
                  <p className="font-serif text-4xl font-bold text-charcoal">80/20</p>
                  <p className="text-sm text-charcoal/50 mt-1">Split — keep 80% of every commission</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    "Keep 80% of every commission",
                    "No monthly fee while actively closing deals",
                    "Annual production requirement applies",
                    "Performance reviewed every 3 months",
                    "Full brokerage support and resources included",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Inactivity Policy */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Info size={15} className="text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Inactivity Policy</p>
                  </div>
                  <p className="text-sm text-amber-900/80 leading-relaxed">
                    If no transactions close in a given month, a <strong>$99/month holding fee</strong> applies starting from month one of inactivity. This fee is not lost — it is <strong>credited in full</strong> against your next commission once a deal closes. Your 80/20 split remains unchanged at all times.
                  </p>
                </div>

                <div className="bg-stone-light rounded-lg p-4 mb-6 text-sm text-charcoal/60 leading-relaxed flex-1">
                  Stay active and pay nothing monthly. Inactivity triggers a temporary holding fee that is fully credited back upon your next closing.
                </div>

                <a
                  href="#apply"
                  className="block text-center px-5 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:bg-burgundy-dark transition-colors"
                >
                  Apply for This Plan
                </a>
              </div>
            </div>

            {/* Plan 3 — Mentored */}
            <div className="flex flex-col bg-white border border-stone-border rounded-lg overflow-hidden">
              <div className="bg-charcoal/8 border-b border-stone-border px-8 py-2.5 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-charcoal/50">New Agents</span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-3">Mentored Program</p>
                  <p className="font-serif text-4xl font-bold text-charcoal">50/50</p>
                  <p className="text-sm text-charcoal/50 mt-1">Split — for your first 5 transactions</p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "50/50 commission split for your first 5 transactions",
                    "Mandatory broker involvement and sign-off on all deals",
                    "Hands-on guidance through every step of each transaction",
                    "Dedicated mentor support for contracts, negotiations, and compliance",
                    "Upon completing 5 transactions, you graduate to the Growth Plan (80/20) or Independent Plan (100%)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <CheckCircle2 size={15} className="text-burgundy mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-stone-light rounded-lg p-4 mb-6 text-sm text-charcoal/60 leading-relaxed">
                  This is a temporary growth program — not a permanent arrangement. It is designed to build confidence, skills, and a strong foundation for your real estate career.
                </div>

                <a
                  href="#apply"
                  className="block text-center px-5 py-2.5 text-sm font-semibold text-burgundy border border-burgundy/40 rounded-md hover:bg-burgundy/5 transition-colors"
                >
                  Apply for This Plan
                </a>
              </div>
            </div>

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
            <table className="w-full text-sm border border-stone-border rounded-lg overflow-hidden min-w-[600px]">
              <thead>
                <tr className="bg-burgundy text-white">
                  <th className="text-left px-6 py-4 font-semibold">Feature</th>
                  <th className="text-center px-6 py-4 font-semibold">Independent</th>
                  <th className="text-center px-6 py-4 font-semibold">Growth (80/20)</th>
                  <th className="text-center px-6 py-4 font-semibold">Mentored</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Commission Split", p1: "100%", p2: "80/20", p3: "50/50" },
                  { feature: "Monthly Fee", p1: "Fixed fee applies", p2: "None while active", p3: "None" },
                  { feature: "Inactivity Fee", p1: "None", p2: "$99/mo (credited back)", p3: "Not applicable" },
                  { feature: "Minimum Production", p1: "None", p2: "Annual requirement", p3: "5 transactions" },
                  { feature: "Performance Reviews", p1: "None", p2: "Every 3 months", p3: "After each deal" },
                  { feature: "Broker Involvement", p1: "Optional", p2: "Optional", p3: "Mandatory" },
                  { feature: "Best For", p1: "Experienced agents", p2: "Growing agents", p3: "New agents" },
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
            Contact us for current fee schedules and full plan details before signing.
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
              At Max Realty Solutions, we hold ourselves and our agents to the highest professional standards.
              All plan participants agree to the following:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "RECO Compliance",
                desc: "All agents must maintain active RECO registration and comply with all regulatory requirements under TRESA at all times.",
              },
              {
                icon: FileText,
                title: "Brokerage Submission Process",
                desc: "All offers, agreements, and transactions must follow the brokerage's established submission and review process without exception.",
              },
              {
                icon: BarChart3,
                title: "Activity & Performance Reviews",
                desc: "Production levels and compliance are reviewed periodically. Plan eligibility may be adjusted based on activity and professional conduct.",
              },
              {
                icon: Users,
                title: "Collaborative Culture",
                desc: "We expect all agents to represent Max Realty Solutions with professionalism, integrity, and respect for clients, colleagues, and the industry.",
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
              { icon: TrendingUp, title: "Independent Experienced Agents", desc: "High-volume agents who want to keep more of every deal with a 100% commission model." },
              { icon: Users, title: "Growing Agents Seeking Mentorship", desc: "Newer agents who want hands-on guidance and a clear path to higher splits." },
              { icon: Building2, title: "Commercial-Focused Agents", desc: "Agents specializing in retail plazas, investment properties, and commercial leasing." },
              { icon: Briefcase, title: "Agents Switching Brokerages", desc: "Experienced agents tired of high desk fees, corporate bureaucracy, and limited support." },
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
                deal-by-deal coaching.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "One-on-one broker mentorship for your first 5 deals",
                  "Deal structuring and negotiation support",
                  "Client management and communication coaching",
                  "Transition to Growth (80/20) or Independent (100%) upon completion",
                  "Access to all brokerage tools and resources from day one",
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
                  { step: "02", title: "Get Paired", desc: "You'll be matched with an experienced broker based on your focus area." },
                  { step: "03", title: "Learn by Doing", desc: "Work through real transactions with hands-on guidance at every step." },
                  { step: "04", title: "Graduate & Grow", desc: "After 5 mentored deals, transition to the Growth Plan (80/20) or Independent Plan (100%)." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="font-serif text-2xl font-bold text-burgundy/20">{s.step}</span>
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

      {/* FAQ */}
      <section id="apply" className="py-20 lg:py-28 bg-white">
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
