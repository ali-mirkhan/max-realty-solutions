import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TO = "info@maxrealtysolutions.com";
const INTERNAL_BCC = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";

type Profile = "first-time" | "active" | "hnw";

interface InvestmentBody {
  profile?: Profile;
  name?: string;
  email?: string;
  phone?: string;
  capital?: string;
  assetInterests?: string[];
  timeline?: string;
  notes?: string;
  /** Set true for the "Request Early Access" inline market-report form */
  marketReport?: boolean;
}

const PROFILE_LABEL: Record<Profile, string> = {
  "first-time": "First-time investor",
  active: "Active investor",
  hnw: "High-net-worth or institutional",
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

function profileLabel(p?: Profile): string {
  return p ? PROFILE_LABEL[p] : "Not specified";
}

function buildInternalEmail(body: InvestmentBody, timestamp: string): string {
  const heading = body.marketReport
    ? "Market Report Interest"
    : "Investment Advisory Inquiry";
  const interests = (body.assetInterests ?? []).filter(Boolean);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #7D1A2D; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">${esc(heading)}</h1>
      </div>
      <div style="padding: 32px; background: #f9f9f9; color: #2C2C2C;">
        <p style="margin: 0 0 16px; font-size: 13px; color: #666;">Received ${esc(timestamp)}</p>

        <h2 style="font-size: 15px; margin: 0 0 8px; color: #7D1A2D;">Contact</h2>
        <p style="margin: 2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
        <p style="margin: 2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
        ${body.phone ? `<p style="margin: 2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>` : ""}

        ${
          body.marketReport
            ? ""
            : `
        <h2 style="font-size: 15px; margin: 20px 0 8px; color: #7D1A2D;">Investment Profile</h2>
        <p style="margin: 2px 0;"><strong>Profile:</strong> ${esc(profileLabel(body.profile))}</p>
        ${body.capital ? `<p style="margin: 2px 0;"><strong>Capital Range:</strong> ${esc(body.capital)}</p>` : ""}
        ${interests.length ? `<p style="margin: 2px 0;"><strong>Asset Class Interest:</strong> ${esc(interests.join(", "))}</p>` : ""}
        ${body.timeline ? `<p style="margin: 2px 0;"><strong>Timeline:</strong> ${esc(body.timeline)}</p>` : ""}
        ${body.notes ? `<p style="margin: 12px 0 2px;"><strong>Notes:</strong></p><p style="margin: 0; padding: 10px; background: white; border-left: 3px solid #7D1A2D;">${esc(body.notes).replace(/\n/g, "<br>")}</p>` : ""}
        `
        }
      </div>
      <div style="padding: 16px; background: #2C2C2C; text-align: center;">
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">Max Realty Solutions Ltd., Brokerage · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2</p>
      </div>
    </div>
  `;
}

function buildAcknowledgmentEmail(body: InvestmentBody): string {
  const opening = body.marketReport
    ? "Thank you for your interest in our quarterly GTA Commercial Market Report. We'll add you to our early-access list and notify you when the next edition is available."
    : "Thank you for reaching out. Our investment advisory team has been notified and will reach out within one business day to schedule your strategy call.";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #7D1A2D; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Max Realty Solutions</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Investment Advisory</p>
      </div>
      <div style="padding: 32px; background: #f9f9f9; color: #2C2C2C; line-height: 1.6;">
        <p style="margin: 0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

        <p style="margin: 0 0 16px;">${esc(opening)}</p>

        <p style="margin: 0 0 16px;">In the meantime, please feel free to reply to this email with any additional context that would help us prepare.</p>

        <p style="margin: 24px 0 4px;">Sincerely,</p>
        <p style="margin: 0; font-weight: 600;">The Max Realty Solutions Team</p>
      </div>
      <div style="padding: 20px; background: #2C2C2C; text-align: center;">
        <p style="color: rgba(255,255,255,0.85); font-size: 13px; margin: 0 0 6px; font-weight: 600;">Max Realty Solutions Ltd., Brokerage</p>
        <p style="color: rgba(255,255,255,0.55); font-size: 12px; margin: 0;">
          8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2
        </p>
        <p style="color: rgba(255,255,255,0.55); font-size: 12px; margin: 4px 0 0;">
          <a href="https://www.maxrealtysolutions.com" style="color: rgba(255,255,255,0.7); text-decoration: none;">www.maxrealtysolutions.com</a>
        </p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: InvestmentBody;
  try {
    body = (await request.json()) as InvestmentBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const isMarketReport = body.marketReport === true;

  if (!name || !email) {
    return NextResponse.json(
      { success: false, error: "Name and email are required." },
      { status: 400 }
    );
  }
  if (!isMarketReport && !phone) {
    return NextResponse.json(
      { success: false, error: "Phone is required for advisory inquiries." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const cleanBody: InvestmentBody = { ...body, name, email, phone };
  const subject = isMarketReport
    ? `Market Report Interest — ${name}`
    : `Investment Advisory Inquiry — ${name}`;

  try {
    await resend.emails.send({
      from: FROM,
      to: INTERNAL_TO,
      bcc: INTERNAL_BCC,
      replyTo: email,
      subject,
      html: buildInternalEmail(cleanBody, timestamp),
    });

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: isMarketReport
        ? "Quarterly Market Report — early access confirmed"
        : "Your investment inquiry — Max Realty Solutions",
      html: buildAcknowledgmentEmail(cleanBody),
    });

    return NextResponse.json({
      success: true,
      message: isMarketReport
        ? "Thank you. You're on the early-access list for our next quarterly market report."
        : "Thank you. Your inquiry has been received. A member of our investment team will reach out within one business day.",
    });
  } catch (err) {
    console.error("[investment-inquiry] send failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send your inquiry. Please try again or email info@maxrealtysolutions.com." },
      { status: 500 }
    );
  }
}
