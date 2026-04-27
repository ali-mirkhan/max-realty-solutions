import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TO = "info@maxrealtysolutions.com";
const INTERNAL_BCC = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";

interface EvaluationBody {
  address?: string;
  name?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
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

function buildInternalEmail(body: EvaluationBody, timestamp: string): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:13px;color:#666;">Received ${esc(timestamp)}</p>

    <h2 style="font-size:15px;margin:0 0 8px;color:#7D1A2D;">Contact</h2>
    <p style="margin:2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
    <p style="margin:2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
    <p style="margin:2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>

    <h2 style="font-size:15px;margin:20px 0 8px;color:#7D1A2D;">Property</h2>
    <p style="margin:2px 0;"><strong>Address:</strong> ${esc(body.address)}</p>
    ${body.propertyType ? `<p style="margin:2px 0;"><strong>Type:</strong> ${esc(body.propertyType)}</p>` : ""}
    ${body.timeline ? `<p style="margin:2px 0;"><strong>Timeline:</strong> ${esc(body.timeline)}</p>` : ""}
    ${body.notes ? `<p style="margin:12px 0 2px;"><strong>Notes:</strong></p><p style="margin:0;padding:10px;background:#FFFFFF;border-left:3px solid #7D1A2D;">${esc(body.notes).replace(/\n/g, "<br>")}</p>` : ""}
  `;
  return brandedEmailHtml({
    title: "New Home Evaluation Request",
    preheader: `${body.name} requested an evaluation${body.address ? ` for ${body.address}` : ""}.`,
    bodyHtml,
  });
}

function buildAcknowledgmentEmail(body: EvaluationBody): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

    <p style="margin:0 0 16px;">
      Thank you for requesting a home evaluation${body.address ? ` for <strong>${esc(body.address)}</strong>` : ""}.
      We've received your request and a senior agent has been notified.
    </p>

    <p style="margin:0 0 16px;">
      You can expect to receive your written evaluation within <strong>24-48 hours</strong>.
      It will include comparable sold properties, current market conditions in your specific
      neighbourhood, and a strategic price recommendation.
    </p>

    <p style="margin:0 0 16px;">
      If you'd like a 15-minute phone walkthrough to discuss strategy, simply reply to this email
      and we'll set a time that works for you.
    </p>

    <p style="margin:24px 0 4px;">Sincerely,</p>
    <p style="margin:0;font-weight:600;">The Max Realty Solutions Team</p>
  `;
  return brandedEmailHtml({
    title: "Your Home Evaluation Request",
    preheader: "Your free home evaluation is being prepared.",
    bodyHtml,
  });
}

export async function POST(request: Request) {
  let body: EvaluationBody;
  try {
    body = (await request.json()) as EvaluationBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const address = body.address?.trim();
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();

  if (!address || !name || !email || !phone) {
    return NextResponse.json(
      { success: false, error: "Address, name, email, and phone are required." },
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

  const cleanBody: EvaluationBody = { ...body, address, name, email, phone };
  const subject = `Home Evaluation Request — ${address}`;

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
      subject: "Your home evaluation request — Max Realty Solutions",
      html: buildAcknowledgmentEmail(cleanBody),
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your evaluation request has been received. A senior agent will be in touch within 24-48 hours.",
    });
  } catch (err) {
    console.error("[home-evaluation] send failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send your request. Please try again or email info@maxrealtysolutions.com." },
      { status: 500 }
    );
  }
}
