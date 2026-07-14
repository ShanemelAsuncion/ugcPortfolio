import { Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { RiInstagramFill, RiYoutubeFill } from 'react-icons/ri';
import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <section className="min-h-screen bg-[#FAF8F5] flex items-center px-6 py-20 md:px-20">
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
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-[#7E6956] mb-4 leading-tight">
                Shanemel<br />Asuncion
              </h1>
              <p className="text-lg text-[#7E6956] mt-6">
                UGC Creator for Beauty, Wellness, Parenting &amp; Tech Brands — short-form video built for paid ads
              </p>

              {/* Niche badges — instant category scan for brands */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Skincare', 'Wellness', 'Beauty', 'Parenting & Baby', 'Tech'].map((niche) => (
                  <span
                    key={niche}
                    className="px-3 py-1 bg-white border border-[#E5DDD3] rounded-full text-xs text-[#7E6956]"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#7E6956]">
                <div className="w-8 h-8 rounded-full bg-[#C4A88A] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium">Email:</span>{' '}
                  <a href="mailto:lei.ugc.ca@gmail.com" className="hover:text-[#C4A88A] transition-colors">
                    lei.ugc.ca@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-[#7E6956]">
                <div className="w-8 h-8 rounded-full bg-[#C4A88A] flex items-center justify-center flex-shrink-0">
                  <FaTiktok className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium">TikTok:</span>{' '}
                  <a href="https://tiktok.com/@mami.and.reyn" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A88A] transition-colors">
                    @mami.and.reyn
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-[#7E6956]">
                <div className="w-8 h-8 rounded-full bg-[#C4A88A] flex items-center justify-center flex-shrink-0">
                  <RiInstagramFill className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium">Instagram:</span>{' '}
                  <a href="https://instagram.com/lei.ugc.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A88A] transition-colors">
                    @lei.ugc.ca
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-[#7E6956]">
                <div className="w-8 h-8 rounded-full bg-[#C4A88A] flex items-center justify-center flex-shrink-0">
                  <RiYoutubeFill className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium">YouTube:</span>{' '}
                  <a href="https://youtube.com/@lei.ugc.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A88A] transition-colors">
                    @lei.ugc.ca
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 md:gap-3 mt-8 w-full overflow-x-auto pb-1">
              <a 
                href="#portfolio" 
                className="inline-flex flex-shrink-0 whitespace-nowrap px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-[#C4A88A] text-white rounded-full hover:bg-[#B8A08D] transition-colors text-xs sm:text-sm md:text-base font-medium shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex flex-shrink-0 whitespace-nowrap px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-white text-[#C4A88A] border-2 border-[#C4A88A] rounded-full hover:bg-[#C4A88A] hover:text-white transition-all text-xs sm:text-sm md:text-base font-medium shadow-lg hover:shadow-xl"
              >
                Work With Me
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('pricing');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex flex-shrink-0 whitespace-nowrap px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-white text-[#7E6956] border-2 border-[#E5DDD3] rounded-full hover:border-[#C4A88A] hover:text-[#C4A88A] transition-all text-xs sm:text-sm md:text-base font-medium shadow-lg hover:shadow-xl"
              >
                Check My Rates
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
            {/* Video placeholder with border */}
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-[#C4A88A] shadow-2xl bg-gradient-to-br from-[#E5D5C4] to-[#C4A88A]">
              <div className="aspect-[4/5] flex items-center justify-center">
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