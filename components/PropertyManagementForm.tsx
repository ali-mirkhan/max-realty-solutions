"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";

const ROLES: { value: string; label: string }[] = [
  { value: "private-lender", label: "Private Lender" },
  { value: "mic", label: "Mortgage Investment Corporation (MIC)" },
  { value: "credit-union", label: "Credit Union" },
  { value: "estate-trustee", label: "Estate Trustee / Executor" },
  { value: "law-firm", label: "Law Firm / Legal Counsel" },
  { value: "receiver", label: "Receiver / Court-Appointed Officer" },
  { value: "investor", label: "Investor / Property Owner" },
  { value: "other", label: "Other" },
];

export default function PropertyManagementForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bot signals: time-on-page + JS-set token. Set once on mount.
  const formMountedAt = useRef<number>(0);
  const [jsToken, setJsToken] = useState<string>("");

  useEffect(() => {
    formMountedAt.current = Date.now();
    setJsToken("mrs_" + Math.random().toString(36).slice(2, 10));
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const elapsedMs = formMountedAt.current
      ? Date.now() - formMountedAt.current
      : 0;

    const data = new FormData(e.currentTarget);
    const payload = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      role: String(data.get("role") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      _t: jsToken,
      _e: elapsedMs,
    };

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.phone ||
      !payload.role
    ) {
      setError("Please complete all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/property-management-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        throw new Error(body.error ?? "Submission failed");
      }
      router.push("/services/property-management/thank-you");
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

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          Company / Organization
        </label>
        <input name="company" type="text" className={inputClass} />
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

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          I am a... <span className="text-burgundy">*</span>
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

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          Brief description
        </label>
        <textarea
          name="description"
          rows={4}
          placeholder="Tell us briefly about the property and what you're looking for."
          className={inputClass}
        />
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
            Request a Property Oversight Consultation <ArrowRight size={14} />
          </>
        )}
      </button>

      <p className="text-xs italic text-charcoal/55 text-center">
        Initial consultation is complimentary. We typically respond within one business day.
      </p>
    </form>
  );
}
