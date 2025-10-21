"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, ArrowLeft, Package, ShoppingCart, Info, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../../../lib/api';

interface Product {
  id: string;
  name: string;
  name_en?: string;
  description: string;
  active_ingredient: string;
  concentration: string;
  dosage_form: string;
  pack_size: string;
  indication: string;
  contraindications?: string;
  side_effects?: string;
  image_url?: string;
  category: string;
}

export default function CardiovascularPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProductsByCategory('cardiovascular');
        setProducts(data as any);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/products/human-new" className="text-gray-500 hover:text-gray-700 transition-colors mr-4">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Cardiovascular Medications</h1>
                  <p className="text-gray-600 mt-2">Heart and Blood Vessel Treatment</p>
                </div>
              </div>
            </div>
            <div className="flex items-center px-4 py-2 bg-red-50 rounded-lg">
              <Package className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700 font-medium">{products.length} {products.length === 1 ? 'Product' : 'Products'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-500">Cardiovascular medications will be added soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-red-50 to-red-100 rounded-t-xl overflow-hidden">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Heart className="w-16 h-16 text-red-300" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs font-medium text-red-600">
                    {product.dosage_form}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  {product.name_en && (
                    <p className="text-sm text-gray-500 mb-3">{product.name_en}</p>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-600 w-32 flex-shrink-0">Active Ingredient:</span>
                      <span className="text-sm text-gray-800">{product.active_ingredient}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-600 w-32 flex-shrink-0">Concentration:</span>
                      <span className="text-sm text-gray-800">{product.concentration}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-600 w-32 flex-shrink-0">Pack Size:</span>
                      <span className="text-sm text-gray-800">{product.pack_size}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-red-600">
                        <Info className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Prescription Required</span>
                      </div>
                      <button className="flex items-center text-red-600 hover:text-red-700 transition-colors">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Inquiry</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}