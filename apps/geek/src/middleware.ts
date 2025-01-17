import { NextRequest, NextResponse } from 'next/server';

import { protectedRoutes, publicRoutes } from './routes';
import { getAccessToken } from './shared';

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isHome =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/');

  const accessToken = getAccessToken();

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  if (isPublicRoute && accessToken && !isHome) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
