"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const CAPITAL_RANGES = [
  "Under $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $25M",
  "$25M+",
];

const TIMELINES = [
  "Immediate",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Exploring",
];

const ASSET_INTERESTS = [
  "Multi-family",
  "Retail",
  "Office",
  "Industrial",
  "Land/Development",
  "Pre-construction",
  "Off-market commercial",
];

type Profile = "first-time" | "active" | "hnw";

const PROFILE_OPTIONS: { value: Profile; label: string }[] = [
  { value: "first-time", label: "First-time investor" },
  { value: "active", label: "Active investor" },
  { value: "hnw", label: "High-net-worth or institutional" },
];

export default function StrategyForm() {
  const [profile, setProfile] = useState<Profile>("active");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      profile,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      capital: String(data.get("capital") ?? "").trim(),
      assetInterests: interests,
      timeline: String(data.get("timeline") ?? "").trim(),
      notes: String(data.get("notes") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      setError("Please complete all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/investment-inquiry", {
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
      <div className="bg-white border border-stone-border rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-burgundy" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          Thank you. Your inquiry has been received.
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          A member of our investment advisory team will reach out within one business day to
          schedule your strategy call. Please check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none";

  return (
    <form
      id="strategy-form"
      onSubmit={handleSubmit}
      className="bg-white border border-stone-border rounded-lg shadow-md p-6 lg:p-8 space-y-5 max-w-2xl mx-auto"
    >
      <div>
        <p className="block text-xs font-medium text-charcoal/60 mb-2">
          Investor Profile <span className="text-burgundy">*</span>
        </p>
        <div className="grid sm:grid-cols-3 gap-2.5">
          {PROFILE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-2 px-3 py-2.5 border rounded-md cursor-pointer transition-colors ${
                profile === opt.value
                  ? "border-burgundy bg-burgundy/5 text-burgundy"
                  : "border-stone-border text-charcoal/70 hover:border-burgundy/40"
              }`}
            >
              <input
                type="radio"
                name="profile"
                value={opt.value}
                checked={profile === opt.value}
                onChange={() => setProfile(opt.value)}
                className="accent-burgundy"
              />
              <span className="text-xs font-medium">{opt.label}</span>
            </label>
          ))}
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
            Email <span className="text-burgundy">*</span>
          </label>
          <input name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Phone <span className="text-burgundy">*</span>
          </label>
          <input name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Investment Capital
          </label>
          <select name="capital" defaultValue="" className={inputClass}>
            <option value="">Select…</option>
            {CAPITAL_RANGES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="block text-xs font-medium text-charcoal/60 mb-2">
          Asset Class Interest{" "}
          <span className="text-charcoal/40 font-normal">(select all that apply)</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ASSET_INTERESTS.map((a) => {
            const checked = interests.includes(a);
            return (
              <label
                key={a}
                className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition-colors ${
                  checked
                    ? "border-burgundy bg-burgundy/5 text-burgundy"
                    : "border-stone-border text-charcoal/70 hover:border-burgundy/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleInterest(a)}
                  className="accent-burgundy"
                />
                <span className="text-xs">{a}</span>
              </label>
            );
          })}
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
          "Schedule Strategy Call"
        )}
      </button>
    </form>
  );
}
