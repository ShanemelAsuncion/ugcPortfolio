import { CheckCircle2, Clock, ShieldCheck, RefreshCw, Zap, FileVideo } from 'lucide-react';
import { motion } from 'motion/react';

// Base rate: $175/video — sits in the beginner-creator market range ($150-$300/video)
// while reflecting a professional, non-lowballed price.
const packages = [
  {
    name: 'Single Video',
    price: '$175',
    unit: 'per video',
    description: 'One polished, ad-ready UGC video.',
    features: [
      '1 short-form video (15–30s)',
      '1 revision round',
      '5-day turnaround',
      'Vertical 9:16 format',
      'Organic usage rights included',
    ],
    highlighted: false,
  },
  {
    name: '3-Video Bundle',
    price: '$450',
    unit: '$150/video — save 14%',
    description: 'Great for testing multiple hooks or angles.',
    features: [
      '3 short-form videos',
      '2 revision rounds per video',
      '5-day turnaround',
      'Vertical + square formats',
      'Organic usage rights included',
    ],
    highlighted: true,
  },
  {
    name: '5-Video Bundle',
    price: '$700',
    unit: '$140/video — save 20%',
    description: 'Full content library across multiple angles.',
    features: [
      '5 short-form videos',
      '3 revision rounds per video',
      '7-day turnaround',
      'All aspect ratios (9:16, 1:1, 16:9)',
      'Organic usage rights included',
    ],
    highlighted: false,
  },
];

// Add-ons priced per current UGC market norms:
// raw footage +30-50% of base, rush +25-50% of base, paid usage +30-50% of base.
const addOns = [
  {
    icon: FileVideo,
    name: 'Raw / Unedited Footage',
    price: '+$60',
    unit: 'per video',
    description:
      'Get the unedited clips handed over for your own in-house editing team to repurpose.',
  },
  {
    icon: Zap,
    name: 'Rush Delivery',
    price: '+30%',
    unit: 'of order total',
    description:
      '48-hour turnaround instead of standard delivery, for when you need content fast.',
  },
  {
    icon: ShieldCheck,
    name: 'Paid Ad Usage Rights',
    price: '+$85',
    unit: 'per video / 3-month license',
    description:
      'License to run this content as a paid ad (Meta Spark, TikTok Spark, etc.), on top of the organic rights already included.',
  },
  {
    icon: RefreshCw,
    name: 'Extended Usage Rights',
    price: '+$175',
    unit: 'per video / 12-month license',
    description:
      'A longer-term paid usage license for brands running content over an extended campaign.',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#FAF8F5] py-24 px-6 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#7E6956] mb-4 text-center">
          Packages & Pricing
        </h2>
        <p className="text-lg text-[#7E6956]/80 text-center max-w-2xl mx-auto mb-16">
          Straightforward pricing, no back-and-forth needed. Every package is
          customizable — reach out if you need something different.
        </p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              className={`relative flex flex-col rounded-3xl p-8 shadow-lg ${
                pkg.highlighted
                  ? 'bg-white border-2 border-[#C4A88A] shadow-xl md:-translate-y-3'
                  : 'bg-white border border-[#E5DDD3]'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {pkg.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C4A88A] text-white text-sm rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-serif text-[#7E6956] mb-1">
                {pkg.name}
              </h3>
              <p className="text-sm text-[#7E6956]/70 mb-6">
                {pkg.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-serif text-[#7E6956]">
                  {pkg.price}
                </span>
                <span className="text-sm text-[#7E6956]/70 ml-2">
                  {pkg.unit}
                </span>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C4A88A] flex-shrink-0 mt-0.5" />
                    <span className="text-[#7E6956]">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full py-3 rounded-full transition-colors font-medium ${
                  pkg.highlighted
                    ? 'bg-[#C4A88A] text-white hover:bg-[#B8A08D]'
                    : 'bg-[#FAF8F5] text-[#7E6956] hover:bg-[#F0E9E0] border border-[#E5DDD3]'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-serif text-[#7E6956] mb-2 text-center">
            Add-Ons
          </h3>
          <p className="text-[#7E6956]/80 text-center max-w-2xl mx-auto mb-10">
            Customize any package with the extras below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {addOns.map((addOn, index) => (
              <motion.div
                key={addOn.name}
                className="bg-white rounded-2xl p-6 border border-[#E5DDD3] flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#FFB6C1]/20 border border-[#FFB6C1] flex items-center justify-center">
                    <addOn.icon className="w-5 h-5 text-[#7E6956]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="text-lg text-[#7E6956] font-medium">
                      {addOn.name}
                    </h4>
                  </div>
                  <div className="mb-2">
                    <span className="text-xl font-serif text-[#C4A88A]">
                      {addOn.price}
                    </span>
                    <span className="text-sm text-[#7E6956]/70 ml-1">
                      {addOn.unit}
                    </span>
                  </div>
                  <p className="text-sm text-[#7E6956]/80 leading-relaxed">
                    {addOn.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logistics info */}
        <motion.div
          className="bg-white rounded-3xl p-10 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-serif text-[#7E6956] mb-8 text-center">
            Good to Know
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#FFB6C1]/20 border border-[#FFB6C1] flex items-center justify-center mx-auto md:mx-0 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#7E6956]" />
              </div>
              <h4 className="text-lg text-[#7E6956] mb-2 font-medium">
                Usage & Licensing
              </h4>
              <p className="text-sm text-[#7E6956]/80 leading-relaxed">
                Organic (non-paid) usage rights are included with every package.
                Paid ad usage requires the add-on above — reach out if you need
                exclusivity or a perpetual buyout.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#FFB6C1]/20 border border-[#FFB6C1] flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Clock className="w-6 h-6 text-[#7E6956]" />
              </div>
              <h4 className="text-lg text-[#7E6956] mb-2 font-medium">
                Turnaround Time
              </h4>
              <p className="text-sm text-[#7E6956]/80 leading-relaxed">
                Standard turnaround is listed per package above. Need it faster?
                Add Rush Delivery for 48-hour turnaround.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#FFB6C1]/20 border border-[#FFB6C1] flex items-center justify-center mx-auto md:mx-0 mb-4">
                <RefreshCw className="w-6 h-6 text-[#7E6956]" />
              </div>
              <h4 className="text-lg text-[#7E6956] mb-2 font-medium">
                Revisions
              </h4>
              <p className="text-sm text-[#7E6956]/80 leading-relaxed">
                Revision rounds are included as noted per package. Additional
                rounds beyond that are $40 per round.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}