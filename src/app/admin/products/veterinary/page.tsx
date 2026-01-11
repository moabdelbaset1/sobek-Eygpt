"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Image as ImageIcon,
  Filter,
  Check,
  MoreVertical,
  Stethoscope
} from 'lucide-react';
import Link from 'next/link';
import { veterinaryProductsAPI, categoriesAPI } from '@/lib/api';
import { uploadProductImage } from '@/lib/uploadHelpers';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Types
interface VeterinaryProduct {
  id: string;
  name: string;
  generic_name: string;
  strength: string;
  dosage_form: string;
  indication: string;
  species: string;
  withdrawal_period: string;
  pack_size: string;
  registration_number: string;
  category: string;
  image_url?: string;
  price?: number;
  is_active: boolean;
}

// Default categories (will be loaded from database)
const defaultCategories = [
  'livestock-cattle',
  'poultry-health',
  'aquaculture',
  'companion-animals'
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
  product?: VeterinaryProduct | null;
  onSave: (data: Partial<VeterinaryProduct>) => void;
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
        species: '',
        withdrawal_period: '',
        pack_size: '',
        registration_number: '',
        category: 'livestock-cattle',
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
      
      toast.success('Image uploaded successfully!');
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: Partial<VeterinaryProduct>) => {
    onSave({
      ...data,
      price: parseFloat(String(data.price || 0)),
      id: product?.id || Date.now().toString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              {product ? 'Edit Veterinary Product' : 'Add Veterinary Product'}
              <Stethoscope className="w-6 h-6 text-red-600" />
            </h2>
            <p className="text-slate-500 text-sm mt-1">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden input for image_url */}
          <input type="hidden" {...register('image_url')} />

          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Product Image
            </label>
            <div className="flex items-start gap-6">
              {previewImage ? (
                <div className="relative group">
                  <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                     type="button"
                     onClick={() => {
                        setPreviewImage('');
                        setValue('image_url', '');
                     }}
                     className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : null}
              
              <div className="flex-1">
                <label className="cursor-pointer block">
                  <div className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition-all duration-200 ${isUploading ? 'bg-slate-50 border-slate-300' : 'border-slate-300 hover:border-red-400 hover:bg-red-50/10'}`}>
                    <div className="text-center p-4">
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                      ) : (
                        <>
                          <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-6 h-6 text-red-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 block">
                            Click to upload image
                          </span>
                          <span className="text-xs text-slate-400 mt-1 block">
                            SVG, PNG, JPG or GIF (max. 3MB)
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name', { required: 'Product name is required' })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                placeholder="Product commercial name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Generic Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('generic_name', { required: 'Generic name is required' })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                placeholder="Active ingredient"
              />
              {errors.generic_name && (
                <p className="text-red-500 text-xs mt-1">{String(errors.generic_name.message)}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Strength <span className="text-red-500">*</span>
              </label>
              <input
                {...register('strength', { required: 'Strength is required' })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                placeholder="e.g. 500mg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Dosage Form <span className="text-red-500">*</span>
              </label>
              <input
                {...register('dosage_form', { required: 'Dosage form is required' })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                placeholder="e.g. Tablets"
              />
            </div>
            
            {/* Veterinary Specific Fields */}
            <div className="space-y-2">
               <label className="block text-sm font-semibold text-slate-700">
                 Target Species <span className="text-red-500">*</span>
               </label>
               <input
                 {...register('species', { required: 'Species is required' })}
                 className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                 placeholder="e.g. Cattle, Sheep, Goats"
               />
            </div>

            <div className="space-y-2">
               <label className="block text-sm font-semibold text-slate-700">
                 Withdrawal Period <span className="text-red-500">*</span>
               </label>
               <input
                 {...register('withdrawal_period', { required: 'Withdrawal period is required' })}
                 className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                 placeholder="e.g. Meat: 5 days, Milk: 3 days"
               />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Pack Size
              </label>
              <input
                {...register('pack_size')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                placeholder="e.g. 100ml Bottle"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Registration Number
              </label>
              <input
                {...register('registration_number')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                placeholder="e.g. 12345/2026"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none bg-white font-medium text-slate-700"
                >
                  <option value="">Select Category</option>
                  {categories.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                   <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Price (EGP)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Indication <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('indication', { required: 'Indication is required' })}
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400 resize-none"
              placeholder="Enter indications for use..."
            />
            {errors.indication && (
              <p className="text-red-500 text-xs mt-1">{String(errors.indication.message)}</p>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="is_active"
                {...register('is_active')}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition-all checked:border-red-500 checked:bg-red-500 hover:border-red-400"
              />
              <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-all" />
            </div>
            <label htmlFor="is_active" className="cursor-pointer select-none text-sm font-medium text-slate-700">
              Active Status (Visible on website)
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100 mt-8">
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 font-medium transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:shadow-none"
            >
              <Save className="w-5 h-5" />
              {product ? 'Save Changes' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function VeterinaryProductsAdmin() {
  const [products, setProducts] = useState<VeterinaryProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<VeterinaryProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<VeterinaryProduct | null>(null);

  // Load products and categories from database
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Load products
      const productsData = await veterinaryProductsAPI.getAll();
      setProducts(productsData as any);
      
      // Load categories
      const categoriesData = await categoriesAPI.getByType('veterinary');
      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData.map((cat: any) => cat.slug));
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load products');
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

  const handleEditProduct = (product: VeterinaryProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('⚠️ Are you sure you want to delete this product?\n\nThis action cannot be undone.')) {
      try {
        await veterinaryProductsAPI.delete(id);
        await loadData();
        toast.success('Product deleted successfully!');
      } catch (error: any) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  const handleSaveProduct = async (productData: Partial<VeterinaryProduct>) => {
    try {
      if (editingProduct) {
        await veterinaryProductsAPI.update(editingProduct.id, productData as any);
        toast.success('Product updated successfully');
      } else {
        await veterinaryProductsAPI.create(productData as any);
        toast.success('Product created successfully');
      }
      await loadData();
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 ml-72 p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Veterinary Products</h1>
              <p className="text-slate-500 mt-2">Manage your veterinary pharmaceutical products</p>
            </div>
            <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Product
              </button>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by product name or active ingredient..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                />
             </div>
             <div className="relative w-full sm:w-64">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none text-slate-700 font-medium cursor-pointer hover:bg-slate-50"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
             </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
             {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                   <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mb-4"></div>
                   <p className="text-slate-500">Loading veterinary catalog...</p>
                </div>
             ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                   <AnimatePresence>
                      {filteredProducts.map((product) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          key={product.id}
                          className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
                        >
                           <div className="relative h-48 bg-slate-100 overflow-hidden">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                   <ImageIcon className="w-12 h-12" />
                                </div>
                              )}
                              <div className="absolute top-3 right-3 flex gap-2">
                                 <span className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md ${product.is_active ? 'bg-emerald-500/90 text-white' : 'bg-slate-500/90 text-white'}`}>
                                    {product.is_active ? 'Active' : 'Inactive'}
                                 </span>
                              </div>
                           </div>
                           
                           <div className="p-5 flex-1 flex flex-col">
                              <div className="flex items-start justify-between mb-2">
                                 <div>
                                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-red-600 transition-colors line-clamp-1" title={product.name}>{product.name}</h3>
                                    <p className="text-slate-500 text-sm font-medium line-clamp-1" title={product.generic_name}>{product.generic_name}</p>
                                 </div>
                              </div>
                              
                              <div className="my-4 space-y-2 flex-1">
                                 <div className="flex items-center text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                                    <span className="font-semibold text-slate-700 w-20">Category:</span>
                                    <span className="truncate">{product.category}</span>
                                 </div>
                                 <div className="flex items-center text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                                    <span className="font-semibold text-slate-700 w-20">Species:</span>
                                    <span className="truncate">{product.species}</span>
                                 </div>
                              </div>

                              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                                 <button
                                    onClick={() => handleEditProduct(product)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-slate-600 bg-white border border-slate-200 hover:border-red-500 hover:text-red-500 transition-all text-sm font-medium"
                                 >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    title="Delete Product"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                      ))}
                   </AnimatePresence>
                </div>
             ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                   <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="w-10 h-10 text-slate-300" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
                   <p className="text-slate-500 max-w-sm mx-auto mb-8">
                     {searchTerm ? `No matches found for "${searchTerm}"` : "Get started by adding your first veterinary product to the catalog."}
                   </p>
                   {searchTerm ? (
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Clear search
                      </button>
                   ) : (
                      <button
                        onClick={handleAddProduct}
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-medium"
                      >
                        <Plus className="w-5 h-5" />
                        Add Product
                      </button>
                   )}
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={editingProduct}
            onSave={handleSaveProduct}
            categories={categories}
          />
        )}
      </AnimatePresence>
    </div>
  );
}