import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { brandedEmailHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { subject, name, email, phone, message, type, reco, experience, currentBrokerage, desiredPlan } = body;

  const emailSubject = subject || 'New Website Inquiry - Max Realty Solutions';

  const fields = [
    name && `<p style="margin:2px 0;"><strong>Name:</strong> ${name}</p>`,
    email && `<p style="margin:2px 0;"><strong>Email:</strong> ${email}</p>`,
    phone && `<p style="margin:2px 0;"><strong>Phone:</strong> ${phone}</p>`,
    type && `<p style="margin:2px 0;"><strong>Enquiry Type:</strong> ${type}</p>`,
    reco && `<p style="margin:2px 0;"><strong>RECO Registration #:</strong> ${reco}</p>`,
    desiredPlan && `<p style="margin:2px 0;"><strong>Desired Plan:</strong> ${desiredPlan}</p>`,
    experience && `<p style="margin:2px 0;"><strong>Years of Experience:</strong> ${experience}</p>`,
    currentBrokerage && `<p style="margin:2px 0;"><strong>Current Brokerage:</strong> ${currentBrokerage}</p>`,
    message && `<p style="margin:12px 0 2px;"><strong>Message:</strong></p><p style="margin:0;padding:10px;background:#FFFFFF;border-left:3px solid #7D1A2D;">${message.replace(/\n/g, '<br>')}</p>`,
  ].filter(Boolean).join('\n');

  const htmlContent = brandedEmailHtml({
    title: 'New Website Inquiry',
    preheader: `${name || 'Someone'} sent a website inquiry${type ? ` (${type})` : ''}.`,
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:13px;color:#666;">${emailSubject}</p>
      ${fields}
    `,
  });

  try {
    await resend.emails.send({
      from: 'Max Realty Solutions <noreply@maxrealtysolutions.com>',
      to: 'info@maxrealtysolutions.com',
      replyTo: email,
      subject: emailSubject,
      html: htmlContent,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[contact] send failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
