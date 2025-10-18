import { NextRequest, NextResponse } from 'next/server';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/'];

export async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get the token from cookie
  const cookie = req.cookies.get('token')?.value;

  // 4. Redirect to / if the user is not authenticated and trying to access protected route
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 5. Redirect to /dashboard if the user is authenticated and on public route
  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
