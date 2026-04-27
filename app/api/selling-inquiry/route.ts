import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TO = "info@maxrealtysolutions.com";
const INTERNAL_BCC = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";

interface SellingBody {
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

function buildInternalEmail(body: SellingBody, timestamp: string): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:13px;color:#666;">Received ${esc(timestamp)}</p>

    <h2 style="font-size:15px;margin:0 0 8px;color:#7D1A2D;">Contact</h2>
    <p style="margin:2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
    <p style="margin:2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
    <p style="margin:2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>

    <h2 style="font-size:15px;margin:20px 0 8px;color:#7D1A2D;">Property</h2>
    <p style="margin:2px 0;"><strong>Address:</strong> ${esc(body.address)}</p>
    ${body.propertyType ? `<p style="margin:2px 0;"><strong>Type:</strong> ${esc(body.propertyType)}</p>` : ""}
    ${body.timeline ? `<p style="margin:2px 0;"><strong>Listing Timeline:</strong> ${esc(body.timeline)}</p>` : ""}
    ${body.notes ? `<p style="margin:12px 0 2px;"><strong>Notes:</strong></p><p style="margin:0;padding:10px;background:#FFFFFF;border-left:3px solid #7D1A2D;">${esc(body.notes).replace(/\n/g, "<br>")}</p>` : ""}
  `;
  return brandedEmailHtml({
    title: "New Listing Consultation",
    preheader: `${body.name} requested a listing consultation${body.address ? ` for ${body.address}` : ""}.`,
    bodyHtml,
  });
}

function buildAcknowledgmentEmail(body: SellingBody): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

    <p style="margin:0 0 16px;">
      Thank you for booking a listing consultation${body.address ? ` for <strong>${esc(body.address)}</strong>` : ""}.
      A senior Max Realty agent will reach out within <strong>one business day</strong> to schedule a
      time that works for you — in person or by video call.
    </p>

    <p style="margin:0 0 16px;">
      During the consultation we'll walk you through pricing strategy, our marketing plan,
      commission structure, and answer any questions you have about your sale.
    </p>

    <p style="margin:24px 0 4px;">Sincerely,</p>
    <p style="margin:0;font-weight:600;">The Max Realty Solutions Team</p>
  `;
  return brandedEmailHtml({
    title: "Your Listing Consultation",
    preheader: "Thank you for booking a listing consultation with Max Realty.",
    bodyHtml,
  });
}

export async function POST(request: Request) {
  let body: SellingBody;
  try {
    body = (await request.json()) as SellingBody;
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

  const cleanBody: SellingBody = { ...body, address, name, email, phone };
  const subject = `Listing Consultation — ${address}`;

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
      subject: "Your listing consultation — Max Realty Solutions",
      html: buildAcknowledgmentEmail(cleanBody),
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your listing consultation has been booked. A senior agent will reach out within one business day.",
    });
  } catch (err) {
    console.error("[selling-inquiry] send failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send your request. Please try again or email info@maxrealtysolutions.com." },
      { status: 500 }
    );
  }
}
