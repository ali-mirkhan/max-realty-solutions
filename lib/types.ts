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
  mls: string;
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
