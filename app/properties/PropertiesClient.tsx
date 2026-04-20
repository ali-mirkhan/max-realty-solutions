"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import allProperties from "@/data/properties.json";
import type { Property } from "@/lib/types";

const properties = allProperties as Property[];
const cities = ["All", ...Array.from(new Set(properties.map((p) => p.city)))];
const types = ["All", "Residential", "Commercial"];
const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $800K", min: 0, max: 800000 },
  { label: "$800K – $1.2M", min: 800000, max: 1200000 },
  { label: "$1.2M – $2M", min: 1200000, max: 2000000 },
  { label: "$2M+", min: 2000000, max: Infinity },
];
const bedOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];

export default function PropertiesClient() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(0);
  const [bedFilter, setBedFilter] = useState("Any");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (typeFilter !== "All" && p.type !== typeFilter.toLowerCase()) return false;
      if (cityFilter !== "All" && p.city !== cityFilter) return false;
      const range = priceRanges[priceFilter];
      if (p.price < range.min || p.price > range.max) return false;
      if (bedFilter !== "Any" && p.beds < parseInt(bedFilter)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !p.address.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q) &&
          !p.neighbourhood.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [typeFilter, cityFilter, priceFilter, bedFilter, searchQuery]);

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
                placeholder="Search by address, city, or neighbourhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy focus:ring-1 focus:ring-burgundy/20 outline-none"
              />
            </div>
            {[
              { value: typeFilter, onChange: setTypeFilter, options: types.map((t) => ({ value: t, label: t })) },
              { value: cityFilter, onChange: setCityFilter, options: cities.map((c) => ({ value: c, label: c })) },
              {
                value: String(priceFilter),
                onChange: (v: string) => setPriceFilter(Number(v)),
                options: priceRanges.map((r, i) => ({ value: String(i), label: r.label })),
              },
              {
                value: bedFilter,
                onChange: setBedFilter,
                options: bedOptions.map((b) => ({ value: b, label: b === "Any" ? "Any Beds" : `${b} Beds` })),
              },
            ].map((sel, i) => (
              <select
                key={i}
                value={sel.value}
                onChange={(e) => sel.onChange(e.target.value)}
                className="px-3 py-2.5 text-sm border border-stone-border rounded-md bg-white focus:border-burgundy outline-none"
              >
                {sel.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <p className="text-sm text-charcoal/50 mb-6">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
          </p>
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-charcoal/40 mb-2">No properties match your criteria</p>
              <p className="text-sm text-charcoal/30">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
