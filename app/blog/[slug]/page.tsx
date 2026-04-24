import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getAllPosts, getPostBySlug } from "@/lib/blogData";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };

  const url = `https://www.maxrealtysolutions.com/blog/${params.slug}`;
  const imageUrl = post.image || "https://www.maxrealtysolutions.com/og-default.jpg";
  const description = post.excerpt || post.title;

  return {
    title: `${post.title} | Max Realty Solutions`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      siteName: "Max Realty Solutions",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      {/* Back nav */}
      <div className="bg-white border-b border-stone-border">
        <div className="container py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-burgundy transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>

      <article>
        {/* Hero image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />

        <div className="container py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Category + date */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium text-burgundy bg-burgundy/10 rounded">
                <Tag size={11} />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-charcoal/40">
                <Calendar size={13} />
                {post.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl lg:text-4xl font-semibold text-charcoal leading-tight mb-8">
              {post.title}
            </h1>

            {/* Markdown content */}
            <div className="prose-content">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="font-serif text-2xl font-semibold text-charcoal mt-10 mb-4 leading-snug">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-sans text-lg font-semibold text-charcoal mt-7 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-charcoal/70 leading-relaxed my-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-4 ml-5 space-y-1.5 list-disc list-outside marker:text-burgundy/50">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-charcoal/70 leading-relaxed">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-charcoal">{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <Link
                      href={href ?? "#"}
                      className="text-burgundy hover:underline font-medium"
                    >
                      {children}
                    </Link>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-stone-border">
              <ShareButtons title={post.title} />
            </div>

            {/* CTA */}
            <div className="mt-12 bg-stone-light rounded-xl p-8 border-l-4 border-burgundy">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                Ready to make your move?
              </h3>
              <p className="text-sm text-charcoal/60 mb-5">
                Contact the Max Realty Solutions team today. We are here to help you navigate the
                GTA real estate market with confidence.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-burgundy px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
              >
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>

            {/* Back link */}
            <div className="mt-8 pt-6 border-t border-stone-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline"
              >
                <ArrowLeft size={14} /> Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
