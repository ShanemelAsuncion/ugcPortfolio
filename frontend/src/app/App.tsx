import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandMarquee } from './components/BrandMarquee';
import { PortfolioGallery } from './components/PortfolioGallery';
import { AboutServices } from './components/AboutServices';
import { PricingSection } from './components/PricingSection';
import { ContactForm } from './components/ContactForm';
import { UGCPhotoGallery } from './components/UGCPhotoGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PortfolioGallery />
      <UGCPhotoGallery />
      <BrandMarquee />
      <TestimonialsSection />
      <PricingSection />
      <AboutServices />
      <ContactForm />
      <Footer />
    </div>
  );
}
