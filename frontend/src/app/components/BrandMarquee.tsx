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

function BrandChip({ brand }: { brand: Brand }) {
  return brand.logo ? (
    <div className="h-16 px-8 flex items-center justify-center bg-white rounded-full border border-[#E7DCCD] grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0">
      <img
        src={brand.logo}
        alt={brand.name}
        className="h-7 md:h-8 w-auto object-contain"
      />
    </div>
  ) : (
    <div className="px-8 py-3 bg-[#FAF6F0] rounded-full border border-[#E7DCCD] flex-shrink-0">
      <span className="text-lg font-medium text-[#221D17]">{brand.name}</span>
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 border-y border-[#E7DCCD]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[#B5623F] font-medium">
          Trusted By
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#221D17] mt-2">
          Brands I've Worked With
        </h2>
      </motion.div>

      {brands.length === 0 ? (
        <div className="text-center text-[#6B5D50]">
          <p></p>
        </div>
      ) : (
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex items-center gap-4 w-max animate-marquee">
            {[...brands, ...brands].map((brand, index) => (
              <BrandChip key={`${brand.name}-${index}`} brand={brand} />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}