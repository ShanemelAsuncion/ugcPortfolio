// Browser-side helper: uploads a file directly to Cloudinary (never through our
// own server, so large video files don't hit Render's request size/time limits).

export type UploadPurpose = 'video' | 'thumbnail' | 'photo' | 'logo';

export interface UploadResult {
  secureUrl: string;
  publicId: string;
  thumbnailUrl?: string;
}

interface SignatureResponse {
  timestamp: number;
  folder: string;
  signature: string;
  apiKey: string;
  cloudName: string;
  resourceType: 'video' | 'image';
}

export function buildVideoThumbnailUrl(cloudName: string, publicId: string): string {
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_0/${publicId}.jpg`;
}

export async function uploadToCloudinary(
  file: File,
  purpose: UploadPurpose,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  const sigRes = await fetch('/api/admin/cloudinary-signature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ purpose }),
  });
  if (!sigRes.ok) {
    throw new Error('Could not start upload (not logged in?)');
  }
  const signature: SignatureResponse = await sigRes.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signature.apiKey);
  formData.append('timestamp', String(signature.timestamp));
  formData.append('signature', signature.signature);
  formData.append('folder', signature.folder);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${signature.cloudName}/${signature.resourceType}/upload`;

  const result = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl);
    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error('Unexpected response from Cloudinary'));
        }
      } else {
        reject(new Error(`Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error('Upload failed — check your connection'));
    xhr.send(formData);
  });

  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
    thumbnailUrl:
      signature.resourceType === 'video' ? buildVideoThumbnailUrl(signature.cloudName, result.public_id) : undefined,
  };
}
