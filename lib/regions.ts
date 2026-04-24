export const GTA_CITIES = new Set([
  "toronto", "mississauga", "brampton", "markham", "vaughan", "richmond hill",
  "oakville", "burlington", "ajax", "whitby", "oshawa", "pickering", "milton",
  "newmarket", "scarborough", "north york", "etobicoke", "aurora", "king city",
  "stouffville",
]);

export const GTA_FEED_CITIES = [
  "Toronto",
  "North York",
  "Scarborough",
  "Etobicoke",
  "Mississauga",
  "Brampton",
  "Markham",
  "Richmond Hill",
  "Vaughan",
  "Oakville",
  "Burlington",
  "Whitby",
];

export const ONTARIO_EXPANDED_CITIES = [
  ...GTA_FEED_CITIES,
  "Hamilton",
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Guelph",
  "Barrie",
  "London",
  "Kingston",
  "Ottawa",
  "Niagara Falls",
  "St. Catharines",
  "Windsor",
];

export type FeedRegion = "gta" | "ontario" | "all";

export function normalizeCity(city: string | undefined | null): string {
  if (!city) return "";
  return city.split("(")[0].trim().toLowerCase();
}

export function isGTACity(city: string | undefined | null): boolean {
  return GTA_CITIES.has(normalizeCity(city));
}
