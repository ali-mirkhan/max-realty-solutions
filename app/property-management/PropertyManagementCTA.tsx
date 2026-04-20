"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ContactModal from "@/components/ContactModal";

export default function PropertyManagementCTA() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Get a Free Property Management Consultation"
        subtitle="We'll assess your property, discuss your goals, and provide a clear proposal with no obligation."
      />
      <button onClick={() => setOpen(true)} className="btn-primary">
        Get a Free Consultation <ArrowRight size={16} />
      </button>
    </>
  );
}
