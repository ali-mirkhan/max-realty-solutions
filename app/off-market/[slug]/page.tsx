import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, MapPin, ExternalLink } from "lucide-react";
import OffMarketPlaceholder from "@/components/OffMarketPlaceholder";
import ObscuredHero from "@/components/ObscuredHero";
import OffMarketInquiryForm from "@/components/OffMarketInquiryForm";
import CommissionProtectionNotice from "@/components/CommissionProtectionNotice";
import ShareButtons from "@/components/ShareButtons";
import JsonLd from "@/components/seo/JsonLd";
import { propertyListingSchema, breadcrumbSchema } from "@/lib/schemas";
import {
  getOffMarketListingBySlug,
  getPublishedOffMarketListings,
} from "@/data/offMarketListings";

const BASE_URL = "https://www.maxrealtysolutions.com";
// TODO: generate branded 1200x630 exports of each SVG placeholder. For now, confidential
// listings share og-default.jpg.
const OG_FALLBACK = `${BASE_URL}/og-default.jpg`;

export async function generateStaticParams() {
  return getPublishedOffMarketListings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const listing = getOffMarketListingBySlug(params.slug);
  if (!listing) return { title: "Off-Market Opportunity Not Found" };

  const url = `${BASE_URL}/off-market/${listing.slug}`;
  const imageUrl =
    !listing.heroObscure && listing.hero.type === "image" && listing.hero.imagePath
      ? `${BASE_URL}${listing.hero.imagePath}`
      : OG_FALLBACK;
  const title = listing.title;
  const description = listing.subtitle;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Max Realty Solutions",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function OffMarketDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const listing = getOffMarketListingBySlug(params.slug);
  if (!listing) notFound();

  const usesImage = listing.hero.type === "image" && listing.hero.imagePath;
  const mapsQuery = listing.address
    ? encodeURIComponent(`${listing.address}, ${listing.city ?? ""}, Ontario, Canada`)
    : null;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.maxrealtysolutions.com" },
          { name: "Off-Market", url: "https://www.maxrealtysolutions.com/off-market" },
          {
            name: listing.title,
            url: `https://www.maxrealtysolutions.com/off-market/${listing.slug}`,
          },
        ])}
      />
      {!listing.isConfidential && listing.address && (
        <JsonLd
          data={propertyListingSchema({
            id: listing.slug,
            address: listing.address,
            city: listing.city || "Toronto",
            description: listing.description?.[0],
            image: listing.hero.imagePath,
          })}
        />
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-xs text-charcoal/50 flex-wrap">
            <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/off-market" className="hover:text-burgundy transition-colors">Off-Market</Link>
            <span>/</span>
            <span className="text-charcoal/70">{listing.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-charcoal">
        <div className="relative w-full aspect-[16/9] max-h-[520px] overflow-hidden">
          {listing.heroObscure && listing.hero.imagePath ? (
            <ObscuredHero
              imagePath={listing.hero.imagePath}
              eyebrow="OFF-MARKET"
              title="Off-Market Retail Opportunity"
              subtitle="Grocery-anchored plaza · 9.775 acres · Ontario"
            />
          ) : usesImage ? (
            <Image
              src={listing.hero.imagePath!}
              alt={listing.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <OffMarketPlaceholder
              variant={listing.hero.placeholderVariant}
              className="w-full h-full"
            />
          )}
        </div>
      </section>

      {/* Title block */}
      <section className="bg-white border-b border-stone-border">
        <div className="container py-8 lg:py-10">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <Link
              href="/off-market"
              className="inline-flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-burgundy transition-colors"
            >
              <ArrowLeft size={14} /> Back to Off-Market
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-burgundy rounded-full">
              Off-Market
            </span>
            <span className="px-3 py-1 text-xs font-medium text-charcoal bg-stone-border rounded-full">
              {listing.category}
            </span>
            {listing.isConfidential && (
              <span className="px-3 py-1 text-xs font-medium text-burgundy bg-burgundy/10 rounded-full inline-flex items-center gap-1.5">
                <Lock size={11} />
                Confidential
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal leading-tight mb-2">
            {listing.title}
          </h1>
          <p className="text-lg text-charcoal/70 mb-4">{listing.subtitle}</p>

          <p className="text-sm text-charcoal/60 flex items-center gap-2">
            {listing.isConfidential ? (
              <Lock size={14} className="text-burgundy" />
            ) : (
              <MapPin size={14} className="text-burgundy" />
            )}
            {listing.locationDisplay}
          </p>

          {listing.isConfidential && (
            <div className="mt-5 bg-burgundy/5 border-l-4 border-burgundy rounded-r-md px-4 py-3 max-w-2xl">
              <p className="text-sm text-charcoal/80">
                <strong className="text-burgundy">Confidential Listing —</strong>{" "}
                Exact location and property details disclosed to qualified parties only after NDA execution.
              </p>
            </div>
          )}

          <div className="mt-6">
            <ShareButtons title={listing.title} />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Highlights */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Key Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {listing.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="bg-stone-light rounded-lg px-4 py-3"
                    >
                      <p className="text-xs text-charcoal/50 uppercase tracking-wider mb-1">
                        {h.label}
                      </p>
                      <p className="text-sm font-semibold text-charcoal">{h.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  About This Opportunity
                </h2>
                <div className="space-y-4 text-charcoal/75 leading-relaxed">
                  {listing.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Gallery (public listings only) */}
              {!listing.isConfidential &&
                listing.galleryImages &&
                listing.galleryImages.length > 0 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                      Gallery
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {listing.galleryImages.map((img, i) => (
                        <div
                          key={img}
                          className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-light"
                        >
                          <Image
                            src={img}
                            alt={`${listing.title} — photo ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Investment Thesis */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Investment Thesis
                </h2>
                <ul className="space-y-3">
                  {listing.investmentThesis.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-burgundy mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tenant Summary */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  Tenant Summary
                </h2>
                <p className="text-sm text-charcoal/75 leading-relaxed">{listing.tenantSummary}</p>
              </div>

              {/* Lease Structure */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  Lease Structure
                </h2>
                <p className="text-sm text-charcoal/75 leading-relaxed">{listing.leaseStructure}</p>
              </div>

              {/* Closing Notes */}
              {listing.closingNotes && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    Closing
                  </h2>
                  <p className="text-sm text-charcoal/75 leading-relaxed">{listing.closingNotes}</p>
                </div>
              )}

              {/* Public-only sections */}
              {!listing.isConfidential && listing.neighborhood && listing.neighborhood.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                    Neighborhood
                  </h2>
                  <ul className="space-y-2">
                    {listing.neighborhood.map((n, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-burgundy mt-2 shrink-0" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!listing.isConfidential && listing.transportation && listing.transportation.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                    Transportation & Access
                  </h2>
                  <ul className="space-y-2">
                    {listing.transportation.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-burgundy mt-2 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!listing.isConfidential && mapsQuery && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                    Location
                  </h2>
                  <div className="border border-stone-border rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height={320}
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                    />
                    <div className="px-5 py-3 bg-white flex items-center justify-end border-t border-stone-border">
                      <a
                        href={`https://maps.google.com/?q=${mapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy hover:underline"
                      >
                        View on Google Maps <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <CommissionProtectionNotice />
            </div>

            {/* Right column — inquiry form */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 bg-white border border-stone-border rounded-xl p-6 lg:p-7">
                <div className="mb-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-burgundy mb-1">
                    Qualified Inquiry
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-charcoal leading-snug">
                    Request Investment Package
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-2 leading-relaxed">
                    Complete the form below to begin the qualification process. NDA required
                    prior to release of detailed financial information.
                  </p>
                </div>
                <OffMarketInquiryForm
                  listingSlug={listing.slug}
                  listingTitle={listing.title}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
