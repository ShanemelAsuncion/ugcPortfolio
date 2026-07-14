import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const photos = [
  {
    url: '/thumbnails/IMG_0981.PNG',
    category: 'Skincare',
    description: 'Product Flatlay'
  },
  {
    url: '/thumbnails/IMG_1052.jpg',
    category: 'Skincare',
    description: 'Product Highlight'
  },
  {
    url: '/thumbnails/IMG_1464.JPG',
    category: 'Wellness & Personal Care',
    description: 'UGC Photo'
  },
  {
    url: '/thumbnails/IMG_1453.PNG',
    category: 'Hair Care',
    description: 'UGC Photo'
  },
  {
    url: '/thumbnails/IMG_1452.PNG',
    category: 'Hair Care',
    description: 'Product Highlight'
  },
  {
    url: '/thumbnails/IMG_1146.jpg',
    category: 'Skincare & Wellness',
    description: 'UGC Photo'
  }
];

export function UGCPhotoGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="photography" className="bg-white py-24 px-6 md:px-20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B5623F] font-medium">
            Photography
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#221D17] mt-2 mb-4">
            UGC &amp; Product Photography
          </h2>
          <p className="text-lg text-[#6B5D50] max-w-2xl mx-auto">
            Professional product photography that tells your brand's story through authentic, aesthetic imagery
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative flex-[0_0_100%] min-w-0"
                >
                  <div className="relative h-[420px] sm:h-[520px] md:h-[620px] bg-[#E7DCCD] overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.description}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#221D17]/85 via-[#221D17]/10 to-transparent flex flex-col justify-end p-8 md:p-10">
                      <span className="inline-block w-fit px-3 py-1 bg-[#B5623F] text-white text-xs uppercase tracking-[0.08em] font-medium rounded-full mb-3">
                        {photo.category}
                      </span>
                      <h3 className="text-white font-serif text-2xl md:text-3xl">
                        {photo.description}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Previous photo"
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border border-[#221D17]/10 hover:border-[#B5623F] flex items-center justify-center shadow-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#221D17]" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next photo"
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border border-[#221D17]/10 hover:border-[#B5623F] flex items-center justify-center shadow-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#221D17]" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? 'w-8 bg-[#B5623F]'
                  : 'w-2 bg-[#E7DCCD] hover:bg-[#D8B8A8]'
              }`}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[#6B5D50] italic">
            All photos edited with a cohesive color palette to match your brand aesthetic
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}