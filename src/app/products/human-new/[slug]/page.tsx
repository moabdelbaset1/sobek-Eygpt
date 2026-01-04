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
    gradient: 'from-red-600 to-rose-800',
    bg: 'bg-red-500', 
    light: 'bg-red-50', 
    text: 'text-red-600', 
    badge: 'bg-red-100 text-red-700',
    border: 'border-red-200'
  },
  'anti-infectives': { 
    gradient: 'from-cyan-600 to-blue-800',
    bg: 'bg-blue-500', 
    light: 'bg-blue-50', 
    text: 'text-blue-600', 
    badge: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200'
  },
  'endocrinology-diabetes': { 
    gradient: 'from-emerald-600 to-green-800',
    bg: 'bg-green-500', 
    light: 'bg-green-50', 
    text: 'text-green-600', 
    badge: 'bg-green-100 text-green-700',
    border: 'border-green-200'
  },
  'gastroenterology': { 
    gradient: 'from-orange-500 to-amber-700',
    bg: 'bg-orange-500', 
    light: 'bg-orange-50', 
    text: 'text-orange-600', 
    badge: 'bg-orange-100 text-orange-700',
    border: 'border-orange-200'
  },
  'default': { 
    gradient: 'from-slate-700 to-slate-900',
    bg: 'bg-slate-500', 
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
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/products/human-new" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6 group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Categories
              </Link>
              
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-inner">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{categoryName}</h1>
              </div>
              <p className="text-lg text-white/80 max-w-2xl ml-16">
                Explore our range of high-quality pharmaceutical solutions in {categoryName}.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-white/70" />
                <span className="text-white/70 font-medium">Total Products</span>
              </div>
              <div className="text-4xl font-bold">{products.length}</div>
              <div className="text-sm text-white/50 mt-1">Active Formulations</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Showing {filteredProducts.length} results</span>
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
