import { motion } from 'motion/react';

const brands: { name: string }[] = [
  // { name: ' ' },
  // { name: 'with' },
  // { name: 'me' },
];

export function BrandMarquee() {
  // Handle edge case when there are no brands
  if (brands.length === 0) {
    return (
      <section className="bg-white py-16 overflow-hidden border-y border-[#E5D5C4]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-center text-3xl md:text-4xl font-serif text-[#B8A08D]">
           Work with me!
          </h2>
        </motion.div>
        <div className="text-center text-[#9B8B7E]">
          <p></p>
        </div>
      </section>
    );
  }

  // Repeating the array ensures the marquee is long enough to loop seamlessly
  const repeatedBrands = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <section className="bg-white py-16 overflow-hidden border-y border-[#E5D5C4]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        {/* <h2 className="text-center text-3xl md:text-4xl font-serif text-[#B8A08D]">
          Brands I've Worked With
        </h2> */}
        <h2 className="text-center text-3xl md:text-4xl font-serif text-[#B8A08D]">
         Work with me!
        </h2>
      </motion.div>
      
      <div className="relative flex overflow-hidden">
        {/* Gradient overlays for a fade-in/out effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of brands */}
          {repeatedBrands.map((brand, index) => (
            <div key={`brand-1-${index}`} className="flex items-center mx-4">
              <div className="px-8 py-3 bg-[#F5F0EB] rounded-full border border-[#E5D5C4]">
                <span className="text-lg font-medium text-[#7E6956]">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate set for the seamless loop */}
          {repeatedBrands.map((brand, index) => (
            <div key={`brand-2-${index}`} className="flex items-center mx-4">
              <div className="px-8 py-3 bg-[#F5F0EB] rounded-full border border-[#E5D5C4]">
                <span className="text-lg font-medium text-[#7E6956]">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          /* Higher number = Slower speed */
          animation: marquee 60s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>
    </section>
  );
}