import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Inquiry received",
  description:
    "Thank you — we've received your property management inquiry. A member of our team will respond within one business day.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function ThankYouPage() {
  return (
    <section className="bg-stone-warm border-b border-stone-border min-h-[60vh] flex items-center">
      <div className="container py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={26} className="text-burgundy" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy mb-4">
            Confirmation
          </p>
          <h1 className="font-serif text-3xl lg:text-5xl font-bold text-charcoal leading-tight mb-5">
            Thank you — we&apos;ve received your inquiry.
          </h1>
          <p className="text-base lg:text-lg text-charcoal/70 leading-relaxed mb-8">
            A member of our team will respond within one business day.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
          >
            Return to Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
