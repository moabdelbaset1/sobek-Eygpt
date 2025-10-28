import { NextResponse } from 'next/server'
import { mediaPostsAPI } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'news' | 'event' | null

    if (type) {
      const posts = await mediaPostsAPI.getByType(type)
      return NextResponse.json(posts)
    }

    const posts = await mediaPostsAPI.getAll()
    return NextResponse.json(posts)
  } catch (error: any) {
    console.error('Error fetching media posts:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch media posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const post = await mediaPostsAPI.create(body)
    return NextResponse.json(post)
  } catch (error: any) {
    console.error('Error creating media post:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create media post' },
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
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const post = await mediaPostsAPI.update(id, body)
    return NextResponse.json(post)
  } catch (error: any) {
    console.error('Error updating media post:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update media post' },
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
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    await mediaPostsAPI.delete(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting media post:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete media post' },
      { status: 500 }
    )
  }
}
