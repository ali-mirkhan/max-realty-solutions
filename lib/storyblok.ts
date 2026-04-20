// Storyblok CMS integration — fetches stories from the Max Realty Solutions space.
// Falls back gracefully when no stories are found.
import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react/rsc";

let initialised = false;

function init() {
  if (initialised) return;
  storyblokInit({
    accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
    use: [apiPlugin],
  });
  initialised = true;
}

export async function fetchStory(slug: string) {
  init();
  try {
    const api = getStoryblokApi();
    const { data } = await api.get(`cdn/stories/${slug}`, { version: "draft" });
    return data.story;
  } catch {
    return null;
  }
}

export async function fetchStories(starts_with: string) {
  init();
  try {
    const api = getStoryblokApi();
    const { data } = await api.get("cdn/stories", { starts_with, version: "draft" });
    return data.stories ?? [];
  } catch {
    return [];
  }
}
