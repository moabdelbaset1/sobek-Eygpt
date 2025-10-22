/**
 * Script to check and create admin user in Appwrite
 * Run with: node check-admin-user.js
 */

const sdk = require('node-appwrite');

// Appwrite configuration from .env.local
const endpoint = 'https://fra.cloud.appwrite.io/v1';
const projectId = '68dbeba80017571a1581';
const apiKey = 'standard_aade8f8400fd56135556d70affe7a023bd6e0f70707dc5fcfef03d3d33b3a9b05ccaa5083f6256ba8c5698e89e5f6c375dfc27b605c2d7314b33968fd1574ac7ff99a6cfdc7d743cdf6c9050de580769f419e8a7596d44a8338342d0aff9b7edc7adcb86b23f998cc1cc18d876a5f099b8e7cb210846b67418a4a94719d43dfa';

const adminEmail = 'admin@devegy.com';
const adminPassword = 'Admin123!@#'; // Change this to your desired password

async function checkAndCreateAdmin() {
  const client = new sdk.Client();
  
  client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  const users = new sdk.Users(client);

  console.log('🔍 Checking Appwrite connection...\n');
  
  try {
    // List all users to see what we have
    console.log('📋 Listing all users in the system:\n');
    const usersList = await users.list();
    
    console.log(`Found ${usersList.total} user(s):\n`);
    
    usersList.users.forEach((user, index) => {
      console.log(`${index + 1}. User ID: ${user.$id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Status: ${user.status ? 'Active' : 'Blocked'}`);
      console.log(`   Email Verified: ${user.emailVerification}`);
      console.log(`   Preferences: ${JSON.stringify(user.prefs)}`);
      console.log('');
    });

    // Check if admin user exists
    const adminUser = usersList.users.find(u => u.email === adminEmail);
    
    if (adminUser) {
      console.log('✅ Admin user found!\n');
      console.log('Admin Details:');
      console.log(`   ID: ${adminUser.$id}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Name: ${adminUser.name}`);
      console.log(`   Role: ${adminUser.prefs?.role || 'No role set'}`);
      
      // Update preferences to ensure admin role
      if (adminUser.prefs?.role !== 'admin') {
        console.log('\n⚠️  Admin role not set. Setting it now...');
        await users.updatePrefs(adminUser.$id, { role: 'admin' });
        console.log('✅ Admin role updated!\n');
      }
      
      console.log('\n⚠️  NOTE: The password cannot be read from Appwrite.');
      console.log('If you forgot the password, you can update it in Appwrite Console:');
      console.log('https://fra.cloud.appwrite.io/console/project-68dbeba80017571a1581/auth/user-' + adminUser.$id);
      console.log('\nOr run this script with UPDATE_PASSWORD=true to reset it.\n');
      
      // Check if we should update password
      if (process.env.UPDATE_PASSWORD === 'true') {
        console.log('🔄 Updating admin password...');
        await users.updatePassword(adminUser.$id, adminPassword);
        console.log('✅ Password updated successfully!\n');
        console.log(`New password: ${adminPassword}\n`);
      }
      
    } else {
      console.log('❌ Admin user not found. Creating new admin user...\n');
      
      try {
        const newUser = await users.create(
          sdk.ID.unique(),
          adminEmail,
          null, // phone
          adminPassword,
          'Admin User'
        );
        
        console.log('✅ Admin user created successfully!\n');
        console.log('Admin Details:');
        console.log(`   ID: ${newUser.$id}`);
        console.log(`   Email: ${newUser.email}`);
        console.log(`   Password: ${adminPassword}`);
        console.log('');
        
        // Set admin role
        console.log('Setting admin role...');
        await users.updatePrefs(newUser.$id, { role: 'admin' });
        console.log('✅ Admin role set!\n');
        
        console.log('🎉 You can now login with:');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Password: ${adminPassword}\n`);
        
      } catch (createError) {
        console.error('❌ Failed to create admin user:', createError.message);
        console.error('Error details:', createError);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. API Key is invalid or expired');
    console.error('2. Project ID is incorrect');
    console.error('3. Network connection issue');
    console.error('4. Appwrite endpoint is unreachable\n');
    console.error('Full error:', error);
  }
}

// Run the function
console.log('═══════════════════════════════════════════════════');
console.log('   Appwrite Admin User Check & Create Script');
console.log('═══════════════════════════════════════════════════\n');

checkAndCreateAdmin()
  .then(() => {
    console.log('═══════════════════════════════════════════════════');
    console.log('Script completed!');
    console.log('═══════════════════════════════════════════════════');
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
