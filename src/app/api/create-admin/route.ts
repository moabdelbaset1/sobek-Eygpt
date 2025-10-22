import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/appwrite';
import { Account, Users, ID, Query } from 'node-appwrite';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }

    // Create server client with API key
    const client = createServerClient();
    const users = new Users(client);

    // Check if user already exists
    try {
      const existingUsers = await users.list([
        Query.equal('email', email)
      ]);
      if (existingUsers.users.length > 0) {
        return NextResponse.json({
          success: false,
          error: 'User with this email already exists. Try logging in instead.'
        }, { status: 409 });
      }
    } catch (error) {
      console.log('Error checking existing user:', error);
    }

    // Create new admin user
    const user = await users.create(
      ID.unique(),
      email,
      undefined, // phone (optional)
      password,
      name || 'Admin User'
    );

    // Set user preferences to mark as admin
    await users.updatePrefs(user.$id, {
      role: 'admin',
      isAdmin: true,
      adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL
    });

    console.log('✅ Admin user created successfully:', user.email);

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        $id: user.$id,
        email: user.email,
        name: user.name,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    
    let errorMessage = 'Failed to create admin user';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin creation endpoint. Use POST method to create admin user.',
    requiredFields: ['email', 'password', 'name (optional)'],
    example: {
      email: 'admin@devegy.com',
      password: 'your_secure_password',
      name: 'Admin User'
    }
  });
}