export const dynamic = "force-dynamic";

const TOKEN_URL = "https://identity.crea.ca/connect/token";
const ODATA_URL = "https://ddfapi.realtor.ca/odata/v1/Property";

async function getToken(): Promise<string | null> {
  const clientId = process.env.DDF_NSP_USERNAME || "";
  const clientSecret = process.env.DDF_NSP_PASSWORD || "";
  if (!clientId || !clientSecret) return null;

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

async function runFilterTest(
  token: string,
  label: string,
  filter: string,
  extraParams = "$top=5"
): Promise<Record<string, unknown>> {
  const url = `${ODATA_URL}?${extraParams}&$filter=${encodeURIComponent(filter)}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    const status = res.status;
    if (!res.ok) {
      const errText = await res.text();
      return { label, filter, url, status, error: errText.slice(0, 300) };
    }
    const data = (await res.json()) as { value?: Array<Record<string, unknown>> };
    const values = Array.isArray(data.value) ? data.value : [];
    return {
      label,
      filter,
      url,
      status,
      count: values.length,
      firstCity: values[0]?.City ?? null,
    };
  } catch (e) {
    return { label, filter, url, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function GET() {
  const result: Record<string, unknown> = {};

  const token = await getToken();
  if (!token) {
    return Response.json({ error: "Failed to get NSP token — check DDF_NSP_USERNAME / DDF_NSP_PASSWORD" });
  }
  result.token = "OK";

  const city = "Richmond Hill";

  const [t1, t2, t3, t4, t5] = await Promise.all([
    runFilterTest(token, "test_1_exact_eq",          `City eq '${city}'`),
    runFilterTest(token, "test_2_contains",           `contains(City, '${city}')`),
    runFilterTest(token, "test_3_startswith",         `startswith(City, '${city}')`),
    runFilterTest(token, "test_4_contains_tolower",   `contains(tolower(City), tolower('${city.toLowerCase()}'))`),
    runFilterTest(token, "test_5_indexof",            `indexof(City, '${city}') ge 0`),
  ]);

  result.test_1_exact_eq        = t1;
  result.test_2_contains        = t2;
  result.test_3_startswith      = t3;
  result.test_4_contains_tolower = t4;
  result.test_5_indexof         = t5;

  // test_6: no city filter — sample 10 Ontario listings to see raw City values
  try {
    const url = `${ODATA_URL}?$top=10&$filter=${encodeURIComponent("StateOrProvince eq 'Ontario'")}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { value?: Array<Record<string, unknown>> };
      const values = Array.isArray(data.value) ? data.value : [];
      result.test_6_ontario_city_sample = {
        label: "test_6_no_filter_sample",
        url,
        status: res.status,
        count: values.length,
        cities: values.map((v) => v.City),
      };
    } else {
      const errText = await res.text();
      result.test_6_ontario_city_sample = { status: res.status, error: errText.slice(0, 300) };
    }
  } catch (e) {
    result.test_6_ontario_city_sample = { error: e instanceof Error ? e.message : String(e) };
  }

  return Response.json(result);
}
