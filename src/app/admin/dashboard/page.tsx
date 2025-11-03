"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Eye,
  Newspaper,
  Briefcase,
  FileText
} from 'lucide-react';
import { humanProductsAPI, veterinaryProductsAPI, categoriesAPI } from '@/lib/api';

// Sidebar Component
function AdminSidebar({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) {
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
    { id: 'applications', label: 'Job Applications', icon: FileText, href: '/admin/applications' },
    { id: 'media', label: 'Media & News', icon: Newspaper, href: '/admin/media' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Sobek Egypt Pharma</h2>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
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

      {/* Logout */}
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

// Dashboard Overview Component
function DashboardOverview() {
  const [stats, setStats] = useState({
    humanProducts: 0,
    veterinaryProducts: 0,
    totalProducts: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [humanProds, vetProds, cats] = await Promise.all([
        humanProductsAPI.getAll(),
        veterinaryProductsAPI.getAll(),
        categoriesAPI.getAll()
      ]);
      
      setStats({
        humanProducts: humanProds.length,
        veterinaryProducts: vetProds.length,
        totalProducts: humanProds.length + vetProds.length,
        categories: cats.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = [
    {
      title: 'Total Human Products',
      value: loading ? '...' : stats.humanProducts.toString(),
      icon: Package,
      color: 'bg-blue-600',
      href: '/admin/products/human'
    },
    {
      title: 'Total Veterinary Products',
      value: loading ? '...' : stats.veterinaryProducts.toString(),
      icon: Package,
      color: 'bg-green-600',
      href: '/admin/products/veterinary'
    },
    {
      title: 'Total Products',
      value: loading ? '...' : stats.totalProducts.toString(),
      icon: CheckCircle,
      color: 'bg-emerald-600'
    },
    {
      title: 'Categories',
      value: loading ? '...' : stats.categories.toString(),
      icon: Users,
      color: 'bg-purple-600',
      href: '/admin/categories'
    },
    {
      title: 'Media Posts',
      value: loading ? '...' : '12', // Static for now, can be made dynamic later
      icon: Newspaper,
      color: 'bg-indigo-600',
      href: '/admin/media'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <Link
            href="/products/human-new"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Website
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          const CardContent = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );

          return stat.href ? (
            <Link key={index} href={stat.href}>
              {CardContent}
            </Link>
          ) : (
            <div key={index}>{CardContent}</div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/products/human" className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-4 text-center transition-colors">
            <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900">Add Human Product</h3>
            <p className="text-blue-600 text-sm">Add a new product to human section</p>
          </Link>
          
          <Link href="/admin/products/veterinary" className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg p-4 text-center transition-colors">
            <Plus className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900">Add Veterinary Product</h3>
            <p className="text-green-600 text-sm">Add a new product to veterinary section</p>
          </Link>
          
          <Link href="/admin/categories" className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg p-4 text-center transition-colors">
            <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900">Manage Categories</h3>
            <p className="text-purple-600 text-sm">Edit and add new categories</p>
          </Link>

        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New product added', product: 'SOBEK-PAIN', time: '2 hours ago', type: 'add' },
            { action: 'Product updated', product: 'SOBEK-VET COLISTIN', time: '4 hours ago', type: 'update' },
            { action: 'Product deleted', product: 'SOBEK-OLD', time: '1 day ago', type: 'delete' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  activity.type === 'add' ? 'bg-green-100' : 
                  activity.type === 'update' ? 'bg-blue-100' : 'bg-red-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'add' ? 'bg-green-600' : 
                    activity.type === 'update' ? 'bg-blue-600' : 'bg-red-600'
                  }`}></div>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.product}</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">Verifying authentication...</div>
    </div>;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'human-products':
        return <div className="text-center text-gray-500 mt-20">صفحة الأدوية البشرية قيد التطوير</div>;
      case 'vet-products':
        return <div className="text-center text-gray-500 mt-20">صفحة الأدوية البيطرية قيد التطوير</div>;
      case 'categories':
        return <div className="text-center text-gray-500 mt-20">صفحة الفئات قيد التطوير</div>;
      case 'settings':
        return <div className="text-center text-gray-500 mt-20">صفحة الإعدادات قيد التطوير</div>;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-8">
        {renderPage()}
      </main>
    </div>
  );
}