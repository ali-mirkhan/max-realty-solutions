// Storyblok seed script — creates site-settings, blog folder, and sample blog posts.
//
// IMPORTANT: Requires a personal access token (OAuth), NOT the preview/delivery token.
// Generate one at: https://app.storyblok.com/#/me/account → "Personal access tokens"
//
// Run with:
//   STORYBLOK_MANAGEMENT_TOKEN=<personal-token> node scripts/seed-storyblok.mjs

const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SPACE = process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID ?? "291979968077108";

if (!TOKEN) {
  console.error(
    "❌  STORYBLOK_MANAGEMENT_TOKEN is not set.\n" +
    "   Generate a personal access token at https://app.storyblok.com/#/me/account\n" +
    "   then run:  STORYBLOK_MANAGEMENT_TOKEN=<token> node scripts/seed-storyblok.mjs"
  );
  process.exit(1);
}
const BASE  = `https://mapi.storyblok.com/v1/spaces/${SPACE}/stories/`;

const headers = {
  Authorization: TOKEN,
  "Content-Type": "application/json",
};

async function post(body) {
  const res = await fetch(BASE, { method: "POST", headers, body: JSON.stringify(body) });
  const json = await res.json();
  if (!res.ok) {
    const msg = json?.error ?? JSON.stringify(json);
    throw new Error(`${res.status}: ${msg}`);
  }
  return json;
}

// ── 1. Site Settings ─────────────────────────────────────────────────────────
console.log("Creating site-settings story…");
try {
  const r = await post({
    story: {
      name: "Site Settings",
      slug: "site-settings",
      content: {
        component: "site_settings",
        phone: "416-226-6008",
        email: "info@maxrealtysolutions.com",
        address: "8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2",
        fax: "647-499-5895",
        hero_headline: "Find Your Home in the Greater Toronto Area",
        hero_subheadline:
          "Search thousands of listings across Thornhill, Vaughan, Markham, Richmond Hill and the GTA.",
      },
    },
    publish: 1,
  });
  console.log(`  ✓  site-settings (id=${r.story.id})`);
} catch (e) {
  console.warn(`  ⚠  site-settings skipped: ${e.message}`);
}

// ── 2. Blog folder ───────────────────────────────────────────────────────────
console.log("Creating blog folder…");
let folderId = null;
try {
  const r = await post({
    story: {
      name: "Blog",
      slug: "blog",
      is_folder: true,
      default_root: "blog_post",
    },
  });
  folderId = r.story.id;
  console.log(`  ✓  blog folder (id=${folderId})`);
} catch (e) {
  console.warn(`  ⚠  blog folder skipped: ${e.message}`);
}

// ── 3. Blog posts ────────────────────────────────────────────────────────────
const posts = [
  {
    id: "post-001",
    title: "GTA Housing Market Update: Spring 2026",
    excerpt: "The Greater Toronto Area continues to see shifting dynamics as interest rates stabilize. Here's what buyers and sellers need to know heading into spring.",
    category: "Market Updates",
    author: "Max Realty Team",
    date: "2026-04-15",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    readTime: "5 min read",
  },
  {
    id: "post-002",
    title: "First-Time Buyer's Guide to Ontario Land Transfer Tax",
    excerpt: "Understanding land transfer tax is critical for budgeting your home purchase. Learn about provincial and Toronto municipal LTT, plus first-time buyer rebates.",
    category: "Buying Guides",
    author: "Max Realty Team",
    date: "2026-04-08",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    readTime: "7 min read",
  },
  {
    id: "post-003",
    title: "Why Top Agents Are Leaving Big Brokerages",
    excerpt: "More independent agents are seeking flexible commission structures and real broker support. Here's what's driving the shift in Ontario's real estate industry.",
    category: "Agent Tips",
    author: "Max Realty Team",
    date: "2026-03-28",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
    readTime: "4 min read",
  },
];

console.log("Creating blog post stories…");
for (const p of posts) {
  try {
    const body = {
      story: {
        name: p.title,
        slug: p.id,
        ...(folderId ? { parent_id: folderId } : { path: "blog/" }),
        content: {
          component: "blog_post",
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          author: p.author,
          read_time: p.readTime,
          content: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: p.excerpt }],
              },
            ],
          },
        },
      },
      publish: 1,
    };
    const r = await post(body);
    console.log(`  ✓  ${p.id}: "${p.title}" (id=${r.story.id})`);
  } catch (e) {
    console.warn(`  ⚠  ${p.id} skipped: ${e.message}`);
  }
}

console.log("\n✅  Seed complete.");
