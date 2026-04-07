import { motion } from 'motion/react';

const photos = [
  {
    url: '/thumbnails/IMG_0981.PNG',
    category: 'Skincare',
    description: 'Product Flatlay'
  },
  {
    url: '/thumbnails/IMG_1052.jpg',
    category: 'Skincare',
    description: 'Product Highlight'
  },
  {
    url: '/thumbnails/IMG_1464.JPG',
    category: 'Wellness & Personal Care',
    description: 'UGC Photo'
  },
  {
    url: '/thumbnails/IMG_1453.PNG',
    category: 'Hair Care',
    description: 'UGC Photo'
  },
  {
    url: '/thumbnails/IMG_1452.PNG',
    category: 'Hair Care',
    description: 'Product Highlight'
  },
  {
    url: '/thumbnails/IMG_1146.jpg',
    category: 'Skincare & Wellness',
    description: 'UGC Photo'
  }
];

export function UGCPhotoGallery() {
  return (
    <section className="bg-white py-24 px-6 md:px-20">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#7E6956] mb-4">
            UGC & Product Photography
          </h2>
          <p className="text-lg text-[#9B8B7E] max-w-2xl mx-auto">
            Professional product photography that tells your brand's story through authentic, aesthetic imagery
          </p>
        </div>
        
        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-[#F5F0EB]">
                <img 
                  src={photo.url} 
                  alt={photo.description}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#7E6956]/90 via-[#7E6956]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-white/90 text-[#7E6956] text-xs font-medium rounded-full mb-2">
                    {photo.category}
                  </span>
                  <h3 className="text-white font-serif text-xl">
                    {photo.description}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[#9B8B7E] italic">
            All photos edited with a cohesive color palette to match your brand aesthetic
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
