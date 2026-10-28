import type { NextApiRequest } from 'next';

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 8;

interface Attempt {
  count: number;
  windowStart: number;
}

// In-memory and per-IP — fine for a single long-running Node process (Render
// web service). Resets on restart/deploy, which is an acceptable trade-off
// for a single-admin login endpoint.
const attemptsByIp = new Map<string, Attempt>();

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress ?? 'unknown';
}

/** Returns null if the request may proceed, or the number of seconds to wait if rate-limited. */
export function checkLoginRateLimit(ip: string): number | null {
  const now = Date.now();
  const attempt = attemptsByIp.get(ip);

  if (!attempt || now - attempt.windowStart > WINDOW_MS) {
    return null;
  }
  if (attempt.count >= MAX_ATTEMPTS) {
    return Math.ceil((attempt.windowStart + WINDOW_MS - now) / 1000);
  }
  return null;
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const attempt = attemptsByIp.get(ip);

  if (!attempt || now - attempt.windowStart > WINDOW_MS) {
    attemptsByIp.set(ip, { count: 1, windowStart: now });
    return;
  }
  attempt.count += 1;
}

export function clearLoginAttempts(ip: string): void {
  attemptsByIp.delete(ip);
}
