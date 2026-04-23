"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ { q: string; a: string; }

export default function JoinForm({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reco: "",
    desiredPlan: "",
    experience: "",
    currentBrokerage: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, subject: 'New Agent Application - Max Realty Solutions' }),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <>
      {/* FAQ Accordion */}
      <div className="space-y-3 mb-20">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-stone-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-sm font-medium text-charcoal pr-4">{faq.q}</span>
              {openFaq === i
                ? <ChevronUp size={16} className="text-burgundy shrink-0" />
                : <ChevronDown size={16} className="text-charcoal/30 shrink-0" />}
            </button>
            {openFaq === i && (
              <div className="px-6 pb-4">
                <p className="text-sm text-charcoal/60 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Application Form */}
      <section id="apply" className="py-20 lg:py-28 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Apply</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Join Max Realty Solutions
            </h2>
            <p className="text-charcoal/60">Fill out the form below and we&apos;ll be in touch within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 bg-white border border-stone-border rounded-lg">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Application Submitted!</h3>
              <p className="text-sm text-charcoal/60">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Phone *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">RECO Registration # *</label>
                  <input type="text" required value={form.reco} onChange={(e) => setForm({ ...form, reco: e.target.value })} className="input-field" />
                </div>
              </div>

              {/* Desired Plan — required, prominent */}
              <div>
                <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">
                  Which plan are you interested in? *
                </label>
                <select
                  required
                  value={form.desiredPlan}
                  onChange={(e) => setForm({ ...form, desiredPlan: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select a plan...</option>
                  <option value="Independent Plan — 100% Commission ($179/month)">Independent Plan — 100% Commission ($179/month)</option>
                  <option value="Growth Plan — 80/20 Split (No monthly fee while active)">Growth Plan — 80/20 Split (No monthly fee while active)</option>
                  <option value="Mentored Program — 50/50 Split (New agents)">Mentored Program — 50/50 Split (New agents)</option>
                  <option value="Not sure yet — I'd like to discuss my options">Not sure yet — I&apos;d like to discuss my options</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Years of Experience *</label>
                  <select required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="input-field">
                    <option value="">Select...</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5-10">5–10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Current Brokerage (optional)</label>
                  <input type="text" value={form.currentBrokerage} onChange={(e) => setForm({ ...form, currentBrokerage: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about yourself, your goals, and what you're looking for in a brokerage..." className="input-field resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3">
                Submit Application
              </button>
              <p className="text-xs text-charcoal/40 text-center">
                Your selected plan will be confirmed in your agent agreement. The Independent Plan includes a per-transaction administration fee on each completed transaction. Plan changes after signing are subject to annual renewal terms and Broker of Record approval.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
