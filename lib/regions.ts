export const GTA_CITIES = new Set([
  "toronto", "mississauga", "brampton", "markham", "vaughan", "richmond hill",
  "oakville", "burlington", "ajax", "whitby", "oshawa", "pickering", "milton",
  "newmarket", "scarborough", "north york", "etobicoke", "aurora", "king city",
  "stouffville",
]);

export function normalizeCity(city: string | undefined | null): string {
  if (!city) return "";
  return city.split("(")[0].trim().toLowerCase();
}

export function isGTACity(city: string | undefined | null): boolean {
  return GTA_CITIES.has(normalizeCity(city));
}
