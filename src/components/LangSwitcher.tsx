"use client";
import { useLanguageContext } from '@/lib/LanguageContext';
import { Globe } from 'lucide-react';

export default function LangSwitcher() {
  const { lang, setLang, mounted } = useLanguageContext();

  if (!mounted) return null;

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title="Toggle Language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{lang.toUpperCase()}</span>
    </button>
  );
}


