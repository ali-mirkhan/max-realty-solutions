import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "Real Estate Calculators",
  description:
    "Free Ontario-specific real estate calculators: mortgage, land transfer tax, closing costs, affordability, property tax, and refinance break-even.",
};

export default function ToolsPage() {
  return (
    <>
      <section className="bg-white border-b border-stone-border">
        <div className="container py-12 lg:py-16">
          <p className="section-label">Free Tools</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-2">
            Real Estate Calculators
          </h1>
          <p className="text-charcoal/60 max-w-xl">
            Ontario-specific calculators to help you plan your purchase, estimate costs, and make
            informed decisions.
          </p>
        </div>
      </section>
      <ToolsClient />
    </>
  );
}
