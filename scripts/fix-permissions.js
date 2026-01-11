/**
 * Fix Appwrite Collection Permissions
 * This script updates all collections to allow public read/write access
 */

const sdk = require('node-appwrite');

const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '695ba52f001ad69471ea',
    apiKey: 'standard_9a723ac1555b07477f4e6c41f520f228283ae1df5178c2bfececf5964280400d31590033c44e4cc067426ab4ae85fa617a964940ad976b72252760c2635629b5a5856b9c06eb6eccba0f00f2e0bb15cca47f100372982065d88bda69fadda3a94b99b2fa61a1ca528f711ea83bf1be6fcabb92d86822200b21984df0ed211005',
    databaseId: '695ba59e002ccd754d63'
};

const client = new sdk.Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);

const databases = new sdk.Databases(client);

const collections = [
    'human_products',
    'veterinary_products',
    'categories',
    'media_posts',
    'jobs',
    'job_applications',
    'leadership'
];

async function fixPermissions() {
    console.log('🔧 Fixing Collection Permissions...\n');

    for (const collectionId of collections) {
        try {
            await databases.updateCollection(
                config.databaseId,
                collectionId,
                collectionId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Nice name
                [
                    sdk.Permission.read(sdk.Role.any()),
                    sdk.Permission.create(sdk.Role.any()),
                    sdk.Permission.update(sdk.Role.any()),
                    sdk.Permission.delete(sdk.Role.any())
                ],
                false // documentSecurity disabled = collection-level permissions apply
            );
            console.log(`✓ ${collectionId} - Permissions updated`);
        } catch (error) {
            console.error(`✗ ${collectionId} - Error:`, error.message);
        }
    }

    console.log('\n====================================');
    console.log('✅ Permissions Fixed!');
    console.log('\nNow you can:');
    console.log('- Create, Read, Update, Delete any document');
    console.log('- No authentication required for API calls');
}

fixPermissions().catch(console.error);
