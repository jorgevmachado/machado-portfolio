import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { allRoutes, authRoutes } from './routes';

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isRoutePath = allRoutes.includes(path);

  if (!isRoutePath) {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.includes(path);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('geekAccessToken');
  const isAuthenticated = Boolean(accessToken);

  const isLogout = request.nextUrl.searchParams.get('logout') === 'true';

  if (isLogout) {
    cookieStore.delete('geekAccessToken');
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isAuthRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  const isEmptyPath = path === '/';

  if (isEmptyPath) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
