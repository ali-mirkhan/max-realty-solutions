import { MetadataRoute } from "next";
import properties from "@/data/properties.json";
import blogPosts from "@/data/blogPosts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.maxrealtysolutions.ca";

  const staticPages = [
    { url: base, priority: 1.0 },
    { url: `${base}/properties`, priority: 0.9 },
    { url: `${base}/services`, priority: 0.8 },
    { url: `${base}/commercial`, priority: 0.8 },
    { url: `${base}/tools`, priority: 0.8 },
    { url: `${base}/join`, priority: 0.9 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/blog`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.7 },
  ].map((p) => ({ ...p, lastModified: new Date(), changeFrequency: "monthly" as const }));

  const propertyPages = properties.map((p) => ({
    url: `${base}/properties/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${base}/blog/${p.id}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...blogPages];
}
