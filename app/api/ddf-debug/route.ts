export const dynamic = "force-dynamic";

function decodeJwtPayload(jwt: string): unknown {
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return { error: "Not a valid JWT (expected 3 parts)" };
    let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4 !== 0) b64 += "=";
    const json = Buffer.from(b64, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch (e) {
    return { error: `JWT decode failed: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export async function GET() {
  const result: Record<string, unknown> = {};

  // 1. Fetch member feed token
  const clientId = process.env.DDF_USERNAME || "";
  const clientSecret = process.env.DDF_PASSWORD || "";

  result.credentials = {
    DDF_USERNAME_set: !!clientId,
    DDF_USERNAME_length: clientId.length,
    DDF_USERNAME_first4: clientId.slice(0, 4) || "NOT SET",
    DDF_PASSWORD_set: !!clientSecret,
    DDF_PASSWORD_length: clientSecret.length,
    DDF_PASSWORD_first4: clientSecret.slice(0, 4) || "NOT SET",
  };

  let accessToken: string | null = null;

  try {
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    body.append("client_id", clientId);
    body.append("client_secret", clientSecret);

    const tokenRes = await fetch("https://identity.crea.ca/connect/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    });

    const rawBody = await tokenRes.text();

    result.token_request = {
      status: tokenRes.status,
      rawBody,
    };

    if (tokenRes.ok) {
      const parsed = JSON.parse(rawBody) as { access_token?: string };
      accessToken = parsed.access_token ?? null;

      // 2. Decode JWT payload
      if (accessToken) {
        result.jwt_payload = decodeJwtPayload(accessToken);
      } else {
        result.jwt_payload = { error: "No access_token in response" };
      }
    }
  } catch (e) {
    result.token_request = {
      error: e instanceof Error ? e.message : String(e),
    };
  }

  // 3. Hit OData endpoint with the bearer token
  if (!accessToken) {
    result.odata = { error: "Skipped — no access token available" };
    return Response.json(result);
  }

  try {
    const odataRes = await fetch(
      "https://ddfapi.realtor.ca/odata/v1/Property?$top=100",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const odataBody = await odataRes.text();
    const contentType = odataRes.headers.get("content-type");

    if (!odataRes.ok) {
      result.odata = {
        status: odataRes.status,
        contentType,
        error: odataBody,
      };
      return Response.json(result);
    }

    let parsed: { value?: unknown[] } = {};
    try {
      parsed = JSON.parse(odataBody) as { value?: unknown[] };
    } catch {
      result.odata = {
        status: odataRes.status,
        contentType,
        error: "Failed to parse OData response as JSON",
        rawBodyPreview: odataBody.slice(0, 500),
      };
      return Response.json(result);
    }

    const listings = Array.isArray(parsed.value) ? parsed.value : [];

    result.odata = {
      status: odataRes.status,
      contentType,
      count: listings.length,
      listings,
    };
  } catch (e) {
    result.odata = {
      error: e instanceof Error ? e.message : String(e),
    };
  }

  return Response.json(result);
}
