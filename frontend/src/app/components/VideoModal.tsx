import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getYouTubeEmbedUrl } from '../lib/youtube';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  subtitle: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title, subtitle }: VideoModalProps) {
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
            <div className="aspect-video bg-black">
              {videoUrl && (
                <iframe
                  className="w-full h-full"
                  src={getYouTubeEmbedUrl(videoUrl, true)}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}