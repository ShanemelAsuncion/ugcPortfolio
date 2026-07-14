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
    <section className="bg-white py-24 px-6 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#7E6956] mb-16 text-center">
          What Brands Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E5DDD3] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Quote className="w-8 h-8 text-[#C4A88A] mb-4" />
              <p className="text-[#7E6956] leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>
              <p className="text-[#7E6956] font-medium">{t.brand}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}