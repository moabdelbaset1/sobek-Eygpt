import { Client, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

// Collection IDs - هتحتاج تعملهم في Appwrite Dashboard
export const COLLECTIONS = {
    HUMAN_PRODUCTS: 'human_products',
    VETERINARY_PRODUCTS: 'veterinary_products',
    CATEGORIES: 'categories',
};

export { ID };
export default client;
