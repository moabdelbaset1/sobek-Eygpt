import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { databases, DATABASE_ID, ORDERS_COLLECTION_ID, PRODUCTS_COLLECTION_ID, createServerClient } from '@/lib/appwrite';
import { ID } from 'appwrite';
import { Databases } from 'node-appwrite';

export const GET = withAuth(async (request: NextRequest, user) => {
  try {
    return NextResponse.json({ success: true, orders: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { customer_id, email, brand_id = '', items, shippingAddress, shippingCost = 0, taxAmount = 0, discountAmount = 0, subtotal } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Order items are required' }, { status: 400 });
    }

    const serverClient = createServerClient();
    const serverDatabases = new Databases(serverClient);
    
    const calculatedSubtotal = subtotal || items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = calculatedSubtotal + shippingCost + taxAmount - discountAmount;

    const date = new Date();
    const order_code = 'ORD-' + date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0') + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const orderData = {
      order_code,
      brand_id: brand_id || '',
      total_amount: totalAmount,
      payable_amount: totalAmount,
      order_status: 'pending',
      payment_status: 'unpaid'
    };

    const order = await serverDatabases.createDocument(DATABASE_ID, ORDERS_COLLECTION_ID, ID.unique(), orderData);

    for (const item of items) {
      try {
        const product = await serverDatabases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, item.productId);
        const newStock = Math.max(0, (product.units || 0) - item.quantity);
        await serverDatabases.updateDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, item.productId, { units: newStock });
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    }

    return NextResponse.json({ success: true, order: { id: order.$id, order_code: order.order_code, total_amount: order.total_amount, order_status: order.order_status }, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create order' }, { status: 500 });
  }
};
