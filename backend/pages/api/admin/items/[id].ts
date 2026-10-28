import { NextApiRequest, NextApiResponse } from 'next';
import { rejectIfNotAuthenticated } from '../../../../lib/auth';
import { getVideoManifest, saveVideoManifest, destroyVideo } from '../../../../lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (rejectIfNotAuthenticated(req, res)) return;

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid id' });
  }

  const items = await getVideoManifest();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  if (req.method === 'PUT') {
    const body = req.body ?? {};
    const existing = items[index];
    const updated = {
      ...existing,
      title: typeof body.title === 'string' ? body.title : existing.title,
      tags: Array.isArray(body.tags) ? body.tags.map((t: string) => t.trim()).filter(Boolean) : existing.tags,
      format: typeof body.format === 'string' ? body.format : existing.format,
      thumbnail: typeof body.thumbnail === 'string' ? body.thumbnail : existing.thumbnail,
      videoUrl: typeof body.videoUrl === 'string' ? body.videoUrl : existing.videoUrl,
      type: body.type === 'upload' || body.type === 'url' ? body.type : existing.type,
      cloudinaryPublicId:
        typeof body.cloudinaryPublicId === 'string' ? body.cloudinaryPublicId : existing.cloudinaryPublicId,
      updatedAt: new Date().toISOString(),
    };
    const next = [...items];
    next[index] = updated;

    try {
      await saveVideoManifest(next);
      return res.status(200).json({ item: updated, items: next });
    } catch (error) {
      console.error('Failed to update portfolio item:', error);
      return res.status(500).json({ message: 'Failed to save portfolio item' });
    }
  }

  if (req.method === 'DELETE') {
    const [removed] = items.splice(index, 1);
    try {
      await saveVideoManifest(items);
      // Best-effort cleanup of the Cloudinary video asset; don't fail the request if this errors.
      if (removed.type === 'upload' && removed.cloudinaryPublicId) {
        destroyVideo(removed.cloudinaryPublicId).catch((err) =>
          console.error('Failed to delete Cloudinary video asset:', err)
        );
      }
      return res.status(200).json({ items });
    } catch (error) {
      console.error('Failed to delete portfolio item:', error);
      return res.status(500).json({ message: 'Failed to delete portfolio item' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
