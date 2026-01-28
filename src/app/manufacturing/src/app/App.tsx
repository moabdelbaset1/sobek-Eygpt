import { HeroSection } from '@/app/components/HeroSection';
import { ManufacturingFocus } from '@/app/components/ManufacturingFocus';
import { ProductionLinesGallery } from '@/app/components/ProductionLinesGallery';
import { ManufacturingCategories } from '@/app/components/ManufacturingCategories';
import { QualityCompliance } from '@/app/components/QualityCompliance';
import { FinalCTA } from '@/app/components/FinalCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ManufacturingFocus />
      <ProductionLinesGallery />
      <ManufacturingCategories />
      <QualityCompliance />
      <FinalCTA />
    </div>
  );
}
