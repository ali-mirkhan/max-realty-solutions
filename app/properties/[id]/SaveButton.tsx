"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function SaveButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => setSaved((s) => !s)}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
        saved
          ? "border-red-200 text-red-500 bg-red-50"
          : "border-stone-border text-charcoal/50 hover:border-burgundy/40 hover:text-burgundy"
      }`}
      aria-label={saved ? "Unsave property" : "Save property"}
    >
      <Heart size={14} fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
