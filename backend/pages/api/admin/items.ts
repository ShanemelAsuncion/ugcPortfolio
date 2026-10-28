import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { rejectIfNotAuthenticated } from '../../../lib/auth';
import { getVideoManifest, saveVideoManifest } from '../../../lib/cloudinary';
import type { PortfolioItemInput } from '../../../lib/types';

function validateInput(body: any): body is PortfolioItemInput {
  return (
    body &&
    typeof body.title === 'string' &&
    body.title.trim().length > 0 &&
    Array.isArray(body.tags) &&
    body.tags.every((t: unknown) => typeof t === 'string') &&
    typeof body.format === 'string' &&
    typeof body.thumbnail === 'string' &&
    body.thumbnail.trim().length > 0 &&
    typeof body.videoUrl === 'string' &&
    body.videoUrl.trim().length > 0 &&
    (body.type === 'upload' || body.type === 'url')
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (rejectIfNotAuthenticated(req, res)) return;

  if (req.method === 'GET') {
    try {
      const items = await getVideoManifest();
      return res.status(200).json({ items });
    } catch (error) {
      console.error('Failed to load portfolio manifest:', error);
      return res.status(500).json({ message: 'Failed to load portfolio items' });
    }
  }

  if (req.method === 'POST') {
    if (!validateInput(req.body)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    try {
      const items = await getVideoManifest();
      const now = new Date().toISOString();
      const newItem = {
        id: randomUUID(),
        ...req.body,
        tags: req.body.tags.map((t: string) => t.trim()).filter(Boolean),
        createdAt: now,
        updatedAt: now,
      };
      const updated = [...items, newItem];
      await saveVideoManifest(updated);
      return res.status(201).json({ item: newItem, items: updated });
    } catch (error) {
      console.error('Failed to create portfolio item:', error);
      return res.status(500).json({ message: 'Failed to save portfolio item' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
