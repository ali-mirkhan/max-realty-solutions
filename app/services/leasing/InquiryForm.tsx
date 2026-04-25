"use client";

import { useEffect, useState, FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const PROPERTY_TYPES = [
  "Retail",
  "Office",
  "Industrial",
  "Mixed-Use",
  "Medical/Professional",
  "Restaurant",
  "Other",
];

const TIMELINES = [
  "Immediate",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Exploring",
];

type Role = "tenant" | "landlord";

export default function InquiryForm({
  initialRole = "tenant",
}: {
  initialRole?: Role;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Allow other CTAs on the page to set role via URL hash, e.g. #inquiry-landlord
  useEffect(() => {
    function applyHash() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash === "#inquiry-tenant") setRole("tenant");
      else if (hash === "#inquiry-landlord") setRole("landlord");
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      role,
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      propertyType: String(data.get("propertyType") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      sqft: String(data.get("sqft") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      notes: String(data.get("notes") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      setError("Please complete all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/leasing-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        throw new Error(body.error ?? "Submission failed");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-burgundy" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          Thank you. Your inquiry has been received.
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          A member of our commercial leasing team will reach out within one business day.
          Please check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none";

  return (
    <form
      id="inquiry-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 lg:p-8 space-y-4 max-w-2xl mx-auto"
    >
      <div>
        <p className="block text-xs font-medium text-charcoal/60 mb-2">
          I am a <span className="text-burgundy">*</span>
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <label
            className={`flex items-center gap-2 px-4 py-3 border rounded-md cursor-pointer transition-colors ${
              role === "tenant"
                ? "border-burgundy bg-burgundy/5 text-burgundy"
                : "border-stone-border text-charcoal/70 hover:border-burgundy/40"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="tenant"
              checked={role === "tenant"}
              onChange={() => setRole("tenant")}
              className="accent-burgundy"
            />
            <span className="text-sm font-medium">Tenant looking for space</span>
          </label>
          <label
            className={`flex items-center gap-2 px-4 py-3 border rounded-md cursor-pointer transition-colors ${
              role === "landlord"
                ? "border-burgundy bg-burgundy/5 text-burgundy"
                : "border-stone-border text-charcoal/70 hover:border-burgundy/40"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="landlord"
              checked={role === "landlord"}
              onChange={() => setRole("landlord")}
              className="accent-burgundy"
            />
            <span className="text-sm font-medium">Landlord with property to lease</span>
          </label>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Full Name <span className="text-burgundy">*</span>
          </label>
          <input name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Company / Business Name
          </label>
          <input name="company" type="text" className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Email <span className="text-burgundy">*</span>
          </label>
          <input name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Phone <span className="text-burgundy">*</span>
          </label>
          <input name="phone" type="tel" required className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Property Type
          </label>
          <select name="propertyType" defaultValue="" className={inputClass}>
            <option value="">Select…</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Timeline
          </label>
          <select name="timeline" defaultValue="" className={inputClass}>
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            {role === "landlord" ? "Property location" : "Location preference"}
          </label>
          <input
            name="location"
            type="text"
            placeholder="e.g., North York, Mississauga, GTA-wide"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Approximate square footage
          </label>
          <input
            name="sqft"
            type="text"
            placeholder="e.g., 2,000 - 5,000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          Notes
        </label>
        <textarea name="notes" rows={3} className={inputClass} />
      </div>

      {error && (
        <p className="text-sm text-burgundy bg-burgundy/5 border border-burgundy/20 rounded-md px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          "Send Inquiry"
        )}
      </button>

      <p className="text-xs text-charcoal/60 text-center">
        We&apos;ll respond within one business day.
      </p>
    </form>
  );
}
