/**
 * Test Data Seeding Script
 * This script adds test data to Appwrite collections
 */

const sdk = require('node-appwrite');

// Configuration
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

// Collection IDs
const COLLECTIONS = {
    HUMAN_PRODUCTS: 'human_products',
    VETERINARY_PRODUCTS: 'veterinary_products',
    CATEGORIES: 'categories',
    MEDIA_POSTS: 'media_posts',
    JOBS: 'jobs',
    JOB_APPLICATIONS: 'job_applications',
    LEADERSHIP: 'leadership',
};

// Test Data
const categories = [
    // Human Categories
    { name: 'Cardiovascular', nameAr: 'أمراض القلب والأوعية الدموية', slug: 'cardiovascular', type: 'human', icon: 'Heart', description: 'Heart and blood vessel medications' },
    { name: 'Anti-Infectives', nameAr: 'مضادات العدوى', slug: 'anti-infectives', type: 'human', icon: 'Shield', description: 'Antibiotics and antiviral medications' },
    { name: 'Gastroenterology', nameAr: 'أمراض الجهاز الهضمي', slug: 'gastroenterology', type: 'human', icon: 'Pill', description: 'Digestive system medications' },
    { name: 'Endocrinology', nameAr: 'أمراض الغدد الصماء', slug: 'endocrinology-diabetes', type: 'human', icon: 'Activity', description: 'Diabetes and hormone medications' },
    // Veterinary Categories
    { name: 'Companion Animals', nameAr: 'حيوانات أليفة', slug: 'companion-animals', type: 'veterinary', icon: 'Dog', description: 'Medications for cats and dogs' },
    { name: 'Livestock', nameAr: 'الماشية', slug: 'livestock', type: 'veterinary', icon: 'Cow', description: 'Medications for cattle and sheep' },
    { name: 'Poultry', nameAr: 'الدواجن', slug: 'poultry', type: 'veterinary', icon: 'Bird', description: 'Medications for chickens and poultry' },
];

const humanProducts = [
    {
        name: 'Cardiomax',
        genericName: 'Amlodipine',
        strength: '5mg',
        dosageForm: 'Tablets',
        indication: 'Treatment of hypertension and coronary artery disease. Helps lower blood pressure and reduce the risk of heart attack and stroke.',
        packSize: '30 tablets',
        registrationNumber: 'EG-2024-001',
        category: 'cardiovascular',
        imageUrl: '/images/products/cardiomax.jpg',
        price: 150,
        isActive: true
    },
    {
        name: 'Infectocure',
        genericName: 'Amoxicillin',
        strength: '500mg',
        dosageForm: 'Capsules',
        indication: 'Broad-spectrum antibiotic for bacterial infections including respiratory, urinary tract, and skin infections.',
        packSize: '20 capsules',
        registrationNumber: 'EG-2024-002',
        category: 'anti-infectives',
        imageUrl: '/images/products/infectocure.jpg',
        price: 85,
        isActive: true
    },
    {
        name: 'Gastroease',
        genericName: 'Omeprazole',
        strength: '20mg',
        dosageForm: 'Capsules',
        indication: 'Treatment of gastroesophageal reflux disease (GERD), peptic ulcer disease, and Zollinger-Ellison syndrome.',
        packSize: '14 capsules',
        registrationNumber: 'EG-2024-003',
        category: 'gastroenterology',
        imageUrl: '/images/products/gastroease.jpg',
        price: 120,
        isActive: true
    },
    {
        name: 'Diabecon',
        genericName: 'Metformin',
        strength: '850mg',
        dosageForm: 'Tablets',
        indication: 'First-line treatment for type 2 diabetes mellitus. Helps control blood sugar levels.',
        packSize: '60 tablets',
        registrationNumber: 'EG-2024-004',
        category: 'endocrinology-diabetes',
        imageUrl: '/images/products/diabecon.jpg',
        price: 95,
        isActive: true
    }
];

const veterinaryProducts = [
    {
        name: 'PetVax Plus',
        genericName: 'Canine Distemper Vaccine',
        strength: '1ml',
        dosageForm: 'Injectable',
        indication: 'Prevention of canine distemper, hepatitis, parvovirus, and leptospirosis in dogs.',
        species: 'Dogs',
        withdrawalPeriod: 'N/A',
        packSize: '10 doses',
        registrationNumber: 'VET-2024-001',
        category: 'companion-animals',
        imageUrl: '/images/products/petvax.jpg',
        price: 250,
        isActive: true
    },
    {
        name: 'LiveStock Pro',
        genericName: 'Oxytetracycline',
        strength: '200mg/ml',
        dosageForm: 'Injectable',
        indication: 'Treatment of bacterial infections in cattle, sheep, and goats including respiratory and urinary infections.',
        species: 'Cattle, Sheep, Goats',
        withdrawalPeriod: '28 days',
        packSize: '100ml',
        registrationNumber: 'VET-2024-002',
        category: 'livestock',
        imageUrl: '/images/products/livestockpro.jpg',
        price: 180,
        isActive: true
    },
    {
        name: 'PoultryGuard',
        genericName: 'Enrofloxacin',
        strength: '10%',
        dosageForm: 'Oral Solution',
        indication: 'Treatment of respiratory and gastrointestinal infections in poultry caused by susceptible bacteria.',
        species: 'Chickens, Turkeys',
        withdrawalPeriod: '7 days',
        packSize: '1 liter',
        registrationNumber: 'VET-2024-003',
        category: 'poultry',
        imageUrl: '/images/products/poultryguard.jpg',
        price: 320,
        isActive: true
    }
];

const mediaPosts = [
    {
        title: 'Sobek Pharma Launches New Cardiovascular Drug',
        titleAr: 'سوبك فارما تطلق دواء جديد لأمراض القلب',
        content: 'Sobek Pharmaceutical Company is proud to announce the launch of Cardiomax, our latest innovation in cardiovascular medicine. This new medication offers improved efficacy and reduced side effects for patients with hypertension and coronary artery disease. The launch event was held at the Cairo International Convention Center with participation from leading cardiologists and healthcare professionals.',
        contentAr: 'تفتخر شركة سوبك للأدوية بالإعلان عن إطلاق كارديوماكس، أحدث ابتكاراتنا في مجال أدوية القلب والأوعية الدموية. يوفر هذا الدواء الجديد فعالية محسنة وآثار جانبية أقل للمرضى الذين يعانون من ارتفاع ضغط الدم وأمراض الشرايين التاجية.',
        type: 'news',
        mediaType: 'image',
        mediaUrl: '/uploads/media/news1.jpg',
        isActive: true,
        publishDate: new Date().toISOString()
    },
    {
        title: 'Annual Veterinary Medicine Conference 2026',
        titleAr: 'المؤتمر السنوي للطب البيطري 2026',
        content: 'Join us at the Annual Veterinary Medicine Conference 2026, hosted by Sobek Pharma at the Grand Hyatt Cairo. This three-day event will feature presentations on the latest advancements in veterinary pharmaceuticals, workshops on animal health, and networking opportunities with industry leaders. Register now to secure your spot!',
        contentAr: 'انضموا إلينا في المؤتمر السنوي للطب البيطري 2026، الذي تستضيفه سوبك فارما في فندق جراند حياة القاهرة. سيتضمن هذا الحدث الذي يمتد لثلاثة أيام عروضاً تقديمية حول أحدث التطورات في الأدوية البيطرية.',
        type: 'event',
        mediaType: 'image',
        mediaUrl: '/uploads/media/event1.jpg',
        isActive: true,
        publishDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    },
    {
        title: 'Sobek Pharma Receives ISO Certification',
        titleAr: 'سوبك فارما تحصل على شهادة الأيزو',
        content: 'We are thrilled to announce that Sobek Pharmaceutical Company has received ISO 9001:2015 certification for our quality management system. This certification recognizes our commitment to maintaining the highest standards in pharmaceutical manufacturing and quality control. Thank you to our dedicated team for making this achievement possible.',
        contentAr: 'يسعدنا أن نعلن أن شركة سوبك للأدوية حصلت على شهادة ISO 9001:2015 لنظام إدارة الجودة لدينا. تعترف هذه الشهادة بالتزامنا بالحفاظ على أعلى المعايير في تصنيع الأدوية ومراقبة الجودة.',
        type: 'news',
        mediaType: 'image',
        mediaUrl: '/uploads/media/news2.jpg',
        isActive: true,
        publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    }
];

async function createDocument(collectionId, data) {
    try {
        const doc = await databases.createDocument(
            config.databaseId,
            collectionId,
            sdk.ID.unique(),
            data
        );
        return doc;
    } catch (error) {
        console.error(`Error creating document in ${collectionId}:`, error.message);
        return null;
    }
}

async function seedData() {
    console.log('🌱 Seeding Test Data...\n');

    // Seed Categories
    console.log('📁 Adding Categories...');
    for (const cat of categories) {
        const result = await createDocument(COLLECTIONS.CATEGORIES, cat);
        if (result) {
            console.log(`  ✓ ${cat.name}`);
        }
    }

    // Seed Human Products
    console.log('\n💊 Adding Human Products...');
    for (const product of humanProducts) {
        const result = await createDocument(COLLECTIONS.HUMAN_PRODUCTS, product);
        if (result) {
            console.log(`  ✓ ${product.name}`);
        }
    }

    // Seed Veterinary Products
    console.log('\n🐾 Adding Veterinary Products...');
    for (const product of veterinaryProducts) {
        const result = await createDocument(COLLECTIONS.VETERINARY_PRODUCTS, product);
        if (result) {
            console.log(`  ✓ ${product.name}`);
        }
    }

    // Seed Media Posts
    console.log('\n📰 Adding Media Posts...');
    for (const post of mediaPosts) {
        const result = await createDocument(COLLECTIONS.MEDIA_POSTS, post);
        if (result) {
            console.log(`  ✓ ${post.title}`);
        }
    }

    console.log('\n====================================');
    console.log('✅ Test Data Seeded Successfully!');
    console.log('\nYou can now:');
    console.log('1. View products at /products/human-new and /products/veterinary-new');
    console.log('2. View news at /media/news');
    console.log('3. View events at /media/events');
    console.log('4. Manage everything from /admin');
}

seedData().catch(console.error);
