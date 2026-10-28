import { NextApiRequest, NextApiResponse } from 'next';
import { rejectIfNotAuthenticated } from '../../../../lib/auth';
import { getPhotoManifest, savePhotoManifest, destroyImage } from '../../../../lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (rejectIfNotAuthenticated(req, res)) return;

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid id' });
  }

  const items = await getPhotoManifest();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Photo not found' });
  }

  if (req.method === 'PUT') {
    const body = req.body ?? {};
    const existing = items[index];
    const updated = {
      ...existing,
      url: typeof body.url === 'string' ? body.url : existing.url,
      category: typeof body.category === 'string' ? body.category.trim() : existing.category,
      description: typeof body.description === 'string' ? body.description.trim() : existing.description,
      type: body.type === 'upload' || body.type === 'url' ? body.type : existing.type,
      cloudinaryPublicId:
        typeof body.cloudinaryPublicId === 'string' ? body.cloudinaryPublicId : existing.cloudinaryPublicId,
      updatedAt: new Date().toISOString(),
    };
    const next = [...items];
    next[index] = updated;

    try {
      await savePhotoManifest(next);
      return res.status(200).json({ item: updated, items: next });
    } catch (error) {
      console.error('Failed to update photo:', error);
      return res.status(500).json({ message: 'Failed to save photo' });
    }
  }

  if (req.method === 'DELETE') {
    const [removed] = items.splice(index, 1);
    try {
      await savePhotoManifest(items);
      // Best-effort cleanup of the Cloudinary image asset; don't fail the request if this errors.
      if (removed.type === 'upload' && removed.cloudinaryPublicId) {
        destroyImage(removed.cloudinaryPublicId).catch((err) =>
          console.error('Failed to delete Cloudinary image asset:', err)
        );
      }
      return res.status(200).json({ items });
    } catch (error) {
      console.error('Failed to delete photo:', error);
      return res.status(500).json({ message: 'Failed to delete photo' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
