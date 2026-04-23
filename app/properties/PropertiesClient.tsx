"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

const TYPES = [
  { label: "All Types", value: "" },
  { label: "Residential", value: "residential" },
  { label: "Condo/Apartment", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Land", value: "residential" },
];

const MIN_PRICES = [
  { label: "No Min", value: "" },
  { label: "$500,000", value: "500000" },
  { label: "$700,000", value: "700000" },
  { label: "$1,000,000", value: "1000000" },
  { label: "$1,500,000", value: "1500000" },
  { label: "$2,000,000", value: "2000000" },
];

const MAX_PRICES = [
  { label: "No Max", value: "" },
  { label: "$700,000", value: "700000" },
  { label: "$1,000,000", value: "1000000" },
  { label: "$1,500,000", value: "1500000" },
  { label: "$2,000,000", value: "2000000" },
  { label: "$3,000,000", value: "3000000" },
  { label: "$5,000,000", value: "5000000" },
];

const BED_OPTIONS = [
  { label: "Any", value: "" },
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
];

function ListingsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg overflow-hidden border border-stone-border animate-pulse"
        >
          <div className="aspect-[4/3] bg-stone-200" />
          <div className="p-4 space-y-2">
            <div className="h-5 bg-stone-200 rounded w-1/3" />
            <div className="h-4 bg-stone-200 rounded w-2/3" />
            <div className="h-3 bg-stone-200 rounded w-1/2" />
            <div className="h-3 bg-stone-200 rounded w-3/4 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PropertiesClient() {
  const [city, setCity] = useState("");
  const [typeIndex, setTypeIndex] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [page, setPage] = useState(1);

  const [listings, setListings] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const LIMIT = 24;
  const totalPages = Math.ceil(total / LIMIT);

  async function fetchData(pageNum = 1) {
    setLoading(true);
    setError(false);
    try {
      const url = new URL("/api/listings", window.location.origin);
      if (city.trim()) url.searchParams.set("city", city.trim());
      const typeVal = TYPES[typeIndex]?.value;
      if (typeVal) url.searchParams.set("type", typeVal);
      if (minPrice) url.searchParams.set("minPrice", minPrice);
      if (maxPrice) url.searchParams.set("maxPrice", maxPrice);
      if (beds) url.searchParams.set("beds", beds);
      url.searchParams.set("top", String(LIMIT));
      url.searchParams.set("page", String(pageNum));

      const res = await fetch(url.toString());
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "API error");
      const merged = [...(data.memberListings ?? []), ...(data.nspListings ?? [])];
      setListings(merged);
      setTotal(data.total ?? merged.length);
    } catch {
      setListings([]);
      setTotal(0);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch on mount
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      fetchData(1);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch() {
    setPage(1);
    fetchData(1);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    fetchData(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* Filter bar */}
      <section className="bg-stone-warm border-b border-stone-border sticky top-16 lg:top-20 z-30">
        <div className="container py-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <label className="text-xs text-charcoal/50 font-medium">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="e.g. Toronto"
                className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-charcoal/50 font-medium">Property Type</label>
              <select
                value={typeIndex}
                onChange={(e) => setTypeIndex(Number(e.target.value))}
                className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
              >
                {TYPES.map((t, i) => (
                  <option key={i} value={i}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-charcoal/50 font-medium">Min Price</label>
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
              >
                {MIN_PRICES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-charcoal/50 font-medium">Max Price</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
              >
                {MAX_PRICES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-charcoal/50 font-medium">Beds</label>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
              >
                {BED_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <p className="text-sm text-charcoal/50">
              {loading
                ? "Loading listings..."
                : `${total.toLocaleString()} ${total === 1 ? "property" : "properties"} found`}
            </p>
          </div>

          {loading ? (
            <ListingsSkeleton />
          ) : error ? (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-charcoal/50 mb-4">
                Unable to load listings right now. Please try again.
              </p>
              <button
                onClick={() => fetchData(page)}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:opacity-90 transition-opacity"
              >
                Retry
              </button>
            </div>
          ) : listings.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2 rounded border border-stone-border text-charcoal/60 hover:border-burgundy hover:text-burgundy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-charcoal/60 px-4">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded border border-stone-border text-charcoal/60 hover:border-burgundy hover:text-burgundy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-charcoal/40 mb-2">No listings found.</p>
              <p className="text-sm text-charcoal/30">Try adjusting your search filters.</p>
            </div>
          )}

          {/* CREA Attribution — required by DDF terms */}
          {!loading && (
            <div className="mt-12 pt-8 border-t border-stone-border text-center">
              <p className="text-xs text-charcoal/40">
                Listing data provided by{" "}
                <a
                  href="https://www.realtor.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/60 hover:text-burgundy transition-colors"
                >
                  REALTOR.ca
                </a>{" "}
                via the CREA Data Distribution Facility (DDF®). Not intended to solicit buyers or sellers
                currently under contract. The trademarks REALTOR®, REALTORS® and the REALTOR® logo are
                controlled by The Canadian Real Estate Association (CREA) and identify real estate professionals
                who are members of CREA.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
