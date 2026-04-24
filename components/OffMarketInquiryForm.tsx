"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import CommissionProtectionNotice from "@/components/CommissionProtectionNotice";

interface Props {
  listingSlug: string;
  listingTitle: string;
}

type Role = "principal" | "representative";

export default function OffMarketInquiryForm({ listingSlug, listingTitle }: Props) {
  const [role, setRole] = useState<Role>("principal");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      listingSlug,
      listingTitle,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      role,
      brokerage: role === "representative" ? String(data.get("brokerage") ?? "").trim() : "",
      licenseNumber:
        role === "representative" ? String(data.get("licenseNumber") ?? "").trim() : "",
      capitalAcknowledged: data.get("capital") === "on",
      source: String(data.get("source") ?? "").trim(),
      confidentialityAcknowledged: data.get("confidentiality") === "on",
    };

    if (!payload.name || !payload.email || !payload.phone) {
      setError("Please complete all required fields.");
      setSubmitting(false);
      return;
    }

    if (!payload.confidentialityAcknowledged) {
      setError("You must acknowledge the confidentiality notice to proceed.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/off-market-inquiry", {
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
      <div className="bg-white border border-stone-border rounded-xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-burgundy" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          Thank you — we&apos;ve received your inquiry.
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          A member of our investment team will be in touch within one business day.
          Please check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Phone <span className="text-burgundy">*</span>
          </label>
          <input name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1">
            Company / Investment Entity
          </label>
          <input name="company" type="text" className={inputClass} />
        </div>
      </div>

      <div>
        <p className="block text-xs font-medium text-charcoal/60 mb-2">
          Your Role <span className="text-burgundy">*</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex items-center gap-2 text-sm text-charcoal/80 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="principal"
              checked={role === "principal"}
              onChange={() => setRole("principal")}
              className="accent-burgundy"
            />
            Principal / Direct Buyer
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal/80 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="representative"
              checked={role === "representative"}
              onChange={() => setRole("representative")}
              className="accent-burgundy"
            />
            Licensed Buyer Representative
          </label>
        </div>
      </div>

      {role === "representative" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-charcoal/60 mb-1">
              Brokerage Name
            </label>
            <input name="brokerage" type="text" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal/60 mb-1">
              License Number
            </label>
            <input name="licenseNumber" type="text" className={inputClass} />
          </div>
        </div>
      )}

      <label className="flex items-start gap-3 text-sm text-charcoal/80 cursor-pointer">
        <input
          name="capital"
          type="checkbox"
          className="mt-1 accent-burgundy"
        />
        <span>
          I have immediate access to investment capital at the scale implied by this opportunity.
        </span>
      </label>

      <div>
        <label className="block text-xs font-medium text-charcoal/60 mb-1">
          How did you hear about this opportunity?
        </label>
        <input name="source" type="text" className={inputClass} />
      </div>

      <label className="flex items-start gap-3 text-sm text-charcoal/80 cursor-pointer bg-stone-light rounded-md p-4">
        <input
          name="confidentiality"
          type="checkbox"
          required
          className="mt-1 accent-burgundy"
        />
        <span className="text-xs leading-relaxed">
          I acknowledge that this is an off-market, confidential investment opportunity. I agree
          not to share information disclosed through this inquiry with third parties without
          written consent from Max Realty Solutions Ltd., Brokerage, and I understand that a
          formal Non-Disclosure Agreement will be required prior to receiving detailed financial
          and location information. <span className="text-burgundy">*</span>
        </span>
      </label>

      <CommissionProtectionNotice />

      {error && (
        <p className="text-sm text-burgundy bg-burgundy/5 border border-burgundy/20 rounded-md px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          "Request Investment Package"
        )}
      </button>
    </form>
  );
}
