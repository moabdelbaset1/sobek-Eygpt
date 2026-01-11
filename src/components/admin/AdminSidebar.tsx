"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Package } from 'lucide-react';
import { menuItems } from './AdminConfig';
import { motion } from 'framer-motion';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        router.push('/admin/login');
    };

    return (
        <aside className="bg-white border-r border-slate-200 w-72 min-h-screen fixed left-0 top-0 z-50 flex flex-col shadow-[0_0_15px_rgba(0,0,0,0.05)] text-slate-600 font-sans">
            {/* Logo Section */}
            <div className="p-8 pb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                        <Package className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-slate-800 tracking-tight">Sobek Pharma</h2>
                        <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-0.5">Admin Portal</p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-slate-100 mx-8 mb-6 mt-2"></div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 font-medium group ${isActive
                                    ? 'bg-red-50 text-red-700'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <Icon className={`w-5 h-5 mr-3.5 transition-colors ${isActive ? 'text-red-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <span className={`text-sm ${isActive ? 'font-bold' : ''}`}>{item.label}</span>

                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-6 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-3.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium group border border-transparent hover:border-red-100"
                >
                    <LogOut className="w-5 h-5 mr-2.5" />
                    <span className="text-sm">Sign Out</span>
                </button>
                <p className="text-center text-slate-400 text-xs mt-4 font-mono">v1.2.0 • 2026</p>
            </div>
        </aside>
    );
}
