"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Shield, Activity, Users, ArrowRight, Package, Pill, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import { categoriesAPI } from '@/lib/api';

// Icon mapping for categories
const iconMap: { [key: string]: any } = {
  'cardiovascular': Heart,
  'anti-infectives': Shield,
  'endocrinology-diabetes': Activity,
  'gastroenterology': Users,
  'default': Pill
};

// Color mapping for categories
const colorMap: { [key: string]: any } = {
  'cardiovascular': { bg: 'bg-red-500', light: 'bg-red-50', text: 'text-red-600' },
  'anti-infectives': { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600' },
  'endocrinology-diabetes': { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600' },
  'gastroenterology': { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-600' },
  'default': { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600' }
};

export default function HumanCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesAPI.getByType('human');
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

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
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Package className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Human Pharmaceutical Products</h1>
            </motion.div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select a category to browse specialized medications
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500">Categories will appear here once added</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.slug] || iconMap['default'];
              const colors = colorMap[category.slug] || colorMap['default'];
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link href={`/products/human-new/${category.slug}`}>
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <div className={`${colors.light} p-8 text-center`}>
                        <div className={`${colors.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          {category.icon ? (
                            <span className="text-4xl">{category.icon}</span>
                          ) : (
                            <IconComponent className="w-10 h-10 text-white" />
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        {category.name_ar && (
                          <p className="text-lg text-gray-700 mb-2" dir="rtl">
                            {category.name_ar}
                          </p>
                        )}
                        {category.description && (
                          <p className="text-sm text-gray-600 mb-4">
                            {category.description}
                          </p>
                        )}
                      </div>

                      <div className="p-6 bg-white border-t border-gray-100">
                        <div className="flex items-center justify-center">
                          <div className={`flex items-center ${colors.text} group-hover:translate-x-1 transition-transform duration-300`}>
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
        )}
      </div>
    </div>
  );
}