export interface PortfolioItem {
  id: string;
  title: string;
  tags: string[];
  format: string;
  thumbnail: string;
  videoUrl: string;
  /** 'upload' = video file hosted on Cloudinary. 'url' = manually pasted link (YouTube, etc). */
  type: 'upload' | 'url';
  /** Cloudinary public_id of the video, only set when type === 'upload'. Lets us delete the asset later. */
  cloudinaryPublicId?: string;
  createdAt: string;
  updatedAt: string;
}

export type PortfolioItemInput = Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>;

export interface PhotoItem {
  id: string;
  url: string;
  category: string;
  description: string;
  /** 'upload' = image file hosted on Cloudinary. 'url' = manually pasted image link. */
  type: 'upload' | 'url';
  /** Cloudinary public_id of the image, only set when type === 'upload'. Lets us delete the asset later. */
  cloudinaryPublicId?: string;
  createdAt: string;
  updatedAt: string;
}

export type PhotoItemInput = Omit<PhotoItem, 'id' | 'createdAt' | 'updatedAt'>;

export interface BrandItem {
  id: string;
  name: string;
  /** Logo image URL or site-relative path. Brands without one show as a text pill. */
  logo?: string;
  /** Cloudinary public_id of the logo, only set for uploaded logos. Lets us delete the asset later. */
  cloudinaryPublicId?: string;
  createdAt: string;
  updatedAt: string;
}

export type BrandItemInput = Omit<BrandItem, 'id' | 'createdAt' | 'updatedAt'>;

export interface SiteStats {
  /** Free-text, e.g. "8.3k" — these are self-reported marketing numbers, not derived from any API. */
  totalReach: string;
  brands: string;
  videosDelivered: string;
  updatedAt: string;
}

export type SiteStatsInput = Omit<SiteStats, 'updatedAt'>;
