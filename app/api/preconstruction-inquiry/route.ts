import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TO = "info@maxrealtysolutions.com";
const INTERNAL_BCC = "smirkhan@gmail.com";
const FROM = "Max Realty Solutions <noreply@maxrealtysolutions.com>";

type BuyerType = "end-user" | "investor" | "both";

interface PreconstructionBody {
  name?: string;
  email?: string;
  phone?: string;
  buyerType?: BuyerType;
  propertyTypes?: string[];
  area?: string;
  budget?: string;
  timeline?: string;
  notes?: string;
}

const BUYER_LABEL: Record<BuyerType, string> = {
  "end-user": "End-user",
  investor: "Investor",
  both: "Both",
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

function buildInternalEmail(body: PreconstructionBody, timestamp: string): string {
  const buyerLabel = body.buyerType ? BUYER_LABEL[body.buyerType] : "Not specified";
  const propertyTypes = (body.propertyTypes ?? []).filter(Boolean);

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:13px;color:#666;">Received ${esc(timestamp)} — Platinum Access list</p>

    <h2 style="font-size:15px;margin:0 0 8px;color:#7D1A2D;">Contact</h2>
    <p style="margin:2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
    <p style="margin:2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
    <p style="margin:2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>

    <h2 style="font-size:15px;margin:20px 0 8px;color:#7D1A2D;">Criteria</h2>
    <p style="margin:2px 0;"><strong>Buyer Type:</strong> ${esc(buyerLabel)}</p>
    ${propertyTypes.length ? `<p style="margin:2px 0;"><strong>Property Type Interest:</strong> ${esc(propertyTypes.join(", "))}</p>` : ""}
    ${body.area ? `<p style="margin:2px 0;"><strong>Target Area:</strong> ${esc(body.area)}</p>` : ""}
    ${body.budget ? `<p style="margin:2px 0;"><strong>Budget Range:</strong> ${esc(body.budget)}</p>` : ""}
    ${body.timeline ? `<p style="margin:2px 0;"><strong>Timeline:</strong> ${esc(body.timeline)}</p>` : ""}
    ${body.notes ? `<p style="margin:12px 0 2px;"><strong>Notes:</strong></p><p style="margin:0;padding:10px;background:#FFFFFF;border-left:3px solid #7D1A2D;">${esc(body.notes).replace(/\n/g, "<br>")}</p>` : ""}
  `;
  return brandedEmailHtml({
    title: "New Pre-Construction Inquiry",
    preheader: `${body.name} joined the Platinum Access list (${buyerLabel}).`,
    bodyHtml,
  });
}

function buildAcknowledgmentEmail(body: PreconstructionBody): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

    <p style="margin:0 0 16px;">
      Thank you for joining our Platinum Access list. We&apos;ll keep you informed of upcoming
      GTA pre-construction launches that match your criteria — no spam, no pressure.
    </p>

    <p style="margin:0 0 16px;">
      A senior agent will also reach out within <strong>one business day</strong> to discuss
      current opportunities that may already match what you&apos;re looking for.
    </p>

    <p style="margin:24px 0 4px;">Sincerely,</p>
    <p style="margin:0;font-weight:600;">The Max Realty Solutions Team</p>
  `;
  return brandedEmailHtml({
    title: "Welcome to Platinum Access",
    preheader: "We'll notify you of upcoming GTA pre-construction launches that match your criteria.",
    bodyHtml,
  });
}

export async function POST(request: Request) {
  let body: PreconstructionBody;
  try {
    body = (await request.json()) as PreconstructionBody;
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

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const cleanBody: PreconstructionBody = { ...body, name, email, phone };
  const subject = `Pre-Construction Platinum Access — ${name}`;

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
      subject: "Welcome to our Platinum Access list — Max Realty Solutions",
      html: buildAcknowledgmentEmail(cleanBody),
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you. You're on our Platinum Access list. A senior agent will reach out within one business day.",
    });
  } catch (err) {
    console.error("[preconstruction-inquiry] send failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send your request. Please try again or email info@maxrealtysolutions.com." },
      { status: 500 }
    );
  }
}
