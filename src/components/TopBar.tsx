"use client";

import { Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";

export default function TopBar() {
  const { lang } = useLanguageContext();

  return (
    <div className="bg-gray-900 text-white py-2 text-xs hidden lg:block">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Contact Info */}
        <div className="flex items-center gap-6">
          <a href="mailto:info@sobek.com.eg" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>info@sobek.com.eg</span>
          </a>
          <a href="tel:+20554411823" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr">+20 55 4411823</span>
          </a>
        </div>

        {/* Socials & Extra Links */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border-r border-gray-700 pr-4 mr-1">
            <a href="https://facebook.com/sobekegypt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com/company/sobekegypt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="flex items-center gap-4">
             <a href="/careers" className="hover:text-blue-400 transition-colors">
               {lang === 'ar' ? 'الوظائف' : 'Careers'}
             </a>
             <a href="/media/news" className="hover:text-blue-400 transition-colors">
               {lang === 'ar' ? 'الأخبار' : 'News'}
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
