import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml, brandedEmailText } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TO = "info@maxrealtysolutions.com";
const INTERNAL_BCC = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";

type Role =
  | "private-lender"
  | "mic"
  | "credit-union"
  | "estate-trustee"
  | "law-firm"
  | "receiver"
  | "investor"
  | "other";

const ROLE_VALUES = [
  "private-lender",
  "mic",
  "credit-union",
  "estate-trustee",
  "law-firm",
  "receiver",
  "investor",
  "other",
] as const;

const ROLE_LABEL: Record<Role, string> = {
  "private-lender": "Private Lender",
  mic: "Mortgage Investment Corporation (MIC)",
  "credit-union": "Credit Union",
  "estate-trustee": "Estate Trustee / Executor",
  "law-firm": "Law Firm / Legal Counsel",
  receiver: "Receiver / Court-Appointed Officer",
  investor: "Investor / Property Owner",
  other: "Other",
};

interface Body {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  role?: Role;
  description?: string;
  /** JS-set token; presence indicates the client ran JavaScript */
  _t?: string;
  /** Milliseconds elapsed between form mount and submit */
  _e?: number;
}

function esc(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function buildLeadHtml(firstName: string): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;">Hi ${esc(firstName)},</p>

    <p style="margin:0 0 16px;">Thank you for reaching out to Max Realty Solutions.</p>

    <p style="margin:0 0 16px;">We&rsquo;ve received your inquiry regarding our <strong>Property &amp; Asset Management Support</strong> service. A member of our team will respond within one business day to discuss the property and the scope of support that would be appropriate.</p>

    <p style="margin:0 0 16px;">If your matter is time-sensitive &mdash; for example, an active enforcement file or an immediate access concern &mdash; please reply to this email and we will prioritize accordingly.</p>

    <p style="margin:24px 0 4px;">Sincerely,</p>
    <p style="margin:0;font-weight:600;">The Max Realty Solutions Team</p>
    <p style="margin:2px 0 0;font-size:13px;color:#555;">Max Realty Solutions Ltd., Brokerage</p>
    <p style="margin:2px 0 0;font-size:13px;color:#555;">8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2</p>
    <p style="margin:2px 0 0;font-size:13px;color:#555;">416-226-6008 &middot; info@maxrealtysolutions.com</p>
  `;

  return brandedEmailHtml({
    title: "Your Property Oversight Inquiry",
    preheader:
      "We've received your inquiry. We typically respond within one business day.",
    bodyHtml,
  });
}

function buildLeadText(firstName: string): string {
  return brandedEmailText({
    bodyText: `Hi ${firstName},

Thank you for reaching out to Max Realty Solutions.

We've received your inquiry regarding our Property & Asset Management Support service. A member of our team will respond within one business day to discuss the property and the scope of support that would be appropriate.

If your matter is time-sensitive — for example, an active enforcement file or an immediate access concern — please reply to this email and we will prioritize accordingly.

Sincerely,
The Max Realty Solutions Team
Max Realty Solutions Ltd., Brokerage
8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2
416-226-6008 · info@maxrealtysolutions.com`,
  });
}

function buildInternalHtml(
  lead: {
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    phone: string;
    role: Role;
    description?: string;
  },
  timestamp: string
): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:13px;color:#666;">Received ${esc(timestamp)} &mdash; Property &amp; Asset Management Support</p>

    <h2 style="font-size:15px;margin:0 0 8px;color:#7D1A2D;">Contact</h2>
    <p style="margin:2px 0;"><strong>Name:</strong> ${esc(lead.firstName)} ${esc(lead.lastName)}</p>
    ${lead.company ? `<p style="margin:2px 0;"><strong>Company / Organization:</strong> ${esc(lead.company)}</p>` : ""}
    <p style="margin:2px 0;"><strong>Email:</strong> <a href="mailto:${esc(lead.email)}" style="color:#7D1A2D;">${esc(lead.email)}</a></p>
    <p style="margin:2px 0;"><strong>Phone:</strong> ${esc(lead.phone)}</p>

    <h2 style="font-size:15px;margin:20px 0 8px;color:#7D1A2D;">Inquiry</h2>
    <p style="margin:2px 0;"><strong>Role:</strong> ${esc(ROLE_LABEL[lead.role])}</p>
    ${lead.description ? `<p style="margin:12px 0 2px;"><strong>Description:</strong></p><p style="margin:0;padding:10px;background:#FFFFFF;border-left:3px solid #7D1A2D;">${esc(lead.description).replace(/\n/g, "<br>")}</p>` : ""}

    <h2 style="font-size:15px;margin:20px 0 8px;color:#7D1A2D;">Source</h2>
    <p style="margin:2px 0;">Property &amp; Asset Management Support form (<code>/services/property-management</code>)</p>
  `;

  return brandedEmailHtml({
    title: "New Property Management Inquiry",
    preheader: `${lead.firstName} ${lead.lastName} (${ROLE_LABEL[lead.role]}) submitted a property management inquiry.`,
    bodyHtml,
  });
}

function buildInternalText(
  lead: {
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    phone: string;
    role: Role;
    description?: string;
  },
  timestamp: string
): string {
  return brandedEmailText({
    bodyText: `New property management inquiry received.

Received: ${timestamp}

Name:      ${lead.firstName} ${lead.lastName}
${lead.company ? `Company:   ${lead.company}\n` : ""}Email:     ${lead.email}
Phone:     ${lead.phone}
Role:      ${ROLE_LABEL[lead.role]}
${lead.description ? `\nDescription:\n${lead.description}\n` : ""}
Source: Property & Asset Management Support form (/services/property-management)`,
  });
}

export async function POST(request: Request) {
  console.log("[property-management-inquiry] entry");

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    console.error("[property-management-inquiry] failed to parse request body");
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // SIGNAL 1: Origin / Referer must come from our own domain.
  const origin = request.headers.get("origin") || "";
  const referer = request.headers.get("referer") || "";
  const allowedHosts = [
    "maxrealtysolutions.com",
    "www.maxrealtysolutions.com",
  ];
  const fromAllowedOrigin = allowedHosts.some(
    (h) => origin.includes(h) || referer.includes(h)
  );

  if (!fromAllowedOrigin) {
    console.log("[property-management-inquiry] blocked: bad origin", {
      origin,
      referer,
    });
    return NextResponse.json(
      { success: false, error: "Invalid request origin" },
      { status: 403 }
    );
  }

  // SIGNAL 2: JavaScript-set token must be present.
  if (!body._t || typeof body._t !== "string" || body._t.length < 4) {
    console.log("[property-management-inquiry] blocked: missing JS token");
    // Silent success — don't reveal the check exists
    return NextResponse.json({ success: true });
  }

  // SIGNAL 3: Time-on-page must be at least 1500ms.
  const elapsedMs = typeof body._e === "number" ? body._e : 0;
  if (elapsedMs < 1500) {
    console.log("[property-management-inquiry] blocked: too fast", {
      elapsedMs,
    });
    return NextResponse.json({ success: true });
  }

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const company = body.company?.trim() || undefined;
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const description = body.description?.trim() || undefined;
  const role: Role | undefined =
    body.role && (ROLE_VALUES as readonly string[]).includes(body.role)
      ? body.role
      : undefined;

  if (!firstName || !lastName || !email || !phone) {
    console.log(
      "[property-management-inquiry] validation failure: missing required field"
    );
    return NextResponse.json(
      {
        success: false,
        error: "First name, last name, email, and phone are required.",
      },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    console.log(
      "[property-management-inquiry] validation failure: invalid email format"
    );
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!role) {
    console.log(
      "[property-management-inquiry] validation failure: missing or invalid role"
    );
    return NextResponse.json(
      { success: false, error: "Please tell us who you are." },
      { status: 400 }
    );
  }

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const cleanLead = {
    firstName,
    lastName,
    company,
    email,
    phone,
    role,
    description,
  };

  // SEND 1 — Lead acknowledgment. Failure here returns 500 to client.
  console.log("[property-management-inquiry] about to send lead acknowledgment");
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: "info@maxrealtysolutions.com",
      subject: "Your Property Oversight Inquiry — Max Realty Solutions",
      html: buildLeadHtml(firstName),
      text: buildLeadText(firstName),
    });

    console.log("[property-management-inquiry] lead send result:", {
      data,
      error,
    });

    if (error) {
      console.error(
        "[property-management-inquiry] lead-email error object:",
        error
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to send your acknowledgment. Please try again or email info@maxrealtysolutions.com directly.",
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[property-management-inquiry] unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to send your acknowledgment. Please try again or email info@maxrealtysolutions.com directly.",
      },
      { status: 500 }
    );
  }

  // SEND 2 — Internal notification. Failure here is logged but does NOT
  // break the user's experience: they already got their acknowledgment.
  console.log(
    "[property-management-inquiry] about to send internal notification"
  );
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: INTERNAL_TO,
      bcc: INTERNAL_BCC,
      replyTo: email,
      subject: `New property management inquiry: ${firstName} ${lastName} (${ROLE_LABEL[role]})`,
      html: buildInternalHtml(cleanLead, timestamp),
      text: buildInternalText(cleanLead, timestamp),
    });

    console.log("[property-management-inquiry] internal send result:", {
      data,
      error,
    });

    if (error) {
      console.error(
        "[property-management-inquiry] internal-notification error object:",
        error
      );
    }
  } catch (err) {
    console.error("[property-management-inquiry] unexpected error:", err);
  }

  return NextResponse.json({ success: true });
}
