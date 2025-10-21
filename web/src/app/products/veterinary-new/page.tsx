"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Shield, Activity, Users, ArrowRight, Package, Dog, Cat, Bird, Wheat } from 'lucide-react';

const categories = [
  {
    id: 'livestock-cattle',
    name: 'Livestock & Cattle',
    description: 'Medications for cattle, sheep, and goats',
    icon: Heart,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
    productCount: 0
  },
  {
    id: 'poultry-health',
    name: 'Poultry Health',
    description: 'Treatments for chickens, ducks, and birds',
    icon: Bird,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    productCount: 0
  },
  {
    id: 'aquaculture',
    name: 'Aquaculture',
    description: 'Fish and aquatic animal health',
    icon: Activity,
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    productCount: 0
  },
  {
    id: 'companion-animals',
    name: 'Companion Animals',
    description: 'Dogs, cats, and pet medications',
    icon: Dog,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    productCount: 0
  },
  {
    id: 'feed-additives-supplements',
    name: 'Feed Additives & Supplements',
    description: 'Nutritional supplements and feed enhancers',
    icon: Wheat,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    productCount: 0
  }
];

export default function VeterinaryCategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Veterinary Pharmaceutical Products</h1>
            </motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select an animal category to browse specialized medications
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={`/products/veterinary-new/${category.id}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className={`${category.lightColor} p-8 text-center`}>
                      <div className={`${category.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {category.description}
                      </p>
                      
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white shadow-sm">
                        <Package className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          {category.productCount} {category.productCount === 1 ? 'Product' : 'Products'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 bg-white border-t border-gray-100">
                      <div className="flex items-center justify-center">
                        <div className={`flex items-center ${category.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                          <span className="text-sm font-medium mr-2">View Products</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}