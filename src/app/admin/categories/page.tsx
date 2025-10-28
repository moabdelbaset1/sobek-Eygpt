"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { categoriesAPI } from '../../../lib/api';

// Sidebar Component (same as dashboard)
function AdminSidebar({ currentPage }: { currentPage: string }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'human-products', label: 'Human Products', icon: Package, href: '/admin/products/human' },
    { id: 'vet-products', label: 'Veterinary Products', icon: Package, href: '/admin/products/veterinary' },
    { id: 'categories', label: 'Categories', icon: Users, href: '/admin/categories' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Sobek Pharma</h2>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-right ${
                currentPage === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 ml-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 w-56">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 ml-3" />
          Logout
        </button>
      </div>
    </div>
  );
}

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'human' | 'veterinary'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    slug: '',
    type: 'human' as 'human' | 'veterinary',
    icon: '',
    description: ''
  });

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadCategories();
    }
  }, [router]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesAPI.getAll();
      setCategories(data as Category[]);
    } catch (error) {
      console.error('Error loading categories:', error);
      // Don't alert, just show empty state
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        // Update existing category
        await categoriesAPI.update(editingCategory.id, {
          name: formData.name,
          name_ar: formData.name_ar,
          slug: formData.slug,
          type: formData.type,
          icon: formData.icon,
          description: formData.description
        });
        toast.success('Category updated successfully!');
      } else {
        // Create new category
        await categoriesAPI.create({
          name: formData.name,
          name_ar: formData.name_ar,
          slug: formData.slug,
          type: formData.type,
          icon: formData.icon,
          description: formData.description
        });
        toast.success('Category created successfully!');
      }
      await loadCategories();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      name_ar: category.name_ar || '',
      slug: category.slug,
      type: category.type,
      icon: category.icon || '',
      description: category.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the category "${name}"?\n\nThis action cannot be undone.`)) {
      try {
        await categoriesAPI.delete(id);
        toast.success('Category deleted successfully!');
        await loadCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      name_ar: '',
      slug: '',
      type: 'human',
      icon: '',
      description: ''
    });
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter(cat => {
    const matchesType = filterType === 'all' || cat.type === filterType;
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (cat.name_ar && cat.name_ar.includes(searchQuery));
    return matchesType && matchesSearch;
  });

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">Verifying authentication...</div>
    </div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar currentPage="categories" />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
              <p className="text-gray-600 mt-2">Manage product categories for human and veterinary products</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="human">Human Products</option>
                  <option value="veterinary">Veterinary Products</option>
                </select>
              </div>

              <div className="text-right text-gray-600">
                Total: <span className="font-bold text-gray-900">{filteredCategories.length}</span> categories
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      category.type === 'human' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {category.type === 'human' ? 'Human' : 'Veterinary'}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id, category.name)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    {category.icon && (
                      <div className="text-3xl">{category.icon}</div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                      {category.name_ar && (
                        <p className="text-gray-600 text-sm">{category.name_ar}</p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3">
                    <span className="font-medium">Slug:</span> {category.slug}
                  </p>
                  {category.description && (
                    <p className="text-sm text-gray-600">{category.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {filteredCategories.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-xl">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-4">Create your first category to get started</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Category
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., Cardiovascular"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name (Arabic)
                  </label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({...formData, name_ar: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., أدوية القلب"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL-friendly) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., cardiovascular"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="human">Human Products</option>
                    <option value="veterinary">Veterinary Products</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., ❤️, 🐄, 🐔, 🐟"
                    maxLength={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">Add an emoji to represent this category</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Brief description of this category"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    {editingCategory ? 'Update Category' : 'Create Category'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}