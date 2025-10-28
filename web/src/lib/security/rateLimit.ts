type Bucket = { tokens: number; updatedAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, { tokens = 10, windowMs = 60_000 }: { tokens?: number; windowMs?: number } = {}) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens, updatedAt: now };
  const delta = now - bucket.updatedAt;
  const refill = Math.floor(delta / windowMs) * tokens;
  bucket.tokens = Math.min(tokens, bucket.tokens + Math.max(refill, 0));
  bucket.updatedAt = now;
  if (bucket.tokens <= 0) {
    buckets.set(key, bucket);
    return { allowed: false } as const;
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { allowed: true } as const;
}



