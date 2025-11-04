import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { databases, DATABASE_ID, WISHLIST_COLLECTION_ID, createServerClient } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { Databases } from 'node-appwrite';

// Get user's wishlist
export const GET = withAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || user.$id;

    const serverClient = createServerClient();
    const serverDatabases = new Databases(serverClient);

    const wishlistItems = await serverDatabases.listDocuments(
      DATABASE_ID,
      'wishlists', // Collection ID for wishlists
      [
        Query.equal('user_id', userId),
        Query.orderDesc('$createdAt')
      ]
    );

    return NextResponse.json({
      success: true,
      items: wishlistItems.documents
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json({
      error: 'Failed to fetch wishlist'
    }, { status: 500 });
  }
});

// Add item to wishlist
export const POST = withAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({
        error: 'Product ID is required'
      }, { status: 400 });
    }

    const serverClient = createServerClient();
    const serverDatabases = new Databases(serverClient);

    // Check if item already exists in wishlist
    const existingItems = await serverDatabases.listDocuments(
      DATABASE_ID,
      'wishlists',
      [
        Query.equal('user_id', user.$id),
        Query.equal('product_id', productId)
      ]
    );

    if (existingItems.documents.length > 0) {
      return NextResponse.json({
        error: 'Item already in wishlist'
      }, { status: 400 });
    }

    // Add to wishlist
    const wishlistItem = await serverDatabases.createDocument(
      DATABASE_ID,
      'wishlists',
      ID.unique(),
      {
        user_id: user.$id,
        product_id: productId,
        added_at: new Date().toISOString()
      }
    );

    return NextResponse.json({
      success: true,
      item: wishlistItem
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json({
      error: 'Failed to add item to wishlist'
    }, { status: 500 });
  }
});

// Remove item from wishlist
export const DELETE = withAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({
        error: 'Product ID is required'
      }, { status: 400 });
    }

    const serverClient = createServerClient();
    const serverDatabases = new Databases(serverClient);

    // Find and delete the wishlist item
    const wishlistItems = await serverDatabases.listDocuments(
      DATABASE_ID,
      'wishlists',
      [
        Query.equal('user_id', user.$id),
        Query.equal('product_id', productId)
      ]
    );

    if (wishlistItems.documents.length === 0) {
      return NextResponse.json({
        error: 'Item not found in wishlist'
      }, { status: 404 });
    }

    await serverDatabases.deleteDocument(
      DATABASE_ID,
      'wishlists',
      wishlistItems.documents[0].$id
    );

    return NextResponse.json({
      success: true,
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json({
      error: 'Failed to remove item from wishlist'
    }, { status: 500 });
  }
});