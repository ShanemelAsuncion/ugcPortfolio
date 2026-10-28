import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { createSessionToken, setSessionCookie } from '../../../lib/auth';
import { checkLoginRateLimit, recordFailedLogin, clearLoginAttempts, getClientIp } from '../../../lib/rateLimit';

// HMACs both sides to a fixed-length digest before comparing. Comparing raw
// variable-length strings (even with timingSafeEqual) leaks whether the
// guess's length matches the real password's length, since a length
// mismatch short-circuits before the constant-time compare ever runs.
function passwordsMatch(submitted: string, actual: string): boolean {
  const key = process.env.ADMIN_SESSION_SECRET ?? 'fallback-key';
  const a = crypto.createHmac('sha256', key).update(submitted).digest();
  const b = crypto.createHmac('sha256', key).update(actual).digest();
  return crypto.timingSafeEqual(a, b);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return res.status(500).json({ message: 'Admin login is not configured' });
  }

  const ip = getClientIp(req);
  const retryAfterSeconds = checkLoginRateLimit(ip);
  if (retryAfterSeconds !== null) {
    res.setHeader('Retry-After', String(retryAfterSeconds));
    return res.status(429).json({ message: 'Too many attempts. Try again later.' });
  }

  const { password } = req.body ?? {};
  if (typeof password !== 'string' || password.length === 0 || password.length > 256) {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (!passwordsMatch(password.trim(), adminPassword)) {
    recordFailedLogin(ip);
    return res.status(401).json({ message: 'Incorrect password' });
  }

  clearLoginAttempts(ip);
  setSessionCookie(res, createSessionToken());
  res.status(200).json({ message: 'Logged in' });
}
