import { NextApiRequest, NextApiResponse } from 'next';
import { rejectIfNotAuthenticated } from '../../../lib/auth';
import { getVideoManifest, saveVideoManifest, getPhotoManifest, savePhotoManifest } from '../../../lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (rejectIfNotAuthenticated(req, res)) return;

  const { collection, orderedIds } = req.body ?? {};
  if (collection !== 'videos' && collection !== 'photos') {
    return res.status(400).json({ message: "collection must be 'videos' or 'photos'" });
  }
  if (!Array.isArray(orderedIds) || orderedIds.some((id) => typeof id !== 'string')) {
    return res.status(400).json({ message: 'orderedIds must be a string array' });
  }

  const [getManifest, saveManifest] =
    collection === 'videos' ? [getVideoManifest, saveVideoManifest] : [getPhotoManifest, savePhotoManifest];

  try {
    const items = await getManifest();
    if (orderedIds.length !== items.length || new Set(orderedIds).size !== items.length) {
      return res.status(400).json({ message: 'orderedIds must contain every item exactly once' });
    }
    const byId = new Map<string, any>(items.map((item: any): [string, any] => [item.id, item]));
    const reordered = orderedIds.map((id: string) => {
      const item = byId.get(id);
      if (!item) throw new Error(`Unknown item id: ${id}`);
      return item;
    });
    await (saveManifest as (items: any[]) => Promise<void>)(reordered);
    res.status(200).json({ items: reordered });
  } catch (error) {
    console.error(`Failed to reorder ${collection}:`, error);
    res.status(500).json({ message: `Failed to reorder ${collection}` });
  }
}
