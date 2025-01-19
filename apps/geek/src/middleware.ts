import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { protectedRoutes, publicRoutes } from './routes';

export default async function middleware(request: NextRequest) {
  console.log('middleware => ', request.nextUrl.pathname);
  const cookieStore = await cookies();
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isHome =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/');

  const accessToken = cookieStore.get('geekAccessToken');

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
