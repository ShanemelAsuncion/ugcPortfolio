import { motion } from 'motion/react';

interface Brand {
  name: string;
  // Optional path to a logo image saved in /public/logos, e.g. '/logos/batiste.png'.
  // Brands without a logo automatically fall back to a text pill — no broken images.
  logo?: string;
}

// Add `logo: '/logos/yourfile.png'` once you have permission to use each brand's
// logo image. Save logo files in frontend/public/logos/.
//
// NOTE: display names below are my best guess from each filename — I haven't
// seen the actual logo images, so please correct any that are wrong
// (capitalization, spacing, apostrophes, etc.), especially: Paris Baguette,
// Another Face, FNTCASE, PRMR, Keyth, and Dodoskin.
const brands: Brand[] = [
  { name: 'Hasol', logo: '/logos/hasol.png' },
  { name: 'Sana', logo: '/logos/sana.png' },
  { name: 'Aromatica', logo: '/logos/aromatica.png' },
  { name: 'Covet', logo: '/logos/covet.png' },
  { name: 'Aussie', logo: '/logos/aussie.png' },
  { name: 'SKIN1004', logo: '/logos/skin1004.png' },
  { name: 'Boto', logo: '/logos/boto.jpg' },
  { name: 'Pith', logo: '/logos/pith.png' },
  { name: 'Goodal', logo: '/logos/goodal.png' },
  { name: 'COSRX', logo: '/logos/cosrx.png' },
  { name: 'Paris Baguette', logo: '/logos/parisbaguette.png' },
  { name: 'Abib', logo: '/logos/abib.jpg' },
  { name: 'Isntree', logo: '/logos/isntree.png' },
  { name: 'Unleashia', logo: '/logos/unleashia.png' },
  { name: 'ILSO', logo: '/logos/ilso.png' },
  { name: 'Beibei', logo: '/logos/beibei.avif' },
  { name: 'Rovectin', logo: '/logos/rovectin.png' },
  { name: 'Arlo', logo: '/logos/arlo.png' },
  { name: 'PanOxyl', logo: '/logos/panoxyl.png' },
  { name: 'Hero', logo: '/logos/Hero_Logo.jpg' },
  { name: 'AliveLab', logo: '/logos/alivelab.jpg' },
  { name: 'TheraBreath', logo: '/logos/therabreath.jpg' },
  { name: 'Fusidyne', logo: '/logos/fusidyne.jpg' },
  { name: 'Batiste', logo: '/logos/batiste.png' },
  { name: 'Clio', logo: '/logos/clio.png' },
  { name: 'Frudia', logo: '/logos/frudia.jpg' },
  { name: 'Thursday Plantation', logo: '/logos/thursdayplantation.png' },
  { name: 'Celeste', logo: '/logos/celeste.png' },
  { name: 'PRMR', logo: '/logos/prmr.jpg' },
  { name: 'Pampers', logo: '/logos/pampers.jpg' },
  { name: 'Parissa', logo: '/logos/parissa.jpg' },
  { name: 'FNTCASE', logo: '/logos/fntcase.jpg' },
  { name: 'Kiyoko', logo: '/logos/kiyoko.jpg' },
  { name: 'Another Face', logo: '/logos/anotherface.png' },
  { name: 'MaxClinic', logo: '/logos/maxclinic.jpg' },
  { name: 'Keyth', logo: '/logos/keyth.png' },
  { name: 'Benton', logo: '/logos/benton.jpg' },
  { name: "L'Oréal", logo: '/logos/loreal.png' },
  { name: 'iUNIK', logo: '/logos/iunik.png' },
  { name: 'CeraVe', logo: '/logos/cerave.jpg' },
  { name: 'Centellian24', logo: '/logos/centellian24.jpg' },
  { name: 'Lancôme', logo: '/logos/lancome.jpg' },
  { name: 'Renachris', logo: '/logos/renachris.jpg' },
  { name: 'Dodoskin', logo: '/logos/dodoskin.png' },
  { name: 'Anua', logo: '/logos/anua.png' },
  { name: 'Picky', logo: '/logos/picky.png' },
  { name: 'Native', logo: '/logos/native.png' },
  { name: "L'Occitane", logo: '/logos/loccitane.png' },
];

// Fixed chip height so logo pills and text pills always line up, regardless
// of a logo's natural aspect ratio or a brand name's text length.
const CHIP_HEIGHT = 'h-16';

function BrandChip({ brand }: { brand: Brand }) {
  return brand.logo ? (
    <div
      className={`${CHIP_HEIGHT} px-8 flex items-center justify-center bg-white rounded-full border border-[#E7DCCD] grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0`}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        // Capped relative to CHIP_HEIGHT so tall/odd-ratio logos never
        // overflow the pill — width adjusts automatically, height doesn't.
        className="max-h-8 md:max-h-9 w-auto object-contain"
      />
    </div>
  ) : (
    <div
      className={`${CHIP_HEIGHT} px-8 flex items-center justify-center bg-[#FAF6F0] rounded-full border border-[#E7DCCD] flex-shrink-0`}
    >
      <span className="text-lg font-medium text-[#221D17] whitespace-nowrap">
        {brand.name}
      </span>
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
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}