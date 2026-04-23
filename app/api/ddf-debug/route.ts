export const dynamic = "force-dynamic";

function peek(val: string | undefined): string {
  if (!val) return "NOT SET";
  return `"${val.slice(0, 4)}..." (${val.length} chars)`;
}

async function attemptTokenFetch(extraFields?: Record<string, string>) {
  const clientId = process.env.DDF_NSP_USERNAME || "";
  const clientSecret = process.env.DDF_NSP_PASSWORD || "";

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);
  if (extraFields) {
    for (const [k, v] of Object.entries(extraFields)) {
      body.append(k, v);
    }
  }

  try {
    const res = await fetch("https://identity.crea.ca/connect/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return {
      status: res.status,
      responseHeaders: Object.fromEntries(res.headers.entries()),
      rawBody: await res.text(),
      bodyLength: body.toString().length,
      extraFields: extraFields ?? null,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.DDF_NSP_USERNAME || "";
  const clientSecret = process.env.DDF_NSP_PASSWORD || "";
  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);
  try {
    const res = await fetch("https://identity.crea.ca/connect/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) return null;
    const data = await res.json() as { access_token?: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

async function odataFetch(label: string, url: string, accessToken: string) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
      cache: "no-store",
    });
    const body = await res.text();
    return {
      label,
      status: res.status,
      fetchedUrl: res.url || url,
      constructedUrl: url,
      contentType: res.headers.get("content-type"),
      bodyPreview: body.slice(0, 500),
    };
  } catch (err) {
    return {
      label,
      constructedUrl: url,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function GET() {
  const envCheck = {
    DDF_NSP_USERNAME: peek(process.env.DDF_NSP_USERNAME),
    DDF_NSP_PASSWORD: peek(process.env.DDF_NSP_PASSWORD),
    DDF_USERNAME: peek(process.env.DDF_USERNAME),
    DDF_PASSWORD: peek(process.env.DDF_PASSWORD),
    CREA_TOKEN_URL: peek(process.env.CREA_TOKEN_URL),
    CREA_NSP_USERNAME: peek(process.env.CREA_NSP_USERNAME),
    CREA_NSP_PASSWORD: peek(process.env.CREA_NSP_PASSWORD),
    CREA_MEMBER_USERNAME: peek(process.env.CREA_MEMBER_USERNAME),
    CREA_MEMBER_PASSWORD: peek(process.env.CREA_MEMBER_PASSWORD),
  };

  const [attempt1, attempt2] = await Promise.all([
    attemptTokenFetch(),
    attemptTokenFetch({ scope: "DDFApi_Read" }),
  ]);

  const accessToken = await getAccessToken();
  const tokenAvailable = !!accessToken;

  let odataResults;
  if (!accessToken) {
    odataResults = { error: "No access token — all OData tests skipped" };
  } else {
    // Test 1: plain URL string, $ intact
    const url1 = "https://ddfapi.realtor.ca/odata/v1/Property?$top=5";

    // Test 2: URLSearchParams — shows if $ becomes %24
    const p2 = new URLSearchParams();
    p2.append("$top", "5");
    const url2 = `https://ddfapi.realtor.ca/odata/v1/Property?${p2.toString()}`;

    // Test 3: lowercase REST-style path
    const url3 = "https://ddfapi.realtor.ca/property?$top=5";

    // Test 4: City filter, plain string concatenation
    const url4 = "https://ddfapi.realtor.ca/odata/v1/Property?$top=5&$filter=City eq 'Toronto'";

    // Test 5: City filter, filter value URL-encoded
    const url5 = "https://ddfapi.realtor.ca/odata/v1/Property?$top=5&$filter=" + encodeURIComponent("City eq 'Toronto'");

    odataResults = await Promise.all([
      odataFetch("odata_test_1_plain_url", url1, accessToken),
      odataFetch("odata_test_2_urlsearchparams", url2, accessToken),
      odataFetch("odata_test_3_lowercase_path", url3, accessToken),
      odataFetch("odata_test_4_city_filter_plain", url4, accessToken),
      odataFetch("odata_test_5_city_filter_encoded", url5, accessToken),
    ]);
  }

  return Response.json({
    envCheck,
    tokenAvailable,
    attempt_no_scope: attempt1,
    attempt_with_scope_DDFApi_Read: attempt2,
    odataResults,
  });
}
