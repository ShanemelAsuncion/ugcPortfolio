import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
];

// Tracks how many grid columns are active at the current breakpoint,
// matching the Tailwind classes on the grid below (2 / 3 / 5 columns).
function useColumnCount() {
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const getColumns = () => {
      if (window.innerWidth < 640) return 2; // grid-cols-2
      if (window.innerWidth < 1024) return 3; // sm:grid-cols-3
      return 5; // lg:grid-cols-5
    };
    const handleResize = () => setColumns(getColumns());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columns;
}

const ROWS_PER_PAGE = 2;

export function PortfolioGallery() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = useColumnCount();
  const itemsPerPage = columns * ROWS_PER_PAGE;

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

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  // Reset to page 1 whenever the filter or column count (screen size) changes,
  // so you never land on a now-empty page.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="portfolio" className="bg-[#FAF8F5] py-24 px-6 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#7E6956] mb-6 text-center">
          My Portfolio
        </h2>
        <p className="text-[#7E6956]/80 text-center mb-10">
          Filter by niche — select multiple to broaden your view.
        </p>

        {/* Filter tabs — always a single row; scrolls horizontally if it
            doesn't fit rather than wrapping to a second line. */}
        <div className="flex flex-nowrap items-center gap-2 sm:gap-3 mb-14 overflow-x-auto px-2 pb-1 justify-start sm:justify-center">
          <button
            onClick={() => setSelectedTags([])}
            className={`flex-shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-sm transition-colors border ${
              selectedTags.length === 0
                ? 'bg-[#C4A88A] text-white border-[#C4A88A]'
                : 'bg-white text-[#7E6956] border-[#E5DDD3] hover:border-[#C4A88A]'
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
                className={`flex-shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-sm transition-colors border ${
                  isActive
                    ? 'bg-[#C4A88A] text-white border-[#C4A88A]'
                    : 'bg-white text-[#7E6956] border-[#E5DDD3] hover:border-[#C4A88A]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <p className="text-center text-[#9B8B7E]">
            No videos match that combination yet — try a different filter.
          </p>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {paginatedItems.map((item, itemIndex) => (
                  <motion.div
                    key={`${item.title}-${itemIndex}`}
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
                              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#7E6956] border-b-[6px] border-b-transparent ml-1"></div>
                            </div>
                          </div>

                          {/* Screen reflection effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="text-center mt-4 space-y-1">
                      <h3 className="text-sm font-medium text-[#7E6956]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#9B8B7E]">
                        {item.tags.join(' · ')}
                      </p>
                      <p className="text-xs text-[#B8A08D] font-light italic">
                        {item.format}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5DDD3] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#C4A88A] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-[#7E6956]" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[#C4A88A] text-white'
                        : 'bg-white text-[#7E6956] border border-[#E5DDD3] hover:border-[#C4A88A]'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5DDD3] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#C4A88A] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-[#7E6956]" />
                </button>
              </div>
            )}
          </>
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