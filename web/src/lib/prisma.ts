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
