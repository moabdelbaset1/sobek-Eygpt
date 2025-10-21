# 🚀 دليل إعداد Supabase لمشروع Sobek Pharma

## الخطوة 1️⃣: إنشاء حساب Supabase

1. اذهب إلى: **https://supabase.com**
2. اضغط **"Start your project"** أو **"Sign Up"**
3. سجل بإيميلك أو GitHub
4. ✅ الحساب مجاني 100%

---

## الخطوة 2️⃣: إنشاء مشروع جديد

1. بعد تسجيل الدخول، اضغط **"New Project"**
2. املأ البيانات:
   ```
   Name: sobek-pharma
   Database Password: [اختر كلمة سر قوية - احفظها!]
   Region: Frankfurt (eu-central-1) أو أقرب منطقة
   Pricing Plan: Free (مجاني)
   ```
3. اضغط **"Create new project"**
4. ⏳ انتظر 2-3 دقائق حتى يكتمل الإعداد

---

## الخطوة 3️⃣: الحصول على API Keys

1. بعد إنشاء المشروع، روح على **Settings** (⚙️) من القائمة الجانبية
2. اختر **API** من القائمة
3. هتلاقي المعلومات دي:

### 📋 انسخ هذه البيانات:

```
Project URL: https://xyzcompany.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## الخطوة 4️⃣: تحديث ملف .env.local

1. افتح ملف `.env.local` في مجلد `web`
2. استبدل القيم بالـ keys اللي نسختها:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## الخطوة 5️⃣: إنشاء الجداول (Database Tables)

1. في Supabase Dashboard، اذهب إلى **SQL Editor** من القائمة
2. اضغط **"New Query"**
3. انسخ محتوى ملف `database_schema.sql` كامل
4. الصق في SQL Editor
5. اضغط **"Run"** أو **Ctrl+Enter**
6. ✅ يجب أن تظهر رسالة: "Success. No rows returned"

---

## الخطوة 6️⃣: إدخال بيانات تجريبية (اختياري)

### Categories (الأقسام):

```sql
-- Human Categories
INSERT INTO categories (name, name_ar, slug, type, description) VALUES
('Cardiovascular', 'أمراض القلب والأوعية الدموية', 'cardiovascular', 'human', 'Heart and blood vessel medications'),
('Anti-Infectives', 'مضادات العدوى', 'anti-infectives', 'human', 'Antibiotics and antimicrobials'),
('Endocrinology & Diabetes', 'الغدد الصماء والسكري', 'endocrinology-diabetes', 'human', 'Diabetes and hormonal treatments'),
('Gastroenterology', 'الجهاز الهضمي', 'gastroenterology', 'human', 'Digestive system medications');

-- Veterinary Categories
INSERT INTO categories (name, name_ar, slug, type, description) VALUES
('Livestock & Cattle', 'الماشية والأبقار', 'livestock-cattle', 'veterinary', 'Products for cattle and livestock'),
('Poultry Health', 'صحة الدواجن', 'poultry-health', 'veterinary', 'Poultry medications'),
('Aquaculture', 'الاستزراع المائي', 'aquaculture', 'veterinary', 'Fish and aquatic animal health'),
('Companion Animals', 'الحيوانات الأليفة', 'companion-animals', 'veterinary', 'Dogs, cats, and pets');
```

انسخ هذا الكود في SQL Editor واضغط Run.

### منتج تجريبي:

```sql
-- Sample Human Product
INSERT INTO human_products (name, generic_name, strength, dosage_form, indication, pack_size, category, price, is_active)
VALUES (
  'SOBEK-PRIL 10mg',
  'Enalapril Maleate',
  '10mg',
  'Film-coated Tablets',
  'Treatment of hypertension, heart failure, and prevention of cardiovascular events',
  '30 tablets',
  'cardiovascular',
  45.50,
  true
);

-- Sample Veterinary Product
INSERT INTO veterinary_products (name, generic_name, strength, dosage_form, indication, species, withdrawal_period, pack_size, category, price, is_active)
VALUES (
  'SOBEK-VET OXY 200',
  'Oxytetracycline HCl',
  '200mg/ml',
  'Injectable Solution',
  'Treatment of respiratory infections, mastitis, and foot rot',
  'Cattle, Sheep, Goats',
  'Meat: 28 days, Milk: 7 days',
  '100ml vial',
  'livestock-cattle',
  125.00,
  true
);
```

---

## الخطوة 7️⃣: التحقق من التثبيت

1. **أوقف السيرفر** (Ctrl+C في Terminal)
2. **شغل السيرفر مرة أخرى**:
   ```bash
   cd C:\Users\MEKAW\Desktop\sobek\web
   npm run dev
   ```
3. افتح المتصفح وادخل على:
   - http://localhost:3000/products/human-new
   - http://localhost:3000/admin/products/human

4. ✅ يجب أن تظهر المنتجات من قاعدة البيانات!

---

## 🎯 اختبار Admin Panel

1. اذهب إلى: http://localhost:3000/admin/products/human
2. اضغط **"Add New Product"**
3. املأ البيانات واضغط **"Add Product"**
4. ✅ يجب أن يظهر المنتج في القائمة فوراً
5. روح على صفحة المنتجات العامة: http://localhost:3000/products/human-new/cardiovascular
6. ✅ يجب أن تجد المنتج الجديد ظاهر!

---

## 🔒 تأمين قاعدة البيانات (مهم!)

### Row Level Security (RLS):

في Supabase، اذهب إلى **Authentication** → **Policies**

#### للمنتجات (القراءة عامة، الكتابة للـ Admin فقط):

```sql
-- Allow public read access to products
CREATE POLICY "Allow public read access to human products"
ON human_products FOR SELECT
USING (true);

CREATE POLICY "Allow public read access to veterinary products"
ON veterinary_products FOR SELECT
USING (true);

CREATE POLICY "Allow public read access to categories"
ON categories FOR SELECT
USING (true);

-- Admin only can insert/update/delete (add authentication later)
CREATE POLICY "Allow authenticated insert on human products"
ON human_products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on human products"
ON human_products FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated delete on human products"
ON human_products FOR DELETE
TO authenticated
USING (true);
```

انسخ والصق في SQL Editor واضغط Run.

---

## 📞 في حالة وجود مشاكل:

### خطأ: "Invalid supabaseUrl"
- ✅ تأكد من نسخ الـ URL الصحيح من Settings → API
- ✅ تأكد أن الـ URL يبدأ بـ `https://`

### خطأ: "Failed to fetch"
- ✅ تأكد من تشغيل السيرفر: `npm run dev`
- ✅ تأكد من وجود اتصال بالإنترنت

### المنتجات لا تظهر:
- ✅ تأكد من تنفيذ `database_schema.sql`
- ✅ تأكد من إدخال البيانات التجريبية
- ✅ تحقق من SQL Editor في Supabase

---

## 🎉 تم بنجاح!

الآن لديك:
- ✅ قاعدة بيانات سحابية مجانية
- ✅ Admin Panel متصل بقاعدة البيانات
- ✅ صفحات المنتجات تعرض بيانات حقيقية
- ✅ إضافة/تعديل/حذف المنتجات يعمل

---

## 🚀 الخطوات التالية:

1. أضف منتجاتك الحقيقية من Admin Panel
2. ارفع صور المنتجات
3. اربط Supabase Storage لحفظ الصور
4. أضف نظام تسجيل دخول للـ Admin

---

**محتاج مساعدة؟**
- Documentation: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions
