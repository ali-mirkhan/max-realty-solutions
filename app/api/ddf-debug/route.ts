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

  let status: number;
  let responseHeaders: Record<string, string>;
  let rawBody: string;

  try {
    const res = await fetch("https://identity.crea.ca/connect/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    status = res.status;
    responseHeaders = Object.fromEntries(res.headers.entries());
    rawBody = await res.text();
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return {
    status,
    responseHeaders,
    rawBody,
    bodyLength: body.toString().length,
    extraFields: extraFields ?? null,
  };
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

  return Response.json({
    envCheck,
    attempt_no_scope: attempt1,
    attempt_with_scope_DDFApi_Read: attempt2,
  });
}
