"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Message Sent!</h3>
        <p className="text-sm text-charcoal/60">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">Send Us a Message</h2>
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
            <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">I am a... *</label>
            <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
              <option value="">Select...</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="agent">Real Estate Agent</option>
              <option value="investor">Investor</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-1.5">Message *</label>
          <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help you?" className="input-field resize-none" />
        </div>
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
    </div>
  );
}
