/**
 * Converts a YouTube watch/shorts/short-link URL into a clean embeddable URL.
 * Handles: youtube.com/shorts/ID, youtube.com/watch?v=ID, youtu.be/ID
 * Strips any trailing query params (e.g. ?si=..., ?feature=share) from the ID.
 */
export function getYouTubeEmbedUrl(url: string, autoplay = false): string {
  const idMatch = url.match(/(?:shorts\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
  const videoId = idMatch?.[1] ?? url.split('/').pop()?.split('?')[0] ?? '';

  const params = new URLSearchParams({
    modestbranding: '1',
    rel: '0',
  });
  if (autoplay) params.set('autoplay', '1');

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}