"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
  subItems?: SubMenuItem[];
}

interface MenuItem {
  title: string;
  href?: string;  // Make href optional
  subItems?: SubMenuItem[];
}

// Main navigation items
const menuItems: MenuItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Products',
    subItems: [
      {
        title: 'Human Health',
        href: '/products/human-new',
        description: 'Pharmaceutical products for humans',
      },
      {
        title: 'Animal Health',
        href: '/products/veterinary-new',
        description: 'Veterinary pharmaceutical products',
      },
    ]
  },
  {
    title: 'Media',
    subItems: [
      { title: 'Events', href: '/media/events' },
      { title: 'News', href: '/media/news' },
    ]
  },
  {
    title: 'Careers',
    href: '/careers',
  },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout function
  const clearMenuTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Set delayed menu close
  const setDelayedMenuClose = () => {
    clearMenuTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
    }, 300); // 300ms delay
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearMenuTimeout(); // Clear timeout on cleanup
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white shadow-lg border-b border-gray-100'
        : 'bg-white/95 backdrop-blur-md'
    }`}>
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Sobek Egypt" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <li
                key={item.title}
                className="relative group"
                onMouseEnter={() => {
                  clearMenuTimeout();
                  setActiveMenu(item.title);
                }}
                onMouseLeave={() => {
                  setDelayedMenuClose();
                }}
              >
                {item.subItems ? (
                  <span
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 flex items-center gap-1.5 rounded-lg hover:bg-blue-50 text-sm cursor-pointer"
                  >
                    {item.title}
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                ) : item.href && (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 flex items-center gap-1.5 rounded-lg hover:bg-blue-50 text-sm"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.subItems && activeMenu === item.title && (
                  <div 
                    className="absolute top-full left-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl min-w-[280px] py-3 animate-fadeIn"
                    onMouseEnter={() => {
                      clearMenuTimeout();
                    }}
                    onMouseLeave={() => {
                      setDelayedMenuClose();
                    }}
                  >
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.title}
                        className="relative"
                        onMouseEnter={() => {
                          clearMenuTimeout();
                          setActiveSubMenu(subItem.title);
                        }}
                        onMouseLeave={() => {
                          // Only close submenu, not main menu
                          setTimeout(() => setActiveSubMenu(null), 200);
                        }}
                      >
                        <Link
                          href={subItem.href}
                          className="block px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 transition-all duration-200 group/item rounded-lg mx-2"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900 group-hover/item:text-blue-600 transition-colors text-sm">
                                {subItem.title}
                              </div>
                              {subItem.description && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {subItem.description}
                                </div>
                              )}
                            </div>
                            {subItem.subItems && (
                              <svg className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </div>
                        </Link>

                        {/* Side Submenu */}
                        {subItem.subItems && activeSubMenu === subItem.title && (
                          <div className="absolute left-full top-0 ml-2 bg-white border border-gray-100 shadow-2xl rounded-xl min-w-[240px] py-3 animate-fadeIn">
                            {subItem.subItems.map((nestedItem) => (
                              <Link
                                key={nestedItem.title}
                                href={nestedItem.href}
                                className="block px-5 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 hover:text-red-600 text-gray-700 font-medium transition-all duration-200 rounded-lg mx-2 text-sm"
                              >
                                {nestedItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right Side - Language Switcher & Contact Button */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                <span className="text-lg">🌐</span>
                <span className="text-xs font-medium">EN</span>
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Language Dropdown */}
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 shadow-lg rounded-xl min-w-[140px] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700">
                  <span className="text-lg">🇺🇸</span>
                  <span className="font-medium text-sm">English</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700">
                  <span className="text-lg">🇪🇬</span>
                  <span className="font-medium text-sm">العربية</span>
                </button>
              </div>
            </div>

            {/* Contact Button */}
            <Link
              href="/contact-us"
              className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm"
            >
              Contact Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className={`w-6 h-6 transform transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden border-t border-gray-100 py-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.subItems ? (
                    <div className="px-4 py-3 text-gray-700 font-medium">
                      {item.title}
                    </div>
                  ) : item.href && (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                  {item.subItems && (
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact & Language */}
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                <Link
                  href="/contact-us"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <div className="flex justify-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-sm">English</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                    <span className="text-lg">🇪🇬</span>
                    <span className="text-sm">العربية</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


