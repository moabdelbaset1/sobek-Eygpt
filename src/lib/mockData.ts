// Mock data for local development when Appwrite is not configured

export const mockCategories: any[] = [
    { id: '1', name: 'Cardiovascular', nameAr: 'القلب والأوعية الدموية', slug: 'cardiovascular', type: 'human', icon: '❤️', description: 'Heart and blood vessel medications' },
    { id: '2', name: 'Anti-Infectives', nameAr: 'مضادات العدوى', slug: 'anti-infectives', type: 'human', icon: '🦠', description: 'Antibiotics and antimicrobials' },
    { id: '3', name: 'Companion Animals', nameAr: 'الحيوانات الأليفة', slug: 'companion-animals', type: 'veterinary', icon: '🐕', description: 'For dogs and cats' },
    { id: '4', name: 'Livestock', nameAr: 'الماشية', slug: 'livestock', type: 'veterinary', icon: '🐄', description: 'For cattle and livestock' },
];

export const mockHumanProducts: any[] = [
    {
        id: '1',
        name: 'Cardio Plus',
        genericName: 'Atenolol',
        strength: '50mg',
        dosageForm: 'Tablets',
        indication: 'Hypertension',
        packSize: '30 tablets',
        registrationNumber: 'HP-2024-001',
        category: 'cardiovascular',
        imageUrl: null,
        price: 150,
        isActive: true,
        $createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Antibiotic Pro',
        genericName: 'Amoxicillin',
        strength: '500mg',
        dosageForm: 'Capsules',
        indication: 'Bacterial infections',
        packSize: '21 capsules',
        registrationNumber: 'HP-2024-002',
        category: 'anti-infectives',
        imageUrl: null,
        price: 120,
        isActive: true,
        $createdAt: new Date().toISOString(),
    },
];

export const mockVeterinaryProducts: any[] = [
    {
        id: '1',
        name: 'Vet Care Plus',
        genericName: 'Ivermectin',
        strength: '10mg/ml',
        dosageForm: 'Injectable Solution',
        indication: 'Parasitic infections',
        species: 'Dogs, Cats',
        withdrawalPeriod: null,
        packSize: '50ml vial',
        registrationNumber: 'VP-2024-001',
        category: 'companion-animals',
        imageUrl: null,
        price: 200,
        isActive: true,
        $createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Livestock Shield',
        genericName: 'Oxytetracycline',
        strength: '200mg/ml',
        dosageForm: 'Injectable Solution',
        indication: 'Respiratory infections',
        species: 'Cattle, Sheep',
        withdrawalPeriod: '28 days',
        packSize: '100ml vial',
        registrationNumber: 'VP-2024-002',
        category: 'livestock',
        imageUrl: null,
        price: 350,
        isActive: true,
        $createdAt: new Date().toISOString(),
    },
];

export const mockMediaPosts: any[] = [
    {
        id: '1',
        title: 'New Product Launch',
        titleAr: 'إطلاق منتج جديد',
        content: 'We are excited to announce our new cardiovascular medication line.',
        contentAr: 'يسرنا أن نعلن عن خط الأدوية الجديد للقلب والأوعية الدموية.',
        type: 'news',
        mediaType: 'image',
        mediaUrl: null,
        isActive: true,
        publishDate: new Date().toISOString(),
        $createdAt: new Date().toISOString(),
    },
];

export const mockJobs: any[] = [
    {
        id: '1',
        title: 'Pharmacist',
        titleAr: 'صيدلي',
        department: 'Pharmacy',
        location: 'Cairo',
        jobType: 'Full-time',
        workingHours: '9 AM - 5 PM',
        description: 'We are looking for a qualified pharmacist.',
        descriptionAr: 'نبحث عن صيدلي مؤهل.',
        requirements: 'Bachelor degree in Pharmacy',
        requirementsAr: 'بكالوريوس في الصيدلة',
        isActive: true,
        $createdAt: new Date().toISOString(),
    },
];

export const mockJobApplications: any[] = [];

export const mockLeadership: any[] = [
    {
        id: '1',
        name: 'Dr. Ahmed Mohamed',
        nameAr: 'د. أحمد محمد',
        position: 'CEO',
        positionAr: 'المدير التنفيذي',
        bio: 'Leading pharmaceutical expert with 20+ years of experience.',
        bioAr: 'خبير صيدلاني رائد مع أكثر من 20 عامًا من الخبرة.',
        imageUrl: null,
        order: 1,
        $createdAt: new Date().toISOString(),
    },
];
