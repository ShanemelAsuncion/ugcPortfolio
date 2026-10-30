import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { VideoModal } from './VideoModal';
import { API_BASE_URL } from '../lib/config';

interface PortfolioItem {
  title: string;
  tags: string[];
  format: string;
  thumbnail: string;
  videoUrl: string;
  /** 'upload' = a video file hosted on Cloudinary, played with a native <video> tag.
   *  'url' = a manually pasted link (YouTube, etc), played in an iframe embed. */
  type?: 'upload' | 'url';
}

// Shown immediately on load (and used as a fallback if the admin-managed API
// is unreachable) so the gallery is never empty. Real editing happens at
// /admin on the backend — see PortfolioGallery's useEffect below, which
// fetches the live, admin-managed list and replaces this once it arrives.
const fallbackPortfolioItems: PortfolioItem[] = [
  {
    title: 'The "Glow-Up" Routine',
    tags: ['Skincare', 'Wellness'],
    format: 'Authentic Product Demo',
    thumbnail: '/thumbnails/IMG_0981.PNG',
    videoUrl: 'https://youtube.com/shorts/Ct62AVaAFO0?si=QZFByJcUxZ2Jf3iG',
    type: 'url',
  },
  {
    title: 'The "Coffee Breath" Cure',
    tags: ['Personal Care', 'Parenting'],
    format: 'Testimonial with Relatable Lifestyle Hook',
    thumbnail: '/thumbnails/IMG_1464.JPG',
    videoUrl: 'https://youtube.com/shorts/HEe6ldbjL-g?feature=share',
    type: 'url',
  },
  {
    title: 'The "Five-Minute" Refresh',
    tags: ['Haircare', 'Parenting'],
    format: 'Short-Form Problem/Solution Routine',
    thumbnail: '/thumbnails/IMG_1453.PNG',
    videoUrl: 'https://youtube.com/shorts/HWo6MUIOS3s',
    type: 'url',
  },
  {
    title: 'The Ultimate Hydration Secret',
    tags: ['Beauty', 'Wellness'],
    format: 'Unboxing and Product Demo',
    thumbnail: '/thumbnails/thumb1.png',
    videoUrl: 'https://youtube.com/shorts/BxbpYq2JL-o',
    type: 'url',
  },
  {
    title: 'Safe Sleep Transition Must Have',
    tags: ['Baby & Family', 'Parenting'],
    format: 'Testimonial & Product Review',
    thumbnail: '/thumbnails/thumb2.png',
    videoUrl: 'https://youtube.com/shorts/Uga_-UDcexM',
    type: 'url',
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
  // Starts with the bundled fallback so the gallery is never empty, then
  // swaps in the admin-managed list from the backend once it loads (the
  // backend can have a cold-start delay on its free hosting tier, so the
  // fallback is what most first-time visitors briefly see).
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(fallbackPortfolioItems);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/api/portfolio`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Status ${res.status}`))))
      .then((data) => {
        if (!cancelled && Array.isArray(data.items) && data.items.length > 0) {
          setPortfolioItems(data.items);
        }
      })
      .catch((err) => {
        console.warn('Falling back to bundled portfolio items:', err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const columns = useColumnCount();
  const itemsPerPage = columns * ROWS_PER_PAGE;

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    portfolioItems.forEach((item) => item.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [portfolioItems]);

  const toggleTag = (tag: string) => {
    setTagSearch('');
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setTagSearch('');
    setSelectedTags([]);
  };

  const normalizedSearch = tagSearch.trim().toLowerCase();
  const suggestions = normalizedSearch
    ? allTags.filter((tag) => tag.toLowerCase().includes(normalizedSearch))
    : [];

  const handleSearchChange = (value: string) => {
    setTagSearch(value);
    setSelectedTags([]);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  };

  const pickSuggestion = (tag: string) => {
    setTagSearch(tag);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'Enter') {
      if (showSuggestions && suggestions[highlightedIndex]) {
        pickSuggestion(suggestions[highlightedIndex]);
      } else {
        setShowSuggestions(false);
      }
    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && suggestions.length > 0) {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setShowSuggestions(true);
      setHighlightedIndex((i) => (i + step + suggestions.length) % suggestions.length);
    }
  };

  // The search box and the tag buttons are separate filters — using one clears
  // the other. Search: a full tag name matches only that tag, partial text
  // matches any tag containing it. Buttons: OR logic, a video shows if it
  // matches ANY selected tag.
  const exactTag = allTags.find((tag) => tag.toLowerCase() === normalizedSearch);
  const filteredItems = portfolioItems.filter((item) => {
    if (normalizedSearch) {
      return item.tags.some((tag) =>
        exactTag ? tag === exactTag : tag.toLowerCase().includes(normalizedSearch)
      );
    }
    return selectedTags.length === 0 || item.tags.some((tag) => selectedTags.includes(tag));
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  // Reset to page 1 whenever the filter or column count (screen size) changes,
  // so you never land on a now-empty page.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, normalizedSearch, itemsPerPage]);

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

        {/* Tag search */}
        <div className="relative z-30 max-w-md mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B8B7E] pointer-events-none" />
          <input
            type="search"
            role="combobox"
            value={tagSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            placeholder="Search by tag, e.g. Skincare"
            aria-label="Search videos by tag"
            aria-expanded={showSuggestions && normalizedSearch.length > 0}
            aria-controls="portfolio-tag-suggestions"
            aria-autocomplete="list"
            autoComplete="off"
            className="w-full pl-11 pr-5 py-2.5 rounded-full bg-white border border-[#E5DDD3] text-sm text-[#7E6956] placeholder:text-[#9B8B7E] focus:outline-none focus:border-[#C4A88A] transition-colors"
          />

          {showSuggestions && normalizedSearch && (
            <ul
              id="portfolio-tag-suggestions"
              role="listbox"
              className="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-y-auto rounded-2xl bg-white border border-[#E5DDD3] shadow-lg py-2"
            >
              {suggestions.length === 0 ? (
                <li className="px-5 py-2 text-sm text-[#9B8B7E]">No matching tags</li>
              ) : (
                suggestions.map((tag, index) => (
                  <li
                    key={tag}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    // Keeps focus in the input so its onBlur doesn't close the
                    // list before the click lands.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pickSuggestion(tag)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-5 py-2 text-sm text-[#7E6956] cursor-pointer ${
                      index === highlightedIndex ? 'bg-[#FAF0E6]' : ''
                    }`}
                  >
                    {tag}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Filter tabs — always a single row; scrolls horizontally if it
            doesn't fit rather than wrapping to a second line. */}
        <div className="flex flex-nowrap items-center gap-2 sm:gap-3 mb-14 overflow-x-auto px-2 pb-1 justify-start sm:justify-center">
          <button
            onClick={clearFilters}
            className={`flex-shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-sm transition-colors border ${
              selectedTags.length === 0 && !normalizedSearch
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
            No videos match that search or combination yet — try a different tag.
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
        videoType={activeItem?.type ?? 'url'}
        title={activeItem?.title ?? ''}
        subtitle={activeItem ? activeItem.tags.join(' · ') : ''}
      />
    </section>
  );
}