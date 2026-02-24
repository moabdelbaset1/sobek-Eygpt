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
    <div className="hidden md:block sticky top-0 z-50 w-full">
      <TopBar />
      <header
        className={`transition-all duration-300 w-full relative ${isScrolled
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
                    setActiveSubMenu(null);
                  }}
                >
                  <Link
                    href={item.href || '#'}
                    className={`text-base font-semibold transition-colors duration-200 py-2 inline-flex items-center gap-1 ${activeMenu === item.titleKey ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                  >
                    {getMenuLabel(item.titleKey)}
                    {item.subItems && (
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${activeMenu === item.titleKey ? 'rotate-90' : ''
                        }`} />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {activeMenu === item.titleKey && item.subItems && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-max min-w-[260px] z-50"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-2">
                          {item.subItems.map((sub, idx) => {
                            const Icon = sub.icon;
                            return (
                              <Link
                                key={idx}
                                href={sub.href}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/item"
                              >
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                  {Icon && <Icon className="w-5 h-5" />}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{sub.title}</div>
                                  {sub.description && (
                                    <div className="text-xs text-gray-500 mt-0.5 font-normal">{sub.description}</div>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <LangSwitcher />
              <Link
                href="/contact-us"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link>
            </div>

            {/* Mobile Menu Button - Also hidden as parent div is hidden on mobile */}
            <div className="lg:hidden flex items-center gap-4">
              <Link
                href="/contact-us"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-colors"
              >
                {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Also hidden as parent div is hidden on mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar - Also hidden as parent div is hidden on mobile */}
      <div
        className={`lg:hidden fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
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
    </div>
  );
}


