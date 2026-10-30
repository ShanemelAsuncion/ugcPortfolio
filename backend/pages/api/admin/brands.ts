import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { rejectIfNotAuthenticated } from '../../../lib/auth';
import { getBrandManifest, saveBrandManifest } from '../../../lib/cloudinary';
import type { BrandItemInput } from '../../../lib/types';

function validateInput(body: any): body is BrandItemInput {
  return (
    body &&
    typeof body.name === 'string' &&
    body.name.trim().length > 0 &&
    (body.logo === undefined || typeof body.logo === 'string') &&
    (body.cloudinaryPublicId === undefined || typeof body.cloudinaryPublicId === 'string')
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (rejectIfNotAuthenticated(req, res)) return;

  if (req.method === 'GET') {
    try {
      const items = await getBrandManifest();
      return res.status(200).json({ items });
    } catch (error) {
      console.error('Failed to load brand manifest:', error);
      return res.status(500).json({ message: 'Failed to load brands' });
    }
  }

  if (req.method === 'POST') {
    if (!validateInput(req.body)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    try {
      const items = await getBrandManifest();
      const now = new Date().toISOString();
      const newItem = {
        id: randomUUID(),
        name: req.body.name.trim(),
        logo: req.body.logo?.trim() || undefined,
        cloudinaryPublicId: req.body.cloudinaryPublicId,
        createdAt: now,
        updatedAt: now,
      };
      const updated = [...items, newItem];
      await saveBrandManifest(updated);
      return res.status(201).json({ item: newItem, items: updated });
    } catch (error) {
      console.error('Failed to create brand:', error);
      return res.status(500).json({ message: 'Failed to save brand' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
