import { Check } from 'lucide-react';

export function ManufacturingFocus() {
  const features = [
    'Veterinary pharmaceutical production (Primary focus)',
    'Liquid, powder, and semi-solid dosage forms',
    'High-capacity automated machinery',
    'GMP-compliant production environment'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-4xl mb-8 text-gray-900">
              Our Manufacturing Expertise
            </h2>
            
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right: Visual */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1576669802218-d535933f897c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGZhY3RvcnklMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzY4NzIxMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Pharmaceutical machinery"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
