import type { Metadata } from "next";
import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse residential and commercial listings across the Greater Toronto Area. IDX/DDF-ready property search for Thornhill, Vaughan, Markham, and the GTA.",
};

export default function PropertiesPage() {
  return (
    <>
      <section className="bg-white border-b border-stone-border">
        <div className="container py-12 lg:py-16">
          <p className="section-label">GTA Real Estate</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-2">Find Your Perfect Property</h1>
          <p className="text-charcoal/60 max-w-xl">
            Explore residential, commercial and investment listings across Thornhill, Vaughan, Richmond Hill,
            Markham and the Greater Toronto Area.
          </p>
        </div>
      </section>
      <PropertiesClient />
    </>
  );
}
