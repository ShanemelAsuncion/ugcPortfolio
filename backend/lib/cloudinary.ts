import { v2 as cloudinary } from 'cloudinary';
import type { PortfolioItem, PhotoItem, SiteStats } from './types';

const VIDEO_MANIFEST_PUBLIC_ID = 'ugc-portfolio/manifest';
const PHOTO_MANIFEST_PUBLIC_ID = 'ugc-portfolio/photo-manifest';
const STATS_PUBLIC_ID = 'ugc-portfolio/stats';

export const VIDEO_UPLOAD_FOLDER = 'ugc-portfolio/videos';
export const THUMBNAIL_UPLOAD_FOLDER = 'ugc-portfolio/thumbnails';
export const PHOTO_UPLOAD_FOLDER = 'ugc-portfolio/photos';

let configured = false;
function ensureConfigured() {
  if (configured) return;
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      'Missing Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)'
    );
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

// The site's original hand-written items (deduped from the old hardcoded
// array), used to seed each manifest the first time the admin API runs.
const SEED_VIDEO_ITEMS: PortfolioItem[] = [
  {
    id: 'seed-1',
    title: 'The "Glow-Up" Routine',
    tags: ['Skincare', 'Wellness'],
    format: 'Authentic Product Demo',
    thumbnail: '/thumbnails/IMG_0981.PNG',
    videoUrl: 'https://youtube.com/shorts/Ct62AVaAFO0?si=QZFByJcUxZ2Jf3iG',
    type: 'url',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-2',
    title: 'The "Coffee Breath" Cure',
    tags: ['Personal Care', 'Parenting'],
    format: 'Testimonial with Relatable Lifestyle Hook',
    thumbnail: '/thumbnails/IMG_1464.JPG',
    videoUrl: 'https://youtube.com/shorts/HEe6ldbjL-g?feature=share',
    type: 'url',
    createdAt: '2026-01-01T00:00:01.000Z',
    updatedAt: '2026-01-01T00:00:01.000Z',
  },
  {
    id: 'seed-3',
    title: 'The "Five-Minute" Refresh',
    tags: ['Haircare', 'Parenting'],
    format: 'Short-Form Problem/Solution Routine',
    thumbnail: '/thumbnails/IMG_1453.PNG',
    videoUrl: 'https://youtube.com/shorts/HWo6MUIOS3s',
    type: 'url',
    createdAt: '2026-01-01T00:00:02.000Z',
    updatedAt: '2026-01-01T00:00:02.000Z',
  },
  {
    id: 'seed-4',
    title: 'The Ultimate Hydration Secret',
    tags: ['Beauty', 'Wellness'],
    format: 'Unboxing and Product Demo',
    thumbnail: '/thumbnails/thumb1.png',
    videoUrl: 'https://youtube.com/shorts/BxbpYq2JL-o',
    type: 'url',
    createdAt: '2026-01-01T00:00:03.000Z',
    updatedAt: '2026-01-01T00:00:03.000Z',
  },
  {
    id: 'seed-5',
    title: 'Safe Sleep Transition Must Have',
    tags: ['Baby & Family', 'Parenting'],
    format: 'Testimonial & Product Review',
    thumbnail: '/thumbnails/thumb2.png',
    videoUrl: 'https://youtube.com/shorts/Uga_-UDcexM',
    type: 'url',
    createdAt: '2026-01-01T00:00:04.000Z',
    updatedAt: '2026-01-01T00:00:04.000Z',
  },
];

const SEED_PHOTO_ITEMS: PhotoItem[] = [
  {
    id: 'seed-photo-1',
    url: '/thumbnails/IMG_0981.PNG',
    category: 'Skincare',
    description: 'Product Flatlay',
    type: 'url',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-photo-2',
    url: '/thumbnails/IMG_1052.jpg',
    category: 'Skincare',
    description: 'Product Highlight',
    type: 'url',
    createdAt: '2026-01-01T00:00:01.000Z',
    updatedAt: '2026-01-01T00:00:01.000Z',
  },
  {
    id: 'seed-photo-3',
    url: '/thumbnails/IMG_1464.JPG',
    category: 'Wellness & Personal Care',
    description: 'UGC Photo',
    type: 'url',
    createdAt: '2026-01-01T00:00:02.000Z',
    updatedAt: '2026-01-01T00:00:02.000Z',
  },
  {
    id: 'seed-photo-4',
    url: '/thumbnails/IMG_1453.PNG',
    category: 'Hair Care',
    description: 'UGC Photo',
    type: 'url',
    createdAt: '2026-01-01T00:00:03.000Z',
    updatedAt: '2026-01-01T00:00:03.000Z',
  },
  {
    id: 'seed-photo-5',
    url: '/thumbnails/IMG_1452.PNG',
    category: 'Hair Care',
    description: 'Product Highlight',
    type: 'url',
    createdAt: '2026-01-01T00:00:04.000Z',
    updatedAt: '2026-01-01T00:00:04.000Z',
  },
  {
    id: 'seed-photo-6',
    url: '/thumbnails/IMG_1146.jpg',
    category: 'Skincare & Wellness',
    description: 'UGC Photo',
    type: 'url',
    createdAt: '2026-01-01T00:00:05.000Z',
    updatedAt: '2026-01-01T00:00:05.000Z',
  },
];

// The site's original hand-written Hero stats, used to seed this resource
// the first time the admin API runs.
const SEED_STATS: SiteStats = {
  totalReach: '8.3k',
  brands: '50+',
  videosDelivered: '70+',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

/** Reads a JSON resource (array or object) stored as a raw Cloudinary asset, seeding it on first use. */
async function getJsonResource<T>(publicId: string, seed: T): Promise<T> {
  ensureConfigured();
  try {
    const resource = await cloudinary.api.resource(publicId, { resource_type: 'raw' });
    const response = await fetch(resource.secure_url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to download resource: ${response.status}`);
    return (await response.json()) as T;
  } catch (err: any) {
    // Cloudinary throws with http_code 404 when the resource doesn't exist yet.
    if (err?.error?.http_code === 404 || err?.http_code === 404) {
      await saveJsonResource(publicId, seed);
      return seed;
    }
    throw err;
  }
}

/** Overwrites a JSON resource (array or object) on Cloudinary with the given data. */
async function saveJsonResource<T>(publicId: string, data: T): Promise<void> {
  ensureConfigured();
  const json = JSON.stringify(data, null, 2);
  const base64 = Buffer.from(json, 'utf-8').toString('base64');
  await cloudinary.uploader.upload(`data:application/json;base64,${base64}`, {
    public_id: publicId,
    resource_type: 'raw',
    overwrite: true,
    invalidate: true,
  });
}

export function getVideoManifest(): Promise<PortfolioItem[]> {
  return getJsonResource(VIDEO_MANIFEST_PUBLIC_ID, SEED_VIDEO_ITEMS);
}

export function saveVideoManifest(items: PortfolioItem[]): Promise<void> {
  return saveJsonResource(VIDEO_MANIFEST_PUBLIC_ID, items);
}

export function getPhotoManifest(): Promise<PhotoItem[]> {
  return getJsonResource(PHOTO_MANIFEST_PUBLIC_ID, SEED_PHOTO_ITEMS);
}

export function savePhotoManifest(items: PhotoItem[]): Promise<void> {
  return saveJsonResource(PHOTO_MANIFEST_PUBLIC_ID, items);
}

export function getSiteStats(): Promise<SiteStats> {
  return getJsonResource(STATS_PUBLIC_ID, SEED_STATS);
}

export function saveSiteStats(stats: SiteStats): Promise<void> {
  return saveJsonResource(STATS_PUBLIC_ID, stats);
}

/** Signed params a browser can use to upload a file directly to Cloudinary. */
export function createUploadSignature(folder: string) {
  ensureConfigured();
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);
  return {
    timestamp,
    folder,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  };
}

/** Builds a JPEG thumbnail URL for a Cloudinary-hosted video, grabbed from its first frame. */
export function getVideoThumbnailUrl(publicId: string): string {
  ensureConfigured();
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    transformation: [{ start_offset: '0' }],
    secure: true,
  });
}

/** Deletes a video asset from Cloudinary (best-effort; failures are swallowed by the caller). */
export async function destroyVideo(publicId: string): Promise<void> {
  ensureConfigured();
  await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
}

/** Deletes an image asset from Cloudinary (best-effort; failures are swallowed by the caller). */
export async function destroyImage(publicId: string): Promise<void> {
  ensureConfigured();
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}
