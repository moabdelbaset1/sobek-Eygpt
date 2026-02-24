"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Package, Heart, Shield, Activity, Users, Pill, Search, Filter } from 'lucide-react';
import { useEffect, useState, use } from 'react';
import { humanProductsAPI } from '@/lib/api';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  generic_name: string;
  strength: string;
  dosage_form: string;
  indication: string;
  pack_size: string | null;
  registration_number: string | null;
  category: string;
  image_url: string | null;
  price: number | null;
  is_active: boolean;
}

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
  'cardiovascular': {
    gradient: 'from-red-900 via-red-800 to-slate-900',
    bg: 'bg-red-600',
    light: 'bg-red-50',
    text: 'text-red-600',
    badge: 'bg-red-100 text-red-700',
    border: 'border-red-200'
  },
  'anti-infectives': {
    gradient: 'from-slate-900 via-blue-900 to-slate-900',
    bg: 'bg-blue-600',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200'
  },
  'endocrinology-diabetes': {
    gradient: 'from-slate-900 via-emerald-900 to-slate-900',
    bg: 'bg-emerald-600',
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200'
  },
  'gastroenterology': {
    gradient: 'from-slate-900 via-orange-900 to-slate-900',
    bg: 'bg-orange-600',
    light: 'bg-orange-50',
    text: 'text-orange-600',
    badge: 'bg-orange-100 text-orange-700',
    border: 'border-orange-200'
  },
  'default': {
    gradient: 'from-slate-900 via-slate-800 to-slate-900',
    bg: 'bg-slate-600',
    light: 'bg-slate-50',
    text: 'text-slate-600',
    badge: 'bg-slate-100 text-slate-700',
    border: 'border-slate-200'
  }
};

export default function CategoryProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { slug } = use(params);

  useEffect(() => {
    loadProducts();
  }, [slug]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredProducts(products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.generic_name.toLowerCase().includes(query) ||
        p.indication.toLowerCase().includes(query)
      ));
    }
  }, [searchQuery, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await humanProductsAPI.getByCategory(slug);
      setProducts(data);
      setFilteredProducts(data);

      // Set category name from slug
      const name = slug.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      setCategoryName(name);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const IconComponent = iconMap[slug] || iconMap['default'];
  const colors = colorMap[slug] || colorMap['default'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${colors.gradient} text-white pb-32 pt-24`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <Link
                href="/products/human-new"
                className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8 group text-sm uppercase tracking-wider font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Categories
              </Link>

              <div className="flex items-center gap-5 mb-4">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{categoryName}</h1>
              </div>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl ml-[84px] leading-relaxed font-light">
                Advanced therapeutic solutions and high-quality pharmaceutical formulations in {categoryName}.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 min-w-[240px] shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/80 font-medium uppercase tracking-wider text-sm">Portfolio</span>
              </div>
              <div className="text-5xl font-bold text-white mb-1">{products.length}</div>
              <div className="text-sm text-white/50 font-medium">Active Formulations</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between border border-slate-100"
        >
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search formulations, generic names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-600">Showing {filteredProducts.length} results</span>
          </div>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin ${colors.text.replace('text-', 'border-')}`}></div>
            <p className="mt-4 text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any products matching your search. Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className={`mt-6 px-6 py-2 rounded-lg font-medium ${colors.bg} text-white hover:opacity-90 transition-opacity`}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
