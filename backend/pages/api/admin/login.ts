import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { createSessionToken, setSessionCookie } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return res.status(500).json({ message: 'Admin login is not configured' });
  }

  const { password } = req.body ?? {};
  if (typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ message: 'Password is required' });
  }

  // Constant-time comparison to avoid leaking password length/content via timing.
  const a = Buffer.from(password);
  const b = Buffer.from(adminPassword);
  const matches = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!matches) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  setSessionCookie(res, createSessionToken());
  res.status(200).json({ message: 'Logged in' });
}
