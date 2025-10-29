import { NextRequest, NextResponse } from 'next/server'
import { Query } from 'node-appwrite'
import { createAdminClient } from '@/lib/appwrite-admin'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ''

interface AdminUser {
  $id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  role: string
  status: string
  total_orders: number
  total_spent: number
  $createdAt: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { users: usersService } = await createAdminClient()

    // Fetch all users from Appwrite Auth system
    const allUsers = await usersService.list([Query.limit(1000)])

    // Filter by search if provided
    let filteredUsers = allUsers.users
    if (search) {
      filteredUsers = allUsers.users.filter((u: any) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply pagination
    const paginatedUsers = filteredUsers.slice(offset, offset + limit)

    // Transform Appwrite users to include additional info
    const transformedUsers: AdminUser[] = paginatedUsers.map((u: any) => ({
      $id: u.$id,
      name: u.name || 'Unknown',
      email: u.email,
      phone: u.phone || '',
      address: '',
      city: '',
      country: '',
      role: u.prefs?.role || 'user',
      status: u.status ? 'active' : 'inactive',
      total_orders: 0,
      total_spent: 0,
      $createdAt: u.$createdAt
    }))

    // Calculate stats
    const totalRevenue = transformedUsers.reduce((sum: number, u: AdminUser) => sum + u.total_spent, 0)
    const activeUsers = transformedUsers.filter((u: AdminUser) => u.status === 'active').length
    const inactiveUsers = transformedUsers.filter((u: AdminUser) => u.status === 'inactive').length
    const avgOrderValue = transformedUsers.length > 0 ? totalRevenue / transformedUsers.length : 0

    const stats = {
      total: allUsers.total,
      active: activeUsers,
      inactive: inactiveUsers,
      totalRevenue,
      avgOrderValue
    }

    return NextResponse.json({
      users: transformedUsers,
      total: allUsers.total,
      stats
    })
  } catch (error: any) {
    console.error('Error fetching users:', error)

    // If users collection doesn't exist, still try to fetch from auth
    if (error.code === 404 || error.type === 'collection_not_found') {
      console.log('Using fallback - users collection not found')
      return NextResponse.json({
        users: [],
        total: 0,
        stats: { total: 0, active: 0, inactive: 0, totalRevenue: 0, avgOrderValue: 0 },
        message: 'Users collection not set up yet'
      })
    }

    return NextResponse.json(
      { error: error.message || 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const updateData = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { users: usersService } = await createAdminClient()

    // Update user properties using Appwrite Users service
    let updatedUser: any = null

    // Handle name update
    if (updateData.name) {
      updatedUser = await usersService.updateName(userId, updateData.name)
    }

    // Handle role update via preferences
    if (updateData.role) {
      const prefs: Record<string, any> = { role: updateData.role }
      updatedUser = await usersService.updatePrefs(userId, prefs)
    }

    // If no specific update method applied, get the current user
    if (!updatedUser) {
      updatedUser = await usersService.get(userId)
    }

    return NextResponse.json({ user: updatedUser, message: 'User updated successfully' })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { users: usersService } = await createAdminClient()

    // Delete user from Appwrite Auth
    await usersService.delete(userId)

    return NextResponse.json({ success: true, message: 'User deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete user' },
      { status: 500 }
    )
  }
}
