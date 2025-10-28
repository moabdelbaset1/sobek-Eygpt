export async function verifyRecaptcha(token: string) {
  if (!process.env.RECAPTCHA_SECRET) return { success: true };
  const params = new URLSearchParams();
  params.set('secret', process.env.RECAPTCHA_SECRET);
  params.set('response', token);
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  try {
    const data = (await res.json()) as { success: boolean; score?: number };
    if (!data.success) return { success: false };
    if (typeof data.score === 'number' && data.score < 0.3) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
}



