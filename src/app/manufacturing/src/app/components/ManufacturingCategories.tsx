import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface ProductLine {
  title: string;
  description: string;
  imageUrl: string;
}

const veterinaryLines: ProductLine[] = [
  {
    title: 'Injectable Solutions',
    description: 'Sterile production of veterinary injectables with aseptic processing',
    imageUrl: 'https://images.unsplash.com/photo-1606235357537-84aea24d4c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwbWVkaWNpbmV8ZW58MXx8fHwxNzY4NTk0MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    title: 'Oral Suspensions',
    description: 'Large-scale liquid formulation for veterinary oral medications',
    imageUrl: 'https://images.unsplash.com/photo-1676451727332-790e79f6cc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHByb2R1Y3Rpb24lMjBsaW5lfGVufDF8fHx8MTc2ODcyMTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    title: 'Powder Formulations',
    description: 'Veterinary powder medicines and feed additives production',
    imageUrl: 'https://images.unsplash.com/photo-1735671969795-b095dde882bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWl4ZXIlMjBtYWNoaW5lfGVufDF8fHx8MTc2ODcyMTIyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    title: 'Topical Treatments',
    description: 'Creams, ointments, and gels for veterinary dermatological care',
    imageUrl: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3Njg3MjEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const humanLines: ProductLine[] = [
  {
    title: 'Tablet Production',
    description: 'Automated tablet compression and coating systems',
    imageUrl: 'https://images.unsplash.com/photo-1576669802218-d535933f897c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGZhY3RvcnklMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzY4NzIxMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    title: 'Liquid Formulations',
    description: 'Human pharmaceutical liquid production capabilities',
    imageUrl: 'https://images.unsplash.com/photo-1764745021344-317b80f09e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc2ODcyMTIyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    title: 'Capsule Filling',
    description: 'High-speed capsule filling and polishing equipment',
    imageUrl: 'https://images.unsplash.com/photo-1747026477608-2aaed8ec76f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHBsYW50fGVufDF8fHx8MTc2ODcyMTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function ManufacturingCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-900">
            Manufacturing Line Categories
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive production capabilities across multiple sectors
          </p>
        </div>

        <Tabs defaultValue="veterinary" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-14">
            <TabsTrigger value="veterinary" className="text-lg">
              Veterinary Production Lines
            </TabsTrigger>
            <TabsTrigger value="human" className="text-lg">
              Human Production Lines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="veterinary" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {veterinaryLines.map((line, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={line.imageUrl}
                    alt={line.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg mb-2 text-gray-900">
                      {line.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {line.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="human" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {humanLines.map((line, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={line.imageUrl}
                    alt={line.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg mb-2 text-gray-900">
                      {line.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {line.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
