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

// Jobs Interface
export interface Job {
  id: string
  title: string
  title_ar?: string | null
  department: string
  location: string
  job_type: string
  working_hours: string
  description: string
  description_ar?: string | null
  requirements: string
  requirements_ar?: string | null
  is_active: boolean
  publish_date: string
  expiry_date?: string | null
  created_at: string
  updated_at: string
  applications_count?: number
}

// Job Application Interface
export interface JobApplication {
  id: string
  job_id?: string | null
  job_title?: string
  full_name: string
  email: string
  phone: string
  cv_url: string
  cover_letter?: string | null
  status: string
  created_at: string
}

// Jobs API
export const jobsAPI = {
  getAll: async (activeOnly = false): Promise<Job[]> => {
    const url = activeOnly ? '/api/jobs?active=true' : '/api/jobs'
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch jobs')
    return res.json()
  },

  getActive: async (): Promise<Job[]> => {
    const res = await fetch('/api/jobs?active=true')
    if (!res.ok) throw new Error('Failed to fetch active jobs')
    return res.json()
  },

  create: async (data: any): Promise<Job> => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create job')
    return res.json()
  },

  update: async (id: string, data: any): Promise<Job> => {
    const res = await fetch(`/api/jobs?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update job')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/jobs?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete job')
  },
}

// Leadership Team Interface
export interface LeadershipMember {
  id: string
  name: string
  name_ar?: string | null
  title: string
  title_ar?: string | null
  department: string
  department_ar?: string | null
  bio: string
  bio_ar?: string | null
  image_url: string | null
  is_leadership: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

// Leadership Team API
export const leadershipAPI = {
  getAll: async (): Promise<LeadershipMember[]> => {
    const res = await fetch('/api/leadership')
    if (!res.ok) throw new Error('Failed to fetch leadership team')
    return res.json()
  },

  create: async (data: any): Promise<LeadershipMember> => {
    const res = await fetch('/api/leadership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create leadership member')
    return res.json()
  },

  update: async (id: string, data: any): Promise<LeadershipMember> => {
    const res = await fetch(`/api/leadership?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update leadership member')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/leadership?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete leadership member')
  },
}

// Job Applications API
export const jobApplicationsAPI = {
  getAll: async (): Promise<JobApplication[]> => {
    const res = await fetch('/api/applications')
    if (!res.ok) throw new Error('Failed to fetch applications')
    return res.json()
  },

  getByJobId: async (jobId: string): Promise<JobApplication[]> => {
    const res = await fetch(`/api/applications?jobId=${jobId}`)
    if (!res.ok) throw new Error('Failed to fetch applications')
    return res.json()
  },

  submit: async (data: any): Promise<JobApplication> => {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to submit application')
    return res.json()
  },

  updateStatus: async (id: string, status: string): Promise<JobApplication> => {
    const res = await fetch(`/api/applications?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) throw new Error('Failed to update application status')
    return res.json()
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`/api/applications?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete application')
  },
}
