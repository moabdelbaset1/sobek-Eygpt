"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Package, Heart, Shield, Activity, Users, Pill } from 'lucide-react';
import { useEffect, useState, use } from 'react';
import { humanProductsAPI } from '@/lib/api';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

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
  'cardiovascular': { bg: 'bg-red-500', light: 'bg-red-50', text: 'text-red-600', badge: 'bg-red-100 text-red-700' },
  'anti-infectives': { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  'endocrinology-diabetes': { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600', badge: 'bg-green-100 text-green-700' },
  'gastroenterology': { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
  'default': { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' }
};

export default function CategoryProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { slug } = use(params);

  useEffect(() => {
    loadProducts();
  }, [slug]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await humanProductsAPI.getByCategory(slug);
      setProducts(data);
      
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

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

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
                <div className={`${colors.light} p-3 rounded-full mr-4`}>
                  <IconComponent className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
                  <p className="text-gray-600 mt-2">Human Pharmaceutical Products</p>
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
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
