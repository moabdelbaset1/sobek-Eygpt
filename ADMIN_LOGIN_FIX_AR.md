# حل مشكلة خطأ 401 عند تسجيل دخول الأدمن

## المشكلة

عند محاولة تسجيل الدخول إلى صفحة الأدمن، كانت تظهر الأخطاء التالية:

```
AppwriteException: Invalid credentials. Please check the email and password.
Error code: 401
Error type: "user_invalid_credentials"
```

**ولكن:**
- عند إعادة تحميل الصفحة، كان يتم الدخول إلى Dashboard بنجاح
- البيانات المدخلة كانت صحيحة
- المشكلة تحدث فقط في المحاولة الأولى

## السبب

المشكلة كانت في **توقيت تحديث الجلسة** (Session Synchronization):

1. ✅ عند استدعاء `createEmailPasswordSession()` يتم إنشاء الجلسة بنجاح
2. ⏱️ Appwrite Client يحتاج وقت لتخزين Session في Cookies/localStorage
3. ❌ عند استدعاء `account.get()` مباشرة، الـ Session لم يتم تحديثه بعد
4. ✅ عند إعادة التحميل، يتم تحميل Session من Storage بشكل صحيح

## الحل

### 1️⃣ زيادة وقت الانتظار
```typescript
// من 100ms إلى 800ms
await new Promise(resolve => setTimeout(resolve, 800))
```

### 2️⃣ استخدام window.location.href
```typescript
// بدلاً من router.push()
window.location.href = '/admin'
```

**لماذا هذا أفضل؟**
- ✅ إعادة تحميل كاملة للصفحة
- ✅ تحميل Session من Storage بشكل صحيح
- ✅ تحديث جميع الـ States
- ✅ أكثر موثوقية في Authentication

### 3️⃣ تبسيط الكود
تم إزالة الـ Fallback المعقد والـ setTimeout المتعدد وجعل الكود أبسط وأوضح.

## الملفات المعدلة

- `src/app/admin/login/page.tsx`

## النتيجة

✅ تسجيل الدخول يعمل من أول محاولة
✅ لا مزيد من أخطاء 401
✅ تجربة مستخدم أفضل
✅ كود أبسط وأكثر وضوحاً

## كيفية الاختبار

1. افتح: http://localhost:3000/admin/login
2. أدخل بيانات الأدمن
3. اضغط "Sign In"
4. يجب أن يتم الدخول مباشرة بدون أخطاء

## ملاحظة مهمة

إذا واجهت مشكلة "Invalid credentials" وأنت متأكد من صحة البيانات:

1. **تأكد من أن المستخدم لديه role: "admin"** في Appwrite
2. **تحقق من Environment Variables**:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
3. **امسح الـ Cache والـ Cookies** ثم حاول مرة أخرى
4. **تأكد من أن الـ Server يعمل بشكل صحيح**

## إنشاء مستخدم أدمن جديد

إذا كنت بحاجة لإنشاء مستخدم أدمن جديد:

### الطريقة 1: من Appwrite Console
1. افتح Appwrite Console
2. اذهب إلى Authentication > Users
3. اختر المستخدم
4. في Preferences، أضف: `{"role": "admin"}`

### الطريقة 2: من الكود
عند إنشاء المستخدم، أضف:
```typescript
await account.updatePrefs({ role: 'admin' })
```

## الدعم

إذا واجهت أي مشكلة أخرى، تحقق من:
- Console logs في المتصفح
- Appwrite Console للتأكد من الجلسات
- Network tab للتأكد من الـ API calls
