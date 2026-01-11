import { Client, Databases, Storage, ID, Query } from 'appwrite';
import {
    mockCategories,
    mockHumanProducts,
    mockVeterinaryProducts,
    mockMediaPosts,
    mockJobs,
    mockJobApplications,
    mockLeadership,
} from './mockData';

// Check if we should use mock data (for local development)
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '';

// Collection IDs
export const COLLECTIONS = {
    HUMAN_PRODUCTS: 'human_products',
    VETERINARY_PRODUCTS: 'veterinary_products',
    CATEGORIES: 'categories',
    MEDIA_POSTS: 'media_posts',
    JOBS: 'jobs',
    JOB_APPLICATIONS: 'job_applications',
    LEADERSHIP: 'leadership',
};

// Helper function to handle Appwrite errors
export function handleAppwriteError(error: any) {
    console.error('Appwrite error:', error);
    return {
        error: error.message || 'An error occurred',
        code: error.code || 500
    };
}

// Helper to simulate async delay for mock data
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 100));

// ================== Human Products API ==================
export const humanProductsAPI = {
    getAll: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockHumanProducts.filter(p => p.isActive);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.HUMAN_PRODUCTS,
                [Query.equal('isActive', true), Query.orderDesc('$createdAt')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getById: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const product = mockHumanProducts.find(p => p.id === id);
            if (!product) throw new Error('Product not found');
            return product;
        }
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.HUMAN_PRODUCTS,
                id
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getByCategory: async (category: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockHumanProducts.filter(p => p.category === category && p.isActive);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.HUMAN_PRODUCTS,
                [
                    Query.equal('category', category),
                    Query.equal('isActive', true),
                    Query.orderDesc('$createdAt')
                ]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    create: async (data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const newProduct = {
                id: `mock-${Date.now()}`,
                $id: `mock-${Date.now()}`,
                name: data.name,
                genericName: data.generic_name || data.genericName,
                strength: data.strength,
                dosageForm: data.dosage_form || data.dosageForm,
                indication: data.indication,
                packSize: data.pack_size || data.packSize || null,
                registrationNumber: data.registration_number || data.registrationNumber || null,
                category: data.category,
                imageUrl: data.image_url || data.imageUrl || null,
                price: data.price || null,
                isActive: data.is_active !== undefined ? data.is_active : true,
                $createdAt: new Date().toISOString(),
            };
            mockHumanProducts.push(newProduct as any);
            return newProduct;
        }
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.HUMAN_PRODUCTS,
                ID.unique(),
                {
                    name: data.name,
                    genericName: data.generic_name || data.genericName,
                    strength: data.strength,
                    dosageForm: data.dosage_form || data.dosageForm,
                    indication: data.indication,
                    packSize: data.pack_size || data.packSize || null,
                    registrationNumber: data.registration_number || data.registrationNumber || null,
                    category: data.category,
                    imageUrl: data.image_url || data.imageUrl || null,
                    price: data.price || null,
                    isActive: data.is_active !== undefined ? data.is_active : true,
                }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    update: async (id: string, data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockHumanProducts.findIndex(p => p.id === id);
            if (index === -1) throw new Error('Product not found');

            // Map snake_case to camelCase for consistent storage
            const updateData: any = { ...mockHumanProducts[index] };
            if (data.name) updateData.name = data.name;
            if (data.generic_name || data.genericName) updateData.genericName = data.generic_name || data.genericName;
            if (data.strength) updateData.strength = data.strength;
            if (data.dosage_form || data.dosageForm) updateData.dosageForm = data.dosage_form || data.dosageForm;
            if (data.indication) updateData.indication = data.indication;
            if (data.pack_size !== undefined || data.packSize !== undefined) updateData.packSize = data.pack_size || data.packSize;
            if (data.registration_number !== undefined || data.registrationNumber !== undefined) updateData.registrationNumber = data.registration_number || data.registrationNumber;
            if (data.category) updateData.category = data.category;
            if (data.image_url !== undefined || data.imageUrl !== undefined) updateData.imageUrl = data.image_url || data.imageUrl;
            if (data.price !== undefined) updateData.price = data.price;
            if (data.is_active !== undefined) updateData.isActive = data.is_active;

            mockHumanProducts[index] = updateData as any;
            return updateData;
        }
        try {
            const updateData: any = {};
            if (data.name) updateData.name = data.name;
            if (data.generic_name || data.genericName) updateData.genericName = data.generic_name || data.genericName;
            if (data.strength) updateData.strength = data.strength;
            if (data.dosage_form || data.dosageForm) updateData.dosageForm = data.dosage_form || data.dosageForm;
            if (data.indication) updateData.indication = data.indication;
            if (data.pack_size !== undefined || data.packSize !== undefined) updateData.packSize = data.pack_size || data.packSize;
            if (data.registration_number !== undefined || data.registrationNumber !== undefined) updateData.registrationNumber = data.registration_number || data.registrationNumber;
            if (data.category) updateData.category = data.category;
            if (data.image_url !== undefined || data.imageUrl !== undefined) updateData.imageUrl = data.image_url || data.imageUrl;
            if (data.price !== undefined) updateData.price = data.price;
            if (data.is_active !== undefined) updateData.isActive = data.is_active;

            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.HUMAN_PRODUCTS,
                id,
                updateData
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    delete: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockHumanProducts.findIndex(p => p.id === id);
            if (index !== -1) mockHumanProducts.splice(index, 1);
            return { success: true };
        }
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.HUMAN_PRODUCTS,
                id
            );
            return { success: true };
        } catch (error) {
            throw handleAppwriteError(error);
        }
    }
};

// ================== Veterinary Products API ==================
export const veterinaryProductsAPI = {
    getAll: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockVeterinaryProducts.filter(p => p.isActive);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.VETERINARY_PRODUCTS,
                [Query.equal('isActive', true), Query.orderDesc('$createdAt')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getById: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const product = mockVeterinaryProducts.find(p => p.id === id);
            if (!product) throw new Error('Product not found');
            return product;
        }
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.VETERINARY_PRODUCTS,
                id
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getByCategory: async (category: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockVeterinaryProducts.filter(p => p.category === category && p.isActive);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.VETERINARY_PRODUCTS,
                [
                    Query.equal('category', category),
                    Query.equal('isActive', true),
                    Query.orderDesc('$createdAt')
                ]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    create: async (data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const newProduct = {
                id: `mock-${Date.now()}`,
                $id: `mock-${Date.now()}`,
                name: data.name,
                genericName: data.generic_name || data.genericName,
                strength: data.strength,
                dosageForm: data.dosage_form || data.dosageForm,
                indication: data.indication,
                species: data.species,
                withdrawalPeriod: data.withdrawal_period || data.withdrawalPeriod || null,
                packSize: data.pack_size || data.packSize || null,
                registrationNumber: data.registration_number || data.registrationNumber || null,
                category: data.category,
                imageUrl: data.image_url || data.imageUrl || null,
                price: data.price || null,
                isActive: data.is_active !== undefined ? data.is_active : true,
                $createdAt: new Date().toISOString(),
            };
            mockVeterinaryProducts.push(newProduct as any);
            return newProduct;
        }
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.VETERINARY_PRODUCTS,
                ID.unique(),
                {
                    name: data.name,
                    genericName: data.generic_name || data.genericName,
                    strength: data.strength,
                    dosageForm: data.dosage_form || data.dosageForm,
                    indication: data.indication,
                    species: data.species,
                    withdrawalPeriod: data.withdrawal_period || data.withdrawalPeriod || null,
                    packSize: data.pack_size || data.packSize || null,
                    registrationNumber: data.registration_number || data.registrationNumber || null,
                    category: data.category,
                    imageUrl: data.image_url || data.imageUrl || null,
                    price: data.price || null,
                    isActive: data.is_active !== undefined ? data.is_active : true,
                }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    update: async (id: string, data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockVeterinaryProducts.findIndex(p => p.id === id);
            if (index === -1) throw new Error('Product not found');

            // Map snake_case to camelCase for consistent storage
            const updateData: any = { ...mockVeterinaryProducts[index] };
            if (data.name) updateData.name = data.name;
            if (data.generic_name || data.genericName) updateData.genericName = data.generic_name || data.genericName;
            if (data.strength) updateData.strength = data.strength;
            if (data.dosage_form || data.dosageForm) updateData.dosageForm = data.dosage_form || data.dosageForm;
            if (data.indication) updateData.indication = data.indication;
            if (data.species) updateData.species = data.species;
            if (data.withdrawal_period !== undefined || data.withdrawalPeriod !== undefined) updateData.withdrawalPeriod = data.withdrawal_period || data.withdrawalPeriod;
            if (data.pack_size !== undefined || data.packSize !== undefined) updateData.packSize = data.pack_size || data.packSize;
            if (data.registration_number !== undefined || data.registrationNumber !== undefined) updateData.registrationNumber = data.registration_number || data.registrationNumber;
            if (data.category) updateData.category = data.category;
            if (data.image_url !== undefined || data.imageUrl !== undefined) updateData.imageUrl = data.image_url || data.imageUrl;
            if (data.price !== undefined) updateData.price = data.price;
            if (data.is_active !== undefined) updateData.isActive = data.is_active;

            mockVeterinaryProducts[index] = updateData as any;
            return updateData;
        }
        try {
            const updateData: any = {};
            if (data.name) updateData.name = data.name;
            if (data.generic_name || data.genericName) updateData.genericName = data.generic_name || data.genericName;
            if (data.strength) updateData.strength = data.strength;
            if (data.dosage_form || data.dosageForm) updateData.dosageForm = data.dosage_form || data.dosageForm;
            if (data.indication) updateData.indication = data.indication;
            if (data.species) updateData.species = data.species;
            if (data.withdrawal_period !== undefined || data.withdrawalPeriod !== undefined) updateData.withdrawalPeriod = data.withdrawal_period || data.withdrawalPeriod;
            if (data.pack_size !== undefined || data.packSize !== undefined) updateData.packSize = data.pack_size || data.packSize;
            if (data.registration_number !== undefined || data.registrationNumber !== undefined) updateData.registrationNumber = data.registration_number || data.registrationNumber;
            if (data.category) updateData.category = data.category;
            if (data.image_url !== undefined || data.imageUrl !== undefined) updateData.imageUrl = data.image_url || data.imageUrl;
            if (data.price !== undefined) updateData.price = data.price;
            if (data.is_active !== undefined) updateData.isActive = data.is_active;

            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.VETERINARY_PRODUCTS,
                id,
                updateData
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    delete: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockVeterinaryProducts.findIndex(p => p.id === id);
            if (index !== -1) mockVeterinaryProducts.splice(index, 1);
            return { success: true };
        }
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.VETERINARY_PRODUCTS,
                id
            );
            return { success: true };
        } catch (error) {
            throw handleAppwriteError(error);
        }
    }
};

// ================== Categories API ==================
export const categoriesAPI = {
    getAll: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockCategories;
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                [Query.orderAsc('name')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getByType: async (type: 'human' | 'veterinary') => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockCategories.filter(c => c.type === type);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                [Query.equal('type', type), Query.orderAsc('name')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    create: async (data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const newCategory = {
                id: `mock-${Date.now()}`,
                $id: `mock-${Date.now()}`,
                name: data.name,
                nameAr: data.name_ar || data.nameAr || null,
                slug: data.slug,
                type: data.type,
                icon: data.icon || null,
                description: data.description || null,
                $createdAt: new Date().toISOString(),
            };
            mockCategories.push(newCategory as any);
            return newCategory;
        }
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                ID.unique(),
                {
                    name: data.name,
                    nameAr: data.name_ar || data.nameAr || null,
                    slug: data.slug,
                    type: data.type,
                    icon: data.icon || null,
                    description: data.description || null,
                }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    update: async (id: string, data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockCategories.findIndex(c => c.id === id);
            if (index === -1) throw new Error('Category not found');
            const updated = { ...mockCategories[index], ...data };
            mockCategories[index] = updated as any;
            return updated;
        }
        try {
            const updateData: any = {};
            if (data.name) updateData.name = data.name;
            if (data.name_ar !== undefined || data.nameAr !== undefined) updateData.nameAr = data.name_ar || data.nameAr;
            if (data.slug) updateData.slug = data.slug;
            if (data.type) updateData.type = data.type;
            if (data.icon !== undefined) updateData.icon = data.icon;
            if (data.description !== undefined) updateData.description = data.description;

            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                id,
                updateData
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    delete: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockCategories.findIndex(c => c.id === id);
            if (index !== -1) mockCategories.splice(index, 1);
            return { success: true };
        }
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                id
            );
            return { success: true };
        } catch (error) {
            throw handleAppwriteError(error);
        }
    }
};

// ================== Media Posts API ==================
export const mediaPostsAPI = {
    getAll: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockMediaPosts.filter(p => p.isActive);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.MEDIA_POSTS,
                [Query.equal('isActive', true), Query.orderDesc('publishDate')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getByType: async (type: 'news' | 'event') => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockMediaPosts.filter(p => p.type === type && p.isActive);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.MEDIA_POSTS,
                [
                    Query.equal('type', type),
                    Query.equal('isActive', true),
                    Query.orderDesc('publishDate')
                ]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getById: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const post = mockMediaPosts.find(p => p.id === id);
            if (!post) throw new Error('Post not found');
            return post;
        }
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.MEDIA_POSTS,
                id
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    create: async (data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const newPost = {
                id: `mock-${Date.now()}`,
                $id: `mock-${Date.now()}`,
                title: data.title,
                titleAr: data.title_ar || data.titleAr || null,
                content: data.content,
                contentAr: data.content_ar || data.contentAr || null,
                type: data.type,
                mediaType: data.media_type || data.mediaType || null,
                mediaUrl: data.media_url || data.mediaUrl || null,
                isActive: data.is_active !== undefined ? data.is_active : true,
                publishDate: data.publish_date || data.publishDate || new Date().toISOString(),
                $createdAt: new Date().toISOString(),
            };
            mockMediaPosts.push(newPost as any);
            return newPost;
        }
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.MEDIA_POSTS,
                ID.unique(),
                {
                    title: data.title,
                    titleAr: data.title_ar || data.titleAr || null,
                    content: data.content,
                    contentAr: data.content_ar || data.contentAr || null,
                    type: data.type,
                    mediaType: data.media_type || data.mediaType || null,
                    mediaUrl: data.media_url || data.mediaUrl || null,
                    isActive: data.is_active !== undefined ? data.is_active : true,
                    publishDate: data.publish_date || data.publishDate || new Date().toISOString(),
                }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    update: async (id: string, data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockMediaPosts.findIndex(p => p.id === id);
            if (index === -1) throw new Error('Post not found');
            const updated = { ...mockMediaPosts[index], ...data };
            mockMediaPosts[index] = updated as any;
            return updated;
        }
        try {
            const updateData: any = {};
            if (data.title) updateData.title = data.title;
            if (data.title_ar !== undefined || data.titleAr !== undefined) updateData.titleAr = data.title_ar || data.titleAr;
            if (data.content) updateData.content = data.content;
            if (data.content_ar !== undefined || data.contentAr !== undefined) updateData.contentAr = data.content_ar || data.contentAr;
            if (data.type) updateData.type = data.type;
            if (data.media_type !== undefined || data.mediaType !== undefined) updateData.mediaType = data.media_type || data.mediaType;
            if (data.media_url !== undefined || data.mediaUrl !== undefined) updateData.mediaUrl = data.media_url || data.mediaUrl;
            if (data.is_active !== undefined) updateData.isActive = data.is_active;
            if (data.publish_date || data.publishDate) updateData.publishDate = data.publish_date || data.publishDate;

            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.MEDIA_POSTS,
                id,
                updateData
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    delete: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockMediaPosts.findIndex(p => p.id === id);
            if (index !== -1) mockMediaPosts.splice(index, 1);
            return { success: true };
        }
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.MEDIA_POSTS,
                id
            );
            return { success: true };
        } catch (error) {
            throw handleAppwriteError(error);
        }
    }
};

// ================== Jobs API ==================
export const jobsAPI = {
    getAll: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockJobs;
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.JOBS,
                [Query.orderDesc('$createdAt')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getActive: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockJobs.filter(j => j.isActive);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.JOBS,
                [Query.equal('isActive', true), Query.orderDesc('$createdAt')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getById: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const job = mockJobs.find(j => j.id === id);
            if (!job) throw new Error('Job not found');
            return job;
        }
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.JOBS,
                id
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    create: async (data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const newJob = {
                id: `mock-${Date.now()}`,
                $id: `mock-${Date.now()}`,
                title: data.title,
                titleAr: data.title_ar || data.titleAr || null,
                department: data.department,
                location: data.location,
                jobType: data.job_type || data.jobType,
                workingHours: data.working_hours || data.workingHours,
                description: data.description,
                descriptionAr: data.description_ar || data.descriptionAr || null,
                requirements: data.requirements,
                requirementsAr: data.requirements_ar || data.requirementsAr || null,
                isActive: data.is_active !== undefined ? data.is_active : true,
                $createdAt: new Date().toISOString(),
            };
            mockJobs.push(newJob as any);
            return newJob;
        }
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.JOBS,
                ID.unique(),
                {
                    title: data.title,
                    titleAr: data.title_ar || data.titleAr || null,
                    department: data.department,
                    location: data.location,
                    jobType: data.job_type || data.jobType,
                    workingHours: data.working_hours || data.workingHours,
                    description: data.description,
                    descriptionAr: data.description_ar || data.descriptionAr || null,
                    requirements: data.requirements,
                    requirementsAr: data.requirements_ar || data.requirementsAr || null,
                    isActive: data.is_active !== undefined ? data.is_active : true,
                }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    update: async (id: string, data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockJobs.findIndex(j => j.id === id);
            if (index === -1) throw new Error('Job not found');
            const updated = { ...mockJobs[index], ...data };
            mockJobs[index] = updated as any;
            return updated;
        }
        try {
            const updateData: any = {};
            if (data.title) updateData.title = data.title;
            if (data.title_ar !== undefined || data.titleAr !== undefined) updateData.titleAr = data.title_ar || data.titleAr;
            if (data.department) updateData.department = data.department;
            if (data.location) updateData.location = data.location;
            if (data.job_type || data.jobType) updateData.jobType = data.job_type || data.jobType;
            if (data.working_hours || data.workingHours) updateData.workingHours = data.working_hours || data.workingHours;
            if (data.description) updateData.description = data.description;
            if (data.description_ar !== undefined || data.descriptionAr !== undefined) updateData.descriptionAr = data.description_ar || data.descriptionAr;
            if (data.requirements) updateData.requirements = data.requirements;
            if (data.requirements_ar !== undefined || data.requirementsAr !== undefined) updateData.requirementsAr = data.requirements_ar || data.requirementsAr;
            if (data.is_active !== undefined) updateData.isActive = data.is_active;

            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.JOBS,
                id,
                updateData
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    delete: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockJobs.findIndex(j => j.id === id);
            if (index !== -1) mockJobs.splice(index, 1);
            return { success: true };
        }
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.JOBS,
                id
            );
            return { success: true };
        } catch (error) {
            throw handleAppwriteError(error);
        }
    }
};

// ================== Leadership API ==================
export const leadershipAPI = {
    getAll: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockLeadership;
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.LEADERSHIP,
                [Query.orderAsc('order')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getById: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const member = mockLeadership.find(m => m.id === id);
            if (!member) throw new Error('Leadership member not found');
            return member;
        }
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.LEADERSHIP,
                id
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    create: async (data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const newMember = {
                id: `mock-${Date.now()}`,
                $id: `mock-${Date.now()}`,
                name: data.name,
                nameAr: data.name_ar || data.nameAr || null,
                position: data.position,
                positionAr: data.position_ar || data.positionAr || null,
                bio: data.bio || null,
                bioAr: data.bio_ar || data.bioAr || null,
                imageUrl: data.image_url || data.imageUrl || null,
                order: data.order || 0,
                $createdAt: new Date().toISOString(),
            };
            mockLeadership.push(newMember as any);
            return newMember;
        }
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.LEADERSHIP,
                ID.unique(),
                {
                    name: data.name,
                    nameAr: data.name_ar || data.nameAr || null,
                    position: data.position,
                    positionAr: data.position_ar || data.positionAr || null,
                    bio: data.bio || null,
                    bioAr: data.bio_ar || data.bioAr || null,
                    imageUrl: data.image_url || data.imageUrl || null,
                    order: data.order || 0,
                }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    update: async (id: string, data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockLeadership.findIndex(m => m.id === id);
            if (index === -1) throw new Error('Leadership member not found');
            const updated = { ...mockLeadership[index], ...data };
            mockLeadership[index] = updated as any;
            return updated;
        }
        try {
            const updateData: any = {};
            if (data.name) updateData.name = data.name;
            if (data.name_ar !== undefined || data.nameAr !== undefined) updateData.nameAr = data.name_ar || data.nameAr;
            if (data.position) updateData.position = data.position;
            if (data.position_ar !== undefined || data.positionAr !== undefined) updateData.positionAr = data.position_ar || data.positionAr;
            if (data.bio !== undefined) updateData.bio = data.bio;
            if (data.bio_ar !== undefined || data.bioAr !== undefined) updateData.bioAr = data.bio_ar || data.bioAr;
            if (data.image_url !== undefined || data.imageUrl !== undefined) updateData.imageUrl = data.image_url || data.imageUrl;
            if (data.order !== undefined) updateData.order = data.order;

            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.LEADERSHIP,
                id,
                updateData
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    delete: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockLeadership.findIndex(m => m.id === id);
            if (index !== -1) mockLeadership.splice(index, 1);
            return { success: true };
        }
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.LEADERSHIP,
                id
            );
            return { success: true };
        } catch (error) {
            throw handleAppwriteError(error);
        }
    }
};

// ================== Job Applications API ==================
export const jobApplicationsAPI = {
    getAll: async () => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockJobApplications;
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.JOB_APPLICATIONS,
                [Query.orderDesc('$createdAt')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    getByJobId: async (jobId: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            return mockJobApplications.filter(app => app.jobId === jobId);
        }
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.JOB_APPLICATIONS,
                [Query.equal('jobId', jobId), Query.orderDesc('$createdAt')]
            );
            return response.documents;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    create: async (data: any) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const newApp = {
                id: `mock-${Date.now()}`,
                $id: `mock-${Date.now()}`,
                jobId: data.job_id || data.jobId,
                fullName: data.full_name || data.fullName,
                email: data.email,
                phone: data.phone,
                coverLetter: data.cover_letter || data.coverLetter || null,
                cvUrl: data.cv_url || data.cvUrl,
                status: data.status || 'pending',
                $createdAt: new Date().toISOString(),
            };
            mockJobApplications.push(newApp as any);
            return newApp;
        }
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.JOB_APPLICATIONS,
                ID.unique(),
                {
                    jobId: data.job_id || data.jobId,
                    fullName: data.full_name || data.fullName,
                    email: data.email,
                    phone: data.phone,
                    coverLetter: data.cover_letter || data.coverLetter || null,
                    cvUrl: data.cv_url || data.cvUrl,
                    status: data.status || 'pending',
                }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    updateStatus: async (id: string, status: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockJobApplications.findIndex(a => a.id === id);
            if (index !== -1) {
                (mockJobApplications[index] as any).status = status;
            }
            return mockJobApplications[index] || { id, status };
        }
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.JOB_APPLICATIONS,
                id,
                { status }
            );
            return response;
        } catch (error) {
            throw handleAppwriteError(error);
        }
    },

    delete: async (id: string) => {
        if (USE_MOCK_DATA) {
            await mockDelay();
            const index = mockJobApplications.findIndex(a => a.id === id);
            if (index !== -1) mockJobApplications.splice(index, 1);
            return { success: true };
        }
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.JOB_APPLICATIONS,
                id
            );
            return { success: true };
        } catch (error) {
            throw handleAppwriteError(error);
        }
    }
};

export { ID, Query };
export default client;
