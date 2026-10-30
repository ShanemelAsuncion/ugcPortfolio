export interface VideoLink {
  /** The original link, safe to use in an href. Empty if it isn't a valid web address. */
  href: string;
  /** Name of the site the link points to, when it's one we recognize. */
  platform?: 'YouTube' | 'Instagram' | 'TikTok' | 'Vimeo';
  /** Embeddable player URL. Unset when the site or link type can't be embedded. */
  embedUrl?: string;
  /** True for players built for phone-shaped video (Instagram, TikTok). */
  vertical: boolean;
}

/**
 * Works out which site a pasted video link belongs to and how to embed it.
 * Handles:
 *   YouTube: youtube.com/shorts/ID, /watch?v=ID, /embed/ID, /live/ID, youtu.be/ID
 *   Instagram: instagram.com/reel/CODE, /reels/CODE, /p/CODE, /tv/CODE (with or without a username)
 *   TikTok: tiktok.com/@user/video/ID (short vm.tiktok.com links don't contain the ID, so can't embed)
 *   Vimeo: vimeo.com/ID, vimeo.com/ID/HASH
 */
export function parseVideoLink(rawUrl: string, autoplay = false): VideoLink {
  let url: URL;
  try {
    const trimmed = rawUrl.trim();
    url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return { href: '', vertical: false };
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return { href: '', vertical: false };
  }

  const href = url.toString();
  const host = url.hostname.toLowerCase().replace(/^(www|m|music)\./, '');
  const path = url.pathname;

  if (host === 'youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
    const videoId =
      host === 'youtu.be'
        ? path.match(/^\/([\w-]+)/)?.[1]
        : url.searchParams.get('v') ?? path.match(/^\/(?:shorts|embed|live)\/([\w-]+)/)?.[1];
    if (!videoId) return { href, platform: 'YouTube', vertical: false };

    const params = new URLSearchParams({ modestbranding: '1', rel: '0' });
    if (autoplay) params.set('autoplay', '1');
    return {
      href,
      platform: 'YouTube',
      embedUrl: `https://www.youtube.com/embed/${videoId}?${params.toString()}`,
      vertical: false,
    };
  }

  if (host === 'instagram.com') {
    const match = path.match(/\/(reels?|p|tv)\/([\w-]+)/);
    if (!match) return { href, platform: 'Instagram', vertical: true };
    const kind = match[1] === 'reels' ? 'reel' : match[1];
    return {
      href,
      platform: 'Instagram',
      embedUrl: `https://www.instagram.com/${kind}/${match[2]}/embed/`,
      vertical: true,
    };
  }

  if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) {
    const videoId = path.match(/\/(?:video|embed\/v2)\/(\d+)/)?.[1];
    return {
      href,
      platform: 'TikTok',
      embedUrl: videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : undefined,
      vertical: true,
    };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const match = path.match(/^\/(?:video\/)?(\d+)(?:\/(\w+))?/);
    if (!match) return { href, platform: 'Vimeo', vertical: false };
    const params = new URLSearchParams();
    const hash = match[2] ?? url.searchParams.get('h');
    if (hash) params.set('h', hash);
    if (autoplay) params.set('autoplay', '1');
    const query = params.toString();
    return {
      href,
      platform: 'Vimeo',
      embedUrl: `https://player.vimeo.com/video/${match[1]}${query ? `?${query}` : ''}`,
      vertical: false,
    };
  }

  return { href, vertical: false };
}
