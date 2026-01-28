/**
 * Add Quality Control Manager Job
 */
const { Client, Databases, ID } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const job = {
    title: 'Quality Control Manager',
    titleAr: 'مدير مراقبة الجودة',
    department: 'Quality Control',
    location: 'Block 251, Industrial Zone A5, 10th of Ramadan City',
    jobType: 'full-time',
    workingHours: 'Full Time',
    description: `Sobek Egypt is seeking an experienced and highly motivated Quality Control Manager to lead our QC operations and ensure full compliance with GMP, regulatory requirements, and company quality standards. The successful candidate will oversee laboratory activities, drive continuous improvement, and ensure the release of safe, effective, and compliant pharmaceutical products.

Key Responsibilities:
• Manage and supervise all Quality Control laboratory activities (chemical, microbiological, and stability testing).
• Ensure compliance with GMP, EDA requirements, and internal quality systems.
• Review and approve specifications, test methods, protocols, reports, and Certificates of Analysis.
• Oversee OOS/OOT investigations, deviations, CAPA, and change control related to QC activities.
• Ensure proper validation and qualification of analytical methods, instruments, and systems.
• Lead stability studies and environmental monitoring programs.
• Train, develop, and evaluate QC staff to maintain a high-performance team.
• Ensure data integrity and accurate documentation in accordance with ALCOA+ principles.
• Support continuous improvement initiatives across the quality system.`,
    requirements: `• Bachelor's degree in Pharmacy
• Minimum 12 years of experience in pharmaceutical Quality Control, including 2 years in a managerial role
• Strong knowledge of GMP, ICH guidelines, and pharmaceutical QC operations
• Excellent leadership, communication, and problem-solving skills
• Experience with regulatory inspections (e.g., EDA, WHO, FDA) is a strong advantage

Please send your updated CV (mentioning the job title in the subject line) to: hr@sobek.com.eg`,
    isActive: true,
};

async function addJob() {
    try {
        const result = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            'jobs',
            ID.unique(),
            job
        );
        console.log('✅ Successfully added: Quality Control Manager');
        console.log('   ID:', result.$id);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

addJob();
