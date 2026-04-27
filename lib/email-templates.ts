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
const FOOTER_TEXT_COLOR = "rgba(253,248,238,0.6)";

const ADDRESS_LINE =
  "Max Realty Solutions Ltd., Brokerage · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2";
const CONTACT_LINE =
  "Phone 416-226-6008 · info@maxrealtysolutions.com · maxrealtysolutions.com";

export function brandedEmailHtml(opts: {
  title?: string;
  preheader?: string;
  bodyHtml: string;
}): string {
  const { title, preheader, bodyHtml } = opts;

  const preheaderBlock = preheader
    ? `<div style="display:none;font-size:1px;color:${BRAND_CREAM};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>`
    : "";

  // Title block: gold rule + serif burgundy title. Renders only when a title
  // is provided; otherwise the cream header is just logo with bottom padding.
  const titleBlock = title
    ? `<div style="margin:24px auto 0;width:80px;height:1px;background:${BRAND_GOLD};line-height:1px;font-size:1px;">&nbsp;</div>
              <div style="margin:20px 0 0;font-family:Georgia,'Times New Roman',serif;color:${BRAND_BURGUNDY};font-size:18px;font-weight:600;letter-spacing:0.5px;">${title}</div>`
    : "";

  // Header padding is slightly heavier on bottom when there's no title block.
  const headerPaddingBottom = title ? "24px" : "36px";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title ?? "Max Realty Solutions"}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND_CREAM};font-family:Arial,Helvetica,sans-serif;color:${BRAND_CHARCOAL};">
  ${preheaderBlock}
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${BRAND_CREAM};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width:640px;width:100%;background:#FFFFFF;">
          <!-- Header (cream, logo, gold rule, optional serif title) -->
          <tr>
            <td align="center" style="background:${BRAND_CREAM};padding:36px 24px ${headerPaddingBottom};">
              <img src="${LOGO_URL}" alt="Max Realty Solutions" width="200" style="display:block;margin:0 auto;height:auto;max-width:200px;border:0;outline:none;text-decoration:none;" />
              ${titleBlock}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;color:${BRAND_CHARCOAL};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;padding:32px 32px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:${BRAND_CHARCOAL};padding:16px 24px;">
              <div style="color:${FOOTER_TEXT_COLOR};font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;">
                ${ADDRESS_LINE}<br />
                ${CONTACT_LINE}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
