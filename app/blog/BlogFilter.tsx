"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export default function BlogFilter({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => active === "All" ? posts : posts.filter((p) => p.category === active), [active, posts]);

  return (
    <>
      <section className="bg-stone-warm border-b border-stone-border">
        <div className="container py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${active === cat ? "bg-burgundy text-white" : "bg-white border border-stone-border text-charcoal/60 hover:border-burgundy/30 hover:text-burgundy"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="container">
          <p className="text-sm text-charcoal/50 mb-6">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                <div className="bg-white border border-stone-border rounded-lg overflow-hidden hover:border-burgundy/20 transition-all hover:shadow-lg">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-burgundy bg-burgundy/10 rounded mb-3">{post.category}</span>
                    <h3 className="font-serif text-lg font-semibold text-charcoal mb-2 group-hover:text-burgundy transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-charcoal/40">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
