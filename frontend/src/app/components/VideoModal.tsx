import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { parseVideoLink } from '../lib/videoEmbed';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  /** 'upload' = direct video file (plays in a native <video> tag). 'url' = YouTube/Instagram/TikTok/Vimeo link (iframe embed). */
  videoType?: 'upload' | 'url';
  title: string;
  subtitle: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, videoType = 'url', title, subtitle }: VideoModalProps) {
  const link = videoType === 'url' && videoUrl ? parseVideoLink(videoUrl, true) : null;
  const linkLabel = link?.platform ? `Watch on ${link.platform}` : 'Watch the video';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#FAF6F0] rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-[#221D17]" />
            </button>

            {/* Video Container */}
            <div
              className={
                link?.vertical && link.embedUrl
                  ? 'h-[70vh] w-full max-w-[400px] mx-auto bg-black'
                  : 'aspect-video bg-black'
              }
            >
              {videoUrl && videoType === 'upload' ? (
                <video
                  className="w-full h-full"
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                />
              ) : link?.embedUrl ? (
                <iframe
                  className="w-full h-full"
                  src={link.embedUrl}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                link && (
                  <div className="w-full h-full flex items-center justify-center p-6 text-center text-white/80">
                    This video can't play here{link.href ? ' — use the link below to watch it.' : '.'}
                  </div>
                )
              )}
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-2xl font-serif text-[#221D17] mb-2">
                {title}
              </h3>
              <p className="text-[#6B5D50]">
                {subtitle}
              </p>
              {link?.href && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-[#B5623F] underline"
                >
                  {linkLabel}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}