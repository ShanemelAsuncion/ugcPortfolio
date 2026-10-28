import { NextApiRequest, NextApiResponse } from 'next';
import { getSiteStats } from '../../lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const stats = await getSiteStats();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(stats);
  } catch (error) {
    console.error('Failed to load site stats:', error);
    res.status(500).json({ message: 'Failed to load site stats' });
  }
}
