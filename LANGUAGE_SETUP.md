# Language Switcher Setup Guide

## 🌐 الطريقة المستخدمة: localStorage + Client-Side

### المميزات:
✅ **آمن** - لا يؤثر على الكود الموجود
✅ **بسيط** - لا يحتاج middleware معقد
✅ **سريع** - يعمل فوراً بدون reload إن أمكن
✅ **قابل للتوسع** - سهل إضافة ترجمات جديدة

---

## 📁 الملفات الجديدة:

### 1. `src/components/LangSwitcher.tsx`
- عرض زر تبديل اللغة
- حفظ اللغة في localStorage
- تطبيق اتجاه النص (RTL/LTR)

### 2. `src/lib/useLanguage.ts`
- Hook لاستخدام اللغة في أي component
- يرجع: `lang`, `mounted`, `isRTL`

### 3. `src/lib/translations.ts`
- كل النصوص المترجمة
- دالة `t()` للوصول للترجمات

---

## 🚀 كيفية الاستخدام:

### في أي Component:
```tsx
"use client";
import { useLanguage } from '@/lib/useLanguage';
import { t } from '@/lib/translations';

export default function MyComponent() {
  const { lang, mounted } = useLanguage();
  
  if (!mounted) return null;
  
  return (
    <div>
      <h1>{t('news', lang)}</h1>
      {lang === 'ar' && <p>المحتوى بالعربية</p>}
      {lang === 'en' && <p>English content</p>}
    </div>
  );
}
```

---

## 🔧 الخطوات الإضافية:

### 1. أضف LangSwitcher في Header:
```tsx
// في src/components/Header.tsx
import LangSwitcher from './LangSwitcher';

// في JSX
<nav>
  {/* باقي الـ navigation */}
  <LangSwitcher />
</nav>
```

### 2. أضف Tailwind RTL support (اختياري):
```ts
// في tailwind.config.ts
module.exports = {
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
```

### 3. إذا أردت ترجمات إضافية:
```ts
// في src/lib/translations.ts
export const translations = {
  en: {
    // أضف هنا
  },
  ar: {
    // أضف هنا
  }
};
```

---

## ⚠️ ملاحظات مهمة:

1. **التخزين المحلي**: اللغة تُحفظ في localStorage - تبقى حتى لو أغلق الموقع
2. **Hydration**: نستخدم `mounted` لتجنب hydration mismatch
3. **Reload**: عند التبديل يحدث reload لتطبيق الـ direction بالكامل
4. **Dynamic Content**: النصوص من الـ database (news, events, jobs) تبقى كما هي - تترجم من الـ database مباشرة

---

## 📊 الفرق بين الطرق:

| الطريقة | الصعوبة | الأمان | السرعة | الاستخدام |
|--------|--------|--------|--------|------------|
| localStorage + Client | سهل | عالي | سريع | ✅ الحالي |
| next-intl (middleware) | معقد | عالي جداً | أسرع | للمشاريع الكبيرة |
| URL Query Param | متوسط | متوسط | متوسط | بديل |

---

## ✨ الخطوة التالية:

1. ✅ قم بالتعديلات أعلاه
2. استخدم الترجمات في الـ Components
3. أضف ترجمات إضافية حسب احتياجك
4. اختبر على الهاتف والتابليت
