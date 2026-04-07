import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  'Scriptwriting',
  'Content Strategy',
  'High-Converting UGC',
  'Product Photography',
  'Video Editing',
];

export function AboutServices() {
  return (
    <section className="bg-white py-24 px-6 md:px-20">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#7E6956] mb-16 text-center">
          The Creator Behind the Content
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Photo and Bio */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 mx-auto lg:mx-0">
              {/* Headshot */}
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="/thumbnails/IMG_6551.jpg"
                  alt="Shanemel Asuncion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Pills/Tags */}
            <div className="flex flex-wrap gap-3 justify-start max-w-xl mx-auto lg:mx-0">
              <span className="px-4 py-2 bg-[#FFB6C1]/20 border border-[#FFB6C1] rounded-full text-sm text-[#7E6956]">
                Based in Canada
              </span>
              <span className="px-4 py-2 bg-[#FFB6C1]/20 border border-[#FFB6C1] rounded-full text-sm text-[#7E6956]">
                First-Time Mom
              </span>
              <span className="px-4 py-2 bg-[#FFB6C1]/20 border border-[#FFB6C1] rounded-full text-sm text-[#7E6956]">
                UGC Creator
              </span>
              <span className="px-4 py-2 bg-[#FFB6C1]/20 border border-[#FFB6C1] rounded-full text-sm text-[#7E6956]">
                Software Developer
              </span>
              <span className="px-4 py-2 bg-[#FFB6C1]/20 border border-[#FFB6C1] rounded-full text-sm text-[#7E6956]">
                Gen Z
              </span>
            </div>
            
            <div className="space-y-4 text-[#7E6956] max-w-xl mx-auto lg:mx-0 text-left leading-relaxed" style={{ lineHeight: '1.8' }}>
              <p>
                I'm Shanemel, a creator dedicated to bringing authenticity back to the digital space. As a 25-year-old mom navigating life in Canada, I know that today's audience craves realness over perfection. With a professional background as a Content Creator, I bring a high level of technical quality to every frame, from crisp lighting to seamless editing.
              </p>
              
              <p>
                I specialize in crafting aesthetic, honest content that resonates across niches—from tech and wellness to home and family. I'm here to help your brand tell a story that feels like a recommendation from a trusted friend.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-block px-8 py-4 bg-[#C4A88A] text-white rounded-full hover:bg-[#B8A08D] transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Work With Me
              </button>
            </div>
          </motion.div>
          
          {/* Right Side - Services */}
          <motion.div 
            className="bg-[#FAF8F5] rounded-3xl p-10 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl font-serif text-[#7E6956] mb-8">
              My Services
            </h3>
            
            <div className="space-y-5">
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#C4A88A]"></div>
                  </div>
                  <span className="text-lg text-[#7E6956]">
                    {service}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}