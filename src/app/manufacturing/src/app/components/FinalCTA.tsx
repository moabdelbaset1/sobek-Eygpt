import { Mail } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl mb-6 text-white">
          Reliable Manufacturing You Can Trust
        </h2>
        
        <p className="text-xl text-blue-100 mb-10 leading-relaxed">
          Our production lines are designed to meet international pharmaceutical standards with a strong focus on veterinary medicine.
        </p>
        
        <Button 
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
        >
          <Mail className="mr-2 h-5 w-5" />
          Contact Our Manufacturing Team
        </Button>
      </div>
    </section>
  );
}
