"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";

const ROLES: { value: "investor" | "broker" | "exploring"; label: string }[] = [
  { value: "investor", label: "An investor" },
  { value: "broker", label: "A broker" },
  { value: "exploring", label: "Exploring" },
];

export default function BriefingForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      role: String(data.get("role") ?? "").trim(),
      website: String(data.get("website") ?? ""), // honeypot
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.role) {
      setError("Please complete all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/briefing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        throw new Error(body.error ?? "Submission failed");
      }
      router.push("/services/investment-advisory/thank-you");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email info@maxrealtysolutions.com or try again."
      );
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            First Name <span className="text-burgundy">*</span>
          </label>
          <input name="firstName" type="text" required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Last Name <span className="text-burgundy">*</span>
          </label>
          <input name="lastName" type="text" required className={inputClass} />
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
            Phone
          </label>
          <input name="phone" type="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          I am <span className="text-burgundy">*</span>
        </label>
        <select name="role" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select…
          </option>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
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
          <>
            Send Me the Briefing <ArrowRight size={14} />
          </>
        )}
      </button>

      <p className="text-xs italic text-charcoal/55 text-center">
        Sent to your inbox immediately. We respect your inbox — no automated drip sequence.
      </p>
    </form>
  );
}
