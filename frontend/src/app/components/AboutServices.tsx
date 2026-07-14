import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';

const tags = [
  'Based in Canada',
  'First-Time Mom',
  'UGC Creator',
  'Tech-Savvy Creator',
  'Gen Z',
];

interface SocialPlatform {
  platform: string;
  username: string;
  url: string;
  image: string;
}

const socials: SocialPlatform[] = [
  {
    platform: 'Instagram',
    username: '@lei.ugc.ca',
    url: 'https://instagram.com/lei.ugc.ca',
    image: '/thumbnails/lei.ugc.ca.jpeg',
  },
  {
    platform: 'Instagram',
    username: '@mami.and.reyn',
    url: 'https://instagram.com/mami.and.reyn',
    image: '/thumbnails/mami.and.reyn_ig.jpeg',
  },
  {
    platform: 'TikTok',
    username: '@mami.and.reyn',
    url: 'https://tiktok.com/@mami.and.reyn',
    image: '/thumbnails/mami.and.reyn_tt.jpeg',
  },
  {
    platform: 'TikTok',
    username: '@ms_swan_',
    url: 'https://tiktok.com/@ms_swan_',
    image: '/thumbnails/ms_swan_.jpeg',
  },
];

export function AboutServices() {
  const [activeSocial, setActiveSocial] = useState<SocialPlatform | null>(null);

  return (
    <section id="about" className="bg-white py-24 px-6 md:px-20 overflow-hidden">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B5623F] font-medium">
            About
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#221D17] mt-2">
            The Creator Behind the Content
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-14 items-start">
          {/* Photo */}
          <motion.div
            className="relative w-64 h-64 md:w-full md:h-80 mx-auto md:mx-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Offset accent block */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#B5623F] rounded-3xl" />

            {/* Headshot */}
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-[#221D17] shadow-xl">
              <img
                src="/thumbnails/IMG_6551.jpg"
                alt="Shanemel Asuncion"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Oversized serif initial, signature detail */}
            <span className="hidden md:block absolute -top-10 -left-8 text-[7rem] leading-none font-serif text-[#F1DFD3] select-none pointer-events-none">
              S.
            </span>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Pills/Tags */}
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-[#F1DFD3] border border-[#B5623F]/30 rounded-full text-sm text-[#221D17]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="space-y-4 text-[#6B5D50] leading-relaxed"
              style={{ lineHeight: '1.8' }}
            >
              <p>
                I'm Shanemel, a creator dedicated to bringing authenticity back to the digital space. As a 25-year-old mom navigating life in Canada, I know that today's audience craves realness over perfection. With a professional background as a Content Creator, I bring a high level of technical quality to every frame, from crisp lighting to seamless editing — you can see it for yourself in the portfolio and photography above.
              </p>

              <p>
                I specialize in crafting aesthetic, honest content across{' '}
                <strong className="text-[#221D17]">
                  Beauty, Skincare, Wellness, Parenting & Baby, and Tech
                </strong>
                . I'm here to help your brand tell a story that feels like a recommendation from a trusted friend.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-block px-8 py-4 bg-[#B5623F] text-white rounded-full hover:bg-[#9C4F30] transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Work With Me
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('pricing');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-block px-8 py-4 bg-white text-[#221D17] border-2 border-[#E7DCCD] rounded-full hover:border-[#B5623F] hover:text-[#B5623F] transition-all text-lg font-medium shadow-lg hover:shadow-xl"
              >
                View Packages
              </button>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Row */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-[#E7DCCD] flex-1" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#B5623F] font-medium whitespace-nowrap">
              Find Me Across Platforms
            </span>
            <div className="h-px bg-[#E7DCCD] flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socials.map((social, index) => (
              <motion.button
                key={`${social.platform}-${social.username}`}
                onClick={() => setActiveSocial(social)}
                className="group block text-left bg-[#FAF6F0] rounded-3xl overflow-hidden border border-[#E7DCCD] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="aspect-square overflow-hidden bg-[#221D17]/5 flex items-center justify-center">
                  <img
                    src={social.image}
                    alt={`${social.platform} profile`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#B5623F] font-medium mb-1">
                    {social.platform}
                  </p>
                  <p className="text-lg font-serif text-[#221D17] group-hover:text-[#B5623F] transition-colors">
                    {social.username}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeSocial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#221D17]/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSocial(null)}
          >
            <motion.div
              className="relative bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveSocial(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#221D17]" />
              </button>

              {/* Enlarged photo */}
              <div className="w-full aspect-square overflow-hidden bg-[#221D17]/5 flex items-center justify-center">
                <img
                  src={activeSocial.image}
                  alt={`${activeSocial.platform} profile`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details + CTA */}
              <div className="p-8 text-center space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#B5623F] font-medium mb-1">
                    {activeSocial.platform}
                  </p>
                  <p className="text-2xl font-serif text-[#221D17]">
                    {activeSocial.username}
                  </p>
                </div>

                <a
                  href={activeSocial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#B5623F] text-white rounded-full hover:bg-[#9C4F30] transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
                >
                  Check Out My Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}