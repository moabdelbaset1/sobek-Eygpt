import { PrismaClient } from '@prisma/client'

// Create Prisma client instance
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database types (matching Prisma models)
export interface HumanProduct {
  id: string
  name: string
  generic_name: string
  strength: string
  dosage_form: string
  indication: string
  pack_size: string | null
  registration_number: string | null
  category: string
  image_url: string | null
  price: number | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface VeterinaryProduct {
  id: string
  name: string
  generic_name: string
  strength: string
  dosage_form: string
  indication: string
  species: string
  withdrawal_period: string | null
  pack_size: string | null
  registration_number: string | null
  category: string
  image_url: string | null
  price: number | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface Category {
  id: string
  name: string
  name_ar?: string | null
  slug: string
  type: string
  icon?: string | null
  description?: string | null
  created_at?: Date
}

// Helper function to convert Prisma dates to strings
function serializeProduct<T extends { created_at: Date; updated_at: Date }>(product: T) {
  return {
    ...product,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString(),
  }
}

// API functions for Human Products
export const humanProductsAPI = {
  // Get all products
  getAll: async () => {
    const products = await prisma.humanProduct.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    
    return products.map(p => ({
      id: p.id,
      name: p.name,
      generic_name: p.genericName,
      strength: p.strength,
      dosage_form: p.dosageForm,
      indication: p.indication,
      pack_size: p.packSize,
      registration_number: p.registrationNumber,
      category: p.category,
      image_url: p.imageUrl,
      price: p.price,
      is_active: p.isActive,
      created_at: p.createdAt.toISOString(),
      updated_at: p.updatedAt.toISOString(),
    }))
  },

  // Get product by ID
  getById: async (id: string) => {
    const product = await prisma.humanProduct.findUnique({
      where: { id },
    })
    
    if (!product) throw new Error('Product not found')
    
    return {
      id: product.id,
      name: product.name,
      generic_name: product.genericName,
      strength: product.strength,
      dosage_form: product.dosageForm,
      indication: product.indication,
      pack_size: product.packSize,
      registration_number: product.registrationNumber,
      category: product.category,
      image_url: product.imageUrl,
      price: product.price,
      is_active: product.isActive,
      created_at: product.createdAt.toISOString(),
      updated_at: product.updatedAt.toISOString(),
    }
  },

  // Create new product
  create: async (productData: any) => {
    const product = await prisma.humanProduct.create({
      data: {
        name: productData.name,
        genericName: productData.generic_name || productData.genericName,
        strength: productData.strength,
        dosageForm: productData.dosage_form || productData.dosageForm,
        indication: productData.indication,
        packSize: productData.pack_size || productData.packSize || null,
        registrationNumber: productData.registration_number || productData.registrationNumber || null,
        category: productData.category,
        imageUrl: productData.image_url || productData.imageUrl || null,
        price: productData.price || null,
        isActive: productData.is_active !== undefined ? productData.is_active : true,
      },
    })
    
    return {
      id: product.id,
      name: product.name,
      generic_name: product.genericName,
      strength: product.strength,
      dosage_form: product.dosageForm,
      indication: product.indication,
      pack_size: product.packSize,
      registration_number: product.registrationNumber,
      category: product.category,
      image_url: product.imageUrl,
      price: product.price,
      is_active: product.isActive,
      created_at: product.createdAt.toISOString(),
      updated_at: product.updatedAt.toISOString(),
    }
  },

  // Update product
  update: async (id: string, updates: any) => {
    const product = await prisma.humanProduct.update({
      where: { id },
      data: {
        name: updates.name,
        genericName: updates.generic_name || updates.genericName,
        strength: updates.strength,
        dosageForm: updates.dosage_form || updates.dosageForm,
        indication: updates.indication,
        packSize: updates.pack_size || updates.packSize,
        registrationNumber: updates.registration_number || updates.registrationNumber,
        category: updates.category,
        imageUrl: updates.image_url || updates.imageUrl,
        price: updates.price,
        isActive: updates.is_active !== undefined ? updates.is_active : undefined,
      },
    })
    
    return {
      id: product.id,
      name: product.name,
      generic_name: product.genericName,
      strength: product.strength,
      dosage_form: product.dosageForm,
      indication: product.indication,
      pack_size: product.packSize,
      registration_number: product.registrationNumber,
      category: product.category,
      image_url: product.imageUrl,
      price: product.price,
      is_active: product.isActive,
      created_at: product.createdAt.toISOString(),
      updated_at: product.updatedAt.toISOString(),
    }
  },

  // Delete product (soft delete)
  delete: async (id: string) => {
    await prisma.humanProduct.update({
      where: { id },
      data: { isActive: false },
    })
  },

  // Get by category
  getByCategory: async (category: string) => {
    const products = await prisma.humanProduct.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: { name: 'asc' },
    })
    
    return products.map(p => ({
      id: p.id,
      name: p.name,
      generic_name: p.genericName,
      strength: p.strength,
      dosage_form: p.dosageForm,
      indication: p.indication,
      pack_size: p.packSize,
      registration_number: p.registrationNumber,
      category: p.category,
      image_url: p.imageUrl,
      price: p.price,
      is_active: p.isActive,
      created_at: p.createdAt.toISOString(),
      updated_at: p.updatedAt.toISOString(),
    }))
  },
}

// API functions for Veterinary Products
export const veterinaryProductsAPI = {
  // Get all products
  getAll: async () => {
    const products = await prisma.veterinaryProduct.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    
    return products.map(p => ({
      id: p.id,
      name: p.name,
      generic_name: p.genericName,
      strength: p.strength,
      dosage_form: p.dosageForm,
      indication: p.indication,
      species: p.species,
      withdrawal_period: p.withdrawalPeriod,
      pack_size: p.packSize,
      registration_number: p.registrationNumber,
      category: p.category,
      image_url: p.imageUrl,
      price: p.price,
      is_active: p.isActive,
      created_at: p.createdAt.toISOString(),
      updated_at: p.updatedAt.toISOString(),
    }))
  },

  // Get product by ID
  getById: async (id: string) => {
    const product = await prisma.veterinaryProduct.findUnique({
      where: { id },
    })
    
    if (!product) throw new Error('Product not found')
    
    return {
      id: product.id,
      name: product.name,
      generic_name: product.genericName,
      strength: product.strength,
      dosage_form: product.dosageForm,
      indication: product.indication,
      species: product.species,
      withdrawal_period: product.withdrawalPeriod,
      pack_size: product.packSize,
      registration_number: product.registrationNumber,
      category: product.category,
      image_url: product.imageUrl,
      price: product.price,
      is_active: product.isActive,
      created_at: product.createdAt.toISOString(),
      updated_at: product.updatedAt.toISOString(),
    }
  },

  // Create new product
  create: async (productData: any) => {
    const product = await prisma.veterinaryProduct.create({
      data: {
        name: productData.name,
        genericName: productData.generic_name || productData.genericName,
        strength: productData.strength,
        dosageForm: productData.dosage_form || productData.dosageForm,
        indication: productData.indication,
        species: productData.species,
        withdrawalPeriod: productData.withdrawal_period || productData.withdrawalPeriod || null,
        packSize: productData.pack_size || productData.packSize || null,
        registrationNumber: productData.registration_number || productData.registrationNumber || null,
        category: productData.category,
        imageUrl: productData.image_url || productData.imageUrl || null,
        price: productData.price || null,
        isActive: productData.is_active !== undefined ? productData.is_active : true,
      },
    })
    
    return {
      id: product.id,
      name: product.name,
      generic_name: product.genericName,
      strength: product.strength,
      dosage_form: product.dosageForm,
      indication: product.indication,
      species: product.species,
      withdrawal_period: product.withdrawalPeriod,
      pack_size: product.packSize,
      registration_number: product.registrationNumber,
      category: product.category,
      image_url: product.imageUrl,
      price: product.price,
      is_active: product.isActive,
      created_at: product.createdAt.toISOString(),
      updated_at: product.updatedAt.toISOString(),
    }
  },

  // Update product
  update: async (id: string, updates: any) => {
    const product = await prisma.veterinaryProduct.update({
      where: { id },
      data: {
        name: updates.name,
        genericName: updates.generic_name || updates.genericName,
        strength: updates.strength,
        dosageForm: updates.dosage_form || updates.dosageForm,
        indication: updates.indication,
        species: updates.species,
        withdrawalPeriod: updates.withdrawal_period || updates.withdrawalPeriod,
        packSize: updates.pack_size || updates.packSize,
        registrationNumber: updates.registration_number || updates.registrationNumber,
        category: updates.category,
        imageUrl: updates.image_url || updates.imageUrl,
        price: updates.price,
        isActive: updates.is_active !== undefined ? updates.is_active : undefined,
      },
    })
    
    return {
      id: product.id,
      name: product.name,
      generic_name: product.genericName,
      strength: product.strength,
      dosage_form: product.dosageForm,
      indication: product.indication,
      species: product.species,
      withdrawal_period: product.withdrawalPeriod,
      pack_size: product.packSize,
      registration_number: product.registrationNumber,
      category: product.category,
      image_url: product.imageUrl,
      price: product.price,
      is_active: product.isActive,
      created_at: product.createdAt.toISOString(),
      updated_at: product.updatedAt.toISOString(),
    }
  },

  // Delete product (soft delete)
  delete: async (id: string) => {
    await prisma.veterinaryProduct.update({
      where: { id },
      data: { isActive: false },
    })
  },

  // Get by category
  getByCategory: async (category: string) => {
    const products = await prisma.veterinaryProduct.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: { name: 'asc' },
    })
    
    return products.map(p => ({
      id: p.id,
      name: p.name,
      generic_name: p.genericName,
      strength: p.strength,
      dosage_form: p.dosageForm,
      indication: p.indication,
      species: p.species,
      withdrawal_period: p.withdrawalPeriod,
      pack_size: p.packSize,
      registration_number: p.registrationNumber,
      category: p.category,
      image_url: p.imageUrl,
      price: p.price,
      is_active: p.isActive,
      created_at: p.createdAt.toISOString(),
      updated_at: p.updatedAt.toISOString(),
    }))
  },
}

// API functions for Categories
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
    
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      name_ar: c.nameAr,
      slug: c.slug,
      type: c.type as 'human' | 'veterinary',
      icon: c.icon,
      description: c.description,
      created_at: c.createdAt.toISOString(),
    }))
  },

  // Get by type
  getByType: async (type: 'human' | 'veterinary') => {
    const categories = await prisma.category.findMany({
      where: { type },
      orderBy: { name: 'asc' },
    })
    
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      name_ar: c.nameAr,
      slug: c.slug,
      type: c.type as 'human' | 'veterinary',
      icon: c.icon,
      description: c.description,
      created_at: c.createdAt.toISOString(),
    }))
  },

  // Create category
  create: async (categoryData: any) => {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
        nameAr: categoryData.name_ar || categoryData.nameAr || null,
        slug: categoryData.slug,
        type: categoryData.type,
        icon: categoryData.icon || null,
        description: categoryData.description || null,
      },
    })
    
    return {
      id: category.id,
      name: category.name,
      name_ar: category.nameAr,
      slug: category.slug,
      type: category.type as 'human' | 'veterinary',
      icon: category.icon,
      description: category.description,
      created_at: category.createdAt.toISOString(),
    }
  },

  // Update category
  update: async (id: string, updates: any) => {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: updates.name,
        nameAr: updates.name_ar || updates.nameAr,
        slug: updates.slug,
        type: updates.type,
        icon: updates.icon,
        description: updates.description,
      },
    })
    
    return {
      id: category.id,
      name: category.name,
      name_ar: category.nameAr,
      slug: category.slug,
      type: category.type as 'human' | 'veterinary',
      icon: category.icon,
      description: category.description,
      created_at: category.createdAt.toISOString(),
    }
  },

  // Delete category
  delete: async (id: string) => {
    await prisma.category.delete({
      where: { id },
    })
  },
}

// Helper function for getting products by category (for public pages)
export async function getProductsByCategory(category: string) {
  return humanProductsAPI.getByCategory(category)
}

// Media Posts API
export const mediaPostsAPI = {
  // Get all media posts
  getAll: async () => {
    const posts = await prisma.mediaPost.findMany({
      where: { isActive: true },
      orderBy: { publishDate: 'desc' },
    })
    
    return posts.map(p => ({
      id: p.id,
      title: p.title,
      title_ar: p.titleAr,
      content: p.content,
      content_ar: p.contentAr,
      type: p.type,
      media_type: p.mediaType,
      media_url: p.mediaUrl,
      is_active: p.isActive,
      publish_date: p.publishDate.toISOString(),
      created_at: p.createdAt.toISOString(),
      updated_at: p.updatedAt.toISOString(),
    }))
  },

  // Get by type
  getByType: async (type: 'news' | 'event') => {
    const posts = await prisma.mediaPost.findMany({
      where: { 
        isActive: true,
        type 
      },
      orderBy: { publishDate: 'desc' },
    })
    
    return posts.map(p => ({
      id: p.id,
      title: p.title,
      title_ar: p.titleAr,
      content: p.content,
      content_ar: p.contentAr,
      type: p.type,
      media_type: p.mediaType,
      media_url: p.mediaUrl,
      is_active: p.isActive,
      publish_date: p.publishDate.toISOString(),
      created_at: p.createdAt.toISOString(),
      updated_at: p.updatedAt.toISOString(),
    }))
  },

  // Create post
  create: async (postData: any) => {
    const post = await prisma.mediaPost.create({
      data: {
        title: postData.title,
        titleAr: postData.title_ar || postData.titleAr || null,
        content: postData.content,
        contentAr: postData.content_ar || postData.contentAr || null,
        type: postData.type,
        mediaType: postData.media_type || postData.mediaType || null,
        mediaUrl: postData.media_url || postData.mediaUrl || null,
        isActive: postData.is_active !== undefined ? postData.is_active : true,
        publishDate: postData.publish_date ? new Date(postData.publish_date) : new Date(),
      },
    })
    
    return {
      id: post.id,
      title: post.title,
      title_ar: post.titleAr,
      content: post.content,
      content_ar: post.contentAr,
      type: post.type,
      media_type: post.mediaType,
      media_url: post.mediaUrl,
      is_active: post.isActive,
      publish_date: post.publishDate.toISOString(),
      created_at: post.createdAt.toISOString(),
      updated_at: post.updatedAt.toISOString(),
    }
  },

  // Update post
  update: async (id: string, updates: any) => {
    const post = await prisma.mediaPost.update({
      where: { id },
      data: {
        title: updates.title,
        titleAr: updates.title_ar || updates.titleAr,
        content: updates.content,
        contentAr: updates.content_ar || updates.contentAr,
        type: updates.type,
        mediaType: updates.media_type || updates.mediaType,
        mediaUrl: updates.media_url || updates.mediaUrl,
        isActive: updates.is_active,
        publishDate: updates.publish_date ? new Date(updates.publish_date) : undefined,
      },
    })
    
    return {
      id: post.id,
      title: post.title,
      title_ar: post.titleAr,
      content: post.content,
      content_ar: post.contentAr,
      type: post.type,
      media_type: post.mediaType,
      media_url: post.mediaUrl,
      is_active: post.isActive,
      publish_date: post.publishDate.toISOString(),
      created_at: post.createdAt.toISOString(),
      updated_at: post.updatedAt.toISOString(),
    }
  },

  // Delete post
  delete: async (id: string) => {
    await prisma.mediaPost.delete({
      where: { id },
    })
  },
}

// ===================================
// Jobs API
// ===================================
export const jobsAPI = {
  // Get all jobs
  getAll: async (includeInactive = false) => {
    const jobs = await prisma.job.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { publishDate: 'desc' },
      include: {
        _count: {
          select: { applications: true }
        }
      }
    })
    
    return jobs.map(job => ({
      id: job.id,
      title: job.title,
      title_ar: job.titleAr,
      department: job.department,
      location: job.location,
      job_type: job.jobType,
      working_hours: job.workingHours,
      description: job.description,
      description_ar: job.descriptionAr,
      requirements: job.requirements,
      requirements_ar: job.requirementsAr,
      is_active: job.isActive,
      publish_date: job.publishDate.toISOString(),
      expiry_date: job.expiryDate?.toISOString() || null,
      created_at: job.createdAt.toISOString(),
      updated_at: job.updatedAt.toISOString(),
      applications_count: job._count.applications,
    }))
  },

  // Get active jobs only
  getActive: async () => {
    const jobs = await prisma.job.findMany({
      where: { 
        isActive: true,
        OR: [
          { expiryDate: null },
          { expiryDate: { gte: new Date() } }
        ]
      },
      orderBy: { publishDate: 'desc' },
    })
    
    return jobs.map(job => ({
      id: job.id,
      title: job.title,
      title_ar: job.titleAr,
      department: job.department,
      location: job.location,
      job_type: job.jobType,
      working_hours: job.workingHours,
      description: job.description,
      description_ar: job.descriptionAr,
      requirements: job.requirements,
      requirements_ar: job.requirementsAr,
      is_active: job.isActive,
      publish_date: job.publishDate.toISOString(),
      expiry_date: job.expiryDate?.toISOString() || null,
      created_at: job.createdAt.toISOString(),
      updated_at: job.updatedAt.toISOString(),
    }))
  },

  // Get job by ID
  getById: async (id: string) => {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true }
        }
      }
    })
    
    if (!job) return null
    
    return {
      id: job.id,
      title: job.title,
      title_ar: job.titleAr,
      department: job.department,
      location: job.location,
      job_type: job.jobType,
      working_hours: job.workingHours,
      description: job.description,
      description_ar: job.descriptionAr,
      requirements: job.requirements,
      requirements_ar: job.requirementsAr,
      is_active: job.isActive,
      publish_date: job.publishDate.toISOString(),
      expiry_date: job.expiryDate?.toISOString() || null,
      created_at: job.createdAt.toISOString(),
      updated_at: job.updatedAt.toISOString(),
      applications_count: job._count.applications,
    }
  },

  // Create job
  create: async (data: any) => {
    const job = await prisma.job.create({
      data: {
        title: data.title,
        titleAr: data.title_ar || data.titleAr,
        department: data.department,
        location: data.location,
        jobType: data.job_type || data.jobType,
        workingHours: data.working_hours || data.workingHours,
        description: data.description,
        descriptionAr: data.description_ar || data.descriptionAr,
        requirements: data.requirements,
        requirementsAr: data.requirements_ar || data.requirementsAr,
        isActive: data.is_active ?? true,
        publishDate: data.publish_date ? new Date(data.publish_date) : new Date(),
        expiryDate: data.expiry_date ? new Date(data.expiry_date) : null,
      },
    })
    
    return {
      id: job.id,
      title: job.title,
      title_ar: job.titleAr,
      department: job.department,
      location: job.location,
      job_type: job.jobType,
      working_hours: job.workingHours,
      description: job.description,
      description_ar: job.descriptionAr,
      requirements: job.requirements,
      requirements_ar: job.requirementsAr,
      is_active: job.isActive,
      publish_date: job.publishDate.toISOString(),
      expiry_date: job.expiryDate?.toISOString() || null,
      created_at: job.createdAt.toISOString(),
      updated_at: job.updatedAt.toISOString(),
    }
  },

  // Update job
  update: async (id: string, updates: any) => {
    const job = await prisma.job.update({
      where: { id },
      data: {
        title: updates.title,
        titleAr: updates.title_ar || updates.titleAr,
        department: updates.department,
        location: updates.location,
        jobType: updates.job_type || updates.jobType,
        workingHours: updates.working_hours || updates.workingHours,
        description: updates.description,
        descriptionAr: updates.description_ar || updates.descriptionAr,
        requirements: updates.requirements,
        requirementsAr: updates.requirements_ar || updates.requirementsAr,
        isActive: updates.is_active,
        publishDate: updates.publish_date ? new Date(updates.publish_date) : undefined,
        expiryDate: updates.expiry_date ? new Date(updates.expiry_date) : null,
      },
    })
    
    return {
      id: job.id,
      title: job.title,
      title_ar: job.titleAr,
      department: job.department,
      location: job.location,
      job_type: job.jobType,
      working_hours: job.workingHours,
      description: job.description,
      description_ar: job.descriptionAr,
      requirements: job.requirements,
      requirements_ar: job.requirementsAr,
      is_active: job.isActive,
      publish_date: job.publishDate.toISOString(),
      expiry_date: job.expiryDate?.toISOString() || null,
      created_at: job.createdAt.toISOString(),
      updated_at: job.updatedAt.toISOString(),
    }
  },

  // Delete job
  delete: async (id: string) => {
    await prisma.job.delete({
      where: { id },
    })
  },
}

// ===================================
// Job Applications API
// ===================================
export const jobApplicationsAPI = {
  // Get all applications
  getAll: async () => {
    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        job: true
      }
    })
    
    return applications.map(app => ({
      id: app.id,
      job_id: app.jobId,
      job_title: app.job?.title || 'General Application',
      full_name: app.fullName,
      email: app.email,
      phone: app.phone,
      cv_url: app.cvUrl,
      cover_letter: app.coverLetter,
      status: app.status,
      created_at: app.createdAt.toISOString(),
    }))
  },

  // Get applications for a specific job
  getByJobId: async (jobId: string) => {
    const applications = await prisma.jobApplication.findMany({
      where: { jobId },
      orderBy: { createdAt: 'desc' },
    })
    
    return applications.map(app => ({
      id: app.id,
      job_id: app.jobId,
      full_name: app.fullName,
      email: app.email,
      phone: app.phone,
      cv_url: app.cvUrl,
      cover_letter: app.coverLetter,
      status: app.status,
      created_at: app.createdAt.toISOString(),
    }))
  },

  // Get application by ID
  getById: async (id: string) => {
    const app = await prisma.jobApplication.findUnique({
      where: { id },
      include: {
        job: true
      }
    })
    
    if (!app) return null
    
    return {
      id: app.id,
      job_id: app.jobId,
      job_title: app.job?.title || 'General Application',
      full_name: app.fullName,
      email: app.email,
      phone: app.phone,
      cv_url: app.cvUrl,
      cover_letter: app.coverLetter,
      status: app.status,
      created_at: app.createdAt.toISOString(),
    }
  },

  // Create application
  create: async (data: any) => {
    const application = await prisma.jobApplication.create({
      data: {
        jobId: data.job_id || null,
        fullName: data.full_name || data.fullName,
        email: data.email,
        phone: data.phone,
        cvUrl: data.cv_url || data.cvUrl,
        coverLetter: data.cover_letter || data.coverLetter,
        status: data.status || 'pending',
      },
    })
    
    return {
      id: application.id,
      job_id: application.jobId,
      full_name: application.fullName,
      email: application.email,
      phone: application.phone,
      cv_url: application.cvUrl,
      cover_letter: application.coverLetter,
      status: application.status,
      created_at: application.createdAt.toISOString(),
    }
  },

  // Update application status
  updateStatus: async (id: string, status: string) => {
    const application = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    })
    
    return {
      id: application.id,
      job_id: application.jobId,
      full_name: application.fullName,
      email: application.email,
      phone: application.phone,
      cv_url: application.cvUrl,
      cover_letter: application.coverLetter,
      status: application.status,
      created_at: application.createdAt.toISOString(),
    }
  },

  // Delete application
  delete: async (id: string) => {
    await prisma.jobApplication.delete({
      where: { id },
    })
  },
}
