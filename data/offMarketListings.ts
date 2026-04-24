export type OffMarketListing = {
  slug: string;
  title: string;
  subtitle: string;
  locationDisplay: string;
  isConfidential: boolean;
  address?: string;
  city?: string;
  category: string;
  hero: {
    type: "image" | "svg-placeholder";
    imagePath?: string;
    placeholderVariant: "markham" | "dufferin" | "grocery-anchor";
  };
  noi: number;
  highlights: {
    label: string;
    value: string;
  }[];
  description: string[];
  tenantSummary: string;
  leaseStructure: string;
  closingNotes?: string;
  neighborhood?: string[];
  transportation?: string[];
  investmentThesis: string[];
  published: boolean;
};

export const offMarketListings: OffMarketListing[] = [
  {
    slug: "markham-development",
    title: "Markham Mixed-Use Development Opportunity",
    subtitle: "3.6-acre approved development site with $2M NOI in-place",
    locationDisplay: "Markham, Ontario",
    isConfidential: true,
    city: "Markham",
    category: "Development Site",
    hero: {
      type: "svg-placeholder",
      placeholderVariant: "markham",
    },
    noi: 2000000,
    highlights: [
      { label: "Net Operating Income", value: "$2,000,000" },
      { label: "Land Area", value: "3.6 acres" },
      { label: "GFA Approved", value: "732,000 sq.ft." },
      { label: "Additional GFA Expected", value: "250,000 sq.ft." },
      { label: "Tenants", value: "AAA Tenants" },
      { label: "Lease Structure", value: "Demolition Clause / Short-Term" },
    ],
    description: [
      "A rare opportunity to acquire a 3.6-acre assembly in Markham, Ontario with significant approved density and strong in-place income during the development horizon.",
      "The property has received approval for 732,000 square feet of Gross Floor Area, with an additional 250,000 square feet expected to be granted by the City — bringing total approved density to nearly 1 million square feet.",
      "All current leases contain demolition clauses, providing the incoming owner with full flexibility to execute on the approved development plan. Short-term lease structure aligns perfectly with redevelopment timing.",
      "Current AAA tenancy generates approximately $2M in annual Net Operating Income, providing meaningful holding income through the entitlement and pre-construction phases.",
    ],
    tenantSummary: "AAA tenants generating stable income through the development horizon.",
    leaseStructure: "All leases include demolition clauses. Short-term lease terms align with redevelopment timeline.",
    investmentThesis: [
      "Markham's population and commercial growth corridor continues to outpace the broader GTA.",
      "Approved density of 732,000 sq.ft. plus additional 250,000 sq.ft. expected from the City represents nearly 1M sq.ft. of future GFA — institutional scale.",
      "Strong current income covers carrying costs through the entitlement and pre-construction period.",
      "Demolition clauses in all leases eliminate tenant displacement risk during redevelopment.",
    ],
    published: true,
  },
  {
    slug: "dufferin-orfus-plaza",
    title: "Dufferin & Orfus Retail Plaza",
    subtitle: "High-exposure corner plaza steps from Yorkdale Mall",
    locationDisplay: "3280 Dufferin Street & 16 Orfus Road, Toronto",
    isConfidential: false,
    address: "3280 Dufferin Street & 16 Orfus Road",
    city: "Toronto",
    category: "Retail Plaza",
    hero: {
      type: "image",
      imagePath: "/dufferin-orfus-plaza.jpg",
      placeholderVariant: "dufferin",
    },
    noi: 500000,
    highlights: [
      { label: "Net Operating Income", value: "$500,000" },
      { label: "Upside Potential", value: "Significant — below-market rents" },
      { label: "Lot Size", value: "1.27 acres" },
      { label: "Lease Structure", value: "All with demolition clauses" },
      { label: "Closing", value: "Short closing preferred" },
    ],
    description: [
      "A high-exposure corner retail plaza at the intersection of Dufferin Street and Orfus Road — one of North Toronto's most trafficked commercial corridors, positioned directly adjacent to Yorkdale Shopping Centre.",
      "Current NOI of approximately $500,000 reflects below-market in-place rents, with substantial upside available on lease renewal or repositioning. All leases contain demolition clauses, preserving full redevelopment optionality for the next owner.",
      "The property sits within one of Toronto's most actively transforming corridors, with major residential intensification underway and Yorkdale Shopping Centre's ongoing expansion enhancing retail synergy across the area.",
    ],
    tenantSummary:
      "Established tenancy including Burger's Priest, Pizza Nova, Master Mechanic, and a full-service car wash — consistent customer draw from the surrounding high-density trade area.",
    leaseStructure: "All current leases include demolition clauses. Short closing preferred.",
    closingNotes: "Short closing preferred.",
    neighborhood: [
      "Directly adjacent to Yorkdale Shopping Centre and Costco",
      "Surrounded by HomeSense, Best Buy, and major brand retail",
      "Active residential intensification across surrounding blocks",
      "Yorkdale Shopping Centre expansion underway, increasing retail synergy",
    ],
    transportation: [
      "Immediate access to Highway 401 & Allen Road",
      "Yorkdale Subway Station within walking distance",
      "TTC bus routes along Dufferin Street with direct connections across Toronto",
      "Minutes from Toronto Pearson International Airport",
    ],
    investmentThesis: [
      "High-exposure corner position at Dufferin & Orfus — one of North Toronto's busiest retail corridors.",
      "Significant below-market rent upside with natural re-lease events ahead.",
      "All leases include demolition clauses, preserving redevelopment optionality.",
      "Rapid densification of surrounding blocks driving both tenant demand and long-term land value.",
      "Excellent connectivity: subway, 401, Allen Road, airport proximity.",
    ],
    published: true,
  },
  {
    slug: "grocery-anchored-gta-retail",
    title: "Grocery-Anchored Retail Plaza",
    subtitle: "$1.7M NOI, 9.775-acre lot, AAA tenants with major grocery anchor",
    locationDisplay: "Ontario — approximately 1 hour from Toronto",
    isConfidential: true,
    category: "Grocery-Anchored Retail",
    hero: {
      type: "svg-placeholder",
      placeholderVariant: "grocery-anchor",
    },
    noi: 1700000,
    highlights: [
      { label: "Net Operating Income", value: "$1,700,000" },
      { label: "Upside Potential", value: "Significant — below-market rents" },
      { label: "Retail Area", value: "78,900+ sq.ft." },
      { label: "Lot Area", value: "9.775 acres (425,798 sq.ft.)" },
      { label: "Anchor Tenant", value: "Major Grocery Store" },
      { label: "Tenancy Quality", value: "AAA Tenants" },
    ],
    description: [
      "A grocery-anchored retail plaza situated on a 9.775-acre site in Ontario, approximately one hour from downtown Toronto. The property combines institutional-grade tenancy with meaningful scale rarely available in this asset class.",
      "The $1.7M in-place NOI reflects current below-market rents — providing a clear path to income growth as leases roll and rents reset to market.",
      "Anchored by a major grocery tenant and supported by AAA national credit tenants, this property offers defensive, essential-service retail income with strong long-term fundamentals.",
    ],
    tenantSummary:
      "AAA tenants with a major grocery store anchor. Defensive, essential-service retail mix.",
    leaseStructure:
      "Stabilized tenancy with below-market rents providing meaningful upside on renewal.",
    investmentThesis: [
      "Grocery-anchored retail has emerged as one of the most defensive commercial asset classes post-2020.",
      "9.775 acres provides scale and optionality rarely available in this asset class.",
      "AAA tenancy with major grocery anchor generates reliable, inflation-resistant income.",
      "Below-market in-place rents provide a natural path to NOI growth.",
      "Located in a high-growth Ontario market within a one-hour drive of the GTA.",
    ],
    published: true,
  },
];

export function getOffMarketListingBySlug(
  slug: string
): OffMarketListing | undefined {
  return offMarketListings.find((l) => l.slug === slug && l.published);
}

export function getPublishedOffMarketListings(): OffMarketListing[] {
  return offMarketListings.filter((l) => l.published);
}
