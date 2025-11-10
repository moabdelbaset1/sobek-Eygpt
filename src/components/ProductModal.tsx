import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Pill, FileText, Hash, Calendar } from 'lucide-react';

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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-medical bg-medical-light">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                    <p className="text-blue-600 font-medium">{product.generic_name}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Image and Basic Info */}
                  <div className="space-y-6">
                    {/* Product Image */}
                    <div className="relative h-64 bg-medical-light rounded-lg overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="bg-white rounded-full p-6 shadow-sm">
                            <Pill className="w-16 h-16 text-blue-600" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {/* Price */}
                    {product.price && (
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-500">Price:</span>
                        <span className="text-lg font-bold text-green-700">{product.price} EGP</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Detailed Information */}
                  <div className="space-y-6">
                    {/* Product Details */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-blue-600" />
                        Product Details
                      </h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Dosage Form:</span>
                            <span className="text-sm text-gray-900">{product.dosage_form}</span>
                          </div>

                          <div className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Strength:</span>
                            <span className="text-sm text-gray-900">{product.strength}</span>
                          </div>

                          {product.pack_size && (
                            <div className="flex items-start">
                              <span className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Pack Size:</span>
                              <span className="text-sm text-gray-900">{product.pack_size}</span>
                            </div>
                          )}

                          {product.registration_number && (
                            <div className="flex items-start">
                              <span className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Reg. Number:</span>
                              <span className="text-sm text-gray-900">{product.registration_number}</span>
                            </div>
                          )}

                          <div className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Category:</span>
                            <span className="text-sm text-gray-900 capitalize">{product.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Indication */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Indication
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{product.indication}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}