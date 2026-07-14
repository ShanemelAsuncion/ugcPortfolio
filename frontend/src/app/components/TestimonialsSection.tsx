import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

// EDIT THESE — replace with real quotes from brands you've worked with.
// A short 1-2 sentence quote that references a specific result carries far
// more weight than a generic "loved working with her!" — e.g. "Delivered 3
// hooks in 48 hours, one became our top-performing ad."
const testimonials = [
  {
    quote: "I am delighted to collaborate with LEI.UGC.CA! Communication throughout the partnership has been seemless and the response has been incredibly proactive and prompt. It's a great experience.",
    brand: 'FNTCase',
  },
  {
    quote: "Well done. You've done a great job, and we're so happy with how this came together!",
    brand: 'Celeste Adore',
  },
  {
    quote: 'Thank you so much for sharing our product so beautifully!',
    brand: 'Keyth',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-24 px-6 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B5623F] font-medium">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#221D17] mt-2">
            What Brands Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-[#FAF6F0] rounded-3xl p-8 border border-[#E7DCCD] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Quote className="w-8 h-8 text-[#B5623F] mb-4" />
              <p className="text-[#221D17] leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-[#E7DCCD]">
                <p className="text-xs uppercase tracking-[0.1em] text-[#6B5D50] font-medium">
                  {t.brand}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}