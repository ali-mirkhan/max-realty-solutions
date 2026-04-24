"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import type { Property } from "@/lib/types";

const STORAGE_KEY = "maxRealty_favorites";

function readFavorites(): Property[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Property[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(list: Property[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("favoritesChanged"));
}

export default function SaveButton({ property }: { property?: Property }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!property) return;
    const list = readFavorites();
    setSaved(list.some((p) => p.id === property.id));
  }, [property]);

  function toggle() {
    if (!property) {
      setSaved((s) => !s);
      return;
    }
    const list = readFavorites();
    const exists = list.some((p) => p.id === property.id);
    const next = exists
      ? list.filter((p) => p.id !== property.id)
      : [...list, property];
    writeFavorites(next);
    setSaved(!exists);
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
        saved
          ? "border-red-200 text-red-500 bg-red-50"
          : "border-stone-border text-charcoal/50 hover:border-burgundy/40 hover:text-burgundy"
      }`}
      aria-label={saved ? "Unsave property" : "Save property"}
      aria-pressed={saved}
    >
      <Heart size={14} fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
