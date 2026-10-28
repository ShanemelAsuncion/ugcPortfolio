import { NextApiRequest, NextApiResponse } from 'next';
import { rejectIfNotAuthenticated } from '../../../lib/auth';
import {
  createUploadSignature,
  VIDEO_UPLOAD_FOLDER,
  THUMBNAIL_UPLOAD_FOLDER,
  PHOTO_UPLOAD_FOLDER,
} from '../../../lib/cloudinary';

const PURPOSES = {
  video: { folder: VIDEO_UPLOAD_FOLDER, resourceType: 'video' as const },
  thumbnail: { folder: THUMBNAIL_UPLOAD_FOLDER, resourceType: 'image' as const },
  photo: { folder: PHOTO_UPLOAD_FOLDER, resourceType: 'image' as const },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (rejectIfNotAuthenticated(req, res)) return;

  const { purpose } = req.body ?? {};
  const config = PURPOSES[purpose as keyof typeof PURPOSES];
  if (!config) {
    return res.status(400).json({ message: "purpose must be 'video', 'thumbnail', or 'photo'" });
  }

  try {
    const signatureParams = createUploadSignature(config.folder);
    res.status(200).json({ ...signatureParams, resourceType: config.resourceType });
  } catch (error) {
    console.error('Failed to create Cloudinary signature:', error);
    res.status(500).json({ message: 'Failed to prepare upload' });
  }
}
