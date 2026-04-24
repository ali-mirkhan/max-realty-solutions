import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft, Bed, Bath, Maximize, MapPin, Calendar,
  Ruler, DollarSign, Car, Home, User, Building2,
  ExternalLink, Clock,
} from "lucide-react";
import PropertyInquiry from "./PropertyInquiry";
import PropertyGallery from "./PropertyGallery";
import DescriptionSection from "./DescriptionSection";
import SimilarListings from "./SimilarListings";
import SaveButton from "./SaveButton";
import type { Property } from "@/lib/types";
import { fetchListing } from "@/lib/ddf";
import { formatPrice, formatCAD } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const dynamicParams = true;

function daysOnMarket(dateStr: string | undefined): number | null {
  if (!dateStr) return null;
  const then = new Date(dateStr);
  if (isNaN(then.getTime())) return null;
  return Math.floor((Date.now() - then.getTime()) / (1000 * 60 * 60 * 24));
}

function cleanDescription(text: string): string {
  return text
    .replace(/\s*\(id:\s*\S+\)\s*$/i, "")
    .replace(/\s*\bid:\s*\d+\s*$/i, "")
    .trim();
}

async function getProperty(id: string): Promise<Property | null> {
  console.log(`[property-detail] fetchListing("${id}")`);
  try {
    const result = await fetchListing(id);
    console.log(`[property-detail] fetchListing("${id}") → ${result ? `found (${result.address})` : "null"}`);
    return result;
  } catch (err) {
    console.error(`[property-detail] fetchListing("${id}") threw:`, err);
    return null;
  }
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = await getProperty(params.id);
  if (!property) return { title: "Property Not Found" };

  const url = `https://www.maxrealtysolutions.com/properties/${params.id}`;
  const priceFormatted = property.price ? `$${property.price.toLocaleString()}` : "";
  const title = `${property.address}, ${property.city}${priceFormatted ? ` — ${priceFormatted}` : ""}`;
  const description =
    property.description?.slice(0, 200) ||
    `${property.beds} bed ${property.baths} bath in ${property.city}. ${priceFormatted} via Max Realty Solutions.`;
  const firstImage = property.images?.[0] || property.image;
  const imageUrl = firstImage || "https://www.maxrealtysolutions.com/og-default.jpg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      siteName: "Max Realty Solutions",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
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

  const isLive = true;
  const dom = daysOnMarket(property.listingDate);
  const description = cleanDescription(property.description || "");

  const fullAddress = [
    property.address,
    property.city,
    property.province || "Ontario",
    property.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

  // Key stats — only render cards with data
  type Stat = { Icon: LucideIcon; value: string | number; label: string };
  const stats: Stat[] = [
    ...(property.type === "residential" && property.beds > 0
      ? [{ Icon: Bed, value: property.beds, label: "Bedrooms" }]
      : []),
    ...(property.type === "residential" && property.baths > 0
      ? [{ Icon: Bath, value: property.baths, label: "Bathrooms" }]
      : []),
    ...(property.sqft > 0
      ? [{ Icon: Maximize, value: property.sqft.toLocaleString(), label: "Sq Ft" }]
      : []),
    ...(property.lotSize
      ? [{ Icon: Ruler, value: property.lotSize, label: "Lot Size" }]
      : []),
    ...((property.parking ?? 0) > 0
      ? [{ Icon: Car, value: property.parking!, label: "Parking" }]
      : []),
    ...(property.yearBuilt && property.yearBuilt > 0
      ? [{ Icon: Calendar, value: property.yearBuilt, label: "Year Built" }]
      : []),
    {
      Icon: Home,
      value:
        property.type.charAt(0).toUpperCase() + property.type.slice(1),
      label: "Type",
    },
  ];

  // Property details table rows
  const details: { label: string; value: string }[] = [];
  details.push({
    label: "Property Type",
    value:
      property.type.charAt(0).toUpperCase() + property.type.slice(1),
  });
  details.push({
    label: "Transaction",
    value: property.status.toLowerCase().includes("lease") ? "Lease" : "Sale",
  });
  if (property.mls) details.push({ label: "MLS®", value: property.mls });
  if (dom !== null)
    details.push({
      label: "Days on Market",
      value: dom === 0 ? "Listed today" : `${dom} day${dom === 1 ? "" : "s"}`,
    });
  if (property.yearBuilt && property.yearBuilt > 0)
    details.push({ label: "Year Built", value: String(property.yearBuilt) });
  if (property.lotSize)
    details.push({ label: "Lot Size", value: property.lotSize });
  if ((property.parking ?? 0) > 0)
    details.push({
      label: "Parking",
      value: `${property.parking} space${property.parking === 1 ? "" : "s"}`,
    });
  if (property.propertyTax > 0)
    details.push({
      label: "Annual Tax",
      value: formatCAD(property.propertyTax),
    });
  if (property.postalCode)
    details.push({ label: "Postal Code", value: property.postalCode });
  if (property.city)
    details.push({ label: "City / Municipality", value: property.city });
  if (
    property.neighbourhood &&
    property.neighbourhood !== property.city
  )
    details.push({ label: "Community", value: property.neighbourhood });
  if (property.province)
    details.push({ label: "Province", value: property.province });
  if (property.office)
    details.push({ label: "Listing Office", value: property.office });
  if (property.agentName)
    details.push({ label: "Listing Agent", value: property.agentName });
  if (
    property.originalListPrice &&
    property.originalListPrice > 0 &&
    property.originalListPrice !== property.price
  )
    details.push({
      label: "Original List Price",
      value: formatCAD(property.originalListPrice),
    });

  return (
    <>
      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="container pt-6 pb-2">
          {images.length > 0 ? (
            <PropertyGallery images={images} address={property.address} />
          ) : (
            <div
              className="rounded-xl bg-stone-light flex items-center justify-center"
              style={{ height: 320 }}
            >
              <Home size={48} className="text-charcoal/20" />
            </div>
          )}
        </div>
      </section>

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-stone-border">
        <div className="container py-6">
          {/* Back link + Save/Share */}
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-burgundy transition-colors"
            >
              <ArrowLeft size={14} /> Back to Properties
            </Link>
            <div className="flex items-center gap-2 flex-wrap">
              <SaveButton />
            </div>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-sm font-semibold text-white bg-burgundy rounded-full">
              {property.status}
            </span>
            <span className="px-3 py-1 text-sm font-medium text-charcoal bg-stone-border rounded-full capitalize">
              {property.type}
            </span>
            {property.mls && (
              <span className="px-3 py-1 text-sm font-medium text-charcoal/60 bg-stone-light border border-stone-border rounded-full">
                MLS® {property.mls}
              </span>
            )}
            {isLive && (
              <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
                Live Listing
              </span>
            )}
            {dom !== null && (
              <span className="flex items-center gap-1 text-xs text-charcoal/40 ml-1">
                <Clock size={12} />
                {dom === 0
                  ? "Listed today"
                  : `Listed ${dom} day${dom === 1 ? "" : "s"} ago`}
              </span>
            )}
          </div>

          {/* Address */}
          <h1 className="font-serif text-2xl lg:text-4xl font-semibold text-charcoal mb-1">
            {property.address}
          </h1>
          <p className="text-sm text-charcoal/50 flex items-center gap-1 mb-5">
            <MapPin size={14} className="shrink-0" />
            {[
              property.city,
              property.neighbourhood &&
              property.neighbourhood !== property.city
                ? property.neighbourhood
                : null,
              property.province || "Ontario",
              property.postalCode,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>

          {/* Price */}
          <p className="font-serif text-3xl lg:text-4xl font-bold text-burgundy">
            {formatPrice(property.price, property.type, property.status)}
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────── */}
      <section className="py-10 lg:py-14">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

            {/* ── Left column ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Share */}
              <div className="py-6 border-b border-stone-border">
                <ShareButtons title={`${property.address}, ${property.city}`} />
              </div>

              {/* Key Stats Bar */}
              {stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {stats.map(({ Icon, value, label }) => (
                    <div
                      key={label}
                      className="bg-stone-light rounded-xl p-4 flex flex-col items-center text-center gap-1.5"
                    >
                      <Icon size={18} className="text-burgundy" />
                      <p className="text-base font-semibold text-charcoal leading-tight">
                        {value}
                      </p>
                      <p className="text-xs text-charcoal/40">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {description && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    About This Property
                  </h2>
                  <DescriptionSection description={description} />
                </div>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    Features
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 text-sm text-charcoal/70"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-burgundy shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Listing Agent / Brokerage */}
              {(property.agentName || property.office) && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    Listed By
                  </h2>
                  <div className="border border-stone-border rounded-xl p-5 flex items-start gap-4 bg-stone-warm">
                    <div className="w-12 h-12 rounded-full bg-stone-border flex items-center justify-center shrink-0">
                      <User size={20} className="text-charcoal/40" />
                    </div>
                    <div>
                      {property.agentName && (
                        <p className="font-semibold text-charcoal">
                          {property.agentName}
                        </p>
                      )}
                      {property.office && (
                        <p className="text-sm text-charcoal/60 flex items-center gap-1.5 mt-1">
                          <Building2 size={13} className="shrink-0" />
                          {property.office}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Property Details — two-column grid */}
              {details.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    Property Details
                  </h2>
                  <div className="border border-stone-border rounded-xl overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {details.map(({ label, value }, i) => {
                        const row = Math.floor(i / 2);
                        const isLeft = i % 2 === 0;
                        const isLastOdd =
                          i === details.length - 1 && details.length % 2 !== 0;
                        return (
                          <div
                            key={label}
                            className={[
                              "px-4 py-3 border-b border-stone-border last:border-b-0",
                              row % 2 === 0 ? "bg-stone-warm" : "bg-white",
                              isLeft && !isLastOdd
                                ? "sm:border-r border-stone-border"
                                : "",
                              isLastOdd ? "sm:col-span-2" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            <p className="text-xs text-charcoal/40 mb-0.5">
                              {label}
                            </p>
                            <p className="text-sm text-charcoal font-medium capitalize">
                              {value}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Map / Location */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  Location
                </h2>
                <div className="border border-stone-border rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height={300}
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress + ", Canada")}&output=embed`}
                  />
                  <div className="px-5 py-3 bg-white flex items-center justify-end border-t border-stone-border">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy hover:underline"
                    >
                      View on Google Maps
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* CREA attribution */}
              {isLive && (
                <p className="text-xs text-charcoal/40 border-t border-stone-border pt-4">
                  Listing data provided by REALTOR.ca via the CREA Data
                  Distribution Facility (DDF®). The trademarks MLS®, Multiple
                  Listing Service® and the associated logos are owned by The
                  Canadian Real Estate Association (CREA).
                </p>
              )}
            </div>

            {/* ── Right sidebar ── */}
            <div className="lg:col-span-1">
              <PropertyInquiry
                address={`${property.address}, ${property.city}`}
              />
            </div>
          </div>

          {/* Similar listings — full width below the grid */}
          <SimilarListings city={property.city} currentId={property.id} />
        </div>
      </section>
    </>
  );
}
