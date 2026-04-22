import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { subject, name, email, phone, message, type, reco, experience, currentBrokerage, desiredPlan } = body;

  const emailSubject = subject || 'New Website Inquiry - Max Realty Solutions';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #7D1A2D; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Max Realty Solutions</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">${emailSubject}</p>
      </div>
      <div style="padding: 32px; background: #f9f9f9;">
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${type ? `<p><strong>Enquiry Type:</strong> ${type}</p>` : ''}
        ${reco ? `<p><strong>RECO Registration #:</strong> ${reco}</p>` : ''}
        ${desiredPlan ? `<p><strong>Desired Plan:</strong> ${desiredPlan}</p>` : ''}
        ${experience ? `<p><strong>Years of Experience:</strong> ${experience}</p>` : ''}
        ${currentBrokerage ? `<p><strong>Current Brokerage:</strong> ${currentBrokerage}</p>` : ''}
        ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ''}
      </div>
      <div style="padding: 16px; background: #2C2C2C; text-align: center;">
        <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">Max Realty Solutions Ltd., Brokerage · 8220 Bayview Avenue, Unit 200, Thornhill, ON L3T 2S2</p>
      </div>
    </div>
  `;

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
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
