import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { allRoutes, publicRoutes } from './routes';

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookieStore = await cookies();

  const isRoutePath = allRoutes.some((route) => route.path === path);

  const isLogout = path === '/logout';

  if (isLogout) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  const isEmptyPath = path === '/';

  if (isEmptyPath) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isRoutePath) {
    return NextResponse.next();
  }


  const isAuthRoute = publicRoutes.some((route) => route.path === path);
  const accessToken = cookieStore.get('financeAccessToken');
  const isAuthenticated = Boolean(accessToken);

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!isAuthRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};