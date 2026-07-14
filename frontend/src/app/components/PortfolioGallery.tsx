import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoModal } from './VideoModal';

interface PortfolioItem {
  title: string;
  tags: string[];
  format: string;
  thumbnail: string;
  videoUrl: string;
}

// Add/edit videos here. Each video can have multiple niche tags —
// it will show up under every matching filter tab.
const portfolioItems: PortfolioItem[] = [
  {
    title: 'The "Glow-Up" Routine',
    tags: ['Skincare', 'Wellness'],
    format: 'Authentic Product Demo',
    thumbnail: '/thumbnails/IMG_0981.PNG',
    videoUrl: 'https://youtube.com/shorts/Ct62AVaAFO0?si=QZFByJcUxZ2Jf3iG',
  },
  {
    title: 'The "Coffee Breath" Cure',
    tags: ['Personal Care', 'Parenting'],
    format: 'Testimonial with Relatable Lifestyle Hook',
    thumbnail: '/thumbnails/IMG_1464.JPG',
    videoUrl: 'https://youtube.com/shorts/HEe6ldbjL-g?feature=share',
  },
  {
    title: 'The "Five-Minute" Refresh',
    tags: ['Haircare', 'Parenting'],
    format: 'Short-Form Problem/Solution Routine',
    thumbnail: '/thumbnails/IMG_1453.PNG',
    videoUrl: 'https://youtube.com/shorts/HWo6MUIOS3s',
  },
  {
    title: 'The Ultimate Hydration Secret',
    tags: ['Beauty', 'Wellness'],
    format: 'Unboxing and Product Demo',
    thumbnail: '/thumbnails/thumb1.png',
    videoUrl: 'https://youtube.com/shorts/BxbpYq2JL-o',
  },
  {
    title: 'Safe Sleep Transition Must Have',
    tags: ['Baby & Family', 'Parenting'],
    format: 'Testimonial & Product Review',
    thumbnail: '/thumbnails/thumb2.png',
    videoUrl: 'https://youtube.com/shorts/Uga_-UDcexM',
  },
  // Add portfolio items here!
];

export function PortfolioGallery() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    portfolioItems.forEach((item) => item.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // OR logic: a video shows if it matches ANY selected tag.
  const filteredItems =
    selectedTags.length === 0
      ? portfolioItems
      : portfolioItems.filter((item) =>
          item.tags.some((tag) => selectedTags.includes(tag))
        );

  return (
    <section id="portfolio" className="bg-[#FAF6F0] py-24 px-6 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B5623F] font-medium">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#221D17] mt-2">
            Selected Work
          </h2>
        </div>
        <p className="text-[#6B5D50] text-center mb-10">
          Filter by niche — select multiple to broaden your view.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <button
            onClick={() => setSelectedTags([])}
            className={`px-5 py-2 rounded-full text-sm transition-colors border ${
              selectedTags.length === 0
                ? 'bg-[#221D17] text-white border-[#221D17]'
                : 'bg-white text-[#6B5D50] border-[#E7DCCD] hover:border-[#B5623F]'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-5 py-2 rounded-full text-sm transition-colors border ${
                  isActive
                    ? 'bg-[#221D17] text-white border-[#221D17]'
                    : 'bg-white text-[#6B5D50] border-[#E7DCCD] hover:border-[#B5623F]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <p className="text-center text-[#6B5D50]">
            No videos match that combination yet — try a different filter.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setActiveItem(item)}
                >
                  <div className="relative mx-auto max-w-[200px]">
                    {/* iPhone frame */}
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl ring-1 ring-gray-700/50">
                      <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19] shadow-inner">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black w-24 h-6 rounded-b-2xl z-20 shadow-lg"></div>

                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                          <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#B5623F] border-b-[6px] border-b-transparent ml-1"></div>
                          </div>
                        </div>

                        {/* Screen reflection effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="text-center mt-4 space-y-1">
                    <h3 className="text-sm font-medium text-[#221D17]">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.08em] text-[#B5623F]">
                      {item.tags.join(' · ')}
                    </p>
                    <p className="text-xs text-[#6B5D50] font-light italic">
                      {item.format}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      <VideoModal
        isOpen={activeItem !== null}
        onClose={() => setActiveItem(null)}
        videoUrl={activeItem?.videoUrl ?? ''}
        title={activeItem?.title ?? ''}
        subtitle={activeItem ? activeItem.tags.join(' · ') : ''}
      />
    </section>
  );
}