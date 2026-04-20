import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import blogPosts from "@/data/blogPosts.json";
import type { BlogPost } from "@/lib/types";

const posts = blogPosts as BlogPost[];

export async function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.id === params.id);
  if (!post) return { title: "Article Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) notFound();

  return (
    <>
      <div className="bg-white border-b border-stone-border">
        <div className="container py-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-burgundy transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>

      <article className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main */}
            <div>
              <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-burgundy bg-burgundy/10 rounded mb-4">
                {post.category}
              </span>
              <h1 className="font-serif text-2xl lg:text-4xl font-semibold text-charcoal leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/50 mb-8">
                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
              </div>

              <div className="rounded-lg overflow-hidden aspect-[16/9] relative mb-8">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>

              <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed space-y-4">
                <p>{post.excerpt}</p>
                <p>
                  This is a placeholder article. In a production environment, this content would be loaded
                  from a CMS or database. The blog system is designed to support rich content including
                  headings, images, lists, and embedded calculators.
                </p>
                <h2 className="font-serif text-xl font-semibold text-charcoal mt-8 mb-4">Key Takeaways</h2>
                <ul className="space-y-2">
                  <li>The GTA real estate market continues to evolve with changing interest rates and buyer demand.</li>
                  <li>Understanding local market conditions is essential for making informed decisions.</li>
                  <li>Working with an experienced agent can help you navigate complex transactions.</li>
                </ul>
                <p>
                  For personalized advice about your specific situation, contact one of our experienced
                  agents at Max Realty Solutions.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-24 space-y-6">
                <div className="bg-stone-light rounded-lg p-6">
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Need Expert Advice?</h3>
                  <p className="text-sm text-charcoal/60 mb-4">Our experienced agents are ready to help with your real estate needs.</p>
                  <Link href="/contact" className="block w-full py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:bg-burgundy-dark transition-colors text-center">
                    Contact Us
                  </Link>
                </div>
                <div className="bg-white border border-stone-border rounded-lg p-6">
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Free Calculators</h3>
                  <p className="text-sm text-charcoal/60 mb-4">Estimate mortgage payments, land transfer tax, and more.</p>
                  <Link href="/tools" className="block w-full py-2.5 text-sm font-semibold text-burgundy border border-burgundy/30 rounded-md hover:bg-burgundy/5 transition-colors text-center">
                    Open Calculators
                  </Link>
                </div>
                <div className="bg-white border border-stone-border rounded-lg p-6">
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Are You an Agent?</h3>
                  <p className="text-sm text-charcoal/60 mb-4">Learn about our flexible commission plans and join a brokerage that puts agents first.</p>
                  <Link href="/join" className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
                    Join Max Realty <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
