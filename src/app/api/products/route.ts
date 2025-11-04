import { NextRequest, NextResponse } from 'next/server';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID, createServerClient } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Databases } from 'node-appwrite';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (ids) {
      // Fetch specific products by IDs
      const productIds = ids.split(',').filter(id => id.trim());

      if (productIds.length === 0) {
        return NextResponse.json({ success: true, products: [] });
      }

      const serverClient = createServerClient();
      const serverDatabases = new Databases(serverClient);

      const products = [];
      for (const productId of productIds) {
        try {
          const product = await serverDatabases.getDocument(
            DATABASE_ID,
            PRODUCTS_COLLECTION_ID,
            productId.trim()
          );
          products.push(product);
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          // Continue with other products
        }
      }

      return NextResponse.json({ success: true, products });
    }

    // Regular product listing (existing logic)
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const available = searchParams.get('available');

    const queries = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('$createdAt')
    ];

    if (search) {
      queries.push(Query.search('name', search));
    }

    if (category && category !== 'all') {
      queries.push(Query.equal('category_id', category));
    }

    if (brand && brand !== 'all') {
      queries.push(Query.equal('brand_id', brand));
    }

    if (available === 'true') {
      queries.push(Query.equal('is_active', true));
    }

    const products = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      queries
    );

    return NextResponse.json({
      success: true,
      products: products.documents,
      total: products.total
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      error: 'Failed to fetch products'
    }, { status: 500 });
  }
}