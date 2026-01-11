# ⚠️ Appwrite Setup Required

## Current Error
```
AppwriteException: Project with the requested ID could not be found.
```

## الحل: إعداد Appwrite Project جديد

### الخطوات المطلوبة:

#### 1. إنشاء Appwrite Project
1. اذهب إلى https://cloud.appwrite.io
2. سجل دخول أو أنشئ حساب جديد
3. اضغط "Create Project"
4. سمي المشروع "Sobek Pharma"

#### 2. احصل على الـ Credentials
بعد إنشاء المشروع، ستحصل على:
- **Project ID** (مثال: `677dfcc100084e82e03e`)
- **Database ID** (سننشئه في الخطوة التالية)
- **Bucket ID** (سننشئه في الخطوة التالية)

#### 3. إنشاء Database
1. في sidebar اختر "Databases"
2. اضغط "Create Database"
3. سمها "sobek_pharma_db"
4. احفظ الـ **Database ID**

#### 4. إنشاء Collections (7 collections مطلوبة)

##### Collection 1: human_products
```json
{
  "name": "string" (required),
  "genericName": "string" (required),
  "strength": "string" (required),
  "dosageForm": "string" (required),
  "indication": "string" (required),
  "packSize": "string" (optional),
  "registrationNumber": "string" (optional),
  "category": "string" (required),
  "imageUrl": "string" (optional),
  "price": "integer" (optional),
  "isActive": "boolean" (default: true)
}
```

##### Collection 2: veterinary_products
```json
{
  "name": "string" (required),
  "genericName": "string" (required),
  "strength": "string" (required),
  "dosageForm": "string" (required),
  "indication": "string" (required),
  "species": "string" (required),
  "withdrawalPeriod": "string" (optional),
  "packSize": "string" (optional),
  "registrationNumber": "string" (optional),
  "category": "string" (required),
  "imageUrl": "string" (optional),
  "price": "integer" (optional),
  "isActive": "boolean" (default: true)
}
```

##### Collection 3: categories
```json
{
  "name": "string" (required),
  "nameAr": "string" (optional),
  "slug": "string" (required, unique),
  "type": "string" (required, enum: ["human", "veterinary"]),
  "icon": "string" (optional),
  "description": "string" (optional)
}
```

##### Collection 4: media_posts
```json
{
  "title": "string" (required),
  "titleAr": "string" (optional),
  "content": "string" (required),
  "contentAr": "string" (optional),
  "type": "string" (required, enum: ["news", "event"]),
  "mediaType": "string" (optional),
  "mediaUrl": "string" (optional),
  "isActive": "boolean" (default: true),
  "publishDate": "datetime" (required)
}
```

##### Collection 5: jobs
```json
{
  "title": "string" (required),
  "titleAr": "string" (optional),
  "department": "string" (required),
  "location": "string" (required),
  "jobType": "string" (required),
  "workingHours": "string" (required),
  "description": "string" (required),
  "descriptionAr": "string" (optional),
  "requirements": "string" (required),
  "requirementsAr": "string" (optional),
  "isActive": "boolean" (default: true)
}
```

##### Collection 6: job_applications
```json
{
  "jobId": "string" (optional),
  "fullName": "string" (required),
  "email": "string" (required),
  "phone": "string" (required),
  "coverLetter": "string" (optional),
  "cvUrl": "string" (required),
  "status": "string" (default: "pending")
}
```

##### Collection 7: leadership
```json
{
  "name": "string" (required),
  "nameAr": "string" (optional),
  "position": "string" (required),
  "positionAr": "string" (optional),
  "bio": "string" (optional),
  "bioAr": "string" (optional),
  "imageUrl": "string" (optional),
  "order": "integer" (default: 0)
}
```

#### 5. إنشاء Storage Bucket
1. في sidebar اختر "Storage"
2. اضغط "Create Bucket"
3. سمها "product_images"
4. احفظ الـ **Bucket ID**
5. في Settings → Permissions، اجعلها:
   - Read: Anyone
   - Write: Users (authenticated)

#### 6. تحديث `.env.local`
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=<your_database_id>
NEXT_PUBLIC_APPWRITE_BUCKET_ID=<your_bucket_id>
```

#### 7. إعادة تشغيل السيرفر
```bash
npm run dev
```

## Alternative: استخدام Mock Data للتطوير المحلي

إذا كنت لا تريد إعداد Appwrite الآن، يمكننا إنشاء mock data للتطوير المحلي فقط.

أخبرني إذا كنت تريد:
1. إعداد Appwrite (موصى به للـ production)
2. استخدام Mock Data محلياً (للتطوير السريع)
