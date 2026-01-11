"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp,
  AlertCircle,
  Package,
  Users,
  Grid,
} from 'lucide-react';
import { humanProductsAPI, veterinaryProductsAPI, categoriesAPI } from '@/lib/api';
import AdminSidebar from '@/components/admin/AdminSidebar';

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
      const [human, vet, cats] = await Promise.all([
        humanProductsAPI.getAll(),
        veterinaryProductsAPI.getAll(),
        categoriesAPI.getAll()
      ]);

      setStats({
        humanProducts: human.length,
        veterinaryProducts: vet.length,
        totalProducts: human.length + vet.length,
        categories: cats.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-red-500',
      light: 'bg-red-50 text-red-600'
    },
    {
      title: 'Human Products',
      value: stats.humanProducts,
      icon: Users,
      color: 'bg-slate-800',
      light: 'bg-slate-100 text-slate-700'
    },
    {
      title: 'Vet Products',
      value: stats.veterinaryProducts,
      icon: AlertCircle,
      color: 'bg-slate-800',
      light: 'bg-slate-100 text-slate-700'
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: Grid,
      color: 'bg-slate-800',
      light: 'bg-slate-100 text-slate-700'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 border border-slate-100 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.light} transition-colors duration-300 group-hover:bg-red-50 group-hover:text-red-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1 group-hover:text-red-600 transition-colors">
              {stat.value}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/products/human"
            className="p-6 rounded-xl bg-slate-50 hover:bg-red-50 hover:border-red-100 border border-slate-100 transition-all duration-300 group text-center"
          >
            <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all">
              <Users className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors" />
            </div>
            <h4 className="font-bold text-slate-800 group-hover:text-red-700 mb-1">Add Human Product</h4>
            <p className="text-xs text-slate-500">Manage human products catalog</p>
          </Link>
          <Link
            href="/admin/products/veterinary"
            className="p-6 rounded-xl bg-slate-50 hover:bg-slate-800 hover:border-slate-900 border border-slate-100 transition-all duration-300 group text-center"
          >
            <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all">
              <AlertCircle className="w-6 h-6 text-slate-400 group-hover:text-slate-800 transition-colors" />
            </div>
            <h4 className="font-bold text-slate-800 group-hover:text-white mb-1">Add Vet Product</h4>
            <p className="text-xs text-slate-500 group-hover:text-slate-300">Manage veterinary catalog</p>
          </Link>
          <Link
            href="/admin/categories"
            className="p-6 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-100 border border-slate-100 transition-all duration-300 group text-center"
          >
            <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all">
              <Grid className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <h4 className="font-bold text-slate-800 group-hover:text-blue-700 mb-1">Categories</h4>
            <p className="text-xs text-slate-500">Manage product categories</p>
          </Link>
          <Link
            href="/admin/media"
            className="p-6 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-100 border border-slate-100 transition-all duration-300 group text-center"
          >
            <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all">
              <TrendingUp className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 mb-1">Media & News</h4>
            <p className="text-xs text-slate-500">Manage news updates</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 ml-72 p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
            <p className="text-slate-500">Welcome back to Sobek Pharma Admin Panel.</p>
          </div>

          <DashboardOverview />
        </div>
      </div>
    </div>
  );
}
