const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.jobApplication.deleteMany()
  await prisma.job.deleteMany()
  await prisma.humanProduct.deleteMany()
  await prisma.veterinaryProduct.deleteMany()
  await prisma.category.deleteMany()

  // Seed Categories for Human Products
  console.log('📁 Seeding Human Categories...')
  await prisma.category.createMany({
    data: [
      {
        name: 'Cardiovascular',
        slug: 'cardiovascular',
        type: 'human',
        icon: '❤️',
        description: 'Heart and circulatory system medications',
      },
      {
        name: 'Anti-Infectives',
        slug: 'anti-infectives',
        type: 'human',
        icon: '🦠',
        description: 'Antibiotics and antimicrobial drugs',
      },
      {
        name: 'Endocrinology & Diabetes',
        slug: 'endocrinology-diabetes',
        type: 'human',
        icon: '🩺',
        description: 'Diabetes and hormonal disorders',
      },
      {
        name: 'Gastroenterology',
        slug: 'gastroenterology',
        type: 'human',
        icon: '🫄',
        description: 'Digestive system medications',
      },
      {
        name: 'Respiratory',
        slug: 'respiratory',
        type: 'human',
        icon: '🫁',
        description: 'Respiratory system treatments',
      },
      {
        name: 'Pain Management',
        slug: 'pain-management',
        type: 'human',
        icon: '💊',
        description: 'Pain relief and anti-inflammatory drugs',
      },
    ],
  })

  // Seed Categories for Veterinary Products
  console.log('📁 Seeding Veterinary Categories...')
  await prisma.category.createMany({
    data: [
      {
        name: 'Livestock & Cattle',
        slug: 'livestock-cattle',
        type: 'veterinary',
        icon: '🐄',
        description: 'Medications for cattle, sheep, and goats',
      },
      {
        name: 'Poultry Health',
        slug: 'poultry-health',
        type: 'veterinary',
        icon: '🐔',
        description: 'Treatments for chickens, ducks, and birds',
      },
      {
        name: 'Aquaculture',
        slug: 'aquaculture',
        type: 'veterinary',
        icon: '🐟',
        description: 'Fish and aquatic animal health',
      },
      {
        name: 'Companion Animals',
        slug: 'companion-animals',
        type: 'veterinary',
        icon: '🐕',
        description: 'Dogs, cats, and pet medications',
      },
      {
        name: 'Feed Additives & Supplements',
        slug: 'feed-additives-supplements',
        type: 'veterinary',
        icon: '🌾',
        description: 'Nutritional supplements and feed enhancers',
      },
    ],
  })

  // Seed Human Products
  console.log('💊 Seeding Human Products...')
  await prisma.humanProduct.createMany({
    data: [
      {
        name: 'SOBEK-PRIL',
        genericName: 'Enalapril Maleate',
        strength: '5mg, 10mg, 20mg',
        dosageForm: 'Film-coated Tablets',
        indication: 'Hypertension, Heart failure, Asymptomatic left ventricular dysfunction',
        packSize: '30 tablets',
        registrationNumber: 'EDA-12345/2023',
        category: 'cardiovascular',
        price: 45.50,
        isActive: true,
      },
      {
        name: 'SOBEK-STATIN',
        genericName: 'Atorvastatin Calcium',
        strength: '10mg, 20mg, 40mg',
        dosageForm: 'Film-coated Tablets',
        indication: 'Hypercholesterolemia, Mixed dyslipidemia, Prevention of cardiovascular disease',
        packSize: '30 tablets',
        registrationNumber: 'EDA-12346/2023',
        category: 'cardiovascular',
        price: 65.00,
        isActive: true,
      },
      {
        name: 'SOBEK-CILLIN',
        genericName: 'Amoxicillin + Clavulanic Acid',
        strength: '625mg (500mg + 125mg)',
        dosageForm: 'Film-coated Tablets',
        indication: 'Respiratory tract infections, Urinary tract infections, Skin infections',
        packSize: '14 tablets',
        registrationNumber: 'EDA-12348/2023',
        category: 'anti-infectives',
        price: 85.75,
        isActive: true,
      },
      {
        name: 'SOBEK-GLIP',
        genericName: 'Glimepiride',
        strength: '1mg, 2mg, 4mg',
        dosageForm: 'Tablets',
        indication: 'Type 2 diabetes mellitus',
        packSize: '30 tablets',
        registrationNumber: 'EDA-12351/2023',
        category: 'endocrinology-diabetes',
        price: 32.25,
        isActive: true,
      },
      {
        name: 'SOBEK-ZOLE',
        genericName: 'Omeprazole',
        strength: '20mg, 40mg',
        dosageForm: 'Enteric-coated Capsules',
        indication: 'GERD, Peptic ulcer, H. pylori eradication',
        packSize: '14 capsules',
        registrationNumber: 'EDA-12353/2023',
        category: 'gastroenterology',
        price: 28.50,
        isActive: true,
      },
    ],
  })

  // Seed Veterinary Products
  console.log('🐾 Seeding Veterinary Products...')
  await prisma.veterinaryProduct.createMany({
    data: [
      {
        name: 'SOBEK-VET OXYTETRACYCLINE',
        genericName: 'Oxytetracycline HCl',
        strength: '200mg/ml',
        dosageForm: 'Injectable Solution',
        indication: 'Respiratory infections, Mastitis, Foot rot in cattle and sheep',
        species: 'Cattle, Sheep, Goats',
        withdrawalPeriod: 'Meat: 28 days, Milk: 7 days',
        packSize: '100ml vial',
        registrationNumber: 'GOVS-VET-001/2023',
        category: 'livestock-cattle',
        price: 125.00,
        isActive: true,
      },
      {
        name: 'SOBEK-VET COLISTIN',
        genericName: 'Colistin Sulfate',
        strength: '12% w/w',
        dosageForm: 'Oral Powder',
        indication: 'E.coli infections, Salmonella, Enteritis in poultry',
        species: 'Broilers, Layers, Turkeys',
        withdrawalPeriod: 'Meat: 5 days, Eggs: 0 days',
        packSize: '100g, 500g sachet',
        registrationNumber: 'GOVS-VET-004/2023',
        category: 'poultry-health',
        price: 95.50,
        isActive: true,
      },
      {
        name: 'SOBEK-VET CEPHALEXIN',
        genericName: 'Cephalexin',
        strength: '250mg, 500mg',
        dosageForm: 'Capsules',
        indication: 'Skin infections, Urinary tract infections, Respiratory infections',
        species: 'Dogs, Cats',
        withdrawalPeriod: 'Not applicable',
        packSize: '10 capsules/strip',
        registrationNumber: 'GOVS-VET-009/2023',
        category: 'companion-animals',
        price: 55.25,
        isActive: true,
      },
    ],
  })

  // Seed Jobs
  console.log('💼 Seeding Jobs...')
  await prisma.job.createMany({
    data: [
      {
        title: 'Senior Quality Control Specialist',
        titleAr: 'أخصائي مراقبة الجودة الأول',
        department: 'Quality Assurance',
        location: 'Cairo, Egypt',
        jobType: 'full-time',
        workingHours: '8:00 AM - 4:00 PM',
        description: 'We are seeking an experienced Quality Control Specialist to join our pharmaceutical manufacturing facility. The ideal candidate will ensure all products meet regulatory standards and company quality requirements.',
        descriptionAr: 'نبحث عن أخصائي مراقبة جودة ذو خبرة للانضمام إلى منشأتنا الصيدلانية. المرشح المثالي سيضمن أن جميع المنتجات تلبي المعايير التنظيمية ومتطلبات جودة الشركة.',
        requirements: '- Bachelor\'s degree in Pharmacy or Chemistry\n- 5+ years experience in pharmaceutical QC\n- Knowledge of GMP, GDP, and ISO standards\n- Excellent analytical skills\n- Proficiency in HPLC, GC, and other analytical instruments',
        requirementsAr: '- بكالوريوس صيدلة أو كيمياء\n- خبرة 5 سنوات فأكثر في مراقبة الجودة الصيدلانية\n- معرفة بمعايير GMP و GDP و ISO\n- مهارات تحليلية ممتازة\n- إتقان استخدام HPLC و GC وأدوات التحليل الأخرى',
        isActive: true,
        publishDate: new Date('2024-10-01'),
        expiryDate: new Date('2025-12-31'),
      },
      {
        title: 'Sales Representative - Veterinary Division',
        titleAr: 'مندوب مبيعات - القسم البيطري',
        department: 'Sales & Marketing',
        location: 'Alexandria, Egypt',
        jobType: 'full-time',
        workingHours: '9:00 AM - 5:00 PM',
        description: 'Join our veterinary sales team to promote our range of veterinary pharmaceutical products. Build strong relationships with veterinary clinics, farms, and distributors.',
        descriptionAr: 'انضم إلى فريق المبيعات البيطري للترويج لمجموعة منتجاتنا الصيدلانية البيطرية. بناء علاقات قوية مع العيادات البيطرية والمزارع والموزعين.',
        requirements: '- Bachelor\'s degree in Veterinary Medicine or related field\n- 2+ years sales experience in veterinary products\n- Valid driver\'s license\n- Excellent communication skills\n- Ability to travel within assigned territory',
        requirementsAr: '- بكالوريوس طب بيطري أو مجال ذي صلة\n- خبرة سنتان فأكثر في مبيعات المنتجات البيطرية\n- رخصة قيادة سارية\n- مهارات تواصل ممتازة\n- القدرة على السفر داخل المنطقة المحددة',
        isActive: true,
        publishDate: new Date('2024-11-15'),
        expiryDate: new Date('2025-11-30'),
      },
      {
        title: 'Regulatory Affairs Officer',
        titleAr: 'مسؤول الشؤون التنظيمية',
        department: 'Regulatory Affairs',
        location: 'Cairo, Egypt',
        jobType: 'full-time',
        workingHours: '8:30 AM - 4:30 PM',
        description: 'Manage pharmaceutical product registrations and ensure compliance with Egyptian Drug Authority (EDA) regulations. Prepare and submit regulatory dossiers for new products.',
        descriptionAr: 'إدارة تسجيلات المنتجات الصيدلانية وضمان الامتثال للوائح هيئة الدواء المصرية. إعداد وتقديم الملفات التنظيمية للمنتجات الجديدة.',
        requirements: '- Bachelor\'s degree in Pharmacy or Pharmaceutical Sciences\n- 3+ years experience in regulatory affairs\n- Knowledge of EDA, WHO, and ICH guidelines\n- Strong documentation and communication skills\n- Attention to detail',
        requirementsAr: '- بكالوريوس صيدلة أو علوم صيدلانية\n- خبرة 3 سنوات فأكثر في الشؤون التنظيمية\n- معرفة بإرشادات هيئة الدواء المصرية ومنظمة الصحة العالمية وICH\n- مهارات توثيق وتواصل قوية\n- الاهتمام بالتفاصيل',
        isActive: true,
        publishDate: new Date('2024-12-01'),
        expiryDate: new Date('2025-12-31'),
      },
      {
        title: 'Production Supervisor',
        titleAr: 'مشرف إنتاج',
        department: 'Manufacturing',
        location: 'Cairo, Egypt',
        jobType: 'full-time',
        workingHours: '7:00 AM - 3:00 PM (rotating shifts)',
        description: 'Supervise daily production operations in pharmaceutical manufacturing facility. Ensure production schedules are met while maintaining quality standards and safety protocols.',
        descriptionAr: 'الإشراف على عمليات الإنتاج اليومية في منشأة التصنيع الصيدلانية. ضمان الالتزام بجداول الإنتاج مع الحفاظ على معايير الجودة وبروتوكولات السلامة.',
        requirements: '- Bachelor\'s degree in Pharmacy, Chemistry, or Engineering\n- 5+ years experience in pharmaceutical production\n- GMP certification required\n- Strong leadership and problem-solving skills\n- Computer proficiency',
        requirementsAr: '- بكالوريوس صيدلة أو كيمياء أو هندسة\n- خبرة 5 سنوات فأكثر في الإنتاج الصيدلاني\n- شهادة GMP مطلوبة\n- مهارات قيادة وحل مشكلات قوية\n- إتقان الكمبيوتر',
        isActive: true,
        publishDate: new Date('2024-10-20'),
        expiryDate: null, // No expiry
      },
      {
        title: 'Pharmacy Intern',
        titleAr: 'صيدلي متدرب',
        department: 'Quality Assurance',
        location: 'Cairo, Egypt',
        jobType: 'internship',
        workingHours: '9:00 AM - 3:00 PM',
        description: 'Hands-on internship program for fresh pharmacy graduates. Learn about pharmaceutical manufacturing, quality control, and regulatory compliance.',
        descriptionAr: 'برنامج تدريب عملي لخريجي الصيدلة الجدد. تعلم عن التصنيع الصيدلاني ومراقبة الجودة والامتثال التنظيمي.',
        requirements: '- Recent Bachelor\'s degree in Pharmacy\n- Good academic record\n- Eagerness to learn\n- Basic laboratory skills\n- Commitment for 6 months',
        requirementsAr: '- بكالوريوس صيدلة حديث\n- سجل أكاديمي جيد\n- حماس للتعلم\n- مهارات مخبرية أساسية\n- التزام لمدة 6 أشهر',
        isActive: true,
        publishDate: new Date('2024-11-01'),
        expiryDate: new Date('2025-01-31'),
      },
    ],
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
