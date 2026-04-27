import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TO = "info@maxrealtysolutions.com";
const INTERNAL_BCC = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";

interface LeasingBody {
  role?: "tenant" | "landlord";
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  location?: string;
  sqft?: string;
  timeline?: string;
  notes?: string;
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

function buildInternalEmail(body: LeasingBody, timestamp: string): string {
  const roleLabel =
    body.role === "landlord"
      ? "Landlord with property to lease"
      : "Tenant looking for space";

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:13px;color:#666;">Received ${esc(timestamp)}</p>

    <h2 style="font-size:15px;margin:0 0 8px;color:#7D1A2D;">Contact</h2>
    <p style="margin:2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
    <p style="margin:2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
    <p style="margin:2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>
    ${body.company ? `<p style="margin:2px 0;"><strong>Company:</strong> ${esc(body.company)}</p>` : ""}

    <h2 style="font-size:15px;margin:20px 0 8px;color:#7D1A2D;">Requirement</h2>
    <p style="margin:2px 0;"><strong>Role:</strong> ${esc(roleLabel)}</p>
    ${body.propertyType ? `<p style="margin:2px 0;"><strong>Property Type:</strong> ${esc(body.propertyType)}</p>` : ""}
    ${body.location ? `<p style="margin:2px 0;"><strong>Location:</strong> ${esc(body.location)}</p>` : ""}
    ${body.sqft ? `<p style="margin:2px 0;"><strong>Approx. Sq Ft:</strong> ${esc(body.sqft)}</p>` : ""}
    ${body.timeline ? `<p style="margin:2px 0;"><strong>Timeline:</strong> ${esc(body.timeline)}</p>` : ""}
    ${body.notes ? `<p style="margin:12px 0 2px;"><strong>Notes:</strong></p><p style="margin:0;padding:10px;background:#FFFFFF;border-left:3px solid #7D1A2D;">${esc(body.notes).replace(/\n/g, "<br>")}</p>` : ""}
  `;
  return brandedEmailHtml({
    title: "New Leasing Inquiry",
    preheader: `${body.name} — ${roleLabel}.`,
    bodyHtml,
  });
}

function buildAcknowledgmentEmail(body: LeasingBody): string {
  const isLandlord = body.role === "landlord";
  const opening = isLandlord
    ? "Thank you for reaching out about leasing your property."
    : "Thank you for reaching out about your space requirement.";

  const bodyHtml = `
    <p style="margin:0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

    <p style="margin:0 0 16px;">${esc(opening)} Our commercial leasing team has been notified and will reach out within <strong>one business day</strong>.</p>

    <p style="margin:0 0 16px;">In the meantime, please feel free to reply to this email with any additional details that might help us prepare for our conversation.</p>

    <p style="margin:24px 0 4px;">Sincerely,</p>
    <p style="margin:0;font-weight:600;">The Max Realty Solutions Team</p>
  `;
  return brandedEmailHtml({
    title: "Your Leasing Inquiry",
    preheader: "Our commercial leasing team will reach out within one business day.",
    bodyHtml,
  });
}

export async function POST(request: Request) {
  let body: LeasingBody;
  try {
    body = (await request.json()) as LeasingBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const role: "tenant" | "landlord" =
    body.role === "landlord" ? "landlord" : "tenant";

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

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const cleanBody: LeasingBody = { ...body, name, email, phone, role };
  const subject =
    role === "landlord"
      ? `Leasing Inquiry — Landlord (${name})`
      : `Leasing Inquiry — Tenant (${name})`;

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
      subject: "Your leasing inquiry — Max Realty Solutions",
      html: buildAcknowledgmentEmail(cleanBody),
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your leasing inquiry has been received. A member of our team will reach out within one business day.",
    });
  } catch (err) {
    console.error("[leasing-inquiry] send failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send your inquiry. Please try again or email info@maxrealtysolutions.com." },
      { status: 500 }
    );
  }
}
