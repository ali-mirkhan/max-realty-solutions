"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import staticProperties from "@/data/properties.json";
import type { Property } from "@/lib/types";

const GTA_CITIES = [
  "All", "Toronto", "Vaughan", "Markham", "Richmond Hill", "Thornhill",
  "Mississauga", "Brampton", "Oakville", "Burlington", "Pickering",
  "Ajax", "Whitby", "Oshawa", "Newmarket", "Aurora", "King City",
];

const TYPES = ["All", "Residential", "Commercial"];

const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: 0 },
  { label: "Under $800K", min: 0, max: 800000 },
  { label: "$800K – $1.2M", min: 800000, max: 1200000 },
  { label: "$1.2M – $2M", min: 1200000, max: 2000000 },
  { label: "$2M+", min: 2000000, max: 0 },
];

const BED_OPTIONS = [
  { label: "Any Beds", value: "0" },
  { label: "1+ Beds", value: "1" },
  { label: "2+ Beds", value: "2" },
  { label: "3+ Beds", value: "3" },
  { label: "4+ Beds", value: "4" },
  { label: "5+ Beds", value: "5" },
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
  const [typeFilter, setTypeFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(0);
  const [bedFilter, setBedFilter] = useState("0");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [listings, setListings] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>("nsp");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const LIMIT = 20;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const url = new URL("/api/listings", window.location.origin);
        if (cityFilter !== "All") url.searchParams.set("city", cityFilter);
        const range = PRICE_RANGES[priceFilter];
        if (range.min > 0) url.searchParams.set("minPrice", String(range.min));
        if (range.max > 0) url.searchParams.set("maxPrice", String(range.max));
        if (typeFilter !== "All") url.searchParams.set("type", typeFilter);
        if (bedFilter !== "0") url.searchParams.set("beds", bedFilter);
        if (searchQuery.trim()) url.searchParams.set("search", searchQuery.trim());
        url.searchParams.set("page", String(page));
        url.searchParams.set("limit", String(LIMIT));

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setListings(data.listings ?? []);
        setTotal(data.total ?? 0);
        setSource(data.source ?? "nsp");
      } catch {
        setListings(staticProperties as Property[]);
        setTotal(staticProperties.length);
        setSource("static");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [typeFilter, cityFilter, priceFilter, bedFilter, searchQuery, page]);

  // Reset to page 1 on filter change
  const handleFilterChange = (setter: (v: string) => void, value: string) => {
    setPage(1);
    setter(value);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <>
      {/* Filters */}
      <section className="bg-stone-warm border-b border-stone-border sticky top-16 lg:top-20 z-30">
        <div className="container py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
              <input
                type="text"
                placeholder="Search by address or city..."
                value={searchQuery}
                onChange={(e) => { setPage(1); setSearchQuery(e.target.value); }}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => handleFilterChange(setTypeFilter, e.target.value)}
              className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
            >
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select
              value={cityFilter}
              onChange={(e) => handleFilterChange(setCityFilter, e.target.value)}
              className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
            >
              {GTA_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={String(priceFilter)}
              onChange={(e) => { setPage(1); setPriceFilter(Number(e.target.value)); }}
              className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
            >
              {PRICE_RANGES.map((r, i) => (
                <option key={i} value={String(i)}>{r.label}</option>
              ))}
            </select>

            <select
              value={bedFilter}
              onChange={(e) => handleFilterChange(setBedFilter, e.target.value)}
              className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
            >
              {BED_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
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
              {!loading && source === "nsp" && (
                <span className="ml-2 text-xs text-charcoal/30">· National Shared Pool</span>
              )}
              {!loading && source === "member" && (
                <span className="ml-2 text-xs text-charcoal/30">· Member Feed</span>
              )}
              {!loading && source === "static" && (
                <span className="ml-2 text-xs text-charcoal/30">· Featured Listings</span>
              )}
            </p>
          </div>

          {loading ? (
            <ListingsSkeleton />
          ) : listings.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded border border-stone-border text-charcoal/60 hover:border-burgundy hover:text-burgundy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-charcoal/60 px-4">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
              <p className="font-serif text-xl text-charcoal/40 mb-2">No properties match your criteria</p>
              <p className="text-sm text-charcoal/30">Try adjusting your filters or search terms.</p>
            </div>
          )}

          {/* CREA Attribution — required by DDF terms */}
          {source !== "static" && !loading && (
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
