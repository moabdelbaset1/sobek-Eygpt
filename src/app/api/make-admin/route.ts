import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/appwrite';
import { Users, Query } from 'node-appwrite';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }

    // Create server client with API key
    const client = createServerClient();
    const users = new Users(client);

    // Find user by email
    try {
      const existingUsers = await users.list([
        Query.equal('email', email)
      ]);

      if (existingUsers.users.length === 0) {
        return NextResponse.json({
          success: false,
          error: 'No user found with this email. Please create an account first.',
          redirectTo: '/api/create-admin'
        }, { status: 404 });
      }

      const user = existingUsers.users[0];

      // Update user preferences to mark as admin
      await users.updatePrefs(user.$id, {
        role: 'admin',
        isAdmin: true,
        adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        updatedAt: new Date().toISOString()
      });

      console.log('✅ User updated as admin successfully:', user.email);

      return NextResponse.json({
        success: true,
        message: 'User has been granted admin privileges successfully',
        user: {
          $id: user.$id,
          email: user.email,
          name: user.name,
          role: 'admin',
          status: 'Admin privileges granted'
        }
      });

    } catch (error) {
      console.error('❌ Error finding or updating user:', error);
      
      let errorMessage = 'Failed to update user privileges';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return NextResponse.json({
        success: false,
        error: errorMessage
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Error processing request:', error);
    
    let errorMessage = 'Failed to process request';
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
    message: 'Make existing user admin endpoint. Use POST method.',
    requiredFields: ['email', 'password'],
    description: 'This endpoint grants admin privileges to an existing user',
    example: {
      email: 'admin@devegy.com',
      password: 'user_password'
    }
  });
}