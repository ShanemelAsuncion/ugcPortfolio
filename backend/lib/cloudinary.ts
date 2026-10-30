import { v2 as cloudinary } from 'cloudinary';
import type { PortfolioItem, PhotoItem, BrandItem, SiteStats } from './types';

const VIDEO_MANIFEST_PUBLIC_ID = 'ugc-portfolio/manifest';
const PHOTO_MANIFEST_PUBLIC_ID = 'ugc-portfolio/photo-manifest';
const BRAND_MANIFEST_PUBLIC_ID = 'ugc-portfolio/brand-manifest';
const STATS_PUBLIC_ID = 'ugc-portfolio/stats';

export const VIDEO_UPLOAD_FOLDER = 'ugc-portfolio/videos';
export const THUMBNAIL_UPLOAD_FOLDER = 'ugc-portfolio/thumbnails';
export const PHOTO_UPLOAD_FOLDER = 'ugc-portfolio/photos';
export const BRAND_LOGO_UPLOAD_FOLDER = 'ugc-portfolio/brand-logos';

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

// The site's original hand-written brand marquee list. Logo paths are served
// from the public/logos folder of both the frontend and this backend.
const SEED_BRAND_ITEMS: BrandItem[] = [
  { id: 'seed-brand-1', name: 'Hasol', logo: '/logos/hasol.png', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'seed-brand-2', name: 'Sana', logo: '/logos/sana.png', createdAt: '2026-01-01T00:00:01.000Z', updatedAt: '2026-01-01T00:00:01.000Z' },
  { id: 'seed-brand-3', name: 'Aromatica', logo: '/logos/aromatica.png', createdAt: '2026-01-01T00:00:02.000Z', updatedAt: '2026-01-01T00:00:02.000Z' },
  { id: 'seed-brand-4', name: 'Covet', logo: '/logos/covet.png', createdAt: '2026-01-01T00:00:03.000Z', updatedAt: '2026-01-01T00:00:03.000Z' },
  { id: 'seed-brand-5', name: 'Aussie', logo: '/logos/aussie.png', createdAt: '2026-01-01T00:00:04.000Z', updatedAt: '2026-01-01T00:00:04.000Z' },
  { id: 'seed-brand-6', name: 'SKIN1004', logo: '/logos/skin1004.png', createdAt: '2026-01-01T00:00:05.000Z', updatedAt: '2026-01-01T00:00:05.000Z' },
  { id: 'seed-brand-7', name: 'Boto', logo: '/logos/boto.jpg', createdAt: '2026-01-01T00:00:06.000Z', updatedAt: '2026-01-01T00:00:06.000Z' },
  { id: 'seed-brand-8', name: 'Pith', logo: '/logos/pith.png', createdAt: '2026-01-01T00:00:07.000Z', updatedAt: '2026-01-01T00:00:07.000Z' },
  { id: 'seed-brand-9', name: 'Goodal', logo: '/logos/goodal.png', createdAt: '2026-01-01T00:00:08.000Z', updatedAt: '2026-01-01T00:00:08.000Z' },
  { id: 'seed-brand-10', name: 'COSRX', logo: '/logos/cosrx.png', createdAt: '2026-01-01T00:00:09.000Z', updatedAt: '2026-01-01T00:00:09.000Z' },
  { id: 'seed-brand-11', name: 'Paris Baguette', logo: '/logos/parisbaguette.png', createdAt: '2026-01-01T00:00:10.000Z', updatedAt: '2026-01-01T00:00:10.000Z' },
  { id: 'seed-brand-12', name: 'Abib', logo: '/logos/abib.jpg', createdAt: '2026-01-01T00:00:11.000Z', updatedAt: '2026-01-01T00:00:11.000Z' },
  { id: 'seed-brand-13', name: 'Isntree', logo: '/logos/isntree.png', createdAt: '2026-01-01T00:00:12.000Z', updatedAt: '2026-01-01T00:00:12.000Z' },
  { id: 'seed-brand-14', name: 'Unleashia', logo: '/logos/unleashia.png', createdAt: '2026-01-01T00:00:13.000Z', updatedAt: '2026-01-01T00:00:13.000Z' },
  { id: 'seed-brand-15', name: 'ILSO', logo: '/logos/ilso.png', createdAt: '2026-01-01T00:00:14.000Z', updatedAt: '2026-01-01T00:00:14.000Z' },
  { id: 'seed-brand-16', name: 'Beibei', logo: '/logos/beibei.avif', createdAt: '2026-01-01T00:00:15.000Z', updatedAt: '2026-01-01T00:00:15.000Z' },
  { id: 'seed-brand-17', name: 'Rovectin', logo: '/logos/rovectin.png', createdAt: '2026-01-01T00:00:16.000Z', updatedAt: '2026-01-01T00:00:16.000Z' },
  { id: 'seed-brand-18', name: 'Arlo', logo: '/logos/arlo.png', createdAt: '2026-01-01T00:00:17.000Z', updatedAt: '2026-01-01T00:00:17.000Z' },
  { id: 'seed-brand-19', name: 'PanOxyl', logo: '/logos/panoxyl.png', createdAt: '2026-01-01T00:00:18.000Z', updatedAt: '2026-01-01T00:00:18.000Z' },
  { id: 'seed-brand-20', name: 'Hero', logo: '/logos/Hero_Logo.jpg', createdAt: '2026-01-01T00:00:19.000Z', updatedAt: '2026-01-01T00:00:19.000Z' },
  { id: 'seed-brand-21', name: 'AliveLab', logo: '/logos/alivelab.jpg', createdAt: '2026-01-01T00:00:20.000Z', updatedAt: '2026-01-01T00:00:20.000Z' },
  { id: 'seed-brand-22', name: 'TheraBreath', logo: '/logos/therabreath.jpg', createdAt: '2026-01-01T00:00:21.000Z', updatedAt: '2026-01-01T00:00:21.000Z' },
  { id: 'seed-brand-23', name: 'Fusidyne', logo: '/logos/fusidyne.jpg', createdAt: '2026-01-01T00:00:22.000Z', updatedAt: '2026-01-01T00:00:22.000Z' },
  { id: 'seed-brand-24', name: 'Batiste', logo: '/logos/batiste.png', createdAt: '2026-01-01T00:00:23.000Z', updatedAt: '2026-01-01T00:00:23.000Z' },
  { id: 'seed-brand-25', name: 'Clio', logo: '/logos/clio.png', createdAt: '2026-01-01T00:00:24.000Z', updatedAt: '2026-01-01T00:00:24.000Z' },
  { id: 'seed-brand-26', name: 'Frudia', logo: '/logos/frudia.jpg', createdAt: '2026-01-01T00:00:25.000Z', updatedAt: '2026-01-01T00:00:25.000Z' },
  { id: 'seed-brand-27', name: 'Thursday Plantation', logo: '/logos/thursdayplantation.png', createdAt: '2026-01-01T00:00:26.000Z', updatedAt: '2026-01-01T00:00:26.000Z' },
  { id: 'seed-brand-28', name: 'Celeste', logo: '/logos/celeste.png', createdAt: '2026-01-01T00:00:27.000Z', updatedAt: '2026-01-01T00:00:27.000Z' },
  { id: 'seed-brand-29', name: 'PRMR', logo: '/logos/prmr.jpg', createdAt: '2026-01-01T00:00:28.000Z', updatedAt: '2026-01-01T00:00:28.000Z' },
  { id: 'seed-brand-30', name: 'Pampers', logo: '/logos/pampers.jpg', createdAt: '2026-01-01T00:00:29.000Z', updatedAt: '2026-01-01T00:00:29.000Z' },
  { id: 'seed-brand-31', name: 'Parissa', logo: '/logos/parissa.jpg', createdAt: '2026-01-01T00:00:30.000Z', updatedAt: '2026-01-01T00:00:30.000Z' },
  { id: 'seed-brand-32', name: 'FNTCASE', logo: '/logos/fntcase.jpg', createdAt: '2026-01-01T00:00:31.000Z', updatedAt: '2026-01-01T00:00:31.000Z' },
  { id: 'seed-brand-33', name: 'Kiyoko', logo: '/logos/kiyoko.jpg', createdAt: '2026-01-01T00:00:32.000Z', updatedAt: '2026-01-01T00:00:32.000Z' },
  { id: 'seed-brand-34', name: 'Another Face', logo: '/logos/anotherface.png', createdAt: '2026-01-01T00:00:33.000Z', updatedAt: '2026-01-01T00:00:33.000Z' },
  { id: 'seed-brand-35', name: 'MaxClinic', logo: '/logos/maxclinic.jpg', createdAt: '2026-01-01T00:00:34.000Z', updatedAt: '2026-01-01T00:00:34.000Z' },
  { id: 'seed-brand-36', name: 'Keyth', logo: '/logos/keyth.png', createdAt: '2026-01-01T00:00:35.000Z', updatedAt: '2026-01-01T00:00:35.000Z' },
  { id: 'seed-brand-37', name: 'Benton', logo: '/logos/benton.jpg', createdAt: '2026-01-01T00:00:36.000Z', updatedAt: '2026-01-01T00:00:36.000Z' },
  { id: 'seed-brand-38', name: "L'Oréal", logo: '/logos/loreal.png', createdAt: '2026-01-01T00:00:37.000Z', updatedAt: '2026-01-01T00:00:37.000Z' },
  { id: 'seed-brand-39', name: 'iUNIK', logo: '/logos/iunik.png', createdAt: '2026-01-01T00:00:38.000Z', updatedAt: '2026-01-01T00:00:38.000Z' },
  { id: 'seed-brand-40', name: 'CeraVe', logo: '/logos/cerave.jpg', createdAt: '2026-01-01T00:00:39.000Z', updatedAt: '2026-01-01T00:00:39.000Z' },
  { id: 'seed-brand-41', name: 'Centellian24', logo: '/logos/centellian24.jpg', createdAt: '2026-01-01T00:00:40.000Z', updatedAt: '2026-01-01T00:00:40.000Z' },
  { id: 'seed-brand-42', name: 'Lancôme', logo: '/logos/lancome.jpg', createdAt: '2026-01-01T00:00:41.000Z', updatedAt: '2026-01-01T00:00:41.000Z' },
  { id: 'seed-brand-43', name: 'Renachris', logo: '/logos/renachris.jpg', createdAt: '2026-01-01T00:00:42.000Z', updatedAt: '2026-01-01T00:00:42.000Z' },
  { id: 'seed-brand-44', name: 'Dodoskin', logo: '/logos/dodoskin.png', createdAt: '2026-01-01T00:00:43.000Z', updatedAt: '2026-01-01T00:00:43.000Z' },
  { id: 'seed-brand-45', name: 'Anua', logo: '/logos/anua.png', createdAt: '2026-01-01T00:00:44.000Z', updatedAt: '2026-01-01T00:00:44.000Z' },
  { id: 'seed-brand-46', name: 'Picky', logo: '/logos/picky.png', createdAt: '2026-01-01T00:00:45.000Z', updatedAt: '2026-01-01T00:00:45.000Z' },
  { id: 'seed-brand-47', name: 'Native', logo: '/logos/native.png', createdAt: '2026-01-01T00:00:46.000Z', updatedAt: '2026-01-01T00:00:46.000Z' },
  { id: 'seed-brand-48', name: "L'Occitane", logo: '/logos/loccitane.png', createdAt: '2026-01-01T00:00:47.000Z', updatedAt: '2026-01-01T00:00:47.000Z' },
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

export function getBrandManifest(): Promise<BrandItem[]> {
  return getJsonResource(BRAND_MANIFEST_PUBLIC_ID, SEED_BRAND_ITEMS);
}

export function saveBrandManifest(items: BrandItem[]): Promise<void> {
  return saveJsonResource(BRAND_MANIFEST_PUBLIC_ID, items);
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
