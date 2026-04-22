import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import staticBlogPosts from "@/data/blogPosts.json";
import type { BlogPost } from "@/lib/types";
import { fetchStory, fetchStories } from "@/lib/storyblok";
import { posts as richPosts, getPostBySlug, type BlogPostWithContent } from "@/lib/blogData";
import ShareButtons from "@/components/ShareButtons";
import React from "react";

const staticPosts = staticBlogPosts as BlogPost[];

// ─── Inline markdown renderer ────────────────────────────────────────────────
// Handles the subset used in blogData.ts: ##/### headings, **bold**,
// [text](url) links, - list items, and paragraphs.

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-charcoal">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <Link key={i} href={linkMatch[2]} className="text-burgundy hover:underline font-medium">
          {linkMatch[1]}
        </Link>
      );
    }
    return part;
  });
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];
  let keyIdx = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    nodes.push(
      <ul key={`ul-${keyIdx++}`} className="my-4 ml-5 space-y-1.5 list-disc list-outside marker:text-burgundy/50">
        {listItems.map((item, j) => (
          <li key={j} className="text-charcoal/70 leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      nodes.push(
        <h2 key={keyIdx++} className="font-serif text-2xl font-semibold text-charcoal mt-10 mb-4 leading-snug">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      nodes.push(
        <h3 key={keyIdx++} className="font-sans text-lg font-semibold text-charcoal mt-7 mb-3">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      nodes.push(
        <p key={keyIdx++} className="text-charcoal/70 leading-relaxed my-4">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();

  return <>{nodes}</>;
}

// ─── Storyblok helpers ────────────────────────────────────────────────────────

interface StoryblokStory {
  slug: string;
  name: string;
  first_published_at?: string;
  created_at?: string;
  content?: {
    title?: string;
    excerpt?: string;
    category?: string;
    author?: string;
    image?: { filename?: string };
    read_time?: string;
    content?: unknown;
  };
}

interface RichTextNode {
  type?: string;
  content?: Array<{ text?: string }>;
}

function mapStoryToPost(story: StoryblokStory): BlogPost {
  const c = story.content ?? {};
  return {
    id: story.slug,
    title: c.title ?? story.name,
    excerpt: c.excerpt ?? "",
    category: c.category ?? "General",
    author: c.author ?? "Max Realty Team",
    date: story.first_published_at ?? story.created_at ?? new Date().toISOString(),
    image:
      c.image?.filename ??
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    readTime: c.read_time ?? "5 min read",
  };
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const stories = (await fetchStories("blog/")) as StoryblokStory[];
  const storyIds = stories.map((s) => ({ id: s.slug }));
  const staticIds = staticPosts.map((p) => ({ id: p.id }));
  const richIds = richPosts.map((p) => ({ id: p.slug }));
  const seen = new Set([...storyIds.map((x) => x.id), ...richIds.map((x) => x.id)]);
  const extra = staticIds.filter((x) => !seen.has(x.id));
  return [...storyIds, ...richIds, ...extra];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // 1. Check rich posts first
  const rich = getPostBySlug(params.id);
  if (rich) {
    return {
      title: `${rich.title} | Max Realty Solutions`,
      description: rich.excerpt,
      openGraph: { title: rich.title, description: rich.excerpt },
    };
  }

  // 2. Try Storyblok
  const story = (await fetchStory(`blog/${params.id}`)) as StoryblokStory | null;
  if (story) {
    const post = mapStoryToPost(story);
    return {
      title: `${post.title} | Max Realty Solutions`,
      description: post.excerpt,
      openGraph: { title: post.title, description: post.excerpt },
    };
  }

  // 3. Static fallback
  const post = staticPosts.find((p) => p.id === params.id);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | Max Realty Solutions`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  // 1. Check rich posts (blogData.ts)
  const rich: BlogPostWithContent | undefined = getPostBySlug(params.id);
  if (rich) {
    return <RichPostLayout post={rich} />;
  }

  // 2. Try Storyblok
  const story = (await fetchStory(`blog/${params.id}`)) as StoryblokStory | null;
  const post: BlogPost | null = story
    ? mapStoryToPost(story)
    : (staticPosts.find((p) => p.id === params.id) ?? null);

  if (!post) notFound();

  const rawContent = story?.content?.content;
  const richTextNodes: RichTextNode[] = Array.isArray(rawContent) ? rawContent : [];

  return <CmsPostLayout post={post} richTextNodes={richTextNodes} />;
}

// ─── Rich post layout (blogData.ts posts with full markdown content) ──────────

function RichPostLayout({ post }: { post: BlogPostWithContent }) {
  return (
    <>
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
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
              </div>

              <div className="rounded-lg overflow-hidden aspect-[16/9] relative mb-10">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>

              {/* Rendered markdown content */}
              <div className="max-w-none">
                <MarkdownContent content={post.content} />
              </div>

              {/* CTA */}
              <div className="mt-12 bg-stone-light rounded-xl p-8 border-l-4 border-burgundy">
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                  Ready to make your move?
                </h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  Our experienced team is here to help you navigate the GTA real estate market with confidence.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-burgundy px-5 py-2.5 rounded-md hover:bg-burgundy-dark transition-colors"
                >
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>

              {/* Share */}
              <div className="mt-8 pt-6 border-t border-stone-border">
                <ShareButtons title={post.title} />
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </article>
    </>
  );
}

// ─── CMS / static post layout ─────────────────────────────────────────────────

function CmsPostLayout({ post, richTextNodes }: { post: BlogPost; richTextNodes: RichTextNode[] }) {
  return (
    <>
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
                  {new Date(post.date).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
              </div>

              <div className="rounded-lg overflow-hidden aspect-[16/9] relative mb-8">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>

              <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed space-y-4">
                <p>{post.excerpt}</p>
                {richTextNodes.length > 0 ? (
                  richTextNodes
                    .filter((node) => node.type === "paragraph")
                    .map((node, i) => (
                      <p key={i}>
                        {node.content?.map((c) => c.text ?? "").join("") ?? ""}
                      </p>
                    ))
                ) : (
                  <>
                    <p>
                      This article is part of the Max Realty Solutions resource library. Content is
                      managed via Storyblok CMS and will appear here once published.
                    </p>
                    <h2 className="font-serif text-xl font-semibold text-charcoal mt-8 mb-4">
                      Key Takeaways
                    </h2>
                    <ul className="space-y-2">
                      <li>The GTA real estate market continues to evolve with changing interest rates and buyer demand.</li>
                      <li>Understanding local market conditions is essential for making informed decisions.</li>
                      <li>Working with an experienced agent can help you navigate complex transactions.</li>
                    </ul>
                    <p>
                      For personalized advice about your specific situation, contact one of our
                      experienced agents at Max Realty Solutions.
                    </p>
                  </>
                )}
              </div>

              {/* Share */}
              <div className="mt-10 pt-6 border-t border-stone-border">
                <ShareButtons title={post.title} />
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </article>
    </>
  );
}

// ─── Shared sidebar ───────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside>
      <div className="sticky top-24 space-y-6">
        <div className="bg-stone-light rounded-lg p-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Need Expert Advice?</h3>
          <p className="text-sm text-charcoal/60 mb-4">
            Our experienced agents are ready to help with your real estate needs.
          </p>
          <Link
            href="/contact"
            className="block w-full py-2.5 text-sm font-semibold text-white bg-burgundy rounded-md hover:bg-burgundy-dark transition-colors text-center"
          >
            Contact Us
          </Link>
        </div>
        <div className="bg-white border border-stone-border rounded-lg p-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Free Calculators</h3>
          <p className="text-sm text-charcoal/60 mb-4">
            Estimate mortgage payments, land transfer tax, and more.
          </p>
          <Link
            href="/tools"
            className="block w-full py-2.5 text-sm font-semibold text-burgundy border border-burgundy/30 rounded-md hover:bg-burgundy/5 transition-colors text-center"
          >
            Open Calculators
          </Link>
        </div>
        <div className="bg-white border border-stone-border rounded-lg p-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">Are You an Agent?</h3>
          <p className="text-sm text-charcoal/60 mb-4">
            Learn about our flexible commission plans and join a brokerage that puts agents first.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline"
          >
            Join Max Realty <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
