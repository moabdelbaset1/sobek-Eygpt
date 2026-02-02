"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LangSwitcher from './LangSwitcher';
import TopBar from './TopBar';
import { useLanguageContext } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';
import { Menu, X, ChevronRight, Activity, Zap, Newspaper, Calendar, Factory, ShieldCheck, Info, Briefcase } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
  icon?: any;
}

interface MenuItem {
  titleKey: string;
  href?: string;
  subItems?: SubMenuItem[];
}

export default function Header() {
  const { lang, isRTL } = useLanguageContext();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getMenuLabel = (key: string) => t(key, lang);

  // Dynamic Menu Items with proper translations and icons
  const menuItems: MenuItem[] = [
    { titleKey: 'home', href: '/' },
    {
      titleKey: 'products',
      subItems: [
        {
          title: t('humanHealth', lang),
          href: '/products/human-new',
          description: lang === 'ar' ? 'منتجات صيدلانية للبشر' : 'Pharmaceutical products for humans',
          icon: Activity
        },
        {
          title: t('animalHealth', lang),
          href: '/products/veterinary-new',
          description: lang === 'ar' ? 'منتجات بيطرية' : 'Veterinary pharmaceutical products',
          icon: Zap
        },
      ]
    },
    {
      titleKey: 'media',
      subItems: [
        { title: t('events', lang), href: '/media/events', icon: Calendar },
        { title: t('news', lang), href: '/media/news', icon: Newspaper },
      ]
    },
    { titleKey: 'careers', href: '/careers' },
    { 
      titleKey: 'about',
      subItems: [
        {
          title: t('overview', lang),
          href: '/about',
          description: t('about', lang),
          icon: Info
        },
        {
          title: t('manufacturing', lang),
          href: '/manufacturing',
          description: lang === 'ar' ? 'مصانعنا المتقدمة' : 'Our advanced facilities',
          icon: Factory
        },
        {
          title: t('quality', lang),
          href: '/quality',
          description: lang === 'ar' ? 'معايير الجودة العالمية' : 'World-class standards',
          icon: ShieldCheck
        }
      ]
    },
  ];

  const clearMenuTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const setDelayedMenuClose = () => {
    clearMenuTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setIsMobileMenuOpen(false);
    if (isMobileMenuOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <TopBar />
        <header 
          className={`transition-all duration-300 w-full relative ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
              : 'bg-white py-4'
          }`}
          onMouseLeave={setDelayedMenuClose}
        >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img 
                src="/logo.jpg" 
                alt="Sobek Egypt Pharma" 
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-10' : 'h-14'}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  console.error('Logo failed to load');
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <li
                  key={item.titleKey}
                  className="relative group"
                  onMouseEnter={() => {
                    clearMenuTimeout();
                    setActiveMenu(item.titleKey);
                  }}
                >
                  {item.subItems ? (
                    <button
                      className={`flex items-center gap-1 font-medium transition-colors py-2 ${
                        activeMenu === item.titleKey ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {getMenuLabel(item.titleKey)}
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {getMenuLabel(item.titleKey)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <LangSwitcher />
              </div>

              <Link
                href="/contact-us"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Full Width Mega Menu */}
        <AnimatePresence>
          {activeMenu && menuItems.find(i => i.titleKey === activeMenu)?.subItems && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl overflow-hidden z-40"
              onMouseEnter={clearMenuTimeout}
              onMouseLeave={setDelayedMenuClose}
            >
              <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {menuItems.find(i => i.titleKey === activeMenu)?.subItems?.map((subItem, idx) => {
                    const Icon = subItem.icon || ChevronRight;
                    return (
                      <Link
                        key={idx}
                        href={subItem.href}
                        className="group block p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100/50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                              {subItem.title}
                            </h3>
                            {subItem.description && (
                              <p className="text-sm text-gray-500 group-hover:text-gray-600 leading-relaxed">
                                {subItem.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      </div>
      <ScrollToTop />
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div 
        className={`lg:hidden fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpg" 
                alt="Sobek Egypt Pharma" 
                className="h-8 w-auto" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {menuItems.map((item) => (
              <div key={item.titleKey} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                {item.subItems ? (
                  <div className="space-y-3">
                    <div className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      {getMenuLabel(item.titleKey)}
                    </div>
                    <div className={`space-y-2 ${isRTL ? 'pr-4 border-r-2' : 'pl-4 border-l-2'} border-gray-100`}>
                      {item.subItems.map((subItem, idx) => {
                        const Icon = subItem.icon;
                        return (
                          <Link
                            key={idx}
                            href={subItem.href}
                            className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 transition-all text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {Icon && <Icon className="w-4 h-4 text-blue-500" />}
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="block font-bold text-gray-900 hover:text-blue-600 text-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getMenuLabel(item.titleKey)}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
            <div className="flex justify-center">
              <LangSwitcher />
            </div>
            <Link
              href="/contact-us"
              className="block w-full text-center px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:shadow-lg transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


