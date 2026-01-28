/**
 * Fix Jobs Collection - Recreate with optimized attribute sizes
 * 
 * Run: node scripts/fix-jobs-collection.js
 */

const sdk = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey('standard_9a723ac1555b07477f4e6c41f520f228283ae1df5178c2bfececf5964280400d31590033c44e4cc067426ab4ae85fa617a964940ad976b72252760c2635629b5a5856b9c06eb6eccba0f00f2e0bb15cca47f100372982065d88bda69fadda3a94b99b2fa61a1ca528f711ea83bf1be6fcabb92d86822200b21984df0ed211005');

const databases = new sdk.Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = 'jobs';

async function fixJobsCollection() {
    console.log('🔧 Fixing Jobs Collection...\n');

    try {
        // Step 1: Delete existing collection
        console.log('🗑️  Deleting old jobs collection...');
        try {
            await databases.deleteCollection(DATABASE_ID, COLLECTION_ID);
            console.log('✅ Old collection deleted');
        } catch (error) {
            if (error.code === 404) {
                console.log('⚠️  Collection does not exist, creating new one');
            } else {
                throw error;
            }
        }

        // Wait for deletion to complete
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Step 2: Create new collection with optimized structure
        console.log('\n📝 Creating new jobs collection...');
        await databases.createCollection(
            DATABASE_ID,
            COLLECTION_ID,
            'Jobs',
            [
                sdk.Permission.read(sdk.Role.any()),
                sdk.Permission.create(sdk.Role.any()),
                sdk.Permission.update(sdk.Role.any()),
                sdk.Permission.delete(sdk.Role.any())
            ]
        );
        console.log('✅ Collection created');

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 3: Create attributes with optimized sizes (Appwrite has 64KB limit per collection)
        const attributes = [
            { key: 'title', type: 'string', size: 200, required: true },
            { key: 'titleAr', type: 'string', size: 200, required: false },
            { key: 'department', type: 'string', size: 100, required: true },
            { key: 'location', type: 'string', size: 200, required: true },
            { key: 'jobType', type: 'string', size: 50, required: true },
            { key: 'workingHours', type: 'string', size: 50, required: true },
            { key: 'description', type: 'string', size: 3000, required: true },
            { key: 'descriptionAr', type: 'string', size: 3000, required: false },
            { key: 'requirements', type: 'string', size: 2000, required: true },
            { key: 'requirementsAr', type: 'string', size: 2000, required: false },
            { key: 'isActive', type: 'boolean', required: false, default: true }
        ];

        console.log('\n➕ Creating attributes...');
        for (const attr of attributes) {
            try {
                if (attr.type === 'string') {
                    await databases.createStringAttribute(
                        DATABASE_ID,
                        COLLECTION_ID,
                        attr.key,
                        attr.size,
                        attr.required,
                        attr.default || null
                    );
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(
                        DATABASE_ID,
                        COLLECTION_ID,
                        attr.key,
                        attr.required,
                        attr.default !== undefined ? attr.default : null
                    );
                }
                console.log(`  ✅ Created: ${attr.key} (${attr.type}, size: ${attr.size || 'N/A'})`);
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`  ❌ Failed to create ${attr.key}:`, error.message);
            }
        }

        console.log('\n✨ Jobs collection fixed successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Run: node scripts/add-jobs-to-appwrite.js');
        console.log('2. Restart your dev server');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    }
}

fixJobsCollection();
