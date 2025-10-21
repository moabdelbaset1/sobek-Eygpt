// Client-side API helpers for fetching data from API routes

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
  created_at: string
  updated_at: string
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
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  name_ar?: string | null
  slug: string
  type: string
  icon?: string | null
  description?: string | null
  created_at?: string
}

// Human Products API
export const humanProductsAPI = {
  getAll: async (): Promise<HumanProduct[]> => {
    const res = await fetch('/api/products/human')
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  getByCategory: async (category: string): Promise<HumanProduct[]> => {
    const res = await fetch(`/api/products/human?category=${encodeURIComponent(category)}`)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  create: async (data: any): Promise<HumanProduct> => {
    const res = await fetch('/api/products/human', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create product')
    return res.json()
  },

  update: async (id: string, data: any): Promise<HumanProduct> => {
    const res = await fetch(`/api/products/human?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update product')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/products/human?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete product')
  },
}

// Veterinary Products API
export const veterinaryProductsAPI = {
  getAll: async (): Promise<VeterinaryProduct[]> => {
    const res = await fetch('/api/products/veterinary')
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  getByCategory: async (category: string): Promise<VeterinaryProduct[]> => {
    const res = await fetch(`/api/products/veterinary?category=${encodeURIComponent(category)}`)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  create: async (data: any): Promise<VeterinaryProduct> => {
    const res = await fetch('/api/products/veterinary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create product')
    return res.json()
  },

  update: async (id: string, data: any): Promise<VeterinaryProduct> => {
    const res = await fetch(`/api/products/veterinary?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update product')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/products/veterinary?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete product')
  },
}

// Categories API
export const categoriesAPI = {
  getAll: async (): Promise<Category[]> => {
    const res = await fetch('/api/categories')
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  },

  getByType: async (type: 'human' | 'veterinary'): Promise<Category[]> => {
    const res = await fetch(`/api/categories?type=${type}`)
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  },

  create: async (data: any): Promise<Category> => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create category')
    return res.json()
  },

  update: async (id: string, data: any): Promise<Category> => {
    const res = await fetch(`/api/categories?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update category')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/categories?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete category')
  },
}

// Helper function for public pages
export async function getProductsByCategory(category: string): Promise<HumanProduct[]> {
  return humanProductsAPI.getByCategory(category)
}

// Media Posts interface
export interface MediaPost {
  id: string
  title: string
  title_ar?: string | null
  content: string
  content_ar?: string | null
  type: 'news' | 'event'
  media_type?: string | null
  media_url?: string | null
  is_active: boolean
  publish_date: string
  created_at: string
  updated_at: string
}

// Media Posts API
export const mediaPostsAPI = {
  getAll: async (): Promise<MediaPost[]> => {
    const res = await fetch('/api/media')
    if (!res.ok) throw new Error('Failed to fetch media posts')
    return res.json()
  },

  getByType: async (type: 'news' | 'event'): Promise<MediaPost[]> => {
    const res = await fetch(`/api/media?type=${type}`)
    if (!res.ok) throw new Error('Failed to fetch media posts')
    return res.json()
  },

  create: async (data: any): Promise<MediaPost> => {
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create media post')
    return res.json()
  },

  update: async (id: string, data: any): Promise<MediaPost> => {
    const res = await fetch(`/api/media?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update media post')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/media?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete media post')
  },
}
