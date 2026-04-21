"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";

export default function AgentContactButton({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ContactModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={`Contact ${name}`}
        subtitle="Send a message and we'll be in touch shortly."
      />
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:bg-burgundy-dark transition-colors"
      >
        Contact
      </button>
    </>
  );
}
