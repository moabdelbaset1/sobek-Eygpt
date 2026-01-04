import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/leadership - Get all leadership team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'

    const where = activeOnly ? { isActive: true } : {}

    const leadership = await prisma.leadershipMember.findMany({
      where,
      orderBy: { createdAt: 'asc' }
    })

    // Convert camelCase to snake_case for API response
    const formattedLeadership = leadership.map(member => ({
      id: member.id,
      name: member.name,
      name_ar: member.nameAr,
      title: member.title,
      title_ar: member.titleAr,
      department: member.department,
      department_ar: member.departmentAr,
      bio: member.bio,
      bio_ar: member.bioAr,
      image_url: member.imageUrl,
      is_leadership: member.isLeadership,
      is_active: member.isActive,
      created_at: member.createdAt.toISOString(),
      updated_at: member.updatedAt.toISOString(),
    }))

    return NextResponse.json(formattedLeadership)
  } catch (error) {
    console.error('Error fetching leadership team:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leadership team' },
      { status: 500 }
    )
  }
}

// POST /api/leadership - Create new leadership member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const leadership = await prisma.leadershipMember.create({
      data: {
        name: body.name,
        nameAr: body.name_ar || null,
        title: body.title,
        titleAr: body.title_ar || null,
        department: body.department,
        departmentAr: body.department_ar || null,
        bio: body.bio,
        bioAr: body.bio_ar || null,
        imageUrl: body.image_url || null,
        isLeadership: body.is_leadership ?? false,
        isActive: body.is_active ?? true,
      }
    })

    return NextResponse.json(leadership, { status: 201 })
  } catch (error) {
    console.error('Error creating leadership member:', error)
    return NextResponse.json(
      { error: 'Failed to create leadership member' },
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

    const leadership = await prisma.leadershipMember.update({
      where: { id },
      data: {
        name: body.name,
        nameAr: body.name_ar || null,
        title: body.title,
        titleAr: body.title_ar || null,
        department: body.department,
        departmentAr: body.department_ar || null,
        bio: body.bio,
        bioAr: body.bio_ar || null,
        imageUrl: body.image_url || null,
        isLeadership: body.is_leadership ?? false,
        isActive: body.is_active ?? true,
      }
    })

    return NextResponse.json(leadership)
  } catch (error) {
    console.error('Error updating leadership member:', error)
    return NextResponse.json(
      { error: 'Failed to update leadership member' },
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

    await prisma.leadershipMember.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting leadership member:', error)
    return NextResponse.json(
      { error: 'Failed to delete leadership member' },
      { status: 500 }
    )
  }
}