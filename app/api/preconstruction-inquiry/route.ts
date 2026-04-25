import { Resend } from "resend";
import { NextResponse } from "next/server";

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

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #7D1A2D; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Platinum Access Request</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Pre-Construction</p>
      </div>
      <div style="padding: 32px; background: #f9f9f9; color: #2C2C2C;">
        <p style="margin: 0 0 16px; font-size: 13px; color: #666;">Received ${esc(timestamp)}</p>

        <h2 style="font-size: 15px; margin: 0 0 8px; color: #7D1A2D;">Contact</h2>
        <p style="margin: 2px 0;"><strong>Name:</strong> ${esc(body.name)}</p>
        <p style="margin: 2px 0;"><strong>Email:</strong> ${esc(body.email)}</p>
        <p style="margin: 2px 0;"><strong>Phone:</strong> ${esc(body.phone)}</p>

        <h2 style="font-size: 15px; margin: 20px 0 8px; color: #7D1A2D;">Criteria</h2>
        <p style="margin: 2px 0;"><strong>Buyer Type:</strong> ${esc(buyerLabel)}</p>
        ${propertyTypes.length ? `<p style="margin: 2px 0;"><strong>Property Type Interest:</strong> ${esc(propertyTypes.join(", "))}</p>` : ""}
        ${body.area ? `<p style="margin: 2px 0;"><strong>Target Area:</strong> ${esc(body.area)}</p>` : ""}
        ${body.budget ? `<p style="margin: 2px 0;"><strong>Budget Range:</strong> ${esc(body.budget)}</p>` : ""}
        ${body.timeline ? `<p style="margin: 2px 0;"><strong>Timeline:</strong> ${esc(body.timeline)}</p>` : ""}
        ${body.notes ? `<p style="margin: 12px 0 2px;"><strong>Notes:</strong></p><p style="margin: 0; padding: 10px; background: white; border-left: 3px solid #7D1A2D;">${esc(body.notes).replace(/\n/g, "<br>")}</p>` : ""}
      </div>
      <div style="padding: 16px; background: #2C2C2C; text-align: center;">
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">Max Realty Solutions Ltd., Brokerage · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2</p>
      </div>
    </div>
  `;
}

function buildAcknowledgmentEmail(body: PreconstructionBody): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #7D1A2D; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Max Realty Solutions</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Pre-Construction · Platinum Access</p>
      </div>
      <div style="padding: 32px; background: #f9f9f9; color: #2C2C2C; line-height: 1.6;">
        <p style="margin: 0 0 16px;">${body.name ? `Dear ${esc(body.name)},` : "Hello,"}</p>

        <p style="margin: 0 0 16px;">
          Thank you for joining our Platinum Access list. We&apos;ll keep you informed of upcoming
          GTA pre-construction launches that match your criteria — no spam, no pressure.
        </p>

        <p style="margin: 0 0 16px;">
          A senior agent will also reach out within <strong>one business day</strong> to discuss
          current opportunities that may already match what you&apos;re looking for.
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
