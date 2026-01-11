/**
 * Appwrite Collections Setup Script
 * 
 * This script creates all required collections in your Appwrite database
 * Run it once to set up your backend
 * 
 * Usage: node scripts/setup-appwrite-collections.js
 */

const sdk = require('node-appwrite');

// Configuration - UPDATE THESE VALUES
const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '695ba52f001ad69471ea',
    apiKey: 'standard_9a723ac1555b07477f4e6c41f520f228283ae1df5178c2bfececf5964280400d31590033c44e4cc067426ab4ae85fa617a964940ad976b72252760c2635629b5a5856b9c06eb6eccba0f00f2e0bb15cca47f100372982065d88bda69fadda3a94b99b2fa61a1ca528f711ea83bf1be6fcabb92d86822200b21984df0ed211005',
    databaseId: '695ba59e002ccd754d63'
};

// Initialize Appwrite
const client = new sdk.Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);

const databases = new sdk.Databases(client);

// Collection definitions
const collections = [
    {
        id: 'human_products',
        name: 'Human Products',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'genericName', type: 'string', size: 255, required: true },
            { key: 'strength', type: 'string', size: 100, required: true },
            { key: 'dosageForm', type: 'string', size: 100, required: true },
            { key: 'indication', type: 'string', size: 2000, required: true },
            { key: 'packSize', type: 'string', size: 100, required: false },
            { key: 'registrationNumber', type: 'string', size: 100, required: false },
            { key: 'category', type: 'string', size: 100, required: true },
            { key: 'imageUrl', type: 'string', size: 500, required: false },
            { key: 'price', type: 'integer', required: false },
            { key: 'isActive', type: 'boolean', required: false, default: true }
        ]
    },
    {
        id: 'veterinary_products',
        name: 'Veterinary Products',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'genericName', type: 'string', size: 255, required: true },
            { key: 'strength', type: 'string', size: 100, required: true },
            { key: 'dosageForm', type: 'string', size: 100, required: true },
            { key: 'indication', type: 'string', size: 2000, required: true },
            { key: 'species', type: 'string', size: 500, required: true },
            { key: 'withdrawalPeriod', type: 'string', size: 200, required: false },
            { key: 'packSize', type: 'string', size: 100, required: false },
            { key: 'registrationNumber', type: 'string', size: 100, required: false },
            { key: 'category', type: 'string', size: 100, required: true },
            { key: 'imageUrl', type: 'string', size: 500, required: false },
            { key: 'price', type: 'integer', required: false },
            { key: 'isActive', type: 'boolean', required: false, default: true }
        ]
    },
    {
        id: 'categories',
        name: 'Categories',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'nameAr', type: 'string', size: 255, required: false },
            { key: 'slug', type: 'string', size: 100, required: true },
            { key: 'type', type: 'string', size: 50, required: true }, // 'human' or 'veterinary'
            { key: 'icon', type: 'string', size: 100, required: false },
            { key: 'description', type: 'string', size: 500, required: false }
        ]
    },
    {
        id: 'media_posts',
        name: 'Media Posts',
        attributes: [
            { key: 'title', type: 'string', size: 500, required: true },
            { key: 'titleAr', type: 'string', size: 500, required: false },
            { key: 'content', type: 'string', size: 50000, required: true },
            { key: 'contentAr', type: 'string', size: 50000, required: false },
            { key: 'type', type: 'string', size: 50, required: true }, // 'news' or 'event'
            { key: 'mediaType', type: 'string', size: 50, required: false }, // 'image' or 'video'
            { key: 'mediaUrl', type: 'string', size: 500, required: false },
            { key: 'isActive', type: 'boolean', required: false, default: true },
            { key: 'publishDate', type: 'string', size: 50, required: true }
        ]
    },
    {
        id: 'jobs',
        name: 'Jobs',
        attributes: [
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'titleAr', type: 'string', size: 255, required: false },
            { key: 'department', type: 'string', size: 100, required: true },
            { key: 'location', type: 'string', size: 255, required: true },
            { key: 'jobType', type: 'string', size: 50, required: true },
            { key: 'workingHours', type: 'string', size: 100, required: true },
            { key: 'description', type: 'string', size: 10000, required: true },
            { key: 'descriptionAr', type: 'string', size: 10000, required: false },
            { key: 'requirements', type: 'string', size: 10000, required: true },
            { key: 'requirementsAr', type: 'string', size: 10000, required: false },
            { key: 'isActive', type: 'boolean', required: false, default: true }
        ]
    },
    {
        id: 'job_applications',
        name: 'Job Applications',
        attributes: [
            { key: 'jobId', type: 'string', size: 100, required: false },
            { key: 'fullName', type: 'string', size: 255, required: true },
            { key: 'email', type: 'string', size: 255, required: true },
            { key: 'phone', type: 'string', size: 50, required: true },
            { key: 'coverLetter', type: 'string', size: 5000, required: false },
            { key: 'cvUrl', type: 'string', size: 500, required: true },
            { key: 'status', type: 'string', size: 50, required: false } // 'pending', 'reviewed', 'accepted', 'rejected'
        ]
    },
    {
        id: 'leadership',
        name: 'Leadership Team',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'nameAr', type: 'string', size: 255, required: false },
            { key: 'position', type: 'string', size: 255, required: true },
            { key: 'positionAr', type: 'string', size: 255, required: false },
            { key: 'bio', type: 'string', size: 2000, required: false },
            { key: 'bioAr', type: 'string', size: 2000, required: false },
            { key: 'imageUrl', type: 'string', size: 500, required: false },
            { key: 'order', type: 'integer', required: false }
        ]
    }
];

async function createAttribute(databaseId, collectionId, attr) {
    try {
        switch (attr.type) {
            case 'string':
                await databases.createStringAttribute(
                    databaseId,
                    collectionId,
                    attr.key,
                    attr.size,
                    attr.required,
                    attr.default || null
                );
                break;
            case 'integer':
                await databases.createIntegerAttribute(
                    databaseId,
                    collectionId,
                    attr.key,
                    attr.required,
                    null, // min
                    null, // max
                    attr.default || null
                );
                break;
            case 'boolean':
                await databases.createBooleanAttribute(
                    databaseId,
                    collectionId,
                    attr.key,
                    attr.required,
                    attr.default !== undefined ? attr.default : null
                );
                break;
        }
        console.log(`  ✓ Created attribute: ${attr.key}`);
    } catch (error) {
        if (error.code === 409) {
            console.log(`  ○ Attribute already exists: ${attr.key}`);
        } else {
            console.error(`  ✗ Error creating attribute ${attr.key}:`, error.message);
        }
    }
}

async function createCollection(collectionDef) {
    console.log(`\n📁 Creating collection: ${collectionDef.name}...`);

    try {
        await databases.createCollection(
            config.databaseId,
            collectionDef.id,
            collectionDef.name,
            [
                sdk.Permission.read(sdk.Role.any()),
                sdk.Permission.create(sdk.Role.any()),
                sdk.Permission.update(sdk.Role.any()),
                sdk.Permission.delete(sdk.Role.any())
            ]
        );
        console.log(`✓ Collection created: ${collectionDef.name}`);
    } catch (error) {
        if (error.code === 409) {
            console.log(`○ Collection already exists: ${collectionDef.name}`);
        } else {
            console.error(`✗ Error creating collection:`, error.message);
            return;
        }
    }

    // Create attributes with delay (Appwrite needs time between attribute creations)
    for (const attr of collectionDef.attributes) {
        await createAttribute(config.databaseId, collectionDef.id, attr);
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
    }
}

async function main() {
    console.log('🚀 Appwrite Collections Setup Script');
    console.log('====================================\n');
    console.log(`Project ID: ${config.projectId}`);
    console.log(`Database ID: ${config.databaseId}`);

    if (config.apiKey === 'YOUR_API_KEY_HERE') {
        console.error('\n❌ ERROR: Please set your API Key in the script!');
        console.log('\nTo get an API Key:');
        console.log('1. Go to Appwrite Console');
        console.log('2. Click on Settings (gear icon)');
        console.log('3. Click on API Keys');
        console.log('4. Create a new API Key with these scopes:');
        console.log('   - databases.read');
        console.log('   - databases.write');
        console.log('   - collections.read');
        console.log('   - collections.write');
        console.log('   - attributes.read');
        console.log('   - attributes.write');
        console.log('5. Copy the key and paste it in this script');
        return;
    }

    // Create each collection
    for (const collection of collections) {
        await createCollection(collection);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between collections
    }

    console.log('\n====================================');
    console.log('✅ Setup Complete!');
    console.log('\nNext steps:');
    console.log('1. Go to Appwrite Console and verify the collections');
    console.log('2. Make sure your .env.local has the correct values');
    console.log('3. Restart your Next.js dev server');
}

main().catch(console.error);
