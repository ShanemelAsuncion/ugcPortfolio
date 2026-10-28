// The Next.js backend (also hosts the admin panel + Cloudinary-backed API).
// Override with VITE_API_BASE_URL for local dev against `npm run dev` in /backend.
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'https://ugcportfolio-dqvc.onrender.com';
