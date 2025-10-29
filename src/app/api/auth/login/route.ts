import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, account } from '@/lib/appwrite';
import { Account } from 'node-appwrite';
import { cookies } from 'next/headers';

// Admin emails list
const ADMIN_EMAILS = [
  'admin@devegy.com',
  'admin@dav-egypt.com',
  'moabdelbaset1@gmail.com',
  'mekawy@devegy.com'
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Login attempt for email:', email);

    // Create a fresh server client for this request
    const serverClient = createServerClient();
    const serverAccount = new Account(serverClient);

    // Create email session
    const session = await serverAccount.createEmailPasswordSession(email, password);
    console.log('Session created successfully on server');

    // Get user data
    const user = await serverAccount.get();
    console.log('User retrieved on server:', user.$id);

    // Check if user is admin
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase())

    // Set session cookies in response headers so browser receives them
    const sessionData = {
      email: user.email,
      name: user.name,
      id: user.$id,
      isAdmin
    }

    console.log('Setting session cookies:', {
      email: user.email,
      isAdmin,
      sessionDataKeys: Object.keys(sessionData)
    });

    const response = NextResponse.json({
      success: true,
      user,
      session,
      isAdmin
    });

    // Set admin_session cookie if admin
    if (isAdmin) {
      console.log('✅ Setting admin_session cookie for admin user');
      response.cookies.set('admin_session', JSON.stringify(sessionData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }
    
    // Always set session cookie
    console.log('✅ Setting session cookie');
    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    console.log('✅ Login successful, cookies set, returning response');
    return response;

  } catch (error: any) {
    console.error('Login API error:', error);
    console.error('Error code:', error?.code);
    console.error('Error type:', error?.type);

    // Handle specific Appwrite errors
    if (error.code === 401) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 400 }
    );
  }
}