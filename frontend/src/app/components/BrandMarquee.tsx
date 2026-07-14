import { motion } from 'motion/react';

interface Brand {
  name: string;
  // Optional path to a logo image saved in /public/logos, e.g. '/logos/batiste.png'.
  // Brands without a logo automatically fall back to a text pill — no broken images.
  logo?: string;
}

// Add `logo: '/logos/yourfile.png'` once you have permission to use each brand's
// logo image. Save logo files in frontend/public/logos/.
const brands: Brand[] = [
  { name: 'Batiste' },
  { name: 'Therabreath' },
  { name: 'Hero' },
];

export function BrandMarquee() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 border-y border-[#E5D5C4]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h2 className="text-center text-3xl md:text-4xl font-serif text-[#B8A08D]">
          Work with me!
        </h2>
      </motion.div>

      {brands.length === 0 ? (
        <div className="text-center text-[#9B8B7E]">
          <p></p>
        </div>
      ) : (
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {brands.map((brand) =>
            brand.logo ? (
              <div
                key={brand.name}
                className="h-16 px-8 flex items-center justify-center bg-white rounded-full border border-[#E5D5C4] grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-7 md:h-8 w-auto object-contain"
                />
              </div>
            ) : (
              <div
                key={brand.name}
                className="px-8 py-3 bg-[#F5F0EB] rounded-full border border-[#E5D5C4]"
              >
                <span className="text-lg font-medium text-[#7E6956]">
                  {brand.name}
                </span>
              </div>
            )
          )}
        </motion.div>
      )}
    </section>
  );
}