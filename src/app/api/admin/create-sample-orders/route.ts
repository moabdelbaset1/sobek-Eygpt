import { NextRequest, NextResponse } from 'next/server'
import { Client, Databases, ID } from 'node-appwrite'

// Initialize Appwrite
function createAdminClient() {
  const client = new Client()
  const apiKey = process.env.APPWRITE_API_KEY
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

  if (!apiKey || !endpoint || !projectId) {
    throw new Error('Missing Appwrite configuration')
  }

  client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey)

  console.log('✅ Admin client created successfully')
  return new Databases(client)
}

export async function POST(request: NextRequest) {
  try {
    const databases = createAdminClient()
    const databaseId = process.env.APPWRITE_DATABASE_ID || '68dbeceb003bf10d9498'

    const sampleOrders = [
      {
        order_code: 'ORD-001',
        customer_name: 'Ahmed Mohamed',
        customer_email: 'ahmed@example.com',
        total_amount: 250.50,
        payable_amount: 250.50,
        order_status: 'pending',
        status: 'pending',
        payment_status: 'paid',
        fulfillment_status: 'pending',
        brand_id: 'brand1',
        items: JSON.stringify([
          { product_id: 'prod1', name: 'Black Shirt', quantity: 2, price: 125.25 }
        ]),
        shipping_address: JSON.stringify({
          street: '123 Main Street',
          city: 'Cairo',
          country: 'Egypt'
        })
      },
      {
        order_code: 'ORD-002',
        customer_name: 'Fatima Ahmed',
        customer_email: 'fatima@example.com',
        total_amount: 180.00,
        payable_amount: 180.00,
        order_status: 'shipped',
        status: 'shipped',
        payment_status: 'paid',
        fulfillment_status: 'shipped',
        brand_id: 'brand2',
        shipped_at: new Date().toISOString(),
        tracking_number: 'TRK123456',
        carrier: 'DHL',
        items: JSON.stringify([
          { product_id: 'prod2', name: 'White T-Shirt', quantity: 1, price: 180.00 }
        ]),
        shipping_address: JSON.stringify({
          street: '456 Republic Street',
          city: 'Alexandria',
          country: 'Egypt'
        })
      },
      {
        order_code: 'ORD-003',
        customer_name: 'Mohamed Ali',
        customer_email: 'mohamed@example.com',
        total_amount: 320.75,
        payable_amount: 320.75,
        order_status: 'delivered',
        status: 'delivered',
        payment_status: 'paid',
        fulfillment_status: 'delivered',
        brand_id: 'brand3',
        shipped_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        delivered_at: new Date().toISOString(),
        tracking_number: 'TRK789012',
        carrier: 'FedEx',
        items: JSON.stringify([
          { product_id: 'prod3', name: 'Blue Jeans', quantity: 3, price: 106.92 }
        ]),
        shipping_address: JSON.stringify({
          street: '789 El Moez Street',
          city: 'Giza',
          country: 'Egypt'
        })
      },
      {
        order_code: 'ORD-004',
        customer_name: 'Sara Hassan',
        customer_email: 'sara@example.com',
        total_amount: 95.25,
        payable_amount: 95.25,
        order_status: 'returned',
        status: 'returned',
        payment_status: 'refunded',
        fulfillment_status: 'returned',
        brand_id: 'brand4',
        shipped_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        delivered_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        tracking_number: 'TRK345678',
        carrier: 'Aramex',
        items: JSON.stringify([
          { product_id: 'prod4', name: 'Red Dress', quantity: 1, price: 95.25 }
        ]),
        shipping_address: JSON.stringify({
          street: '321 Pyramid Street',
          city: 'Giza',
          country: 'Egypt'
        })
      },
      {
        order_code: 'ORD-005',
        customer_name: 'Omar Hossam',
        customer_email: 'omar@example.com',
        total_amount: 450.00,
        payable_amount: 450.00,
        order_status: 'processing',
        status: 'processing',
        payment_status: 'paid',
        fulfillment_status: 'processing',
        brand_id: 'brand5',
        items: JSON.stringify([
          { product_id: 'prod5', name: 'Black Jacket', quantity: 2, price: 225.00 }
        ]),
        shipping_address: JSON.stringify({
          street: '654 Mediterranean Street',
          city: 'Alexandria',
          country: 'Egypt'
        })
      }
    ]

    console.log('🚀 Creating sample orders via API...')
    
    const createdOrders = []
    for (const order of sampleOrders) {
      try {
        const result = await databases.createDocument(
          databaseId,
          'orders',
          ID.unique(),
          order
        )
        console.log(`✅ Created order: ${order.order_code} (${result.$id})`)
        createdOrders.push(result)
      } catch (error) {
        console.error(`❌ Failed to create order ${order.order_code}:`, error)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Created ${createdOrders.length} sample orders`,
      orders: createdOrders
    })

  } catch (error) {
    console.error('❌ Error creating sample orders:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create sample orders' 
      },
      { status: 500 }
    )
  }
}