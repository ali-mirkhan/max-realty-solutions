import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Calendar, Ruler, DollarSign, FileText } from "lucide-react";
import PropertyInquiry from "./PropertyInquiry";
import allProperties from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { formatPrice, formatCAD } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";

const properties = allProperties as Property[];

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = properties.find((p) => p.id === params.id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.address}, ${property.city}`,
    description: property.description,
  };
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);
  if (!property) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-border">
        <div className="container py-4">
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-burgundy transition-colors">
            <ArrowLeft size={14} /> Back to Properties
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="bg-white">
        <div className="container py-6">
          <div className="rounded-lg overflow-hidden aspect-[21/9] relative">
            <Image src={property.image} alt={property.address} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-xs font-semibold text-white bg-burgundy rounded">{property.status}</span>
                <span className="px-2.5 py-1 text-xs font-medium text-charcoal bg-stone-border rounded capitalize">{property.type}</span>
                {property.mls && <span className="text-xs text-charcoal/40">MLS# {property.mls}</span>}
              </div>
              <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-1">{property.address}</h1>
              <p className="text-sm text-charcoal/50 flex items-center gap-1 mb-4">
                <MapPin size={14} /> {property.city}, {property.neighbourhood}, Ontario
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <p className="font-serif text-3xl font-bold text-burgundy">
                  {formatPrice(property.price, property.type, property.status)}
                </p>
                <ShareButtons title={`${property.address}, ${property.city}`} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {property.type === "residential" && (
                  <>
                    <div className="bg-stone-light rounded-lg p-4 text-center">
                      <Bed size={18} className="text-burgundy mx-auto mb-1" />
                      <p className="text-lg font-semibold text-charcoal">{property.beds}</p>
                      <p className="text-xs text-charcoal/50">Bedrooms</p>
                    </div>
                    <div className="bg-stone-light rounded-lg p-4 text-center">
                      <Bath size={18} className="text-burgundy mx-auto mb-1" />
                      <p className="text-lg font-semibold text-charcoal">{property.baths}</p>
                      <p className="text-xs text-charcoal/50">Bathrooms</p>
                    </div>
                  </>
                )}
                <div className="bg-stone-light rounded-lg p-4 text-center">
                  <Maximize size={18} className="text-burgundy mx-auto mb-1" />
                  <p className="text-lg font-semibold text-charcoal">{property.sqft.toLocaleString()}</p>
                  <p className="text-xs text-charcoal/50">Sq Ft</p>
                </div>
                <div className="bg-stone-light rounded-lg p-4 text-center">
                  <Calendar size={18} className="text-burgundy mx-auto mb-1" />
                  <p className="text-lg font-semibold text-charcoal">{property.yearBuilt}</p>
                  <p className="text-xs text-charcoal/50">Year Built</p>
                </div>
              </div>

              <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">About This Property</h2>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-8">{property.description}</p>

              <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">Features</h2>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {property.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-charcoal/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-burgundy" />
                    {f}
                  </div>
                ))}
              </div>

              <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">Property Details</h2>
              <div className="border border-stone-border rounded-lg overflow-hidden mb-8">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "Property Type", value: property.type, Icon: FileText },
                      { label: "Lot Size", value: property.lotSize, Icon: Ruler },
                      { label: "Year Built", value: String(property.yearBuilt), Icon: Calendar },
                      ...(property.propertyTax > 0
                        ? [{ label: "Annual Property Tax", value: formatCAD(property.propertyTax), Icon: DollarSign }]
                        : []),
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-stone-warm" : "bg-white"}>
                        <td className="px-4 py-3 text-charcoal/50">
                          <span className="flex items-center gap-2"><row.Icon size={14} /> {row.label}</span>
                        </td>
                        <td className="px-4 py-3 text-charcoal font-medium text-right capitalize">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PropertyInquiry address={`${property.address}, ${property.city}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
