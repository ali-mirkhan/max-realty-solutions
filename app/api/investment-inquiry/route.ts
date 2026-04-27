import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml } from "@/lib/email-templates";

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
  const interests = (body.assetInterests ?? []).filter(Boolean);
  const title = body.marketReport ? "Market Report Interest" : "New Investment Inquiry";

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:13px;color:#666;">Received ${esc(timestamp)}</p>

    <h2 style="font-size:15px;margin:0 0 8px;color:#7D1A2D;">Contact</h2>
    <p style="margin:2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
    <p style="margin:2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
    ${body.phone ? `<p style="margin:2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>` : ""}

    ${
      body.marketReport
        ? ""
        : `
    <h2 style="font-size:15px;margin:20px 0 8px;color:#7D1A2D;">Investment Profile</h2>
    <p style="margin:2px 0;"><strong>Profile:</strong> ${esc(profileLabel(body.profile))}</p>
    ${body.capital ? `<p style="margin:2px 0;"><strong>Capital Range:</strong> ${esc(body.capital)}</p>` : ""}
    ${interests.length ? `<p style="margin:2px 0;"><strong>Asset Class Interest:</strong> ${esc(interests.join(", "))}</p>` : ""}
    ${body.timeline ? `<p style="margin:2px 0;"><strong>Timeline:</strong> ${esc(body.timeline)}</p>` : ""}
    ${body.notes ? `<p style="margin:12px 0 2px;"><strong>Notes:</strong></p><p style="margin:0;padding:10px;background:#FFFFFF;border-left:3px solid #7D1A2D;">${esc(body.notes).replace(/\n/g, "<br>")}</p>` : ""}
    `
    }
  `;
  return brandedEmailHtml({
    title,
    preheader: `${body.name} — ${body.marketReport ? "market report request" : "investment advisory inquiry"}.`,
    bodyHtml,
  });
}

function buildAcknowledgmentEmail(body: InvestmentBody): string {
  const opening = body.marketReport
    ? "Thank you for your interest in our quarterly GTA Commercial Market Report. We'll add you to our early-access list and notify you when the next edition is available."
    : "Thank you for reaching out. Our investment advisory team has been notified and will reach out within one business day to schedule your strategy call.";

  const bodyHtml = `
    <p style="margin:0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

    <p style="margin:0 0 16px;">${esc(opening)}</p>

    <p style="margin:0 0 16px;">In the meantime, please feel free to reply to this email with any additional context that would help us prepare.</p>

    <p style="margin:24px 0 4px;">Sincerely,</p>
    <p style="margin:0;font-weight:600;">The Max Realty Solutions Team</p>
  `;
  return brandedEmailHtml({
    title: "Your Investment Inquiry",
    preheader: body.marketReport
      ? "You're on our market report early-access list."
      : "Our investment advisory team will reach out within one business day.",
    bodyHtml,
  });
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
