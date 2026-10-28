import { NextApiRequest, NextApiResponse } from 'next';
import { rejectIfNotAuthenticated } from '../../../lib/auth';
import { getSiteStats, saveSiteStats } from '../../../lib/cloudinary';
import type { SiteStatsInput } from '../../../lib/types';

function validateInput(body: any): body is SiteStatsInput {
  return (
    body &&
    typeof body.totalReach === 'string' &&
    typeof body.brands === 'string' &&
    typeof body.videosDelivered === 'string'
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (rejectIfNotAuthenticated(req, res)) return;

  if (req.method === 'GET') {
    try {
      const stats = await getSiteStats();
      return res.status(200).json(stats);
    } catch (error) {
      console.error('Failed to load site stats:', error);
      return res.status(500).json({ message: 'Failed to load site stats' });
    }
  }

  if (req.method === 'PUT') {
    if (!validateInput(req.body)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }
    try {
      const stats = {
        totalReach: req.body.totalReach.trim(),
        brands: req.body.brands.trim(),
        videosDelivered: req.body.videosDelivered.trim(),
        updatedAt: new Date().toISOString(),
      };
      await saveSiteStats(stats);
      return res.status(200).json(stats);
    } catch (error) {
      console.error('Failed to save site stats:', error);
      return res.status(500).json({ message: 'Failed to save site stats' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
