import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Users, TrendingUp, Building2, Briefcase } from "lucide-react";
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
  { q: "How does the mentorship program work?", a: "New agents are paired with an experienced broker who provides hands-on guidance through your first 3–5 transactions. This includes deal structuring, negotiation support, and client management coaching." },
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
            <p className="text-xs font-medium uppercase tracking-widest text-[#E8E4DE]/60 mb-3">Join Max Realty Solutions</p>
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

      {/* Commission Comparison Table */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Commission Plans</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">Side-by-Side Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-stone-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-charcoal text-white">
                  <th className="text-left px-6 py-4 font-semibold">Feature</th>
                  <th className="text-center px-6 py-4 font-semibold">Independent Agent</th>
                  <th className="text-center px-6 py-4 font-semibold bg-burgundy">Traditional Split</th>
                  <th className="text-center px-6 py-4 font-semibold">Mentored / New</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Commission Split", p1: "100% to agent", p2: "80/20", p3: "50/50" },
                  { feature: "Monthly Fee", p1: "Yes", p2: "No", p3: "No" },
                  { feature: "Per-Transaction Fee", p1: "Yes", p2: "No", p3: "No" },
                  { feature: "Broker Support", p1: "Full access", p2: "Full access", p3: "Enhanced mentorship" },
                  { feature: "Commercial Deals", p1: "Yes", p2: "Yes", p3: "Yes (guided)" },
                  { feature: "CRM & Tools", p1: "Included", p2: "Included", p3: "Included" },
                  { feature: "Marketing Support", p1: "Self-directed", p2: "Templates provided", p3: "Guided support" },
                  { feature: "Best For", p1: "High-volume agents", p2: "Growing agents", p3: "New licensees" },
                ].map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-stone-warm" : "bg-white"}>
                    <td className="px-6 py-3 font-medium text-charcoal">{row.feature}</td>
                    <td className="px-6 py-3 text-center text-charcoal/70">{row.p1}</td>
                    <td className="px-6 py-3 text-center text-charcoal/70 bg-burgundy/5">{row.p2}</td>
                    <td className="px-6 py-3 text-center text-charcoal/70">{row.p3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-charcoal/40 mt-4">
            * Figures shown are placeholder examples. Contact us for confirmed plan details.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 lg:py-28 bg-white">
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

      {/* Mentorship */}
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
                guidance through your first transactions. This isn&apos;t a webinar series — it&apos;s real,
                deal-by-deal coaching.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "One-on-one broker mentorship for your first 3–5 deals",
                  "Deal structuring and negotiation support",
                  "Client management and communication coaching",
                  "Transition to a better commission split upon completion",
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
                  { step: "04", title: "Graduate & Grow", desc: "After 3–5 mentored deals, transition to a higher commission split." },
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
