const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

// Initialize Prisma Client for MySQL
const prisma = new PrismaClient()

async function importDataToMySQL() {
  console.log('🔄 Starting data import to MySQL...')
  
  try {
    const backupDir = path.join(__dirname, 'backup')
    
    // Check if backup files exist
    if (!fs.existsSync(backupDir)) {
      throw new Error('Backup directory not found. Please run backup-sqlite.js first.')
    }

    // Read backup summary
    const summaryPath = path.join(backupDir, 'backup_summary.json')
    if (!fs.existsSync(summaryPath)) {
      throw new Error('Backup summary not found.')
    }
    
    const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
    console.log(`📊 Found backup with ${summary.totalRecords} records`)

    // Import Categories
    console.log('\n📁 Importing Categories...')
    const categoriesData = JSON.parse(fs.readFileSync(path.join(backupDir, 'categories.json'), 'utf8'))
    if (categoriesData.length > 0) {
      for (const category of categoriesData) {
        try {
          await prisma.category.create({
            data: {
              id: category.id,
              name: category.name,
              nameAr: category.nameAr,
              slug: category.slug,
              type: category.type,
              icon: category.icon,
              description: category.description,
              createdAt: new Date(category.createdAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipping category ${category.name}: ${error.message}`)
        }
      }
      console.log(`✅ Imported ${categoriesData.length} categories`)
    }

    // Import Human Products
    console.log('\n💊 Importing Human Products...')
    const humanProductsData = JSON.parse(fs.readFileSync(path.join(backupDir, 'human_products.json'), 'utf8'))
    if (humanProductsData.length > 0) {
      for (const product of humanProductsData) {
        try {
          await prisma.humanProduct.create({
            data: {
              id: product.id,
              name: product.name,
              genericName: product.genericName,
              strength: product.strength,
              dosageForm: product.dosageForm,
              indication: product.indication,
              packSize: product.packSize,
              registrationNumber: product.registrationNumber,
              category: product.category,
              imageUrl: product.imageUrl,
              price: product.price ? parseFloat(product.price) : null,
              isActive: product.isActive,
              createdAt: new Date(product.createdAt),
              updatedAt: new Date(product.updatedAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipping human product ${product.name}: ${error.message}`)
        }
      }
      console.log(`✅ Imported ${humanProductsData.length} human products`)
    }

    // Import Veterinary Products
    console.log('\n🐾 Importing Veterinary Products...')
    const vetProductsData = JSON.parse(fs.readFileSync(path.join(backupDir, 'veterinary_products.json'), 'utf8'))
    if (vetProductsData.length > 0) {
      for (const product of vetProductsData) {
        try {
          await prisma.veterinaryProduct.create({
            data: {
              id: product.id,
              name: product.name,
              genericName: product.genericName,
              strength: product.strength,
              dosageForm: product.dosageForm,
              indication: product.indication,
              species: product.species,
              withdrawalPeriod: product.withdrawalPeriod,
              packSize: product.packSize,
              registrationNumber: product.registrationNumber,
              category: product.category,
              imageUrl: product.imageUrl,
              price: product.price ? parseFloat(product.price) : null,
              isActive: product.isActive,
              createdAt: new Date(product.createdAt),
              updatedAt: new Date(product.updatedAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipping vet product ${product.name}: ${error.message}`)
        }
      }
      console.log(`✅ Imported ${vetProductsData.length} veterinary products`)
    }

    // Import Jobs
    console.log('\n💼 Importing Jobs...')
    const jobsData = JSON.parse(fs.readFileSync(path.join(backupDir, 'jobs.json'), 'utf8'))
    if (jobsData.length > 0) {
      for (const job of jobsData) {
        try {
          await prisma.job.create({
            data: {
              id: job.id,
              title: job.title,
              titleAr: job.titleAr,
              department: job.department,
              location: job.location,
              jobType: job.jobType,
              workingHours: job.workingHours,
              description: job.description,
              descriptionAr: job.descriptionAr,
              requirements: job.requirements,
              requirementsAr: job.requirementsAr,
              isActive: job.isActive,
              publishDate: new Date(job.publishDate),
              expiryDate: job.expiryDate ? new Date(job.expiryDate) : null,
              createdAt: new Date(job.createdAt),
              updatedAt: new Date(job.updatedAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipping job ${job.title}: ${error.message}`)
        }
      }
      console.log(`✅ Imported ${jobsData.length} jobs`)
    }

    // Import Job Applications
    console.log('\n📝 Importing Job Applications...')
    const applicationsData = JSON.parse(fs.readFileSync(path.join(backupDir, 'job_applications.json'), 'utf8'))
    if (applicationsData.length > 0) {
      for (const application of applicationsData) {
        try {
          await prisma.jobApplication.create({
            data: {
              id: application.id,
              jobId: application.jobId,
              fullName: application.fullName,
              email: application.email,
              phone: application.phone,
              cvUrl: application.cvUrl,
              coverLetter: application.coverLetter,
              status: application.status,
              createdAt: new Date(application.createdAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipping application ${application.fullName}: ${error.message}`)
        }
      }
      console.log(`✅ Imported ${applicationsData.length} job applications`)
    }

    // Import Media Posts
    console.log('\n📰 Importing Media Posts...')
    const mediaData = JSON.parse(fs.readFileSync(path.join(backupDir, 'media_posts.json'), 'utf8'))
    if (mediaData.length > 0) {
      for (const media of mediaData) {
        try {
          await prisma.mediaPost.create({
            data: {
              id: media.id,
              title: media.title,
              titleAr: media.titleAr,
              content: media.content,
              contentAr: media.contentAr,
              type: media.type,
              mediaType: media.mediaType,
              mediaUrl: media.mediaUrl,
              isActive: media.isActive,
              publishDate: new Date(media.publishDate),
              createdAt: new Date(media.createdAt),
              updatedAt: new Date(media.updatedAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipping media post ${media.title}: ${error.message}`)
        }
      }
      console.log(`✅ Imported ${mediaData.length} media posts`)
    }

    // Verify import
    console.log('\n🔍 Verifying import...')
    const counts = {
      categories: await prisma.category.count(),
      humanProducts: await prisma.humanProduct.count(),
      veterinaryProducts: await prisma.veterinaryProduct.count(),
      jobs: await prisma.job.count(),
      jobApplications: await prisma.jobApplication.count(),
      mediaPosts: await prisma.mediaPost.count()
    }

    const totalImported = Object.values(counts).reduce((sum, count) => sum + count, 0)
    
    console.log('\n📊 Import Summary:')
    console.log(`Categories: ${counts.categories}`)
    console.log(`Human Products: ${counts.humanProducts}`)
    console.log(`Veterinary Products: ${counts.veterinaryProducts}`)
    console.log(`Jobs: ${counts.jobs}`)
    console.log(`Job Applications: ${counts.jobApplications}`)
    console.log(`Media Posts: ${counts.mediaPosts}`)
    console.log(`Total Records: ${totalImported}`)

    if (totalImported === summary.totalRecords) {
      console.log('\n🎉 All data imported successfully!')
    } else {
      console.log(`\n⚠️  Import completed with some warnings. Expected ${summary.totalRecords}, got ${totalImported}`)
    }

    return counts
  } catch (error) {
    console.error('\n❌ Import failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run import
if (require.main === module) {
  importDataToMySQL()
    .then((counts) => {
      console.log('\n✅ Import process completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Import process failed:', error)
      process.exit(1)
    })
}

module.exports = { importDataToMySQL }