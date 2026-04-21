/**
 * Test CREA DDF feed connectivity via OAuth 2.0 + OData.
 * Run: node scripts/test-ddf.mjs
 */
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    console.warn("Could not load .env.local");
  }
}

loadEnv();

const TOKEN_EP = "https://identity.crea.ca/connect/token";
const DDF_EP = "https://ddfapi.realtor.ca/odata/v1/Property";

async function getToken(clientId, clientSecret) {
  if (!clientId || !clientSecret) return null;
  const auth = "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(TOKEN_EP, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token error ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.access_token;
}

function parseCityNeighbourhood(raw) {
  const m = raw?.match(/^(.+?)\s*\((.+)\)$/);
  if (m) return { city: m[1].trim(), neighbourhood: m[2].trim() };
  return { city: raw ?? "", neighbourhood: "" };
}

async function testFeed(label, clientId, clientSecret) {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`[${label}]`);

  if (!clientId || !clientSecret) {
    console.log("  ❌ Credentials not set in environment");
    return;
  }

  let token;
  try {
    token = await getToken(clientId, clientSecret);
    console.log(`  ✅ OAuth token obtained`);
  } catch (err) {
    console.log(`  ❌ OAuth failed: ${err.message}`);
    return;
  }

  const url = new URL(DDF_EP);
  url.searchParams.set("$filter", "StateOrProvince eq 'Ontario'");
  url.searchParams.set("$top", "1");
  url.searchParams.set("$count", "true");
  url.searchParams.set("$orderby", "OriginalEntryTimestamp desc");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  console.log(`  API HTTP status: ${res.status}`);

  if (!res.ok) {
    const body = await res.text();
    console.log(`  Error: ${body.slice(0, 400)}`);
    return;
  }

  const data = await res.json();
  const total = data["@odata.count"] ?? "unknown";
  const first = data.value?.[0];

  console.log(`  ✅ Total Ontario listings: ${Number(total).toLocaleString()}`);

  if (first) {
    const { city, neighbourhood } = parseCityNeighbourhood(first.City ?? "");
    const price = first.ListPrice ?? first.TotalActualRent ?? first.LeaseAmount ?? 0;
    const isLease = !first.ListPrice && first.TotalActualRent;

    console.log("  First listing:");
    console.log(`    ListingKey:     ${first.ListingKey}`);
    console.log(`    MLS ID:         ${first.ListingId}`);
    console.log(`    Address:        ${first.UnparsedAddress}`);
    console.log(`    City:           ${city}${neighbourhood ? ` (${neighbourhood})` : ""}`);
    console.log(`    Province:       ${first.StateOrProvince}`);
    console.log(`    Price:          $${Number(price).toLocaleString()}${isLease ? "/mo (lease)" : ""}`);
    console.log(`    PropertySubType:${first.PropertySubType}`);
    console.log(`    Bedrooms:       ${first.BedroomsTotal ?? "N/A"}`);
    console.log(`    Bathrooms:      ${first.BathroomsTotalInteger ?? "N/A"}`);
    console.log(`    Living Area:    ${first.LivingArea ?? first.BuildingAreaTotal ?? "N/A"} sqft`);
    console.log(`    Status:         ${first.StandardStatus}`);
    console.log(`    Last updated:   ${first.OriginalEntryTimestamp}`);

    // Fetch with Media to show photo count
    const mediaUrl = `${DDF_EP}('${first.ListingKey}')?$expand=Media`;
    const mediaRes = await fetch(mediaUrl, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    if (mediaRes.ok) {
      const md = await mediaRes.json();
      const photos = md.Media ?? [];
      console.log(`    Photos:         ${photos.length}`);
      if (photos[0]?.MediaURL) {
        console.log(`    First photo:    ${photos[0].MediaURL}`);
      }
    }
  }
}

console.log("CREA DDF Feed Connectivity Test");
console.log("Token endpoint: " + TOKEN_EP);
console.log("API endpoint:   " + DDF_EP);

await testFeed(
  "NSP — National Shared Pool",
  process.env.DDF_NSP_USERNAME,
  process.env.DDF_NSP_PASSWORD
);

await testFeed(
  "Member Feed — Brokerage Own Listings",
  process.env.DDF_USERNAME,
  process.env.DDF_PASSWORD
);

console.log("\n=== Done ===");
