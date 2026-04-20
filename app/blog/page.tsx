import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import BlogFilter from "./BlogFilter";
import blogPosts from "@/data/blogPosts.json";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description: "GTA real estate market updates, buying guides, agent tips, and investment insights from Max Realty Solutions.",
};

const posts = blogPosts as BlogPost[];
const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

export default function BlogPage() {
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
