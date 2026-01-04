"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Package, Pill, Shield, Activity, CheckCircle, FileText, Hash, Calendar, Info } from 'lucide-react';
import { useEffect, useState, use } from 'react';
import { humanProductsAPI } from '@/lib/api';
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
  image_url: string | null;
  price: number | null;
  is_active: boolean;
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string; productId: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params);
  const { slug, productId } = resolvedParams;

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await humanProductsAPI.getById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-20 h-20 text-slate-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h3>
          <p className="text-slate-500 mb-6">The product you're looking for doesn't exist.</p>
          <Link href={`/products/human-new/${slug || ''}`} className="text-blue-600 hover:underline font-medium">
            ← Back to Category
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Products';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white pb-20 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href={`/products/human-new/${slug || ''}`}
              className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to {categoryName}
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/20">
                    {product.category ? product.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Product'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    product.is_active
                      ? 'bg-emerald-500/90 text-white'
                      : 'bg-slate-500/90 text-white'
                  }`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-2 text-xl text-white/90">
                  <Activity className="w-5 h-5" />
                  <p className="font-medium">{product.generic_name}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
              <div className="relative h-80 bg-gradient-to-br from-slate-50 to-slate-100">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 rounded-full"></div>
                      <Pill className="relative w-24 h-24 text-slate-300" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Key Specifications */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Product Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Dosage Form</span>
                  <p className="text-lg font-bold text-slate-900">{product.dosage_form}</p>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Strength</span>
                  <p className="text-lg font-bold text-slate-900">{product.strength}</p>
                </div>

                {product.pack_size && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Package className="w-4 h-4" /> Pack Size
                    </span>
                    <p className="text-lg font-bold text-slate-900">{product.pack_size}</p>
                  </div>
                )}

                {product.registration_number && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Hash className="w-4 h-4" /> Registration No.
                    </span>
                    <p className="text-lg font-bold text-slate-900">{product.registration_number}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Indication */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                Therapeutic Indication
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">{product.indication}</p>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border border-blue-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Additional Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-800">Quality Assured</h3>
                    <p className="text-slate-600 text-sm">All products are manufactured under strict quality control standards.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-800">Regulatory Compliance</h3>
                    <p className="text-slate-600 text-sm">Compliant with international pharmaceutical standards and regulations.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-800">Professional Support</h3>
                    <p className="text-slate-600 text-sm">Contact our medical team for detailed product information and support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Need More Information?</h2>
              <p className="mb-6 text-blue-100">Contact our team for detailed product specifications, availability, and pricing.</p>
              <Link
                href="/contact-us"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Contact Us
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
