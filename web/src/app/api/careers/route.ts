import {NextRequest, NextResponse} from 'next/server';
import {rateLimit} from '@/lib/security/rateLimit';
import {verifyRecaptcha} from '@/lib/security/recaptcha';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  const limit = rateLimit(`careers:${ip}`, { tokens: 3, windowMs: 60_000 });
  if (!limit.allowed) return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const form = await req.formData();
  const name = form.get('name')?.toString() || '';
  const email = form.get('email')?.toString() || '';
  const role = form.get('role')?.toString() || '';
  const message = form.get('message')?.toString() || '';
  const recaptchaToken = form.get('recaptchaToken')?.toString() || '';
  const file = form.get('file') as File | null;

  if (!name || !email || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const rec = await verifyRecaptcha(recaptchaToken);
  if (!rec.success) return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });

  // Optional: Email via SendGrid
  if (process.env.SENDGRID_API_KEY && process.env.CAREERS_TO_EMAIL) {
    const text = `Candidate: ${name}\nEmail: ${email}\nRole: ${role}\n\n${message}`;
    const payload: any = {
      personalizations: [{ to: [{ email: process.env.CAREERS_TO_EMAIL }], subject: `[Careers] ${role}` }],
      from: { email: process.env.SENDGRID_FROM_EMAIL || 'no-reply@sobek.com.eg' },
      content: [{ type: 'text/plain', value: text }]
    };
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  // Note: For production, upload file to storage (S3/GCS) and store CMS record.
  return NextResponse.json({ ok: true });
}



