import {NextRequest, NextResponse} from 'next/server';
import {rateLimit} from '@/lib/security/rateLimit';
import {verifyRecaptcha} from '@/lib/security/recaptcha';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  const limit = rateLimit(`contact:${ip}`, { tokens: 5, windowMs: 60_000 });
  if (!limit.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const body = await req.json();
  const { name, email, subject, message, recaptchaToken } = body || {};
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const rec = await verifyRecaptcha(recaptchaToken || '');
  if (!rec.success) return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });

  // Optional: SendGrid email
  if (process.env.SENDGRID_API_KEY && process.env.CONTACT_TO_EMAIL) {
    const payload = {
      personalizations: [{ to: [{ email: process.env.CONTACT_TO_EMAIL }], subject: `[Contact] ${subject}` }],
      from: { email: process.env.SENDGRID_FROM_EMAIL || 'no-reply@sobek.com.eg' },
      content: [{ type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\n${message}` }]
    };
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}



