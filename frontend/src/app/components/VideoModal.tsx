import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
        <>
          {/* Backdrop */}
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
              className="relative bg-[#FAF8F5] rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-[#7E6956]" />
              </button>

              {/* Video Container */}
              <div className="aspect-video bg-gradient-to-br from-[#E5D5C4] to-[#C4A88A] flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* YouTube Embed */}
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={videoUrl.replace('watch?v=', 'embed/').replace('shorts/', 'embed/')}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  
                  {/* Overlay content */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">▶</div>
                      <p className="text-xl font-serif">{title}</p>
                      <p className="text-sm opacity-75 mt-2">{subtitle}</p>
                      <p className="text-xs opacity-50 mt-4">Click play button to start video</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-2xl font-serif text-[#7E6956] mb-2">
                  {title}
                </h3>
                <p className="text-[#9B8B7E]">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
