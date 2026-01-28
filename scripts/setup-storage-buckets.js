/**
 * Create Storage Buckets in Appwrite
 * Run: node scripts/setup-storage-buckets.js
 */

const sdk = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey('standard_9a723ac1555b07477f4e6c41f520f228283ae1df5178c2bfececf5964280400d31590033c44e4cc067426ab4ae85fa617a964940ad976b72252760c2635629b5a5856b9c06eb6eccba0f00f2e0bb15cca47f100372982065d88bda69fadda3a94b99b2fa61a1ca528f711ea83bf1be6fcabb92d86822200b21984df0ed211005');

const storage = new sdk.Storage(client);

const buckets = [
    {
        id: 'cvs',
        name: 'CV Uploads',
        permissions: ['read("any")', 'create("any")'],
        allowedFileExtensions: ['pdf', 'doc', 'docx'],
        maximumFileSize: 10 * 1024 * 1024, // 10MB
    },
    {
        id: 'products',
        name: 'Product Images',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        allowedFileExtensions: ['jpg', 'jpeg', 'png', 'webp'],
        maximumFileSize: 5 * 1024 * 1024, // 5MB
    },
    {
        id: 'media',
        name: 'Media Files',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        allowedFileExtensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'webm', 'mov'],
        maximumFileSize: 100 * 1024 * 1024, // 100MB
    },
    {
        id: 'leadership',
        name: 'Leadership Photos',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        allowedFileExtensions: ['jpg', 'jpeg', 'png', 'webp'],
        maximumFileSize: 5 * 1024 * 1024, // 5MB
    },
];

async function createBuckets() {
    console.log('🚀 Creating Storage Buckets in Appwrite...\n');

    for (const bucket of buckets) {
        try {
            await storage.createBucket(
                bucket.id,
                bucket.name,
                [
                    sdk.Permission.read(sdk.Role.any()),
                    sdk.Permission.create(sdk.Role.any()),
                    sdk.Permission.update(sdk.Role.any()),
                    sdk.Permission.delete(sdk.Role.any()),
                ],
                false, // fileSecurity
                true,  // enabled
                bucket.maximumFileSize,
                bucket.allowedFileExtensions
            );
            console.log(`✅ Created bucket: ${bucket.name} (${bucket.id})`);
        } catch (error) {
            if (error.code === 409) {
                console.log(`⚠️  Bucket already exists: ${bucket.name} (${bucket.id})`);
            } else {
                console.error(`❌ Failed to create ${bucket.name}:`, error.message);
            }
        }
    }

    console.log('\n✨ Done! Storage buckets are ready.');
    console.log('\n📋 Add these to your .env.local:');
    console.log('APPWRITE_CV_BUCKET_ID=cvs');
    console.log('APPWRITE_PRODUCTS_BUCKET_ID=products');
    console.log('APPWRITE_MEDIA_BUCKET_ID=media');
    console.log('APPWRITE_LEADERSHIP_BUCKET_ID=leadership');
}

createBuckets();
