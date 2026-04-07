import { HeroSection } from './components/HeroSection';
import { BrandMarquee } from './components/BrandMarquee';
import { PortfolioGallery } from './components/PortfolioGallery';
import { AboutServices } from './components/AboutServices';
import { ContactForm } from './components/ContactForm';
import { UGCPhotoGallery } from './components/UGCPhotoGallery';

export default function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BrandMarquee />
      <PortfolioGallery />
      <UGCPhotoGallery />
      <AboutServices />
      <ContactForm />
    </div>
  );
}