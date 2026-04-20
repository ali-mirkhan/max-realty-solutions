"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ContactModal from "@/components/ContactModal";

export default function CommercialCTA() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ContactModal isOpen={open} onClose={() => setOpen(false)} title="Inquire About Commercial Opportunities" subtitle="Tell us about your investment criteria and we'll connect you with relevant opportunities." />
      <button onClick={() => setOpen(true)} className="btn-primary">
        Inquire Now <ArrowRight size={16} />
      </button>
    </>
  );
}
