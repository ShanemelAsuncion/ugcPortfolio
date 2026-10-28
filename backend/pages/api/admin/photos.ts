import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { rejectIfNotAuthenticated } from '../../../lib/auth';
import { getPhotoManifest, savePhotoManifest } from '../../../lib/cloudinary';
import type { PhotoItemInput } from '../../../lib/types';

function validateInput(body: any): body is PhotoItemInput {
  return (
    body &&
    typeof body.url === 'string' &&
    body.url.trim().length > 0 &&
    typeof body.category === 'string' &&
    typeof body.description === 'string' &&
    (body.type === 'upload' || body.type === 'url')
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (rejectIfNotAuthenticated(req, res)) return;

  if (req.method === 'GET') {
    try {
      const items = await getPhotoManifest();
      return res.status(200).json({ items });
    } catch (error) {
      console.error('Failed to load photo manifest:', error);
      return res.status(500).json({ message: 'Failed to load photos' });
    }
  }

  if (req.method === 'POST') {
    if (!validateInput(req.body)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    try {
      const items = await getPhotoManifest();
      const now = new Date().toISOString();
      const newItem = {
        id: randomUUID(),
        ...req.body,
        category: req.body.category.trim(),
        description: req.body.description.trim(),
        createdAt: now,
        updatedAt: now,
      };
      const updated = [...items, newItem];
      await savePhotoManifest(updated);
      return res.status(201).json({ item: newItem, items: updated });
    } catch (error) {
      console.error('Failed to create photo:', error);
      return res.status(500).json({ message: 'Failed to save photo' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
