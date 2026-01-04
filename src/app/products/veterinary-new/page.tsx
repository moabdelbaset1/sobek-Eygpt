"use client";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Shield, Activity, Users, ArrowRight, Package, Dog, Cat, Bird, Wheat, Fish, Search, Sparkles, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import { categoriesAPI } from '@/lib/api';
import { useLanguageContext } from '@/lib/LanguageContext';

// Icon mapping for categories
const iconMap: { [key: string]: any } = {
  'livestock-cattle': Heart,
  'poultry-health': Bird,
  'aquaculture': Fish,
  'companion-animals': Dog,
  'feed-additives-supplements': Wheat,
  'default': Package
};

// Color mapping for categories
const colorMap: { [key: string]: any } = {
  'livestock-cattle': { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', shadow: 'shadow-emerald-100' },
  'poultry-health': { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', shadow: 'shadow-amber-100' },
  'aquaculture': { bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100', shadow: 'shadow-cyan-100' },
  'companion-animals': { bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100', shadow: 'shadow-violet-100' },
  'feed-additives-supplements': { bg: 'bg-lime-500', light: 'bg-lime-50', text: 'text-lime-600', border: 'border-lime-100', shadow: 'shadow-lime-100' },
  'default': { bg: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100', shadow: 'shadow-teal-100' }
};

export default function VeterinaryCategoriesPage() {
  const { lang, isRTL } = useLanguageContext();
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = categories.filter(cat => 
        cat.name.toLowerCase().includes(query) || 
        (cat.name_ar && cat.name_ar.includes(query)) ||
        (cat.description && cat.description.toLowerCase().includes(query))
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesAPI.getByType('veterinary');
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?auto=format&fit=crop&q=80"
            alt="Veterinary Medicine"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-emerald-900/60 to-gray-50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800/50 backdrop-blur-sm rounded-full text-emerald-200 mb-6 border border-emerald-700/50">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'رعاية صحية بيطرية متكاملة' : 'Integrated Veterinary Healthcare'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {lang === 'ar' ? 'الأدوية البيطرية' : 'Veterinary Pharmaceuticals'}
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar' 
                ? 'حلول متطورة لصحة الحيوان، من الماشية والدواجن إلى الحيوانات الأليفة.'
                : 'Advanced solutions for animal health, from livestock and poultry to companion animals.'}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-xl mt-10 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-full shadow-xl flex items-center p-2">
                <div className="pl-4 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'ابحث عن فئة بيطرية...' : 'Search veterinary categories...'}
                  className={`w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-md">
                  {lang === 'ar' ? 'بحث' : 'Search'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-20 -mt-20 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {lang === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {lang === 'ar' 
                ? 'لم نتمكن من العثور على أي فئات تطابق بحثك. حاول استخدام كلمات مفتاحية مختلفة.'
                : 'We couldn\'t find any categories matching your search. Try using different keywords.'}
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-emerald-600 font-semibold hover:text-emerald-800 transition-colors"
            >
              {lang === 'ar' ? 'مسح البحث' : 'Clear Search'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((category, index) => {
                const IconComponent = iconMap[category.slug] || iconMap['default'];
                const colors = colorMap[category.slug] || colorMap['default'];
                
                return (
                  <motion.div
                    key={category.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/products/veterinary-new/${category.slug}`} className="block h-full">
                      <div className={`h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative hover:-translate-y-2`}>
                        {/* Top Color Bar */}
                        <div className={`h-2 w-full ${colors.bg}`}></div>
                        
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className={`${colors.light} ${colors.text} w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                              {category.icon ? (
                                <span className="text-3xl">{category.icon}</span>
                              ) : (
                                <IconComponent className="w-8 h-8" />
                              )}
                            </div>
                            <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300`}>
                              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            {lang === 'ar' ? (category.nameAr || category.name) : category.name}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                            {lang === 'ar' 
                              ? (category.descriptionAr || category.description) 
                              : category.description}
                          </p>

                          <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-emerald-600 transition-colors">
                            <span className="uppercase tracking-wider text-xs">
                              {lang === 'ar' ? 'استكشاف المنتجات' : 'Explore Products'}
                            </span>
                            <div className={`h-px flex-grow bg-gray-100 mx-3 group-hover:bg-emerald-100 transition-colors`}></div>
                          </div>
                        </div>
                        
                        {/* Hover Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}