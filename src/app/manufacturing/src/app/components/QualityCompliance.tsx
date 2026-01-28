import { Shield, CheckCircle, Eye, Activity } from 'lucide-react';

const qualityFeatures = [
  {
    icon: Shield,
    title: 'GMP Standards',
    description: 'Full compliance with Good Manufacturing Practice regulations for pharmaceutical production'
  },
  {
    icon: CheckCircle,
    title: 'Quality Control Procedures',
    description: 'Rigorous testing protocols and quality assurance at every production stage'
  },
  {
    icon: Eye,
    title: 'Safety & Hygiene',
    description: 'Advanced cleanroom facilities and strict contamination control measures'
  },
  {
    icon: Activity,
    title: 'Production Monitoring',
    description: 'Real-time tracking and documentation of all manufacturing processes'
  }
];

export function QualityCompliance() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
            Quality & Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Committed to the highest standards of pharmaceutical manufacturing excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
