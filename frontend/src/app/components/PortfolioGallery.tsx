import { useState } from 'react';
import { motion } from 'motion/react';

const portfolioItems = [
  {
    title: 'The "Glow-Up" Routine',
    niche: 'Wellness & Skincare',
    format: 'Authentic Product Demo',
    thumbnail: '/thumbnails/IMG_0981.PNG',
    videoUrl: 'https://youtube.com/shorts/Ct62AVaAFO0?si=QZFByJcUxZ2Jf3iG'
  },
  {
    title: 'The "Coffee Breath" Cure',
    niche: 'Personal Care & Parenting Lifestyle',
    format: 'Testimonial with Relatable Lifestyle Hook',
    thumbnail: '/thumbnails/IMG_1464.JPG',
    videoUrl: 'https://youtube.com/shorts/HEe6ldbjL-g?feature=share'
  },
  {
    title: 'The "Five-Minute" Refresh',
    niche: 'Beauty & Haircare / Parenting Lifestyle',
    format: 'Short-Form Problem/Solution Routine',
    thumbnail: '/thumbnails/IMG_1453.PNG',
    videoUrl: 'https://youtube.com/shorts/HWo6MUIOS3s'
  },
  {
    title: 'The Ultimate Hydration Secret',
    niche: 'Beauty & Wellness',
    format: 'Unboxing and Product Demo',
    thumbnail: '/thumbnails/thumb1.png',
    videoUrl: 'https://youtube.com/shorts/BxbpYq2JL-o'
  },
  {
    title: 'Safe Sleep Transition Must Have',
    niche: 'Family & Baby / Parenting',
    format: 'Testimonial & Product Review',
    thumbnail: '/thumbnails/thumb2.png',
    videoUrl: 'https://youtube.com/shorts/Uga_-UDcexM'
  },
];

export function PortfolioGallery() {
  // Track the index of the video currently playing
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const getEmbedUrl = (url: string) => {
    const videoId = url.includes('shorts/') 
      ? url.split('shorts/')[1].split('?')[0]
      : url.includes('v=') 
        ? url.split('v=')[1].split('&')[0]
        : url.split('/').pop()?.split('?')[0];
    
    // Adding autoplay=1 so it plays immediately on click
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
  };

  return (
    <section id="portfolio" className="bg-[#FAF8F5] py-24 px-6 md:px-20">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#7E6956] mb-16 text-center">
          My Portfolio
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {portfolioItems.map((item, index) => {
            const isPlaying = activeVideoIndex === index;

            return (
              <motion.div 
                key={index} 
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveVideoIndex(index)}
              >
                <div className="relative mx-auto max-w-[200px]">
                  {/* iPhone frame */}
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl ring-1 ring-gray-700/50">
                    <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19] shadow-inner">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black w-24 h-6 rounded-b-2xl z-20 shadow-lg"></div>
                      
                      {isPlaying ? (
                        /* Live Video Player */
                        <iframe
                          className="w-full h-full"
                          src={getEmbedUrl(item.videoUrl)}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        /* Static Thumbnail Mode */
                        <>
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
                        </>
                      )}
                      
                      {/* Screen reflection effect (removed when playing for better visibility) */}
                      {!isPlaying && <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>}
                    </div>
                  </div>
                </div>
                
                {/* Caption */}
                <div className="text-center mt-4 space-y-1">
                  <h3 className={`text-sm font-medium transition-colors ${isPlaying ? 'text-black' : 'text-[#7E6956]'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9B8B7E]">
                    {item.niche}
                  </p>
                  <p className="text-xs text-[#B8A08D] font-light italic">
                    {item.format}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}