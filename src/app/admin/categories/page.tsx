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
  Users,
  Filter,
  Check,
  Tag
} from 'lucide-react';
import Link from 'next/link';
import { categoriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Types
interface Category {
  id: string;
  name: string;
  name_ar?: string | null;
  slug: string;
  type: 'human' | 'veterinary';
  icon?: string | null;
  description?: string | null;
  created_at?: string;
}

// Category Form Modal
function CategoryFormModal({ 
  isOpen, 
  onClose, 
  category, 
  onSave
}: { 
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSave: (data: Partial<Category>) => void;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: category || {}
  });

  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({
        name: '',
        slug: '',
        type: 'human',
        description: ''
      });
    }
  }, [category, reset]);

  const onSubmit = (data: Partial<Category>) => {
    onSave({
      ...data,
      id: category?.id || Date.now().toString()
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
        className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              {category ? 'Edit Category' : 'Add New Category'}
              <Tag className="w-6 h-6 text-red-600" />
            </h2>
            <p className="text-slate-500 text-sm mt-1">Organize your products with categories</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name', { required: 'Category name is required' })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
              placeholder="e.g. Cardiovascular"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              {...register('slug', { required: 'Slug is required' })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400 font-mono text-sm"
              placeholder="e.g. cardiovascular"
            />
            <p className="text-xs text-slate-400">Used in URL (e.g. /products/human/cardiovascular)</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
               <label className="flex-1 cursor-pointer">
                  <input type="radio" value="human" {...register('type')} className="peer sr-only" />
                  <div className="text-center py-3 px-4 rounded-xl border border-slate-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 hover:bg-slate-50 transition-all">
                     <span className="font-medium">Human</span>
                  </div>
               </label>
               <label className="flex-1 cursor-pointer">
                  <input type="radio" value="veterinary" {...register('type')} className="peer sr-only" />
                  <div className="text-center py-3 px-4 rounded-xl border border-slate-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 hover:bg-slate-50 transition-all">
                     <span className="font-medium">Veterinary</span>
                  </div>
               </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400 resize-none"
              placeholder="Optional description..."
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100 mt-8">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 font-medium transition-all shadow-lg shadow-red-500/20"
            >
              <Save className="w-5 h-5" />
              {category ? 'Save Changes' : 'Create Category'}
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

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await categoriesAPI.getAll();
      setCategories(data as any);
    } catch (error: any) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(cat => cat.type === selectedType);
    }

    setFilteredCategories(filtered);
  }, [categories, searchTerm, selectedType]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('⚠️ Are you sure you want to delete this category?\n\nThis will NOT delete products in this category, but they will become un-categorized.')) {
      try {
        await categoriesAPI.delete(id);
        await loadData();
        toast.success('Category deleted successfully!');
      } catch (error: any) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category');
      }
    }
  };

  const handleSaveCategory = async (categoryData: Partial<Category>) => {
    try {
      if (editingCategory) {
        await categoriesAPI.update(editingCategory.id, categoryData as any);
        toast.success('Category updated successfully');
      } else {
        await categoriesAPI.create(categoryData as any);
        toast.success('Category created successfully');
      }
      await loadData();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 ml-72 p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Categories</h1>
              <p className="text-slate-500 mt-2">Manage product categories structure</p>
            </div>
            <button
                onClick={handleAddCategory}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Category
              </button>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search categories..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                />
             </div>
             <div className="relative w-full sm:w-64">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-4 pr-8 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none text-slate-700 font-medium cursor-pointer hover:bg-slate-50"
                >
                  <option value="all">All Types</option>
                  <option value="human">Human</option>
                  <option value="veterinary">Veterinary</option>
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
                   <p className="text-slate-500">Loading categories...</p>
                </div>
             ) : filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <AnimatePresence>
                      {filteredCategories.map((category) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          key={category.id}
                          className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group p-5 flex flex-col relative overflow-hidden"
                        >
                           <div className={`absolute top-0 right-0 p-2 rounded-bl-xl text-xs font-bold uppercase tracking-wider ${category.type === 'human' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                              {category.type}
                           </div>

                           <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                 <Tag className="w-6 h-6" />
                              </div>
                           </div>

                           <h3 className="text-lg font-bold text-slate-800 mb-1">{category.name}</h3>
                           <code className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded w-fit mb-3">{category.slug}</code>
                           
                           {category.description && (
                              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{category.description}</p>
                           )}

                           <div className="mt-auto pt-4 border-t border-slate-50 flex gap-2">
                              <button
                                 onClick={() => handleEditCategory(category)}
                                 className="flex-1 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-sm font-medium transition-colors"
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => handleDeleteCategory(category.id)}
                                 className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </motion.div>
                      ))}
                   </AnimatePresence>
                </div>
             ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                   <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-slate-300" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">No categories found</h3>
                   <p className="text-slate-500 max-w-sm mx-auto mb-8">
                     Start organizing your products by creating categories.
                   </p>
                   <button
                     onClick={handleAddCategory}
                     className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-medium"
                   >
                     <Plus className="w-5 h-5" />
                     Add Category
                   </button>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <CategoryFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            category={editingCategory}
            onSave={handleSaveCategory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}