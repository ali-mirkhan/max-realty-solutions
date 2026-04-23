import { MetadataRoute } from "next";
import blogPosts from "@/data/blogPosts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.maxrealtysolutions.com";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/properties`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/commercial`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/property-management`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/tools`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/join`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/agents`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  const blogPages = blogPosts.map((p) => ({
    url: `${base}/blog/${p.id}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
