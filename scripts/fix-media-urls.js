const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixMediaUrls() {
  try {
    console.log('Starting to fix media URLs...');
    
    // Fetch all media posts that start with /images/media/
    const mediaPosts = await prisma.mediaPost.findMany({
      where: {
        mediaUrl: {
          startsWith: '/images/media/'
        }
      }
    });

    console.log(`Found ${mediaPosts.length} records with old URLs`);

    for (const post of mediaPosts) {
      const newUrl = post.mediaUrl.replace('/images/media/', '/uploads/media/');
      await prisma.mediaPost.update({
        where: { id: post.id },
        data: { mediaUrl: newUrl }
      });
      console.log(`Updated: ${post.id} - ${newUrl}`);
    }

    console.log('✅ All URLs updated successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixMediaUrls();
