import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const links = [
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Photography', id: 'photography' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Stats', id: 'about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToId = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-sm border-b border-[#E7DCCD]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 h-16 md:h-20 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm md:text-base tracking-[0.15em] text-[#221D17] font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-[#B5623F]" />
          SHANEMEL ASUNCION
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToId(link.id)}
              className="text-sm uppercase tracking-[0.1em] text-[#6B5D50] hover:text-[#B5623F] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={() => scrollToId('contact')}
            className="px-6 py-2.5 bg-[#B5623F] text-white rounded-full hover:bg-[#9C4F30] transition-colors text-sm font-medium"
          >
            Work With Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden w-10 h-10 flex items-center justify-center text-[#221D17]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[#E7DCCD] bg-[#FAF6F0]"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToId(link.id)}
                  className="text-left text-sm uppercase tracking-[0.1em] text-[#6B5D50] hover:text-[#B5623F] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToId('contact')}
                className="px-6 py-3 bg-[#B5623F] text-white rounded-full hover:bg-[#9C4F30] transition-colors text-sm font-medium text-center"
              >
                Work With Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
