const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
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
