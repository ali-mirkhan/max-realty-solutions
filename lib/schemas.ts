import { BUSINESS_INFO } from "./seo";

const ORG_ID = `${BUSINESS_INFO.url}/#organization`;
const WEBSITE_ID = `${BUSINESS_INFO.url}/#website`;
const LOCAL_BUSINESS_ID = `${BUSINESS_INFO.url}/#localbusiness`;

function areaServedAsCities() {
  return BUSINESS_INFO.areaServed.map((city) => ({
    "@type": "City",
    name: city,
  }));
}

function areaServedInOntario() {
  return BUSINESS_INFO.areaServed.map((city) => ({
    "@type": "City",
    name: city,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Ontario, Canada",
    },
  }));
}

function logoImage() {
  return {
    "@type": "ImageObject",
    url: BUSINESS_INFO.logo,
    "@id": `${BUSINESS_INFO.url}/#logo`,
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_INFO.address.streetAddress,
    addressLocality: BUSINESS_INFO.address.addressLocality,
    addressRegion: BUSINESS_INFO.address.addressRegion,
    postalCode: BUSINESS_INFO.address.postalCode,
    addressCountry: BUSINESS_INFO.address.addressCountry,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "@id": ORG_ID,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.brandName,
    url: BUSINESS_INFO.url,
    logo: logoImage(),
    image: BUSINESS_INFO.logo,
    description: BUSINESS_INFO.description,
    telephone: BUSINESS_INFO.telephone,
    faxNumber: BUSINESS_INFO.faxNumber,
    email: BUSINESS_INFO.email,
    address: postalAddress(),
    foundingDate: BUSINESS_INFO.foundingYear,
    priceRange: BUSINESS_INFO.priceRange,
    knowsLanguage: [...BUSINESS_INFO.knowsLanguage],
    areaServed: areaServedAsCities(),
    sameAs: [...BUSINESS_INFO.sameAs],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": LOCAL_BUSINESS_ID,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.brandName,
    url: BUSINESS_INFO.url,
    logo: logoImage(),
    image: BUSINESS_INFO.logo,
    description: BUSINESS_INFO.description,
    telephone: BUSINESS_INFO.telephone,
    faxNumber: BUSINESS_INFO.faxNumber,
    email: BUSINESS_INFO.email,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    foundingDate: BUSINESS_INFO.foundingYear,
    priceRange: BUSINESS_INFO.priceRange,
    knowsLanguage: [...BUSINESS_INFO.knowsLanguage],
    areaServed: areaServedInOntario(),
    sameAs: [...BUSINESS_INFO.sameAs],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BUSINESS_INFO.url,
    name: BUSINESS_INFO.brandName,
    description: BUSINESS_INFO.description,
    inLanguage: "en-CA",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BUSINESS_INFO.url}/properties?city={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

interface PropertyLike {
  id?: string;
  mls?: string;
  address: string;
  city?: string;
  province?: string;
  postalCode?: string;
  price?: number;
  type?: string;
  status?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  description?: string;
  image?: string;
  images?: string[];
}

export function propertyListingSchema(listing: PropertyLike) {
  const cityPart = listing.city ? `, ${listing.city}` : "";
  const name = `${listing.address}${cityPart}`;

  const description = (listing.description ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);

  const images = [
    ...(Array.isArray(listing.images) ? listing.images : []),
    ...(listing.image ? [listing.image] : []),
  ].filter((u, i, arr) => u && arr.indexOf(u) === i);

  const additionalProperty = [
    listing.beds && listing.beds > 0
      ? { "@type": "PropertyValue", name: "Bedrooms", value: listing.beds }
      : null,
    listing.baths && listing.baths > 0
      ? { "@type": "PropertyValue", name: "Bathrooms", value: listing.baths }
      : null,
    listing.sqft && listing.sqft > 0
      ? {
          "@type": "PropertyValue",
          name: "Floor Area",
          value: listing.sqft,
          unitCode: "FTK",
        }
      : null,
    listing.type
      ? { "@type": "PropertyValue", name: "Property Type", value: listing.type }
      : null,
    listing.mls
      ? { "@type": "PropertyValue", name: "MLS®", value: listing.mls }
      : null,
  ].filter(Boolean);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description || name,
    sku: listing.mls || listing.id || undefined,
    brand: {
      "@type": "Organization",
      "@id": ORG_ID,
    },
  };

  if (images.length > 0) schema.image = images;
  if (additionalProperty.length > 0) schema.additionalProperty = additionalProperty;

  if (listing.price && listing.price > 0) {
    schema.offers = {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: listing.id
        ? `${BUSINESS_INFO.url}/properties/${listing.id}`
        : BUSINESS_INFO.url,
      seller: {
        "@type": "RealEstateAgent",
        "@id": ORG_ID,
      },
    };
  }

  return schema;
}

interface RealEstateListingLike {
  slug: string;
  title: string;
  address: string;
  city?: string;
  description?: string;
  image?: string;
}

export function realEstateListingSchema(listing: RealEstateListingLike) {
  const url = `${BUSINESS_INFO.url}/off-market/${listing.slug}`;
  const description = listing.description?.slice(0, 500) || listing.title;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}/#listing`,
    name: listing.title,
    url,
    description,
    image: listing.image ? [listing.image] : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.city || "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    provider: {
      "@type": "RealEstateAgent",
      "@id": ORG_ID,
    },
  };
}

interface PostLike {
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  date?: string;
  modifiedDate?: string;
  image?: string;
  coverImage?: string;
  author?: string;
}

function safeDate(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function articleSchema(post: PostLike) {
  const url = `${BUSINESS_INFO.url}/blog/${post.slug}`;
  const heroImage = post.coverImage || post.image;
  const description = post.description || post.excerpt || post.title;
  const datePublished = safeDate(post.date);
  const dateModified = safeDate(post.modifiedDate) || datePublished;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image: heroImage ? [heroImage] : undefined,
    datePublished,
    dateModified,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : {
          "@type": "Organization",
          "@id": ORG_ID,
        },
    // Publisher must have inline name+logo for Article rich results.
    // Use BUSINESS_INFO.name to match the canonical Organization node so
    // the @id-merged graph has a single consistent `name`.
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: BUSINESS_INFO.name,
      logo: logoImage(),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

interface ServiceLike {
  name: string;
  description: string;
  slug: string;
  serviceType: string;
}

export function serviceSchema(service: ServiceLike) {
  const url = `${BUSINESS_INFO.url}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    url,
    provider: {
      "@type": "RealEstateAgent",
      "@id": ORG_ID,
    },
    areaServed: areaServedAsCities(),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function propertyManagementServiceSchema() {
  const url = `${BUSINESS_INFO.url}/services/property-management`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: "Property & Asset Management Support",
    description:
      "Professional property oversight, reporting, and sale-preparation support for owners, investors, lenders, estate representatives, and legal professionals managing real estate that requires active attention.",
    serviceType: "Property and Asset Management Support",
    url,
    provider: {
      "@type": "RealEstateAgent",
      "@id": ORG_ID,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
      { "@type": "AdministrativeArea", name: "Golden Horseshoe" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Property & Asset Management Support",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vacant Property Oversight",
            description:
              "Inspection, securing, preservation, and reporting for properties that are empty, at risk, or between ownership stages.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mortgage Enforcement Property Support",
            description:
              "Property-side coordination and reporting for private lenders, MICs, and legal teams during default, power of sale, or recovery situations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Estate & Trustee Property Support",
            description:
              "Inspection, maintenance coordination, valuation, and sale preparation for estate properties with outstanding obligations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Investor Asset Support",
            description:
              "Reporting, oversight, and field coordination for out-of-area owners and commercial investors.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sale Preparation & Listing Coordination",
            description:
              "Comparative market analysis, listing through Max Realty Brokerage, MLS exposure, and weekly reporting for properties moving toward disposition.",
          },
        },
      ],
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
