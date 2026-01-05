const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('695ba52f001ad69471ea')
    .setKey('standard_9a723ac1555b07477f4e6c41f520f228283ae1df5178c2bfececf5964280400d31590033c44e4cc067426ab4ae85fa617a964940ad976b72252760c2635629b5a5856b9c06eb6eccba0f00f2e0bb15cca47f100372982065d88bda69fadda3a94b99b2fa61a1ca528f711ea83bf1be6fcabb92d86822200b21984df0ed211005');

const databases = new sdk.Databases(client);
const DATABASE_ID = '695ba59e002ccd754d63';

async function setupAppwrite() {
    try {
        console.log('🚀 Starting Appwrite setup...\n');

        // Collection 2: Human Products
        try {
            console.log('📦 Creating Human Products collection...');
            await databases.createCollection(DATABASE_ID, 'human_products', 'Human Products');

            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'name', 255, true);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'generic_name', 255, false);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'strength', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'dosage_form', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'indication', 2000, false);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'pack_size', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'registration_number', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'category', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'human_products', 'image_url', 500, false);
            await databases.createFloatAttribute(DATABASE_ID, 'human_products', 'price', false);
            await databases.createBooleanAttribute(DATABASE_ID, 'human_products', 'is_active', false);
            console.log('✅ Human Products collection created\n');
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            if (error.code === 409) {
                console.log('ℹ️  Human Products collection already exists, skipping...\n');
            } else {
                throw error;
            }
        }

        // Collection 3: Veterinary Products
        try {
            console.log('📦 Creating Veterinary Products collection...');
            await databases.createCollection(DATABASE_ID, 'veterinary_products', 'Veterinary Products');

            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'name', 255, true);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'generic_name', 255, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'strength', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'dosage_form', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'indication', 2000, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'species', 255, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'withdrawal_period', 255, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'pack_size', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'registration_number', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'category', 100, false);
            await databases.createStringAttribute(DATABASE_ID, 'veterinary_products', 'image_url', 500, false);
            await databases.createFloatAttribute(DATABASE_ID, 'veterinary_products', 'price', false);
            await databases.createBooleanAttribute(DATABASE_ID, 'veterinary_products', 'is_active', false);
            console.log('✅ Veterinary Products collection created\n');
        } catch (error) {
            if (error.code === 409) {
                console.log('ℹ️  Veterinary Products collection already exists, skipping...\n');
            } else {
                throw error;
            }
        }

        console.log('🎉 Appwrite setup completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Go to Appwrite Dashboard');
        console.log('2. Set permissions for each collection');
        console.log('3. Collections are ready for data!\n');

    } catch (error) {
        console.error('❌ Error setting up Appwrite:', error.message);
    }
}

setupAppwrite();
