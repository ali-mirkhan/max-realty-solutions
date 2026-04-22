"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

interface Props {
  city: string;
  currentId: string;
}

export default function SimilarListings({ city, currentId }: Props) {
  const [listings, setListings] = useState<Property[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const url = new URL("/api/listings", window.location.origin);
    if (city) url.searchParams.set("city", city);
    url.searchParams.set("limit", "6");

    fetch(url.toString())
      .then((r) => r.json())
      .then((data) => {
        const others = ((data.listings ?? []) as Property[])
          .filter((l) => l.id !== currentId)
          .slice(0, 3);
        setListings(others);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, [city, currentId]);

  if (!ready || listings.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-stone-border">
      <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">More Brokerage Listings</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
