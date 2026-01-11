import { NextRequest, NextResponse } from 'next/server'
import { leadershipAPI } from '@/lib/appwrite'

// Transform camelCase from Appwrite to snake_case for frontend
function transformLeadership(member: any) {
  return {
    id: member.$id || member.id,
    name: member.name,
    name_ar: member.nameAr || member.name_ar,
    position: member.position,
    position_ar: member.positionAr || member.position_ar,
    bio: member.bio,
    bio_ar: member.bioAr || member.bio_ar,
    image_url: member.imageUrl || member.image_url,
    order: member.order,
    created_at: member.$createdAt || member.created_at
  }
}

// GET /api/leadership - Get all leadership team members
export async function GET(request: NextRequest) {
  try {
    const leadership = await leadershipAPI.getAll()
    return NextResponse.json(leadership.map(transformLeadership))
  } catch (error: any) {
    console.error('Error fetching leadership team:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch leadership team' },
      { status: 500 }
    )
  }
}

// POST /api/leadership - Create new leadership member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const leadership = await leadershipAPI.create(body)
    return NextResponse.json(transformLeadership(leadership), { status: 201 })
  } catch (error: any) {
    console.error('Error creating leadership member:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create leadership member' },
      { status: 500 }
    )
  }
}

// PUT /api/leadership?id=uuid - Update leadership member
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Leadership member ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const leadership = await leadershipAPI.update(id, body)

    return NextResponse.json(transformLeadership(leadership))
  } catch (error: any) {
    console.error('Error updating leadership member:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update leadership member' },
      { status: 500 }
    )
  }
}

// DELETE /api/leadership?id=uuid - Delete leadership member
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Leadership member ID is required' },
        { status: 400 }
      )
    }

    await leadershipAPI.delete(id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting leadership member:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete leadership member' },
      { status: 500 }
    )
  }
}