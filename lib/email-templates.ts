/**
 * Shared branded email templates for all transactional emails sent from the
 * site. Provides a single source of truth for the header (logo + burgundy
 * band) and dark footer (brokerage details), so individual route handlers
 * only build the body content.
 *
 * All inline styles only — no <style> tags or external stylesheets, since
 * most email clients strip them. Logo URL is absolute since email clients
 * don't resolve relative paths.
 *
 * Usage:
 *
 *   import { brandedEmailHtml, brandedEmailText } from "@/lib/email-templates";
 *
 *   const html = brandedEmailHtml({
 *     title: "Your Investor Briefing",
 *     preheader: "Download the briefing inside.",
 *     bodyHtml: `<p>Hi Ali,</p><p>Thanks for requesting…</p>`,
 *   });
 *
 *   const text = brandedEmailText({
 *     bodyText: "Hi Ali,\n\nThanks for requesting…",
 *   });
 *
 *   await resend.emails.send({ from, to, subject, html, text });
 */

const LOGO_URL = "https://www.maxrealtysolutions.com/logo.png";
const BRAND_BURGUNDY = "#7D1A2D";
const BRAND_GOLD = "#C9972B";
const BRAND_CREAM = "#FDF8EE";
const BRAND_CHARCOAL = "#2C2C2C";
const CANVAS_GREY = "#F0F0F0";
const FOOTER_LINK_COLOR = "rgba(255,255,255,0.85)";
const FOOTER_TEXT_COLOR = "rgba(255,255,255,0.7)";

export function brandedEmailHtml(opts: {
  title?: string;
  preheader?: string;
  bodyHtml: string;
}): string {
  const { title, preheader, bodyHtml } = opts;

  const preheaderBlock = preheader
    ? `<div style="display:none;font-size:1px;color:${CANVAS_GREY};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>`
    : "";

  // Title block: gold rule + serif burgundy title. Renders only when a title
  // is provided; otherwise the cream header is just logo with bottom padding.
  const titleBlock = title
    ? `<div style="margin:32px auto 0;width:80px;height:1px;background:${BRAND_GOLD};line-height:1px;font-size:1px;">&nbsp;</div>
        <h1 style="margin:28px 0 0;font-family:Georgia,'Times New Roman',serif;color:${BRAND_BURGUNDY};font-size:18px;font-weight:600;letter-spacing:0.5px;">${title}</h1>`
    : "";

  // Header bottom padding lighter when title present (title supplies its own
  // bottom rhythm); heavier otherwise so logo doesn't crowd the body.
  const headerPaddingBottom = title ? "32px" : "44px";

  // Note on email-client support: border-radius and box-shadow are not
  // honoured by Outlook on Windows — those clients see a square card with no
  // shadow. Modern Gmail / Apple Mail / iOS Mail render the rounded shadowed
  // card correctly.
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title ?? "Max Realty Solutions"}</title>
</head>
<body style="margin:0;padding:0;background:${CANVAS_GREY};font-family:Arial,Helvetica,sans-serif;color:${BRAND_CHARCOAL};">
  ${preheaderBlock}
  <!-- Outer canvas: neutral grey breathing room around the card -->
  <div style="background:${CANVAS_GREY};padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <!-- Inner card: cream, rounded, light shadow + hairline border -->
    <div style="max-width:640px;margin:0 auto;background:${BRAND_CREAM};border-radius:8px;border:1px solid rgba(0,0,0,0.06);box-shadow:0 2px 8px rgba(0,0,0,0.04);overflow:hidden;">

      <!-- Header (cream, logo, gold rule, optional serif title) -->
      <div style="padding:36px 24px ${headerPaddingBottom};text-align:center;">
        <img src="${LOGO_URL}" alt="Max Realty Solutions" width="140" style="display:block;margin:0 auto;height:auto;max-width:140px;border:0;outline:none;text-decoration:none;" />
        ${titleBlock}
      </div>

      <!-- Body (cream continues for unified look) -->
      <div style="padding:0 40px 36px;color:${BRAND_CHARCOAL};font-size:15px;line-height:1.6;">
        ${bodyHtml}
      </div>

      <!-- Footer (charcoal, rounded bottom to match card) -->
      <div style="background:${BRAND_CHARCOAL};padding:20px 24px;text-align:center;border-bottom-left-radius:8px;border-bottom-right-radius:8px;">
        <p style="margin:0;color:${FOOTER_TEXT_COLOR};font-size:12px;line-height:1.6;">
          Max Realty Solutions Ltd., Brokerage · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2
        </p>
        <p style="margin:4px 0 0;color:${FOOTER_TEXT_COLOR};font-size:12px;line-height:1.6;">
          Phone <a href="tel:4162266008" style="color:${FOOTER_LINK_COLOR};text-decoration:none;">416-226-6008</a>
          · <a href="mailto:info@maxrealtysolutions.com" style="color:${FOOTER_LINK_COLOR};text-decoration:underline;">info@maxrealtysolutions.com</a>
          · <a href="https://www.maxrealtysolutions.com" style="color:${FOOTER_LINK_COLOR};text-decoration:underline;">maxrealtysolutions.com</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;
}

export function brandedEmailText(opts: { bodyText: string }): string {
  return `${opts.bodyText.trimEnd()}

---
Max Realty Solutions Ltd., Brokerage
8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2
416-226-6008 · info@maxrealtysolutions.com
maxrealtysolutions.com
`;
}
