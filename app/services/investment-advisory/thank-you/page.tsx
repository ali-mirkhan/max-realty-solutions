import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowRight, CheckCircle2, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Briefing on its way",
  description:
    "Your investor briefing — The Off-Market Advantage — is on its way. Check your inbox for the download link.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-stone-warm border-b border-stone-border">
        <div className="container py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={26} className="text-burgundy" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burgundy mb-4">
              Confirmation
            </p>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold text-charcoal leading-tight mb-5">
              Your briefing is on its way.
            </h1>
            <p className="text-base lg:text-lg text-charcoal/70 leading-relaxed mb-8">
              Check your inbox for the download link to <em>The Off-Market Advantage</em>.
              If it doesn&apos;t arrive within a few minutes, check spam or contact us at{" "}
              <a
                href="mailto:info@maxrealtysolutions.com"
                className="text-burgundy hover:underline"
              >
                info@maxrealtysolutions.com
              </a>
              .
            </p>

            <a
              href="/max-realty-off-market-advantage.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
            >
              <Download size={16} /> Download Briefing Now
            </a>
          </div>
        </div>
      </section>

      {/* Continue the conversation */}
      <section className="bg-white py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="section-label">Continue the conversation</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Discussing a specific opportunity?
            </h2>
            <p className="text-charcoal/70 leading-relaxed">
              If you have an active mandate or are evaluating a specific GTA commercial asset,
              Shahin Mirkhan offers a thirty-minute confidential conversation to discuss how
              Max Realty&apos;s off-market deal flow may align with your investment thesis. No
              obligation, strict confidentiality.
            </p>
          </div>

          <div className="bg-stone-light border border-stone-border rounded-xl p-7 lg:p-9 text-center">
            <Link
              href="/services/investment-advisory#strategy-form"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
            >
              Schedule a Confidential Call <ArrowRight size={14} />
            </Link>

            <div className="mt-6 pt-5 border-t border-stone-border/70">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3">
                Or reach out directly
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-charcoal/75">
                <a
                  href="tel:+14162266008"
                  className="inline-flex items-center gap-1.5 hover:text-burgundy transition-colors"
                >
                  <Phone size={14} className="text-burgundy" /> 416-226-6008
                </a>
                <a
                  href="mailto:info@maxrealtysolutions.com"
                  className="inline-flex items-center gap-1.5 hover:text-burgundy transition-colors"
                >
                  <Mail size={14} className="text-burgundy" /> info@maxrealtysolutions.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
