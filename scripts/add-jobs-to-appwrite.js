/**
 * Script to add job postings directly to Appwrite database
 * Run with: node scripts/add-jobs-to-appwrite.js
 */

const { Client, Databases, ID } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const JOBS_COLLECTION = 'jobs';

const jobs = [
    {
        title: 'QA IPC Supervisor',
        titleAr: 'مشرف مراقبة الجودة أثناء الإنتاج',
        department: 'Quality Assurance',
        location: 'Block 251, Industrial Zone A5, 10th of Ramadan City',
        jobType: 'full-time',
        workingHours: 'Full Time',
        description: `Sobek Egypt is looking to expand its Quality Assurance and is inviting qualified candidates to apply.

• Leads the IPC team to monitor and ensure product quality during all manufacturing and packaging stages.
• Verify GMP compliance.
• Supervise IPC staff.
• Perform and oversee in-process tests.
• Document activities, review batch records.
• Report deviations to management.
• Aware with data integrity implementation.`,
        descriptionAr: `شركة صوبيك مصر تتطلع لتوسيع فريق ضمان الجودة وتدعو المرشحين المؤهلين للتقديم.

• قيادة فريق IPC لمراقبة وضمان جودة المنتج خلال جميع مراحل التصنيع والتعبئة.
• التحقق من الامتثال لـ GMP.
• الإشراف على موظفي IPC.
• إجراء والإشراف على الاختبارات أثناء العملية.
• توثيق الأنشطة ومراجعة سجلات الدفعات.
• الإبلاغ عن الانحرافات للإدارة.
• الوعي بتطبيق سلامة البيانات.`,
        requirements: `• 3-5 years of experience in pharmaceutical IPC
• Strong knowledge of GMP compliance
• Experience in supervising IPC teams
• Ability to perform and oversee in-process tests
• Document management and batch record review skills
• Understanding of data integrity principles

Please send your updated CV (mentioning the job title in the subject line) to: hr@sobek.com.eg`,
        requirementsAr: `• خبرة من 3-5 سنوات في مراقبة الجودة أثناء الإنتاج الصيدلاني
• معرفة قوية بالامتثال لـ GMP
• خبرة في الإشراف على فرق IPC
• القدرة على إجراء والإشراف على الاختبارات أثناء العملية
• مهارات إدارة المستندات ومراجعة سجلات الدفعات
• فهم مبادئ سلامة البيانات

يرجى إرسال سيرتك الذاتية المحدثة (مع ذكر المسمى الوظيفي في عنوان الموضوع) إلى: hr@sobek.com.eg`,
        isActive: true,
    },
    {
        title: 'QA Documentation Section Head',
        titleAr: 'رئيس قسم توثيق الجودة',
        department: 'Quality Assurance',
        location: 'Block 251, Industrial Zone A5, 10th of Ramadan City',
        jobType: 'full-time',
        workingHours: 'Full Time',
        description: `Sobek Egypt is looking to expand its Quality Assurance and is inviting qualified candidates to apply.

• Lead and manage the Documentation Section (QA Documentation).
• Establish, implement, and maintain document control systems (SOPs, BMRs, BPRs, formats, records).
• Ensure compliance with WHO GMP, EDA, EU GMP, and ALCOA+ data integrity principles.
• Review, approve, issue, archive, and retrieve controlled documents.
• Ensure timely preparation and issuance of Batch Manufacturing Records and Batch Packaging Records.
• Monitor document revisions, change control, and version control.
• Ensure proper archival, retention, and retrieval of GMP documents.
• Train staff on GMP documentation practices and data integrity.
• Lead continuous improvement of documentation processes.`,
        descriptionAr: `شركة صوبيك مصر تتطلع لتوسيع فريق ضمان الجودة وتدعو المرشحين المؤهلين للتقديم.

• قيادة وإدارة قسم التوثيق (توثيق ضمان الجودة).
• إنشاء وتنفيذ وصيانة أنظمة التحكم في المستندات (SOPs, BMRs, BPRs, النماذج، السجلات).
• ضمان الامتثال لمعايير WHO GMP و EDA و EU GMP ومبادئ ALCOA+ لسلامة البيانات.
• مراجعة والموافقة على وإصدار وأرشفة واسترجاع المستندات المتحكم بها.
• ضمان التحضير والإصدار في الوقت المناسب لسجلات تصنيع الدفعات وسجلات تعبئة الدفعات.
• مراقبة مراجعات المستندات والتحكم في التغييرات والتحكم في الإصدارات.
• ضمان الأرشفة والاحتفاظ والاسترجاع السليم لمستندات GMP.
• تدريب الموظفين على ممارسات توثيق GMP وسلامة البيانات.
• قيادة التحسين المستمر لعمليات التوثيق.`,
        requirements: `• 6-8 years of experience in pharmaceutical documentation
• Strong knowledge of WHO GMP, EDA, EU GMP standards
• Experience with ALCOA+ data integrity principles
• Document control systems expertise (SOPs, BMRs, BPRs)
• Leadership and team management skills
• Experience in training and development
• Strong organizational and communication skills

Please send your updated CV (mentioning the job title in the subject line) to: hr@sobek.com.eg`,
        requirementsAr: `• خبرة من 6-8 سنوات في التوثيق الصيدلاني
• معرفة قوية بمعايير WHO GMP و EDA و EU GMP
• خبرة في مبادئ ALCOA+ لسلامة البيانات
• خبرة في أنظمة التحكم في المستندات (SOPs, BMRs, BPRs)
• مهارات القيادة وإدارة الفريق
• خبرة في التدريب والتطوير
• مهارات تنظيمية وتواصل قوية

يرجى إرسال سيرتك الذاتية المحدثة (مع ذكر المسمى الوظيفي في عنوان الموضوع) إلى: hr@sobek.com.eg`,
        isActive: true,
    },
    {
        title: 'Plant Manager',
        titleAr: 'مدير المصنع',
        department: 'Operations',
        location: 'Block 251, Industrial Zone A5, 10th of Ramadan City',
        jobType: 'full-time',
        workingHours: 'Full Time',
        description: `Sobek Egypt Pharmaceutical is a fast-growing pharmaceutical company committed to quality, compliance, and operational excellence. We are currently seeking a highly qualified and experienced Plant Manager to lead our manufacturing operations.

Key Responsibilities:
• Oversee and manage all manufacturing operations to ensure compliance with GMP, GDP, and relevant regulatory requirements.
• Lead production, engineering, quality, and warehouse teams to achieve operational excellence.
• Maintain full compliance with Egyptian Drug Authority (EDA) regulations and internal quality systems.
• Develop and implement production plans aligned with business objectives.
• Foster a culture of safety, quality, accountability, and performance.`,
        descriptionAr: `شركة صوبيك مصر للأدوية هي شركة أدوية سريعة النمو ملتزمة بالجودة والامتثال والتميز التشغيلي. نحن نبحث حالياً عن مدير مصنع مؤهل وذو خبرة عالية لقيادة عملياتنا التصنيعية.

المسؤوليات الرئيسية:
• الإشراف وإدارة جميع عمليات التصنيع لضمان الامتثال لـ GMP و GDP والمتطلبات التنظيمية ذات الصلة.
• قيادة فرق الإنتاج والهندسة والجودة والمستودعات لتحقيق التميز التشغيلي.
• الحفاظ على الامتثال الكامل للوائح هيئة الدواء المصرية (EDA) وأنظمة الجودة الداخلية.
• تطوير وتنفيذ خطط الإنتاج المتوافقة مع أهداف العمل.
• تعزيز ثقافة السلامة والجودة والمساءلة والأداء.`,
        requirements: `• Bachelor's degree in Pharmacy
• Minimum 17 years of experience in pharmaceutical manufacturing
• At least 2 years of experience in the same role (Plant Manager)
• Strong background in GMP, quality systems, and pharmaceutical operations
• Proven leadership, decision-making, and team management skills
• Experience working with EDA inspections and audits is highly preferred
• Excellent communication and organizational skills

Send CV to: hr@sobek.com.eg`,
        requirementsAr: `• بكالوريوس في الصيدلة
• خبرة لا تقل عن 17 عاماً في التصنيع الصيدلاني
• خبرة لا تقل عن سنتين في نفس الدور (مدير مصنع)
• خلفية قوية في GMP وأنظمة الجودة والعمليات الصيدلانية
• مهارات قيادة واتخاذ قرار وإدارة فريق مثبتة
• خبرة في التعامل مع عمليات تفتيش ومراجعة هيئة الدواء المصرية مفضلة للغاية
• مهارات تواصل وتنظيم ممتازة

أرسل السيرة الذاتية إلى: hr@sobek.com.eg`,
        isActive: true,
    },
    {
        title: 'QA IPC Specialist',
        titleAr: 'أخصائي مراقبة الجودة أثناء الإنتاج',
        department: 'Quality Assurance',
        location: 'Block 251, Industrial Zone A5, 10th of Ramadan City',
        jobType: 'full-time',
        workingHours: 'Full Time',
        description: `Sobek Egypt is looking to expand its Quality Assurance and is inviting qualified candidates to apply.

Key Responsibilities:
Ensures product quality and GMP compliance during manufacturing by performing IPC sampling, testing, inspections, reviewing batch records, verifying line clearance, and reporting deviations to maintain consistency and regulatory compliance. Aware with data integrity implementation.`,
        descriptionAr: `شركة صوبيك مصر تتطلع لتوسيع فريق ضمان الجودة وتدعو المرشحين المؤهلين للتقديم.

المسؤوليات الرئيسية:
يضمن جودة المنتج والامتثال لـ GMP أثناء التصنيع من خلال إجراء عينات IPC والاختبار والتفتيش ومراجعة سجلات الدفعات والتحقق من تطهير الخط والإبلاغ عن الانحرافات للحفاظ على الاتساق والامتثال التنظيمي. الوعي بتطبيق سلامة البيانات.`,
        requirements: `• 0-2 years of experience in pharmaceutical quality control
• Knowledge of GMP compliance requirements
• Understanding of IPC sampling and testing procedures
• Ability to review batch records and verify line clearance
• Attention to detail and reporting skills
• Understanding of data integrity implementation

Please send your updated CV (mentioning the job title in the subject line) to: hr@sobek.com.eg`,
        requirementsAr: `• خبرة من 0-2 سنة في مراقبة الجودة الصيدلانية
• معرفة بمتطلبات الامتثال لـ GMP
• فهم إجراءات أخذ العينات والاختبار أثناء العملية
• القدرة على مراجعة سجلات الدفعات والتحقق من تطهير الخط
• الاهتمام بالتفاصيل ومهارات إعداد التقارير
• فهم تطبيق سلامة البيانات

يرجى إرسال سيرتك الذاتية المحدثة (مع ذكر المسمى الوظيفي في عنوان الموضوع) إلى: hr@sobek.com.eg`,
        isActive: true,
    },
];

async function addJobsToAppwrite() {
    console.log('🚀 Starting to add jobs to Appwrite...\n');
    console.log('📍 Endpoint:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
    console.log('📁 Project:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    console.log('💾 Database:', DATABASE_ID);
    console.log('📋 Collection:', JOBS_COLLECTION);
    console.log('\n');

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        console.log(`📝 Adding job ${i + 1}/${jobs.length}: ${job.title}...`);

        try {
            // Try with full attributes first
            const result = await databases.createDocument(
                DATABASE_ID,
                JOBS_COLLECTION,
                ID.unique(),
                {
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    jobType: job.jobType,
                    workingHours: job.workingHours,
                    description: job.description,
                    requirements: job.requirements,
                    isActive: job.isActive,
                }
            );

            console.log(`✅ Successfully added: ${job.title} (ID: ${result.$id})`);
            console.log(`   Note: Arabic translations stored in description/requirements as bilingual text`);
        } catch (error) {
            console.error(`❌ Failed to add ${job.title}:`);
            console.error('   Error:', error.message);
            if (error.response) {
                console.error('   Response:', error.response);
            }
        }

        // Wait a bit between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n✨ Finished adding all jobs!');
}

// Run the script
addJobsToAppwrite().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
