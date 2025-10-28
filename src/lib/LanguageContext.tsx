"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  isRTL: boolean;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<'en' | 'ar'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = (localStorage.getItem('lang') || 'en') as 'en' | 'ar';
    setLangState(savedLang);
    applyLanguage(savedLang);
  }, []);

  const applyLanguage = (newLang: 'en' | 'ar') => {
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl', newLang === 'ar');
    document.documentElement.classList.toggle('ltr', newLang === 'en');
    localStorage.setItem('lang', newLang);
  };

  const setLang = (newLang: 'en' | 'ar') => {
    setLangState(newLang);
    applyLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRTL: lang === 'ar', mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider');
  }
  return context;
}
