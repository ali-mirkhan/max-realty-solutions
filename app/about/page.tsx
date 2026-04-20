import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Users, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Max Realty Solutions — a modern RECO-registered brokerage in Thornhill built for agents and clients across the GTA.",
};

const SKYLINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663473881448/NuD94N9hYijXSU2SwbeCEC/toronto-skyline-bNv4TFBMJJt45Hb8RhfuqK.webp";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={SKYLINE_IMG} alt="Toronto GTA skyline" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#E8E4DE]/60 mb-3">About Us</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              A Brokerage Built Different
            </h1>
            <p className="text-lg text-[#E8E4DE]/90 leading-relaxed">
              Max Realty Solutions was founded on a simple belief: agents deserve better, and clients
              deserve more.
            </p>
          </div>
        </div>
      </section>

      {/* Story + Values */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="section-label">Our Story</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-6">
                Founded on Experience, Driven by Results
              </h2>
              <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed">
                <p>Max Realty Solutions was born from a recognition that the traditional brokerage model wasn&apos;t working — not for agents, and not for clients. Too many talented agents were losing significant portions of their hard-earned commissions to excessive desk fees and corporate overhead, while clients were being passed between agents without genuine expertise.</p>
                <p>With deep roots in both residential and commercial real estate — including large-scale retail plaza transactions in the $10M–$35M+ range — our founding team set out to build something better. A lean, modern brokerage that maximizes agent earnings while delivering exceptional service to every client.</p>
                <p>Based in Thornhill and serving the entire Greater Toronto Area, Max Realty Solutions combines the flexibility and personal attention of an independent brokerage with the market knowledge and transaction experience of a much larger firm.</p>
              </div>
            </div>
            <div className="space-y-6">
              <p className="section-label">Our Values</p>
              {[
                { icon: Eye, title: "Transparency", desc: "No hidden fees, no surprises. We believe in clear communication and honest dealings — with our agents and our clients." },
                { icon: Users, title: "Agent Empowerment", desc: "We exist to help agents succeed. Flexible commission structures, real broker support, and the tools you need to grow your business." },
                { icon: Heart, title: "Client-First Mindset", desc: "Every transaction is guided by what's best for the client. We build lasting relationships, not just close deals." },
                { icon: Shield, title: "Integrity & Compliance", desc: "Fully licensed and regulated by RECO. We uphold the highest standards of professional conduct and ethical practice." },
              ].map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                    <v.icon size={18} className="text-burgundy" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-charcoal mb-1">{v.title}</h3>
                    <p className="text-sm text-charcoal/60">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-label">Leadership</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal">Meet Our Broker</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
              <div className="w-60 h-60 mx-auto md:mx-0 rounded-lg bg-stone-border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-3">
                    <Users size={32} className="text-burgundy" />
                  </div>
                  <p className="text-xs text-charcoal/40">Photo placeholder</p>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-charcoal mb-1">Broker of Record</h3>
                <p className="text-sm text-burgundy font-medium mb-4">Founder &amp; Broker of Record, Max Realty Solutions</p>
                <div className="space-y-3 text-sm text-charcoal/70 leading-relaxed">
                  <p>With over a decade of experience in both residential and commercial real estate, our Broker of Record brings a unique combination of market knowledge, transaction expertise, and a genuine commitment to agent success.</p>
                  <p>Having personally facilitated commercial transactions exceeding $35M in value — including multi-tenant retail plazas across the GTA — they understand the complexities of large-scale deals and the importance of hands-on broker support.</p>
                  <p>Their vision for Max Realty Solutions is simple: create a brokerage where agents can thrive, clients receive exceptional service, and every transaction is handled with professionalism and integrity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECO Notice */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-3xl">
          <div className="bg-stone-light rounded-lg p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <Shield size={24} className="text-burgundy shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">RECO Registration &amp; Compliance</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  Max Realty Solutions is a licensed real estate brokerage registered with the Real Estate
                  Council of Ontario (RECO). All agents associated with our brokerage are licensed and
                  regulated under the Trust in Real Estate Services Act, 2002 (TRESA). We maintain full
                  compliance with all regulatory requirements and uphold the highest standards of
                  professional conduct.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-charcoal">
        <div className="container text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-[#E8E4DE]/70 max-w-xl mx-auto mb-8">
            Whether you&apos;re an agent looking for a better brokerage or a client seeking experienced
            guidance — let&apos;s connect.
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
