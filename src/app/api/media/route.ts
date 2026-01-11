import { NextResponse } from 'next/server'
import { mediaPostsAPI } from '@/lib/appwrite'

// Transform camelCase from Appwrite to snake_case for frontend
function transformMediaPost(post: any) {
  return {
    id: post.$id || post.id,
    title: post.title,
    title_ar: post.titleAr || post.title_ar,
    content: post.content,
    content_ar: post.contentAr || post.content_ar,
    type: post.type,
    media_type: post.mediaType || post.media_type,
    media_url: post.mediaUrl || post.media_url,
    is_active: post.isActive !== undefined ? post.isActive : post.is_active,
    publish_date: post.publishDate || post.publish_date,
    created_at: post.$createdAt || post.created_at
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'news' | 'event' | null

    if (type) {
      const posts = await mediaPostsAPI.getByType(type)
      return NextResponse.json(posts.map(transformMediaPost))
    }

    const posts = await mediaPostsAPI.getAll()
    return NextResponse.json(posts.map(transformMediaPost))
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
    return NextResponse.json(transformMediaPost(post))
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
    return NextResponse.json(transformMediaPost(post))
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
