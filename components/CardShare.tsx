"use client";

import { useState } from "react";

const iconLink = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

const iconCheck = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function CardShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    // Build full share menu in a popover-style: for the card we just copy the link
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleClick}
      aria-label={copied ? "Copied!" : "Copy link to post"}
      title={copied ? "Copied!" : "Copy link"}
      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-150 ${
        copied
          ? "border-green-500 text-green-600 bg-green-50"
          : "border-stone-border text-charcoal/30 hover:border-burgundy hover:text-burgundy hover:bg-burgundy/5"
      }`}
    >
      {copied ? iconCheck : iconLink}
    </button>
  );
}
