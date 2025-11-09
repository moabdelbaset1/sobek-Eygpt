import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/appwrite-admin"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ''
const PRODUCTS_COLLECTION_ID = 'products'

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    const { databases } = await createAdminClient()

    // Create the product with initial stock
    const createdProduct = await databases.createDocument(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      'unique()',
      {
        name: productData.name,
        description: productData.description || '',
        price: productData.price,
        units: productData.units || 0,
        stockQuantity: productData.units || 0, // Duplicate for compatibility
        reserved: 0,
        sku: productData.sku || `SKU-${Date.now()}`,
        is_active: true,
        brand_id: productData.brand_id || '',
        category_id: productData.category_id || '',
        created_at: new Date().toISOString()
      }
    )

    console.log('✅ Created test product:', createdProduct)
    
    return NextResponse.json({ 
      success: true, 
      product: createdProduct 
    })

  } catch (error: any) {
    console.error('❌ Failed to create product:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to create product' 
    }, { 
      status: 500 
    })
  }
}