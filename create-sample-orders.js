import { Client, Databases, ID } from 'node-appwrite'

const client = new Client()
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '68dbeba80017571a1581')
  .setKey(process.env.APPWRITE_API_KEY || '')

const databases = new Databases(client)
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '68dbeceb003bf10d9498'

async function createSampleOrders() {
  const sampleOrders = [
    {
      order_number: 'ORD-001',
      customer_name: 'أحمد محمد',
      customer_email: 'ahmed@example.com',
      total_amount: 250.50,
      status: 'pending',
      payment_status: 'paid',
      fulfillment_status: 'pending',
      items: JSON.stringify([
        { product_id: 'prod1', name: 'Product 1', quantity: 2, price: 125.25 }
      ]),
      shipping_address: JSON.stringify({
        street: 'شارع التحرير',
        city: 'القاهرة',
        country: 'مصر'
      })
    },
    {
      order_number: 'ORD-002',
      customer_name: 'فاطمة أحمد',
      customer_email: 'fatima@example.com',
      total_amount: 180.00,
      status: 'shipped',
      payment_status: 'paid',
      fulfillment_status: 'shipped',
      shipped_at: new Date().toISOString(),
      tracking_number: 'TRK123456',
      carrier: 'DHL',
      items: JSON.stringify([
        { product_id: 'prod2', name: 'Product 2', quantity: 1, price: 180.00 }
      ]),
      shipping_address: JSON.stringify({
        street: 'شارع الجمهورية',
        city: 'الإسكندرية',
        country: 'مصر'
      })
    },
    {
      order_number: 'ORD-003',
      customer_name: 'محمد علي',
      customer_email: 'mohamed@example.com',
      total_amount: 320.75,
      status: 'delivered',
      payment_status: 'paid',
      fulfillment_status: 'delivered',
      shipped_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      delivered_at: new Date().toISOString(),
      tracking_number: 'TRK789012',
      carrier: 'FedEx',
      items: JSON.stringify([
        { product_id: 'prod3', name: 'Product 3', quantity: 3, price: 106.92 }
      ]),
      shipping_address: JSON.stringify({
        street: 'شارع المعز',
        city: 'الجيزة',
        country: 'مصر'
      })
    },
    {
      order_number: 'ORD-004',
      customer_name: 'سارة حسن',
      customer_email: 'sara@example.com',
      total_amount: 95.25,
      status: 'returned',
      payment_status: 'refunded',
      fulfillment_status: 'returned',
      shipped_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      delivered_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      tracking_number: 'TRK345678',
      carrier: 'Aramex',
      items: JSON.stringify([
        { product_id: 'prod4', name: 'Product 4', quantity: 1, price: 95.25 }
      ]),
      shipping_address: JSON.stringify({
        street: 'شارع الهرم',
        city: 'الجيزة',
        country: 'مصر'
      })
    },
    {
      order_number: 'ORD-005',
      customer_name: 'عمر حسام',
      customer_email: 'omar@example.com',
      total_amount: 450.00,
      status: 'processing',
      payment_status: 'paid',
      fulfillment_status: 'processing',
      items: JSON.stringify([
        { product_id: 'prod5', name: 'Product 5', quantity: 2, price: 225.00 }
      ]),
      shipping_address: JSON.stringify({
        street: 'شارع البحر الأعظم',
        city: 'الإسكندرية',
        country: 'مصر'
      })
    }
  ]

  try {
    console.log('🚀 Creating sample orders...')
    
    for (const order of sampleOrders) {
      const result = await databases.createDocument(
        DATABASE_ID,
        'orders',
        ID.unique(),
        order
      )
      console.log(`✅ Created order: ${order.order_number} (${result.$id})`)
    }
    
    console.log('🎉 All sample orders created successfully!')
    
  } catch (error) {
    console.error('❌ Error creating orders:', error)
  }
}

// Run the script
createSampleOrders()