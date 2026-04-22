import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Insights & Market Updates | Max Realty Solutions",
  description: "Expert analysis and market news from the Max Realty Solutions team. GTA real estate updates, buying guides, and investment insights.",
  openGraph: {
    title: "Insights & Market Updates | Max Realty Solutions",
    description: "Expert analysis and market news from the Max Realty Solutions team.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-stone-border">
        <div className="container py-12 lg:py-16">
          <p className="section-label">Insights &amp; Market Updates</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-3">
            Insights &amp; Market Updates
          </h1>
          <p className="text-charcoal/60 max-w-xl leading-relaxed">
            Expert analysis and market news from the Max Realty Solutions team.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-stone-border rounded-lg overflow-hidden hover:border-burgundy/20 hover:shadow-lg transition-all duration-200"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "100%", height: "220px", objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Category */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium text-burgundy bg-burgundy/10 rounded mb-3 self-start">
                    <Tag size={11} />
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="font-serif text-lg font-semibold text-charcoal leading-snug mb-2 group-hover:text-burgundy transition-colors">
                    {post.title}
                  </h2>

                  {/* Date */}
                  <p className="flex items-center gap-1.5 text-xs text-charcoal/40 mb-3">
                    <Calendar size={12} />
                    {post.date}
                  </p>

                  {/* Excerpt */}
                  <p className="text-sm text-charcoal/60 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy mt-4">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-stone-light">
        <div className="container text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-4">
            Have a Real Estate Question?
          </h2>
          <p className="text-charcoal/60 max-w-md mx-auto mb-6">
            Our team is available to answer your questions and walk you through the GTA market.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
