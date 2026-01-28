import { ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function HeroSection() {
  const scrollToProduction = () => {
    document.getElementById('production-lines')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl mb-6 text-gray-900">
            Advanced Pharmaceutical Manufacturing Lines
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-8 text-blue-600">
            Specialized in Veterinary Medicine Production with High Quality Standards
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our facility is equipped with modern machinery and fully integrated production lines designed to ensure safety, efficiency, and compliance.
          </p>
          
          <Button 
            size="lg" 
            onClick={scrollToProduction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            View Our Production Lines
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
