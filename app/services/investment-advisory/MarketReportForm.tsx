"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function MarketReportForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      marketReport: true,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
    };

    if (!payload.name || !payload.email) {
      setError("Name and email are required.");
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
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-burgundy">
        <CheckCircle2 size={16} />
        You&apos;re on the early-access list.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 max-w-md"
    >
      <input
        name="name"
        type="text"
        required
        placeholder="Full name"
        className="flex-1 px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="flex-1 px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity whitespace-nowrap"
      >
        {submitting ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Sending
          </>
        ) : (
          <>
            Request Early Access <ArrowRight size={14} />
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-burgundy mt-1 sm:absolute sm:translate-y-[110%]">
          {error}
        </p>
      )}
    </form>
  );
}
