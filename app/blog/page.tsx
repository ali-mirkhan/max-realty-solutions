// Storyblok CMS integration: fetches blog posts from Storyblok at request time.
// Falls back to static blogPosts.json if Storyblok returns no stories.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogFilter from "./BlogFilter";
import staticBlogPosts from "@/data/blogPosts.json";
import type { BlogPost } from "@/lib/types";
import { fetchStories } from "@/lib/storyblok";
import { posts as richPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Insights & Market Updates | Max Realty Solutions",
  description: "Expert analysis and news from the Max Realty Solutions team. GTA real estate market updates, buying guides, agent tips, and investment insights.",
  openGraph: {
    title: "Insights & Market Updates | Max Realty Solutions",
    description: "Expert analysis and news from the Max Realty Solutions team. GTA real estate market updates, buying guides, and investment insights.",
  },
};

function mapStoryToPost(story: Record<string, any>): BlogPost {
  const c = story.content ?? {};
  return {
    id: story.slug,
    title: c.title ?? story.name,
    excerpt: c.excerpt ?? "",
    category: c.category ?? "General",
    author: c.author ?? "Max Realty Team",
    date: story.first_published_at ?? story.created_at ?? new Date().toISOString(),
    image: c.image?.filename ?? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    readTime: c.read_time ?? "5 min read",
  };
}

export default async function BlogPage() {
  const stories: Record<string, any>[] = await fetchStories("blog/");
  const cmsPosts: BlogPost[] =
    stories.length > 0
      ? stories.map(mapStoryToPost)
      : (staticBlogPosts as BlogPost[]);

  // Convert richPosts to BlogPost format so they can enter the shared grid
  const richAsBlogPosts: BlogPost[] = richPosts.map((p) => ({
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    image: p.image,
    readTime: p.readTime,
  }));

  // Merge: new rich posts first, then CMS/static (deduplicate by id)
  const richSlugs = new Set(richAsBlogPosts.map((p) => p.id));
  const allPosts: BlogPost[] = [
    ...richAsBlogPosts,
    ...cmsPosts.filter((p) => !richSlugs.has(p.id)),
  ];

  const categories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category)))];

  return (
    <>
      <section className="bg-white border-b border-stone-border">
        <div className="container py-12 lg:py-16">
          <p className="section-label">Insights &amp; Market Updates</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-2">
            Insights &amp; Market Updates
          </h1>
          <p className="text-charcoal/60 max-w-xl">
            Expert analysis and news from the Max Realty Solutions team.
          </p>
        </div>
      </section>
      <BlogFilter posts={allPosts} categories={categories} />
      <section className="py-16 lg:py-20 bg-stone-light">
        <div className="container text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-4">Stay Informed</h2>
          <p className="text-charcoal/60 max-w-md mx-auto mb-6">
            Get the latest GTA market insights and real estate tips delivered to your inbox.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
