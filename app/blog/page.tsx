// Storyblok CMS integration: fetches blog posts from Storyblok at request time.
// Falls back to static blogPosts.json if Storyblok returns no stories.
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogFilter from "./BlogFilter";
import staticBlogPosts from "@/data/blogPosts.json";
import type { BlogPost } from "@/lib/types";
import { fetchStories } from "@/lib/storyblok";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description: "GTA real estate market updates, buying guides, agent tips, and investment insights from Max Realty Solutions.",
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
  const posts: BlogPost[] =
    stories.length > 0
      ? stories.map(mapStoryToPost)
      : (staticBlogPosts as BlogPost[]);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <>
      <section className="bg-white border-b border-stone-border">
        <div className="container py-12 lg:py-16">
          <p className="section-label">Blog &amp; Resources</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-2">Insights &amp; Guides</h1>
          <p className="text-charcoal/60 max-w-xl">
            Market updates, buying guides, agent tips, and investment insights for the Greater Toronto
            Area real estate market.
          </p>
        </div>
      </section>
      <BlogFilter posts={posts} categories={categories} />
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
