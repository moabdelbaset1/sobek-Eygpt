# Database Schema Update Required for Orders Enhancement

## مشكلة قاعدة البيانات الحالية

الأخطاء اللي بتظهر معناها إن قاعدة البيانات مش معرف فيها الحقول الجديدة. محتاجين نضيف الحقول دي في Appwrite Console:

## الحقول المطلوب إضافتها لـ Orders Collection:

### الحقول الأساسية المفقودة:
```
1. status (String, 50 chars) - حالة الطلب
2. payment_method (String, 50 chars) - طريقة الدفع
3. internal_notes (String, 1000 chars) - ملاحظات داخلية
4. total_returned_amount (Float) - المبلغ المرجع
5. shipped_at (DateTime) - تاريخ الشحن
6. delivered_at (DateTime) - تاريخ التسليم
7. cancelled_at (DateTime) - تاريخ الإلغاء
8. carrier (String, 100 chars) - شركة الشحن
9. tracking_number (String, 100 chars) - رقم التتبع
```

### حقول إضافية مفيدة:
```
10. customer_phone (String, 20 chars) - تليفون العميل
11. discount_amount (Float) - مبلغ الخصم
12. tax_amount (Float) - مبلغ الضريبة
13. shipping_amount (Float) - مبلغ الشحن
14. transaction_id (String, 100 chars) - رقم المعاملة
```

## خطوات الإضافة في Appwrite Console:

1. اذهب إلى Appwrite Console
2. افتح Database → Collections → orders
3. اضغط على "Attributes"
4. اضغط على "Create Attribute"
5. أضف كل attribute من القائمة فوق

## بديل مؤقت:

حالياً سنستخدم الحقول الموجودة فقط ونتجنب الحقول الجديدة حتى يتم تحديث قاعدة البيانات.

## Post-Update Actions:

بعد إضافة الحقول، سيكون النظام قادر على:
- تتبع حالة الطلبات بدقة
- معالجة المرتجعات تلقائياً
- إدارة المخزون عند الإرجاع
- تتبع طرق الدفع المختلفة