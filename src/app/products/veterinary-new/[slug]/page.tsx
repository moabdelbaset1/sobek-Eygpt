"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Package, PawPrint, Fish, Bird, Beef } from 'lucide-react';
import { useEffect, useState, use } from 'react';
import { veterinaryProductsAPI } from '@/lib/api';
import Image from 'next/image';

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
  target_species: string | null;
  withdrawal_period: string | null;
  image_url: string | null;
  price: number | null;
  is_active: boolean;
}

// Icon mapping for categories
const iconMap: { [key: string]: any } = {
  'companion-animals': PawPrint,
  'livestock': Beef,
  'poultry': Bird,
  'equine': PawPrint,
  'aquaculture': Fish,
  'default': Package
};

// Color mapping for categories
const colorMap: { [key: string]: any } = {
  'companion-animals': { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  'livestock': { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600', badge: 'bg-green-100 text-green-700' },
  'poultry': { bg: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-700' },
  'equine': { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  'aquaculture': { bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600', badge: 'bg-cyan-100 text-cyan-700' },
  'default': { bg: 'bg-gray-500', light: 'bg-gray-50', text: 'text-gray-600', badge: 'bg-gray-100 text-gray-700' }
};

export default function VeterinaryCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const { slug } = use(params);

  useEffect(() => {
    loadProducts();
  }, [slug]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await veterinaryProductsAPI.getByCategory(slug);
      setProducts(data as any);
      
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/products/veterinary-new" className="text-gray-500 hover:text-gray-700 transition-colors mr-4">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center">
                <div className={`${colors.light} p-3 rounded-full mr-4`}>
                  <IconComponent className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
                  <p className="text-gray-600 mt-2">Veterinary Pharmaceutical Products</p>
                </div>
              </div>
            </div>
            <div className={`flex items-center px-4 py-2 ${colors.light} rounded-lg`}>
              <Package className={`w-5 h-5 ${colors.text} mr-2`} />
              <span className={`${colors.text} font-medium`}>
                {products.length} {products.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-500">Products in this category will be added soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className={`relative h-48 ${colors.light} overflow-hidden`}>
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className={`w-20 h-20 ${colors.text} opacity-30`} />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.generic_name}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-28 flex-shrink-0">Strength:</span>
                      <span className="text-sm text-gray-900">{product.strength}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-28 flex-shrink-0">Form:</span>
                      <span className="text-sm text-gray-900">{product.dosage_form}</span>
                    </div>
                    {product.target_species && (
                      <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-500 w-28 flex-shrink-0">Target Species:</span>
                        <span className="text-sm text-gray-900">{product.target_species}</span>
                      </div>
                    )}
                    {product.pack_size && (
                      <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-500 w-28 flex-shrink-0">Pack Size:</span>
                        <span className="text-sm text-gray-900">{product.pack_size}</span>
                      </div>
                    )}
                    {product.withdrawal_period && (
                      <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-500 w-28 flex-shrink-0">Withdrawal:</span>
                        <span className="text-sm text-gray-900">{product.withdrawal_period}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Indication:</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{product.indication}</p>
                  </div>

                  {product.registration_number && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Reg. No: {product.registration_number}</p>
                    </div>
                  )}

                  {product.price && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">{product.price} EGP</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                          Available
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
