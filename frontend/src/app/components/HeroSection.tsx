import { ArrowRight, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { RiInstagramFill, RiYoutubeFill } from 'react-icons/ri';
import { motion } from 'motion/react';

const stats = [
  { value: '8.3k', label: 'Total Reach' },
  { value: '50+', label: 'Brands' },
  { value: '70+', label: 'Videos Delivered' },
];

export function HeroSection() {
  return (
    <section className="min-h-screen bg-[#FAF6F0] flex items-center px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Typography */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#B5623F] font-medium">
                  UGC Creator
                </span>
                <span className="h-px w-10 bg-[#B5623F]" />
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-[#221D17] mb-4 leading-tight">
                Shanemel<br />Asuncion
              </h1>
              <p className="text-lg text-[#6B5D50] mt-6">
                UGC Creator for Beauty, Wellness, Parenting &amp; Tech Brands — short-form video built for paid ads
              </p>

              {/* Niche badges — instant category scan for brands */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Skincare', 'Wellness', 'Beauty', 'Parenting & Baby', 'Tech'].map((niche) => (
                  <span
                    key={niche}
                    className="px-3 py-1 bg-transparent border border-[#E7DCCD] rounded-full text-xs text-[#6B5D50]"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap items-start gap-x-8 gap-y-4 py-6 border-y border-[#E7DCCD]">
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-start gap-8">
                  <div>
                    <div className="text-3xl font-serif text-[#221D17]">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#6B5D50] mt-1">
                      {stat.label}
                    </div>
                  </div>
                  {index < stats.length - 1 && (
                    <span className="hidden sm:block w-px h-10 bg-[#E7DCCD]" />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#6B5D50]">
                <div className="w-8 h-8 rounded-full border border-[#E7DCCD] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#B5623F]" />
                </div>
                <div>
                  <span className="font-medium text-[#221D17]">Email:</span>{' '}
                  <a href="mailto:lei.ugc.ca@gmail.com" className="hover:text-[#B5623F] transition-colors">
                    lei.ugc.ca@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#6B5D50]">
                <div className="w-8 h-8 rounded-full border border-[#E7DCCD] flex items-center justify-center flex-shrink-0">
                  <FaTiktok className="w-4 h-4 text-[#B5623F]" />
                </div>
                <div>
                  <span className="font-medium text-[#221D17]">TikTok:</span>{' '}
                  <a href="https://tiktok.com/@mami.and.reyn" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5623F] transition-colors">
                    @mami.and.reyn,
                  </a>
                </div>
                <div>
                  <a href="https://tiktok.com/@ms_swan_" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5623F] transition-colors">
                    @ms_swan_
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#6B5D50]">
                <div className="w-8 h-8 rounded-full border border-[#E7DCCD] flex items-center justify-center flex-shrink-0">
                  <RiInstagramFill className="w-4 h-4 text-[#B5623F]" />
                </div>
                <div>
                  <span className="font-medium text-[#221D17]">Instagram:</span>{' '}
                  <a href="https://instagram.com/lei.ugc.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5623F] transition-colors">
                    @lei.ugc.ca,
                  </a>
                </div>
                <div>
                  <a href="https://instagram.com/mami.and.reyn" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5623F] transition-colors">
                    @mami.and.reyn
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#6B5D50]">
                <div className="w-8 h-8 rounded-full border border-[#E7DCCD] flex items-center justify-center flex-shrink-0">
                  <RiYoutubeFill className="w-4 h-4 text-[#B5623F]" />
                </div>
                <div>
                  <span className="font-medium text-[#221D17]">YouTube:</span>{' '}
                  <a href="https://youtube.com/@lei.ugc.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5623F] transition-colors">
                    @lei.ugc.ca
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8">
              <a
                href="#portfolio"
                className="inline-flex flex-shrink-0 whitespace-nowrap px-6 md:px-8 py-3 md:py-4 bg-[#B5623F] text-white rounded-full hover:bg-[#9C4F30] transition-colors text-sm md:text-base font-medium shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex flex-shrink-0 whitespace-nowrap px-6 md:px-8 py-3 md:py-4 bg-transparent text-[#221D17] border border-[#221D17] rounded-full hover:bg-[#221D17] hover:text-white transition-all text-sm md:text-base font-medium"
              >
                Work With Me
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('pricing');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 flex-shrink-0 whitespace-nowrap text-[#6B5D50] hover:text-[#B5623F] transition-colors text-sm md:text-base font-medium"
              >
                Check My Rates
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Side - Media */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Offset accent block */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#B5623F] rounded-2xl hidden sm:block" />

            {/* Photo frame */}
            <div className="relative z-10 rounded-2xl overflow-hidden border border-[#221D17] shadow-2xl">
              <div className="aspect-[4/5] flex items-center justify-center bg-[#E7DCCD]">
                <img
                  src="/thumbnails/IMG_6551.jpg"
                  alt="Shanemel Asuncion, UGC Creator"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
