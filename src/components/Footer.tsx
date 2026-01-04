"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function Footer() {
  const { lang, isRTL } = useLanguageContext();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: {
      titleEn: "Company",
      titleAr: "الشركة",
      links: [
        { nameEn: "About Us", nameAr: "من نحن", href: "/about" },
        { nameEn: "Careers", nameAr: "الوظائف", href: "/careers" },
        { nameEn: "News & Media", nameAr: "الأخبار والإعلام", href: "/media/news" },
        { nameEn: "Contact Us", nameAr: "اتصل بنا", href: "/contact-us" },
      ]
    },
    products: {
      titleEn: "Products",
      titleAr: "المنتجات",
      links: [
        { nameEn: "Human Pharmaceuticals", nameAr: "الأدوية البشرية", href: "/products/human-new" },
        { nameEn: "Veterinary Health", nameAr: "الصحة البيطرية", href: "/products/veterinary-new" },
        { nameEn: "R&D", nameAr: "البحث والتطوير", href: "/rd" },
        { nameEn: "Manufacturing", nameAr: "التصنيع", href: "/manufacturing" },
      ]
    },
    legal: {
      titleEn: "Legal",
      titleAr: "قانوني",
      links: [
        { nameEn: "Privacy Policy", nameAr: "سياسة الخصوصية", href: "/privacy" },
        { nameEn: "Terms of Service", nameAr: "شروط الخدمة", href: "/terms" },
        { nameEn: "Cookie Policy", nameAr: "سياسة ملفات تعريف الارتباط", href: "/cookies" },
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img 
                src="/logo.jpg" 
                alt="Sobek Egypt Pharma" 
                className="h-14 w-auto bg-white rounded-lg p-2 hover:shadow-lg transition-all"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  console.error('Footer logo failed to load');
                }}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {lang === 'ar' 
                ? 'سوبك مصر فارما هي شركة رائدة في مجال الصناعات الدوائية، ملتزمة بتحسين جودة الحياة من خلال حلول صحية مبتكرة وموثوقة.'
                : 'Sobek Egypt Pharma is a leading pharmaceutical manufacturer committed to improving quality of life through innovative and trusted healthcare solutions.'
              }
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/sobekegypt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/sobekegypt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {lang === 'ar' ? footerLinks.company.titleAr : footerLinks.company.titleEn}
              <span className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-1/2 h-1 bg-blue-600 rounded-full`}></span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {lang === 'ar' ? link.nameAr : link.nameEn}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {lang === 'ar' ? footerLinks.products.titleAr : footerLinks.products.titleEn}
              <span className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-1/2 h-1 bg-red-600 rounded-full`}></span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {lang === 'ar' ? link.nameAr : link.nameEn}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {lang === 'ar' ? 'معلومات الاتصال' : 'Contact Info'}
              <span className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-1/2 h-1 bg-purple-600 rounded-full`}></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-purple-500 mt-1 shrink-0" />
                <span className="text-sm">
                  {lang === 'ar' 
                    ? 'المنطقة الصناعية A5، قطعة رقم 251، الشرقية، مصر'
                    : 'A5 Industrial Zone, Plot No. 251, Al-Sharqia, Egypt'
                  }
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-purple-500 shrink-0" />
                <span className="text-sm" dir="ltr">+20 55 4411823</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-purple-500 shrink-0" />
                <span className="text-sm">info@sobek-pharma.com</span>
              </li>
            </ul>

            {/* Newsletter (Visual Only) */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">
                {lang === 'ar' ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to our newsletter'}
              </h4>
              <div className="flex relative">
                <input 
                  type="email" 
                  placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  suppressHydrationWarning
                />
                <button className={`absolute ${isRTL ? 'left-1' : 'right-1'} top-1 bottom-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 flex items-center justify-center transition-colors`}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Sobek Egypt Pharma. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            {footerLinks.legal.links.map((link, index) => (
              <Link key={index} href={link.href} className="hover:text-white transition-colors">
                {lang === 'ar' ? link.nameAr : link.nameEn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


