-- =====================================================
-- نسخ هذا الكود وضعه في Supabase SQL Editor
-- ثم اضغط Run (أو Ctrl+Enter)
-- =====================================================

-- حذف السياسات القديمة المقيدة
DROP POLICY IF EXISTS "Public read access for human products" ON human_products;
DROP POLICY IF EXISTS "Public read access for veterinary products" ON veterinary_products;
DROP POLICY IF EXISTS "Public read access for categories" ON categories;

-- إنشاء سياسات جديدة تسمح بكل العمليات
CREATE POLICY "السماح بكل العمليات على منتجات البشر" ON human_products
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "السماح بكل العمليات على منتجات البيطرية" ON veterinary_products
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "السماح بكل العمليات على الفئات" ON categories
    FOR ALL USING (true) WITH CHECK (true);

-- الآن يمكنك إضافة وتعديل وحذف المنتجات! ✅
