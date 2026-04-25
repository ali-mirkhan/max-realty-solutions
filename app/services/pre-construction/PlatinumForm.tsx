"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const PROPERTY_TYPES = ["Condo", "Townhome", "Detached", "Commercial"];

const BUDGETS = [
  "Under $700K",
  "$700K - $1M",
  "$1M - $1.5M",
  "$1.5M - $2.5M",
  "$2.5M+",
];

const TIMELINES = [
  "Looking now",
  "Within 6 months",
  "6-12 months",
  "Exploring",
];

type BuyerType = "end-user" | "investor" | "both";

const BUYER_OPTIONS: { value: BuyerType; label: string }[] = [
  { value: "end-user", label: "End-user" },
  { value: "investor", label: "Investor" },
  { value: "both", label: "Both" },
];

export default function PlatinumForm() {
  const [buyerType, setBuyerType] = useState<BuyerType>("end-user");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleType(value: string) {
    setPropertyTypes((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      buyerType,
      propertyTypes,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      area: String(data.get("area") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      notes: String(data.get("notes") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      setError("Please complete all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/preconstruction-inquiry", {
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
          You&apos;re on the Platinum Access list.
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          A senior agent will reach out within one business day to discuss current opportunities.
          Please check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none";

  return (
    <form
      id="platinum-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 lg:p-8 space-y-5 max-w-2xl mx-auto"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Full Name <span className="text-burgundy">*</span>
          </label>
          <input name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Email <span className="text-burgundy">*</span>
          </label>
          <input name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          Phone <span className="text-burgundy">*</span>
        </label>
        <input name="phone" type="tel" required className={inputClass} />
      </div>

      <div>
        <p className="block text-xs font-medium text-charcoal/60 mb-2">
          Buyer Type <span className="text-burgundy">*</span>
        </p>
        <div className="grid sm:grid-cols-3 gap-2.5">
          {BUYER_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-2 px-3 py-2.5 border rounded-md cursor-pointer transition-colors ${
                buyerType === opt.value
                  ? "border-burgundy bg-burgundy/5 text-burgundy"
                  : "border-stone-border text-charcoal/70 hover:border-burgundy/40"
              }`}
            >
              <input
                type="radio"
                name="buyerType"
                value={opt.value}
                checked={buyerType === opt.value}
                onChange={() => setBuyerType(opt.value)}
                className="accent-burgundy"
              />
              <span className="text-xs font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="block text-xs font-medium text-charcoal/60 mb-2">
          Property Type Interest{" "}
          <span className="text-charcoal/40 font-normal">(select all that apply)</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PROPERTY_TYPES.map((t) => {
            const checked = propertyTypes.includes(t);
            return (
              <label
                key={t}
                className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition-colors ${
                  checked
                    ? "border-burgundy bg-burgundy/5 text-burgundy"
                    : "border-stone-border text-charcoal/70 hover:border-burgundy/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleType(t)}
                  className="accent-burgundy"
                />
                <span className="text-xs">{t}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Target Area
          </label>
          <input
            name="area"
            type="text"
            placeholder="e.g., Yonge & Eglinton, Mississauga, Vaughan"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Budget Range
          </label>
          <select name="budget" defaultValue="" className={inputClass}>
            <option value="">Select…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">Timeline</label>
        <select name="timeline" defaultValue="" className={inputClass}>
          <option value="">Select…</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">Notes</label>
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
          "Add Me to the Platinum List"
        )}
      </button>

      <p className="text-xs text-charcoal/60 text-center">
        No spam, no pressure.
      </p>
    </form>
  );
}
