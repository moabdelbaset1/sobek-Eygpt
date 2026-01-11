import { NextResponse } from 'next/server'
import { categoriesAPI } from '@/lib/appwrite'

// Transform camelCase from Appwrite to snake_case for frontend
function transformCategory(category: any) {
  return {
    id: category.$id || category.id,
    name: category.name,
    name_ar: category.nameAr || category.name_ar,
    slug: category.slug,
    type: category.type,
    icon: category.icon,
    description: category.description,
    created_at: category.$createdAt || category.created_at
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'human' | 'veterinary' | null

    if (type) {
      const categories = await categoriesAPI.getByType(type)
      return NextResponse.json(categories.map(transformCategory))
    }

    const categories = await categoriesAPI.getAll()
    return NextResponse.json(categories.map(transformCategory))
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const category = await categoriesAPI.create(body)
    return NextResponse.json(transformCategory(category))
  } catch (error: any) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const category = await categoriesAPI.update(id, body)
    return NextResponse.json(transformCategory(category))
  } catch (error: any) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update category' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    await categoriesAPI.delete(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete category' },
      { status: 500 }
    )
  }
}
