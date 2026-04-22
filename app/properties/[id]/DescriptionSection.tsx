"use client";

import { useState } from "react";

interface Props {
  description: string;
}

export default function DescriptionSection({ description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const paragraphs = description.split(/\n+/).filter(Boolean);
  const needsToggle = description.length > 450;

  return (
    <div>
      <div className={`relative ${!expanded && needsToggle ? "max-h-28 overflow-hidden" : ""}`}>
        <div className="space-y-3 text-sm text-charcoal/70 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {!expanded && needsToggle && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
      {needsToggle && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-medium text-burgundy hover:underline"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
