# Vercel Environment Variables Setup

## Required Environment Variables for Production

Add these environment variables in your Vercel Project Settings → Environment Variables:

### Appwrite Configuration
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=677dfcc100084e82e03e
NEXT_PUBLIC_APPWRITE_DATABASE_ID=677dfcde00021b07b5dd
NEXT_PUBLIC_APPWRITE_BUCKET_ID=677dfd1f0025f4d8e7ea
```

### Google Maps API
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Email Configuration
```
COMPANY_EMAIL=hr@sobekpharma.com
EMAIL_SERVICE=console
EMAIL_FROM=noreply@sobekpharma.com
```

### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Admin Configuration
```
ADMIN_EMAIL=admin@sobekpharma.com
ADMIN_PASSWORD=admin123
```

## Important Notes

1. **Appwrite Setup**: Make sure your Appwrite collections are created with these exact names:
   - `human_products`
   - `veterinary_products`
   - `categories`
   - `media_posts`
   - `jobs`
   - `job_applications`
   - `leadership`

2. **Database is Serverless**: No need for SQLite or MySQL on Vercel. Appwrite handles everything.

3. **File Uploads**: Product images and CVs are uploaded to Appwrite Storage bucket.

4. **CORS Settings**: Add your Vercel domain to Appwrite's allowed origins in Project Settings.

## Deployment Steps

1. Push your code to GitHub
2. Connect GitHub repo to Vercel
3. Add all environment variables listed above
4. Deploy!

## Testing on Vercel

After deployment, test these endpoints:
- `/api/products/human` - Should return products from Appwrite
- `/api/categories` - Should return categories
- `/api/media` - Should return news/events
- `/api/jobs` - Should return job postings

## Database Migration

✅ **Migration Complete**: Project fully migrated from SQLite to Appwrite
- All API routes use Appwrite
- Prisma completely removed
- No local database dependencies
