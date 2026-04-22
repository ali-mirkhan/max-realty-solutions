export interface Property {
  id: string;
  type: "residential" | "commercial";
  status: string;
  price: number;
  address: string;
  city: string;
  neighbourhood: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  description: string;
  features: string[];
  yearBuilt: number;
  lotSize: string;
  propertyTax: number;
  mls?: string;
  // DDF-supplied extras (optional — not present in static data)
  province?: string;
  postalCode?: string;
  images?: string[];
  office?: string;
  parking?: number;
  agentName?: string;
  listingDate?: string;
  originalListPrice?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}
