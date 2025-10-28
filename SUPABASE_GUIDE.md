# دليل إعداد Supabase خطوة بخطوة 🚀

## الخطوة 1: إنشاء حساب Supabase

### أ) اذهب للموقع:
```
https://supabase.com
```

### ب) اضغط على الأزرار دي بالترتيب:
1. **"Start your project"** (الزر الأخضر في الصفحة الرئيسية)
2. **"Sign up"** (إذا مكانش عندك حساب)
3. استخدم GitHub أو Email للتسجيل

---

## الخطوة 2: إنشاء مشروع جديد

### بعد تسجيل الدخول:
1. اضغط **"New Project"**
2. اختر **Organization** (أو أنشئ واحد جديد)
3. املأ البيانات دي:
   ```
   Name: sobek-pharma
   Database Password: [اختر كلمة مرور قوية]
   Region: Europe West (لندن) أو أقرب منطقة ليك
   ```
4. اضغط **"Create new project"**

⏰ **انتظر 2-3 دقائق** عشان المشروع يتم إنشاؤه

---

## الخطوة 3: إنشاء الجداول (Tables)

### أ) اذهب لـ SQL Editor:
1. في الشريط الجانبي، اضغط على **"SQL Editor"**
2. اضغط **"New Query"**

### ب) انسخ والصق الكود ده:
```sql
-- إنشاء الجداول الأساسية
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- جدول الفئات
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('human', 'veterinary')),
  icon VARCHAR(10),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### ج) اضغط **"Run"** (الزر الأخضر)

---

## الخطوة 4: الحصول على المفاتيح

### أ) اذهب للإعدادات:
1. اضغط على **"Settings"** في الشريط الجانبي
2. اختر **"API"**

### ب) انسخ البيانات دي:
```
Project URL: https://xxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ما تحتاج تعمله الآن:

### 1. أنشئ الحساب في Supabase
### 2. أنشئ المشروع
### 3. قولي خلصت عشان أكمل معاك الباقي

🎯 **لا تقلق من الـ SQL - أنا هعمل كل الكود عشانك!**