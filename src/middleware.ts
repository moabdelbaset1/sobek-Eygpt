import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /cart, /checkout, /admin)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = [
    '/account', 
    '/register', 
    '/login',
    '/forgot-password',
    '/create-admin',
    '/make-admin',
    '/catalog',
    '/products',
    '/omaima',
    '/sw.js',
    '/manifest.json'
  ]
  const isPublicPath = publicPaths.includes(path) ||
                      path.startsWith('/api/') ||
                      path.startsWith('/_next/') ||
                      path.startsWith('/favicon.ico') ||
                      path.startsWith('/.well-known/') ||
                      path.startsWith('/static/') ||
                      path.startsWith('/public/') ||
                      path.startsWith('/uploads/') ||
                      path.startsWith('/images/') ||
                      path === '/'

  // If accessing a public path, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check if user has a valid Appwrite session by looking for session cookies
  // Appwrite sets cookies like: a_session_{projectId} or _legacy session cookies
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''
  const sessionCookie = request.cookies.get(`a_session_${projectId}`) || 
                       request.cookies.get('a_session_console') ||
                       request.cookies.get('_legacy')

  // If user has a valid session cookie, allow access
  if (sessionCookie) {
    console.log('Valid session cookie found for path:', path)
    return NextResponse.next()
  }

  // Admin routes - let the layout handle authentication
  // Middleware should NOT redirect admin routes to avoid loops
  if (path.startsWith('/admin')) {
    // Just allow access - the AdminLayout will handle authentication
    return NextResponse.next()
  }

  // No session found - user is not authenticated
  console.log('No session cookie found for path:', path)

  // User is not authenticated, redirect based on the route type
  if (path.startsWith('/checkout') || path.startsWith('/profile') || path.startsWith('/orders')) {
    // Preserve the original URL for redirect after login
    console.log('Redirecting to login with redirect param for protected route:', path)
    const loginUrl = new URL('/account', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // For any other protected routes, allow access by default
  // This prevents blocking public pages like catalog, products, etc.
  console.log('Allowing access to general route (no authentication required)')
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - figma (design assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|figma).*)',
  ],
}