import { NextResponse } from 'next/server'
import { humanProductsAPI } from '@/lib/appwrite'

// Transform camelCase from Appwrite to snake_case for frontend
function transformProduct(product: any) {
  return {
    id: product.$id || product.id,
    name: product.name,
    generic_name: product.genericName || product.generic_name,
    strength: product.strength,
    dosage_form: product.dosageForm || product.dosage_form,
    indication: product.indication,
    pack_size: product.packSize || product.pack_size,
    registration_number: product.registrationNumber || product.registration_number,
    category: product.category,
    image_url: product.imageUrl || product.image_url,
    price: product.price,
    is_active: product.isActive !== undefined ? product.isActive : product.is_active,
    created_at: product.$createdAt || product.created_at,
    updated_at: product.$updatedAt || product.updated_at
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const id = searchParams.get('id')

    // Get single product by ID
    if (id) {
      const product = await humanProductsAPI.getById(id)
      return NextResponse.json(transformProduct(product))
    }

    // Get products by category
    if (category) {
      const products = await humanProductsAPI.getByCategory(category)
      return NextResponse.json(products.map(transformProduct))
    }

    // Get all products
    const products = await humanProductsAPI.getAll()
    return NextResponse.json(products.map(transformProduct))
  } catch (error: any) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: error.error || error.message || 'Failed to fetch products' },
      { status: error.code || 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = await humanProductsAPI.create(body)
    return NextResponse.json(transformProduct(product))
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: error.error || error.message || 'Failed to create product' },
      { status: error.code || 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const product = await humanProductsAPI.update(id, body)
    return NextResponse.json(transformProduct(product))
  } catch (error: any) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: error.error || error.message || 'Failed to update product' },
      { status: error.code || 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await humanProductsAPI.delete(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: error.error || error.message || 'Failed to delete product' },
      { status: 500 }
    )
  }
}
