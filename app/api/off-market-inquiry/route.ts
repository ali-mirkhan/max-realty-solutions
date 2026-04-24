import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TO = "info@maxrealtysolutions.com";
const INTERNAL_BCC = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";
const BASE_URL = "https://www.maxrealtysolutions.com";

interface InquiryBody {
  listingSlug?: string;
  listingTitle?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: "principal" | "representative";
  brokerage?: string;
  licenseNumber?: string;
  capitalAcknowledged?: boolean;
  source?: string;
  confidentialityAcknowledged?: boolean;
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

function buildInternalEmail(body: InquiryBody, timestamp: string): string {
  const listingUrl = body.listingSlug
    ? `${BASE_URL}/off-market/${body.listingSlug}`
    : BASE_URL;

  const roleLabel =
    body.role === "representative" ? "Licensed Buyer Representative" : "Principal / Direct Buyer";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #7D1A2D; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Off-Market Inquiry</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">${esc(body.listingTitle ?? "Off-Market Opportunity")}</p>
      </div>
      <div style="padding: 32px; background: #f9f9f9; color: #2C2C2C;">
        <p style="margin: 0 0 16px; font-size: 13px; color: #666;">Received ${esc(timestamp)}</p>

        <h2 style="font-size: 15px; margin: 0 0 8px; color: #7D1A2D;">Contact</h2>
        <p style="margin: 2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
        <p style="margin: 2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
        <p style="margin: 2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>
        ${body.company ? `<p style="margin: 2px 0;"><strong>Company / Entity:</strong> ${esc(body.company)}</p>` : ""}

        <h2 style="font-size: 15px; margin: 20px 0 8px; color: #7D1A2D;">Qualification</h2>
        <p style="margin: 2px 0;"><strong>Role:</strong> ${esc(roleLabel)}</p>
        ${body.brokerage ? `<p style="margin: 2px 0;"><strong>Brokerage:</strong> ${esc(body.brokerage)}</p>` : ""}
        ${body.licenseNumber ? `<p style="margin: 2px 0;"><strong>License #:</strong> ${esc(body.licenseNumber)}</p>` : ""}
        <p style="margin: 2px 0;"><strong>Capital Acknowledgment:</strong> ${body.capitalAcknowledged ? "Yes" : "Not confirmed"}</p>
        <p style="margin: 2px 0;"><strong>Confidentiality Acknowledgment:</strong> ${body.confidentialityAcknowledged ? "Yes" : "No"}</p>
        ${body.source ? `<p style="margin: 2px 0;"><strong>How they heard:</strong> ${esc(body.source)}</p>` : ""}

        <h2 style="font-size: 15px; margin: 20px 0 8px; color: #7D1A2D;">Listing</h2>
        <p style="margin: 2px 0;"><strong>Title:</strong> ${esc(body.listingTitle)}</p>
        <p style="margin: 2px 0;"><strong>Slug:</strong> ${esc(body.listingSlug)}</p>
        <p style="margin: 2px 0;"><strong>Link:</strong> <a href="${esc(listingUrl)}" style="color: #7D1A2D;">${esc(listingUrl)}</a></p>
      </div>
      <div style="padding: 16px; background: #2C2C2C; text-align: center;">
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">Max Realty Solutions Ltd., Brokerage · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2</p>
      </div>
    </div>
  `;
}

function buildAcknowledgmentEmail(body: InquiryBody): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #7D1A2D; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Max Realty Solutions</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Off-Market Opportunities</p>
      </div>
      <div style="padding: 32px; background: #f9f9f9; color: #2C2C2C; line-height: 1.6;">
        <p style="margin: 0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

        <p style="margin: 0 0 16px;">
          Thank you for your interest in <strong>${esc(body.listingTitle ?? "our off-market investment opportunities")}</strong>.
          We've received your inquiry and appreciate the time you've taken to share your background.
        </p>

        <p style="margin: 0 0 16px;">
          A member of our investment team will reach out to you within <strong>one business day</strong> to discuss next steps.
          Because this is an off-market, confidential opportunity, a formal Non-Disclosure Agreement will be provided for
          signature before detailed financial and location information is released.
        </p>

        <p style="margin: 0 0 16px;">
          In the meantime, please do not hesitate to reply to this email if you have any immediate questions.
        </p>

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

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export async function POST(request: Request) {
  let body: InquiryBody;
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();

  if (!name || !email || !phone) {
    return NextResponse.json(
      { success: false, error: "Name, email, and phone are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!body.confidentialityAcknowledged) {
    return NextResponse.json(
      { success: false, error: "Confidentiality acknowledgment is required." },
      { status: 400 }
    );
  }

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `Off-Market Inquiry — ${body.listingTitle ?? "Off-Market Opportunity"}`;

  try {
    await resend.emails.send({
      from: FROM,
      to: INTERNAL_TO,
      bcc: INTERNAL_BCC,
      replyTo: email,
      subject,
      html: buildInternalEmail({ ...body, name, email, phone }, timestamp),
    });

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your inquiry — Max Realty Off-Market Opportunities",
      html: buildAcknowledgmentEmail({ ...body, name, email, phone }),
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you — we've received your inquiry. A member of our investment team will be in touch within one business day.",
    });
  } catch (err) {
    console.error("[off-market-inquiry] send failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send your inquiry. Please try again or email info@maxrealtysolutions.com." },
      { status: 500 }
    );
  }
}
