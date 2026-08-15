import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-key-change-in-production')

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register-school', '/auth/callback']

// Role-based route access control
const ROLE_ROUTES: Record<string, string[]> = {
  super_admin: ['/admin', '/super-admin'],
  school_admin: ['/school', '/school-admin'],
  teacher: ['/teacher'],
  parent: ['/parent'],
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Demo mode - allow access to all pages for testing
  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.next()
  }

  // Get auth token from cookies
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    // No token, redirect to login
    if (!pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }

  try {
    // Verify JWT token
    const verified = await jwtVerify(token, JWT_SECRET)
    const user = verified.payload as any

    // Check if user's role has access to this route
    const allowedRoutes = ROLE_ROUTES[user.role] || []
    const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route))

    if (!hasAccess && !PUBLIC_ROUTES.includes(pathname)) {
      // User doesn't have access to this route, redirect to dashboard
      const dashboardMap: Record<string, string> = {
        super_admin: '/admin/dashboard',
        school_admin: '/school/dashboard',
        teacher: '/teacher/dashboard',
        parent: '/parent/dashboard',
      }
      return NextResponse.redirect(
        new URL(dashboardMap[user.role] || '/auth/login', request.url)
      )
    }

    return NextResponse.next()
  } catch (error) {
    // Invalid token, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('auth-token')
    return response
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
