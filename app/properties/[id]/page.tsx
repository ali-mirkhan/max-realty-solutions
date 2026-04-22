import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Bed, Bath, Maximize, MapPin, Calendar,
  Ruler, DollarSign, FileText, Car, Home,
} from "lucide-react";
import PropertyInquiry from "./PropertyInquiry";
import PropertyGallery from "./PropertyGallery";
import staticData from "@/data/properties.json";
import type { Property } from "@/lib/types";
import { fetchListing } from "@/lib/ddf";
import { formatPrice, formatCAD } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";

const staticProperties = staticData as Property[];

async function getProperty(id: string): Promise<Property | null> {
  // Try live DDF first
  // Check static data first — avoids DDF network call during static generation
  const staticProp = staticProperties.find((p) => p.id === id);
  if (staticProp) return staticProp;

  // Only reach here for DDF listing keys (dynamic rendering, not pre-rendered)
  try {
    return await fetchListing(id);
  } catch {
    return null;
  }
}

// Allow DDF listing IDs (not in generateStaticParams) to render on demand
export const dynamicParams = true;

// Pre-render only the known static property pages at build time
export async function generateStaticParams() {
  return staticProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = await getProperty(params.id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.address}, ${property.city}`,
    description: property.description || `${property.type} listing in ${property.city}, Ontario`,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await getProperty(params.id);
  if (!property) notFound();

  const images: string[] = property.images?.length
    ? property.images
    : property.image
    ? [property.image]
    : [];

  const isLive = !staticProperties.find((p) => p.id === property.id);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-border">
        <div className="container py-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-burgundy transition-colors"
          >
            <ArrowLeft size={14} /> Back to Properties
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-white">
        <div className="container py-6">
          {images.length > 0 ? (
            <PropertyGallery images={images} address={property.address} />
          ) : (
            <div className="aspect-[21/9] rounded-lg bg-stone-light flex items-center justify-center">
              <Home size={40} className="text-charcoal/20" />
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-xs font-semibold text-white bg-burgundy rounded">
                  {property.status}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium text-charcoal bg-stone-border rounded capitalize">
                  {property.type}
                </span>
                {property.mls && (
                  <span className="text-xs text-charcoal/40">MLS® {property.mls}</span>
                )}
                {isLive && (
                  <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded">
                    Live Listing
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-1">
                {property.address}
              </h1>
              <p className="text-sm text-charcoal/50 flex items-center gap-1 mb-4">
                <MapPin size={14} />
                {property.city}
                {property.neighbourhood && property.neighbourhood !== property.city
                  ? `, ${property.neighbourhood}`
                  : ""}
                {property.province ? `, ${property.province}` : ", Ontario"}
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
                      <p className="text-lg font-semibold text-charcoal">{property.beds || "—"}</p>
                      <p className="text-xs text-charcoal/50">Bedrooms</p>
                    </div>
                    <div className="bg-stone-light rounded-lg p-4 text-center">
                      <Bath size={18} className="text-burgundy mx-auto mb-1" />
                      <p className="text-lg font-semibold text-charcoal">{property.baths || "—"}</p>
                      <p className="text-xs text-charcoal/50">Bathrooms</p>
                    </div>
                  </>
                )}
                {property.sqft > 0 && (
                  <div className="bg-stone-light rounded-lg p-4 text-center">
                    <Maximize size={18} className="text-burgundy mx-auto mb-1" />
                    <p className="text-lg font-semibold text-charcoal">
                      {property.sqft.toLocaleString()}
                    </p>
                    <p className="text-xs text-charcoal/50">Sq Ft</p>
                  </div>
                )}
                {property.yearBuilt && property.yearBuilt > 0 ? (
                  <div className="bg-stone-light rounded-lg p-4 text-center">
                    <Calendar size={18} className="text-burgundy mx-auto mb-1" />
                    <p className="text-lg font-semibold text-charcoal">{property.yearBuilt}</p>
                    <p className="text-xs text-charcoal/50">Year Built</p>
                  </div>
                ) : null}
                {(property.parking ?? 0) > 0 && (
                  <div className="bg-stone-light rounded-lg p-4 text-center">
                    <Car size={18} className="text-burgundy mx-auto mb-1" />
                    <p className="text-lg font-semibold text-charcoal">{property.parking}</p>
                    <p className="text-xs text-charcoal/50">Parking</p>
                  </div>
                )}
              </div>

              {property.description && (
                <>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    About This Property
                  </h2>
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-8">
                    {property.description}
                  </p>
                </>
              )}

              {property.features && property.features.length > 0 && (
                <>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">Features</h2>
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {property.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-charcoal/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-burgundy" />
                        {f}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Property Details table */}
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                Property Details
              </h2>
              <div className="border border-stone-border rounded-lg overflow-hidden mb-8">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "Property Type", value: property.type, Icon: FileText },
                      property.lotSize
                        ? { label: "Lot Size", value: property.lotSize, Icon: Ruler }
                        : null,
                      property.yearBuilt && property.yearBuilt > 0
                        ? { label: "Year Built", value: String(property.yearBuilt), Icon: Calendar }
                        : null,
                      property.propertyTax && property.propertyTax > 0
                        ? {
                            label: "Annual Property Tax",
                            value: formatCAD(property.propertyTax),
                            Icon: DollarSign,
                          }
                        : null,
                      property.office
                        ? { label: "Listing Office", value: property.office, Icon: Home }
                        : null,
                      property.agentName
                        ? { label: "Listing Agent", value: property.agentName, Icon: Home }
                        : null,
                      property.postalCode
                        ? { label: "Postal Code", value: property.postalCode, Icon: MapPin }
                        : null,
                    ]
                      .filter(Boolean)
                      .map((row, i) => (
                        <tr
                          key={row!.label}
                          className={i % 2 === 0 ? "bg-stone-warm" : "bg-white"}
                        >
                          <td className="px-4 py-3 text-charcoal/50">
                            <span className="flex items-center gap-2">
                              {row && <row.Icon size={14} />} {row!.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-charcoal font-medium text-right capitalize">
                            {row!.value}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* CREA attribution for live listings */}
              {isLive && (
                <p className="text-xs text-charcoal/40 border-t border-stone-border pt-4">
                  Listing data provided by REALTOR.ca via the CREA Data Distribution Facility (DDF®).
                  The trademarks MLS®, Multiple Listing Service® and the associated logos are owned by
                  The Canadian Real Estate Association (CREA).
                </p>
              )}
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
