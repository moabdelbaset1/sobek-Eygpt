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
  'livestock-cattle': { bg: 'bg-slate-800', light: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', shadow: 'shadow-slate-200' },
  'poultry-health': { bg: 'bg-slate-800', light: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', shadow: 'shadow-slate-200' },
  'aquaculture': { bg: 'bg-slate-800', light: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', shadow: 'shadow-slate-200' },
  'companion-animals': { bg: 'bg-slate-800', light: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', shadow: 'shadow-slate-200' },
  'feed-additives-supplements': { bg: 'bg-slate-800', light: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', shadow: 'shadow-slate-200' },
  'default': { bg: 'bg-slate-800', light: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', shadow: 'shadow-slate-200' }
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?auto=format&fit=crop&q=80"
            alt="Veterinary Medicine"
            fill
            sizes="100vw"
            unoptimized
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white mb-6 border border-white/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold uppercase tracking-widest">
                {lang === 'ar' ? 'رعاية صحية بيطرية متكاملة' : 'Integrated Veterinary Healthcare'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {lang === 'ar' ? 'الأدوية البيطرية' : 'Veterinary Pharmaceuticals'}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
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
            className="w-full max-w-2xl mt-12 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl flex items-center p-2 border border-slate-100">
                <div className="pl-5 text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'ابحث عن فئة بيطرية...' : 'Search veterinary categories...'}
                  className={`w-full px-5 py-4 bg-transparent border-none focus:ring-0 text-slate-800 font-medium placeholder-slate-400 outline-none ${isRTL ? 'text-right' : 'text-left'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 shadow-md">
                  {lang === 'ar' ? 'بحث' : 'Search'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-24 -mt-12 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-slate-100">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {lang === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}
            </h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg">
              {lang === 'ar'
                ? 'لم نتمكن من العثور على أي فئات تطابق بحثك. حاول استخدام كلمات مفتاحية مختلفة.'
                : 'We couldn\'t find any categories matching your search. Try using different keywords.'}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-8 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link href={`/products/veterinary-new/${category.slug}`} className="block h-full">
                      <div className={`h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group relative hover:-translate-y-2 flex flex-col`}>

                        <div className="p-8 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-8">
                            <div className={`w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors duration-500`}>
                              {category.icon ? (
                                <span className="text-4xl">{category.icon}</span>
                              ) : (
                                <IconComponent className="w-10 h-10 text-slate-700 group-hover:text-blue-600 transition-colors duration-500" />
                              )}
                            </div>
                            <div className={`w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500 shadow-sm`}>
                              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                            {lang === 'ar' ? (category.nameAr || category.name) : category.name}
                          </h3>

                          <p className="text-slate-500 leading-relaxed mb-8 line-clamp-3 flex-1">
                            {lang === 'ar'
                              ? (category.descriptionAr || category.description)
                              : category.description}
                          </p>

                          <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors duration-300 mt-auto">
                            <span className="uppercase tracking-widest text-xs">
                              {lang === 'ar' ? 'استكشاف المنتجات' : 'Explore Portfolio'}
                            </span>
                            <div className={`h-px flex-grow bg-slate-100 mx-4 group-hover:bg-slate-300 transition-colors duration-500`}></div>
                          </div>
                        </div>

                        {/* Subtle Bottom Border Highlight */}
                        <div className="h-1.5 w-full bg-slate-100 group-hover:bg-blue-600 transition-colors duration-500"></div>
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