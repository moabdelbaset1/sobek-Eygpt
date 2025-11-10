import { motion } from 'framer-motion';
import Image from 'next/image';
import { Package, Pill, Eye } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  index: number;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, index, onViewDetails }: ProductCardProps) {
  const hasMoreData = product.indication && product.indication.length > 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white rounded-lg shadow-medical hover:shadow-medical transition-all duration-300 overflow-hidden border border-medical"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-medical-light overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-white rounded-full p-4 shadow-sm">
              <Pill className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        )}
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {product.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6">
        {/* Drug Name */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
            {product.name}
          </h3>
          {/* Active Ingredient */}
          <p className="text-sm text-medical-primary font-medium">
            {product.generic_name}
          </p>
        </div>

        {/* Product Details Grid */}
        <div className="space-y-3 mb-4">
          {/* Dosage Form */}
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm font-medium text-gray-500">Dosage Form:</span>
            <span className="text-sm text-gray-900 font-medium">{product.dosage_form}</span>
          </div>

          {/* Concentration / Strength */}
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-sm font-medium text-gray-500">Strength:</span>
            <span className="text-sm text-gray-900 font-medium">{product.strength}</span>
          </div>

          {/* Pack Size (if available) */}
          {product.pack_size && (
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-500">Pack Size:</span>
              <span className="text-sm text-gray-900 font-medium">{product.pack_size}</span>
            </div>
          )}

          {/* Registration Number (if available) */}
          {product.registration_number && (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-500">Reg. No:</span>
              <span className="text-sm text-gray-900 font-medium">{product.registration_number}</span>
            </div>
          )}
        </div>

        {/* Price (if available) */}
        {product.price && (
          <div className="mb-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">{product.price} EGP</span>
            </div>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails?.(product)}
          disabled={!hasMoreData}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            hasMoreData
              ? 'bg-medical-gradient hover:opacity-90 text-white shadow-medical hover:shadow-medical'
              : 'bg-gray-100 text-medical-secondary cursor-not-allowed'
          }`}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </motion.div>
  );
}