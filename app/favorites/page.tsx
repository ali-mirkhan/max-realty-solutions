"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setReady(true);

    function refresh() {
      setFavorites(readFavorites());
    }
    window.addEventListener("favoritesChanged", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("favoritesChanged", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const count = favorites.length;

  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <div className="mb-10">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-2">
            My Favorites
          </h1>
          {ready && count > 0 && (
            <p className="text-sm text-charcoal/60">
              {count} saved {count === 1 ? "property" : "properties"}
            </p>
          )}
        </div>

        {!ready ? (
          <div className="text-center py-20 text-charcoal/40 text-sm">Loading…</div>
        ) : count === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-5">
              <Heart size={22} className="text-burgundy" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-charcoal mb-2">
              You haven&apos;t saved any listings yet.
            </h2>
            <p className="text-sm text-charcoal/60 mb-8 leading-relaxed">
              Browse our listings and tap the heart icon on any property to save it for later.
            </p>
            <Link href="/properties" className="btn-primary">
              Browse Properties <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
