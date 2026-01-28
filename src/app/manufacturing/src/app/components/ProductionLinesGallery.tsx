import { useState } from 'react';
import { motion } from 'motion/react';

interface MachineCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  details: string;
}

const machines: MachineCard[] = [
  {
    id: 1,
    title: 'Liquid Filling Line',
    description: 'High-precision liquid filling system for veterinary medicines',
    imageUrl: 'https://images.unsplash.com/photo-1745508201242-6495edf95b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3R0bGUlMjBmaWxsaW5nJTIwbWFjaGluZXxlbnwxfHx8fDE3Njg3MjEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: 'Capacity: 12,000 bottles/hour'
  },
  {
    id: 2,
    title: 'Powder Mixing System',
    description: 'Advanced powder blending for precise formulation control',
    imageUrl: 'https://images.unsplash.com/photo-1735671969795-b095dde882bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWl4ZXIlMjBtYWNoaW5lfGVufDF8fHx8MTc2ODcyMTIyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: 'Batch size: 500kg - 2000kg'
  },
  {
    id: 3,
    title: 'Bottle Packaging Machine',
    description: 'Automated packaging line with quality inspection',
    imageUrl: 'https://images.unsplash.com/photo-1764745021344-317b80f09e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc2ODcyMTIyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: 'Speed: 200 units/minute'
  },
  {
    id: 4,
    title: 'Laboratory Equipment',
    description: 'State-of-the-art quality control and testing facilities',
    imageUrl: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3Njg3MjEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: 'Full analytical capabilities'
  },
  {
    id: 5,
    title: 'Production Facility',
    description: 'Clean room manufacturing environment',
    imageUrl: 'https://images.unsplash.com/photo-1676451727332-790e79f6cc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHByb2R1Y3Rpb24lMjBsaW5lfGVufDF8fHx8MTc2ODcyMTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: 'ISO Class 7 cleanroom'
  },
  {
    id: 6,
    title: 'Manufacturing Plant',
    description: 'Integrated production line systems',
    imageUrl: 'https://images.unsplash.com/photo-1747026477608-2aaed8ec76f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHBsYW50fGVufDF8fHx8MTc2ODcyMTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: 'Fully automated control'
  }
];

export function ProductionLinesGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="production-lines" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
            Production Lines & Machinery
          </h2>
          <p className="text-xl text-gray-600">
            State-of-the-art equipment for pharmaceutical excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {machines.map((machine) => (
            <motion.div
              key={machine.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredId(machine.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={machine.imageUrl}
                  alt={machine.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredId === machine.id ? 1.1 : 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent flex items-end p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === machine.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-lg">
                    {machine.details}
                  </p>
                </motion.div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl mb-2 text-gray-900">
                  {machine.title}
                </h3>
                <p className="text-gray-600">
                  {machine.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
