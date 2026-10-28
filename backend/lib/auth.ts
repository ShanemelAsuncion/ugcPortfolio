import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

export const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET environment variable is not set');
  }
  return secret;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url');
}

/** Creates a signed, expiring session token (not a JWT, just a minimal equivalent — no extra dependency needed). */
export function createSessionToken(): string {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const payloadB64 = base64url(payload);
  const signature = crypto.createHmac('sha256', getSecret()).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', getSecret())
    .update(payloadB64)
    .digest('base64url');

  // Constant-time comparison to avoid timing attacks.
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function setSessionCookie(res: NextApiResponse, token: string) {
  const isProd = process.env.NODE_ENV === 'production';
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isProd ? '; Secure' : ''}`
  );
}

export function clearSessionCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

/** Returns true if the request carries a valid admin session cookie. */
export function isAuthenticated(req: NextApiRequest): boolean {
  return isValidSessionToken(req.cookies[SESSION_COOKIE]);
}

/** Guard for admin-only API routes. Returns true if the request was rejected (caller should stop). */
export function rejectIfNotAuthenticated(req: NextApiRequest, res: NextApiResponse): boolean {
  if (!isAuthenticated(req)) {
    res.status(401).json({ message: 'Not authenticated' });
    return true;
  }
  return false;
}
