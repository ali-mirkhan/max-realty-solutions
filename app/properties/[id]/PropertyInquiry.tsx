"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "@/components/ContactModal";

export default function PropertyInquiry({ address }: { address: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="sticky top-24 space-y-6">
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Inquire About This Property"
        subtitle={address}
      />
      <div className="bg-white border border-stone-border rounded-lg p-6">
        <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Interested in this property?</h3>
        <p className="text-sm text-charcoal/60 mb-4">
          Get in touch with one of our experienced agents for a private showing or more information.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="w-full py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:bg-burgundy-dark transition-colors mb-3"
        >
          Request Information
        </button>
        <a
          href="tel:+14162266008"
          className="block w-full py-2.5 text-sm font-semibold text-burgundy border border-burgundy/30 rounded-md hover:bg-burgundy/5 transition-colors text-center"
        >
          Call 416-226-6008
        </a>
      </div>
      <div className="bg-stone-light rounded-lg p-6">
        <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Estimate Your Payments</h3>
        <p className="text-sm text-charcoal/60 mb-4">
          Use our free mortgage calculator to estimate monthly payments for this property.
        </p>
        <Link
          href="/tools"
          className="block w-full py-2.5 text-sm font-semibold text-burgundy border border-burgundy/30 rounded-md hover:bg-burgundy/5 transition-colors text-center bg-white"
        >
          Open Calculator
        </Link>
      </div>
    </div>
  );
}
