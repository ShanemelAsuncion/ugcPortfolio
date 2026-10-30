import { NextApiRequest, NextApiResponse } from 'next';
import { rejectIfNotAuthenticated } from '../../../../lib/auth';
import { getBrandManifest, saveBrandManifest, destroyImage } from '../../../../lib/cloudinary';

function cleanUpLogo(publicId: string) {
  // Best-effort cleanup of the Cloudinary image asset; don't fail the request if this errors.
  destroyImage(publicId).catch((err) => console.error('Failed to delete Cloudinary logo asset:', err));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (rejectIfNotAuthenticated(req, res)) return;

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid id' });
  }

  const items = await getBrandManifest();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Brand not found' });
  }

  if (req.method === 'PUT') {
    const body = req.body ?? {};
    if (typeof body.name !== 'string' || body.name.trim().length === 0) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }
    const existing = items[index];
    // The form always sends the brand's full state, so a missing logo means it was removed.
    const updated = {
      ...existing,
      name: body.name.trim(),
      logo: typeof body.logo === 'string' && body.logo.trim() ? body.logo.trim() : undefined,
      cloudinaryPublicId: typeof body.cloudinaryPublicId === 'string' ? body.cloudinaryPublicId : undefined,
      updatedAt: new Date().toISOString(),
    };
    const next = [...items];
    next[index] = updated;

    try {
      await saveBrandManifest(next);
      if (existing.cloudinaryPublicId && existing.cloudinaryPublicId !== updated.cloudinaryPublicId) {
        cleanUpLogo(existing.cloudinaryPublicId);
      }
      return res.status(200).json({ item: updated, items: next });
    } catch (error) {
      console.error('Failed to update brand:', error);
      return res.status(500).json({ message: 'Failed to save brand' });
    }
  }

  if (req.method === 'DELETE') {
    const [removed] = items.splice(index, 1);
    try {
      await saveBrandManifest(items);
      if (removed.cloudinaryPublicId) {
        cleanUpLogo(removed.cloudinaryPublicId);
      }
      return res.status(200).json({ items });
    } catch (error) {
      console.error('Failed to delete brand:', error);
      return res.status(500).json({ message: 'Failed to delete brand' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
