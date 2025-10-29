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
        customer_id: 'user1',
        total_amount: 250.50,
        payable_amount: 250.50,
        order_status: 'pending',
        payment_status: 'paid',
        brand_id: 'brand1'
      },
      {
        order_code: 'ORD-002',
        customer_id: 'user2',
        total_amount: 180.00,
        payable_amount: 180.00,
        order_status: 'shipped',
        payment_status: 'paid',
        brand_id: 'brand2'
      },
      {
        order_code: 'ORD-003',
        customer_id: 'user3',
        total_amount: 320.75,
        payable_amount: 320.75,
        order_status: 'delivered',
        payment_status: 'paid',
        brand_id: 'brand3'
      },
      {
        order_code: 'ORD-004',
        customer_id: 'user4',
        total_amount: 95.25,
        payable_amount: 95.25,
        order_status: 'returned',
        payment_status: 'refunded',
        brand_id: 'brand4'
      },
      {
        order_code: 'ORD-005',
        customer_id: 'user5',
        total_amount: 450.00,
        payable_amount: 450.00,
        order_status: 'processing',
        payment_status: 'paid',
        brand_id: 'brand5'
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