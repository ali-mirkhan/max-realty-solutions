/**
 * Storyblok one-time setup script.
 *
 * NOTE: The Management API requires a personal access token (OAuth), NOT the
 * preview/delivery token. Generate one at:
 *   https://app.storyblok.com/#/me/account → "Personal access tokens"
 * Then set STORYBLOK_MANAGEMENT_TOKEN in your environment before running:
 *   STORYBLOK_MANAGEMENT_TOKEN=<token> npx tsx scripts/setup-storyblok.ts
 */

const SPACE_ID = process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID ?? "291979968077108";
const MGMT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

if (!MGMT_TOKEN) {
  console.error(
    "❌  STORYBLOK_MANAGEMENT_TOKEN is not set.\n" +
    "   Generate a personal access token at https://app.storyblok.com/#/me/account\n" +
    "   then run:  STORYBLOK_MANAGEMENT_TOKEN=<token> npx tsx scripts/setup-storyblok.ts"
  );
  process.exit(1);
}

const headers = {
  Authorization: MGMT_TOKEN,
  "Content-Type": "application/json",
};

async function mapi(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    console.warn(`  ⚠  ${path} → ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

async function main() {
  console.log("🚀  Setting up Storyblok for Max Realty Solutions…\n");

  // ── Components ───────────────────────────────────────────────────────────
  console.log("Creating components…");

  await mapi("/components/", {
    component: {
      name: "blog_post",
      display_name: "Blog Post",
      schema: {
        title:     { type: "text",     pos: 0, display_name: "Title" },
        excerpt:   { type: "textarea", pos: 1, display_name: "Excerpt" },
        content:   { type: "richtext", pos: 2, display_name: "Content" },
        category:  { type: "text",     pos: 3, display_name: "Category" },
        author:    { type: "text",     pos: 4, display_name: "Author" },
        image:     { type: "asset",    pos: 5, display_name: "Featured Image" },
        read_time: { type: "text",     pos: 6, display_name: "Read Time" },
      },
    },
  });
  console.log("  ✓  blog_post");

  await mapi("/components/", {
    component: {
      name: "site_settings",
      display_name: "Site Settings",
      schema: {
        phone:             { type: "text",     pos: 0, display_name: "Phone Number" },
        email:             { type: "text",     pos: 1, display_name: "Email Address" },
        address:           { type: "textarea", pos: 2, display_name: "Office Address" },
        fax:               { type: "text",     pos: 3, display_name: "Fax Number" },
        hero_headline:     { type: "text",     pos: 4, display_name: "Hero Headline" },
        hero_subheadline:  { type: "textarea", pos: 5, display_name: "Hero Subheadline" },
      },
    },
  });
  console.log("  ✓  site_settings");

  await mapi("/components/", {
    component: {
      name: "team_member",
      display_name: "Team Member",
      schema: {
        name:  { type: "text",     pos: 0, display_name: "Full Name" },
        title: { type: "text",     pos: 1, display_name: "Title" },
        bio:   { type: "richtext", pos: 2, display_name: "Bio" },
        photo: { type: "asset",    pos: 3, display_name: "Photo" },
        reco:  { type: "text",     pos: 4, display_name: "RECO Number" },
      },
    },
  });
  console.log("  ✓  team_member\n");

  // ── Blog folder ──────────────────────────────────────────────────────────
  console.log("Creating blog folder…");
  const folderRes = await mapi("/stories/", {
    story: {
      name: "blog",
      slug: "blog",
      is_folder: true,
    },
  });
  const folderId = folderRes?.story?.id;
  console.log(folderId ? `  ✓  folder id=${folderId}` : "  ⚠  folder may already exist\n");

  // ── Site settings story ──────────────────────────────────────────────────
  console.log("Creating site-settings story…");
  await mapi("/stories/", {
    story: {
      name: "Site Settings",
      slug: "site-settings",
      content: {
        component: "site_settings",
        phone: "416-226-6008",
        email: "info@maxrealtysolutions.com",
        address: "8220 Bayview Avenue, Unit 200\nThornhill, ON L3T 2S2",
        fax: "647-499-5895",
        hero_headline: "Find Your Home in the Greater Toronto Area",
        hero_subheadline:
          "Search thousands of listings across Thornhill, Vaughan, Markham, Richmond Hill and the GTA.",
      },
    },
    publish: 1,
  });
  console.log("  ✓  site-settings\n");

  console.log("✅  Setup complete.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
