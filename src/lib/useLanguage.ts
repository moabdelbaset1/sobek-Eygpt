import { useState, useEffect } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = (localStorage.getItem('lang') || 'en') as 'en' | 'ar';
    setLang(savedLang);
  }, []);

  return { lang, mounted, isRTL: lang === 'ar' };
}
