const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function exportMySQLData() {
  console.log('🔐 Starting MySQL data backup...')
  
  try {
    // Create backup directory
    const backupDir = path.join(__dirname, 'backup')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir)
    }

    // Export Categories
    console.log('📁 Exporting Categories...')
    const categories = await prisma.category.findMany()
    fs.writeFileSync(
      path.join(backupDir, 'categories.json'),
      JSON.stringify(categories, null, 2)
    )
    console.log(`✅ Exported ${categories.length} categories`)

    // Export Human Products
    console.log('💊 Exporting Human Products...')
    const humanProducts = await prisma.humanProduct.findMany()
    fs.writeFileSync(
      path.join(backupDir, 'human_products.json'),
      JSON.stringify(humanProducts, null, 2)
    )
    console.log(`✅ Exported ${humanProducts.length} human products`)

    // Export Veterinary Products
    console.log('🐾 Exporting Veterinary Products...')
    const veterinaryProducts = await prisma.veterinaryProduct.findMany()
    fs.writeFileSync(
      path.join(backupDir, 'veterinary_products.json'),
      JSON.stringify(veterinaryProducts, null, 2)
    )
    console.log(`✅ Exported ${veterinaryProducts.length} veterinary products`)

    // Export Jobs
    console.log('💼 Exporting Jobs...')
    const jobs = await prisma.job.findMany()
    fs.writeFileSync(
      path.join(backupDir, 'jobs.json'),
      JSON.stringify(jobs, null, 2)
    )
    console.log(`✅ Exported ${jobs.length} jobs`)

    // Export Job Applications
    console.log('📝 Exporting Job Applications...')
    const applications = await prisma.jobApplication.findMany()
    fs.writeFileSync(
      path.join(backupDir, 'job_applications.json'),
      JSON.stringify(applications, null, 2)
    )
    console.log(`✅ Exported ${applications.length} applications`)

    // Export Media Posts
    console.log('📰 Exporting Media Posts...')
    const mediaPosts = await prisma.mediaPost.findMany()
    fs.writeFileSync(
      path.join(backupDir, 'media_posts.json'),
      JSON.stringify(mediaPosts, null, 2)
    )
    console.log(`✅ Exported ${mediaPosts.length} media posts`)

    // Export Leadership Team
    console.log('👥 Exporting Leadership Team...')
    const leadership = await prisma.leadershipMember.findMany()
    fs.writeFileSync(
      path.join(backupDir, 'leadership_team.json'),
      JSON.stringify(leadership, null, 2)
    )
    console.log(`✅ Exported ${leadership.length} leadership members`)

    // Create summary
    const summary = {
      exportDate: new Date().toISOString(),
      database: 'MySQL',
      tables: {
        categories: categories.length,
        humanProducts: humanProducts.length,
        veterinaryProducts: veterinaryProducts.length,
        jobs: jobs.length,
        jobApplications: applications.length,
        mediaPosts: mediaPosts.length,
        leadershipTeam: leadership.length
      },
      totalRecords: categories.length + humanProducts.length + veterinaryProducts.length + jobs.length + applications.length + mediaPosts.length + leadership.length
    }

    fs.writeFileSync(
      path.join(backupDir, 'backup_summary.json'),
      JSON.stringify(summary, null, 2)
    )

    console.log('\n🎉 Backup completed successfully!')
    console.log(`📊 Total records backed up: ${summary.totalRecords}`)
    console.log(`📁 Backup location: ${backupDir}`)
    
    return summary
  } catch (error) {
    console.error('❌ Backup failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run backup
if (require.main === module) {
  exportMySQLData()
    .then((summary) => {
      console.log('\n✅ Backup process completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Backup process failed:', error)
      process.exit(1)
    })
}

module.exports = { exportMySQLData }
