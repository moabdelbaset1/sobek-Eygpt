/**
 * Update Product Images Script
 * Updates existing products with placeholder images
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

// Placeholder images from Unsplash
const placeholderImages = {
    humanProducts: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', // Pills
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop', // Medicine bottles
        'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop', // Capsules
        'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop', // Pills box
    ],
    veterinaryProducts: [
        'https://images.unsplash.com/photo-1628009368231-7bb7c15e3a25?w=400&h=400&fit=crop', // Vet medicine
        'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&h=400&fit=crop', // Animal care
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=400&fit=crop', // Pet health
    ],
    news: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop', // Medical research
        'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop', // Pharma lab
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop', // Healthcare
    ]
};

async function updateAllProducts() {
    console.log('🖼️ Updating Product Images...\n');

    // Update Human Products
    console.log('💊 Updating Human Products...');
    try {
        const humanProducts = await databases.listDocuments(config.databaseId, 'human_products');
        for (let i = 0; i < humanProducts.documents.length; i++) {
            const product = humanProducts.documents[i];
            const imageUrl = placeholderImages.humanProducts[i % placeholderImages.humanProducts.length];
            await databases.updateDocument(config.databaseId, 'human_products', product.$id, {
                imageUrl: imageUrl
            });
            console.log(`  ✓ ${product.name}`);
        }
    } catch (error) {
        console.error('Error updating human products:', error.message);
    }

    // Update Veterinary Products
    console.log('\n🐾 Updating Veterinary Products...');
    try {
        const vetProducts = await databases.listDocuments(config.databaseId, 'veterinary_products');
        for (let i = 0; i < vetProducts.documents.length; i++) {
            const product = vetProducts.documents[i];
            const imageUrl = placeholderImages.veterinaryProducts[i % placeholderImages.veterinaryProducts.length];
            await databases.updateDocument(config.databaseId, 'veterinary_products', product.$id, {
                imageUrl: imageUrl
            });
            console.log(`  ✓ ${product.name}`);
        }
    } catch (error) {
        console.error('Error updating veterinary products:', error.message);
    }

    // Update Media Posts
    console.log('\n📰 Updating Media Posts...');
    try {
        const mediaPosts = await databases.listDocuments(config.databaseId, 'media_posts');
        for (let i = 0; i < mediaPosts.documents.length; i++) {
            const post = mediaPosts.documents[i];
            const imageUrl = placeholderImages.news[i % placeholderImages.news.length];
            await databases.updateDocument(config.databaseId, 'media_posts', post.$id, {
                mediaUrl: imageUrl
            });
            console.log(`  ✓ ${post.title}`);
        }
    } catch (error) {
        console.error('Error updating media posts:', error.message);
    }

    console.log('\n====================================');
    console.log('✅ All Images Updated!');
}

updateAllProducts().catch(console.error);
