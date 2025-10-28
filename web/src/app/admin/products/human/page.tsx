"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Save,
  X,
  Package,
  ArrowLeft,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { humanProductsAPI, categoriesAPI } from '@/lib/api';
import { uploadProductImage } from '@/lib/uploadHelpers';
import toast from 'react-hot-toast';

// Types
interface HumanProduct {
  id: string;
  name: string;
  generic_name: string;
  strength: string;
  dosage_form: string;
  indication: string;
  pack_size: string;
  registration_number: string;
  category: string;
  image_url?: string;
  price: number;
  is_active: boolean;
}

// Default categories (will be loaded from database)
const defaultCategories = [
  'cardiovascular',
  'anti-infectives',
  'endocrinology-diabetes',
  'gastroenterology'
];

// Product Form Modal with Image Upload
function ProductFormModal({ 
  isOpen, 
  onClose, 
  product, 
  onSave,
  categories 
}: { 
  isOpen: boolean;
  onClose: () => void;
  product?: HumanProduct | null;
  onSave: (data: Partial<HumanProduct>) => void;
  categories: string[];
}) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: product || {}
  });

  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(product?.image_url || '');

  useEffect(() => {
    if (product) {
      reset(product);
      setPreviewImage(product.image_url || '');
    } else {
      reset({
        name: '',
        generic_name: '',
        strength: '',
        dosage_form: '',
        indication: '',
        pack_size: '',
        registration_number: '',
        category: 'Cardiovascular',
        price: 0,
        is_active: true
      });
      setPreviewImage('');
    }
  }, [product, reset]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Upload image using helper function
      const imageUrl = await uploadProductImage(file);
      
      // Set the image URL in form
      setValue('image_url', imageUrl);
      
      // Set preview to the actual uploaded URL
      setPreviewImage(imageUrl);
      
      toast.success('تم رفع الصورة بنجاح!');
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطأ في رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: Partial<HumanProduct>) => {
    console.log('Form data being submitted:', data);
    console.log('Image URL:', data.image_url);
    onSave({
      ...data,
      price: parseFloat(String(data.price || 0)),
      id: product?.id || Date.now().toString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden input for image_url */}
          <input type="hidden" {...register('image_url')} />

          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <div className="flex items-center space-x-4 space-x-reverse">
              {previewImage && (
                <div className="w-20 h-20 border rounded-lg overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-colors">
                    <div className="text-center">
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <span className="text-sm text-gray-500">
                            {previewImage ? 'Change Image' : 'Choose Image'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
            {previewImage && (
              <p className="text-xs text-green-600">✓ Image uploaded successfully</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                {...register('name', { required: 'Product name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., SOBEK-PRIL"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Generic Name *
              </label>
              <input
                {...register('generic_name', { required: 'Generic name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Enalapril Maleate"
              />
              {errors.generic_name && (
                <p className="text-red-500 text-sm mt-1">{String(errors.generic_name.message)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Strength *
              </label>
              <input
                {...register('strength', { required: 'Strength is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., 5mg, 10mg, 20mg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage Form *
              </label>
              <input
                {...register('dosage_form', { required: 'Dosage form is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Film-coated Tablets"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pack Size
              </label>
              <input
                {...register('pack_size')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., 30 tablets"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                {...register('registration_number')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., EDA-12345/2023"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Category</option>
                {categories.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (EGP)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Indication *
            </label>
            <textarea
              {...register('indication', { required: 'Indication is required' })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter indications for use..."
            />
            {errors.indication && (
              <p className="text-red-500 text-sm mt-1">{String(errors.indication.message)}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('is_active')}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="mr-2 block text-sm text-gray-900">
              Active Product
            </label>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {product ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function HumanProductsAdmin() {
  const [products, setProducts] = useState<HumanProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<HumanProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<HumanProduct | null>(null);

  // Load products and categories from database
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Load products
      const productsData = await humanProductsAPI.getAll();
      setProducts(productsData as any);
      
      // Load categories
      const categoriesData = await categoriesAPI.getByType('human');
      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData.map((cat: any) => cat.slug));
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      console.error('Error details:', {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.generic_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: HumanProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('⚠️ Are you sure you want to delete this product?\n\nThis action cannot be undone.')) {
      try {
        await humanProductsAPI.delete(id);
        await loadData(); // Reload products
        toast.success('Product deleted successfully!');
      } catch (error: any) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  const handleSaveProduct = async (productData: Partial<HumanProduct>) => {
    try {
      if (editingProduct) {
        // Update existing product
        await humanProductsAPI.update(editingProduct.id, productData as any);
        toast.success('Product updated successfully!');
      } else {
        // Add new product
        await humanProductsAPI.create(productData as any);
        toast.success('Product added successfully!');
      }
      await loadData(); // Reload products to show in admin panel
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error: any) {
      console.error('Error saving product:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      toast.error(`Failed to save product: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-red-600" />
                <h1 className="text-xl font-bold text-gray-900">Human Products Management</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Categories</option>
                {categories.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <Plus className="w-5 h-5" />
                Add New Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Strength
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-10 h-10 rounded-md object-cover ml-4"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center ml-4">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.generic_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.strength}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price ? `${product.price} EGP` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Start by adding your first product</p>
                </div>
              )}
            </div>

            {/* Product Modal */}
            <ProductFormModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditingProduct(null);
              }}
              product={editingProduct}
              onSave={handleSaveProduct}
              categories={categories}
            />
          </>
        )}
      </div>
    </div>
  );
}