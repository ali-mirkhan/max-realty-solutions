import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Lead receives the email; brokerage is BCC'd. Both addresses are server-only.
const INTERNAL_BCC_PRIMARY = "info@maxrealtysolutions.com";
const INTERNAL_BCC_SECONDARY = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";
const PDF_URL =
  "https://www.maxrealtysolutions.com/max-realty-off-market-advantage.pdf";

type Role = "investor" | "broker" | "exploring";

interface BriefingBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: Role;
  /** Honeypot — bots fill this; humans never see it */
  website?: string;
}

const ROLE_LABEL: Record<Role, string> = {
  investor: "An investor",
  broker: "A broker",
  exploring: "Exploring",
};

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

function buildText(firstName: string): string {
  return `Hi ${firstName},

Thank you for requesting "The Off-Market Advantage" — Max Realty's investor briefing on
off-market commercial real estate in the Greater Toronto Area.

Download the briefing here:
${PDF_URL}

This is a 10-page briefing covering:
 · The current state of GTA commercial real estate (Q1 2026)
 · Why off-market deal flow is increasingly the institutional default
 · A four-criteria framework for evaluating off-market opportunities
 · Three mistakes investors make in GTA commercial real estate
 · How Max Realty sources, qualifies, and presents off-market deals

If you'd like to discuss a specific deployment thesis, an active mandate, or whether your
capital aligns with what we currently have access to off-market, I would welcome a
thirty-minute confidential conversation.

Direct: 416-226-6008
Email: info@maxrealtysolutions.com

Best regards,
Shahin Mirkhan
Founder & Broker of Record
Max Realty Solutions Ltd., Brokerage
Licensed Ontario Realtor since 1988

---
This e-mail and any attachments are confidential. Cooperating brokerage commission protected on listings.
`;
}

function buildHtml(firstName: string, lead: BriefingBody): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 640px; margin: 0 auto; background: #FDF8EE; color: #2C2C2C;">
      <div style="background: #7D1A2D; padding: 28px 32px; text-align: center;">
        <h1 style="color: #FDF8EE; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.02em;">Max Realty Solutions</h1>
        <p style="color: rgba(253,248,238,0.85); margin: 6px 0 0; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;">Investor Briefing</p>
      </div>

      <div style="padding: 32px; line-height: 1.65; font-size: 15px;">
        <p style="margin: 0 0 16px;">Hi ${esc(firstName)},</p>

        <p style="margin: 0 0 16px;">Thank you for requesting <strong>The Off-Market Advantage</strong> — Max Realty's investor briefing on off-market commercial real estate in the Greater Toronto Area.</p>

        <p style="margin: 24px 0;">
          <a href="${PDF_URL}"
             style="display: inline-block; background: #7D1A2D; color: #FDF8EE; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: 600; font-family: Georgia, serif;">
            Download the Briefing
          </a>
        </p>

        <hr style="border: none; border-top: 2px solid #E5B649; margin: 24px 0; width: 100px; margin-left: 0;" />

        <p style="margin: 0 0 8px; font-weight: 600;">Inside (10 pages):</p>
        <ul style="margin: 0 0 24px; padding-left: 20px;">
          <li style="margin-bottom: 6px;">The current state of GTA commercial real estate (Q1 2026)</li>
          <li style="margin-bottom: 6px;">Why off-market deal flow is increasingly the institutional default</li>
          <li style="margin-bottom: 6px;">A four-criteria framework for evaluating off-market opportunities</li>
          <li style="margin-bottom: 6px;">Three mistakes investors make in GTA commercial real estate</li>
          <li>How Max Realty sources, qualifies, and presents off-market deals</li>
        </ul>

        <p style="margin: 0 0 16px;">If you'd like to discuss a specific deployment thesis, an active mandate, or whether your capital aligns with what we currently have access to off-market, I would welcome a thirty-minute confidential conversation.</p>

        <p style="margin: 0 0 4px;"><strong>Direct:</strong> 416-226-6008</p>
        <p style="margin: 0 0 24px;"><strong>Email:</strong> info@maxrealtysolutions.com</p>

        <p style="margin: 0 0 4px;">Best regards,</p>
        <p style="margin: 0; font-weight: 600;">Shahin Mirkhan</p>
        <p style="margin: 2px 0 0; font-size: 13px; color: #555;">Founder &amp; Broker of Record</p>
        <p style="margin: 2px 0 0; font-size: 13px; color: #555;">Max Realty Solutions Ltd., Brokerage</p>
        <p style="margin: 2px 0 0; font-size: 13px; color: #555; font-style: italic;">Licensed Ontario Realtor since 1988</p>
      </div>

      <div style="padding: 16px 32px; background: #2C2C2C; text-align: center;">
        <p style="color: rgba(253,248,238,0.55); font-size: 11px; margin: 0; line-height: 1.5;">
          This e-mail and any attachments are confidential. Cooperating brokerage commission protected on listings.<br>
          Max Realty Solutions Ltd., Brokerage · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2
        </p>
      </div>

      ${
        lead
          ? `<!-- internal lead context: ${esc(lead.firstName)} ${esc(lead.lastName)} | ${esc(lead.email)} | ${esc(lead.phone || "no phone")} | role: ${esc(lead.role)} -->`
          : ""
      }
    </div>
  `;
}

export async function POST(request: Request) {
  let body: BriefingBody;
  try {
    body = (await request.json()) as BriefingBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot: bots fill this; real users never see it. Pretend success silently.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const role: Role | undefined =
    body.role && (["investor", "broker", "exploring"] as const).includes(body.role)
      ? body.role
      : undefined;

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { success: false, error: "First name, last name, and email are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!role) {
    return NextResponse.json(
      { success: false, error: "Please tell us who you are." },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      bcc: [INTERNAL_BCC_PRIMARY, INTERNAL_BCC_SECONDARY],
      replyTo: "info@maxrealtysolutions.com",
      subject: "Your Investor Briefing — The Off-Market Advantage",
      text: buildText(firstName),
      html: buildHtml(firstName, {
        firstName,
        lastName,
        email,
        phone,
        role,
      }),
      headers: {
        "X-Lead-Source": "investment-advisory-briefing",
        "X-Lead-Role": role ? ROLE_LABEL[role] : "unknown",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[briefing-request] send failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send the briefing. Please try again or email info@maxrealtysolutions.com." },
      { status: 500 }
    );
  }
}
