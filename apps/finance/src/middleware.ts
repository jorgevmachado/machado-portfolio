import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { allRoutes, publicRoutes } from './routes';

type TAccount = 'sign-in' | 'sign-up' | 'update';

function accountRedirect(
  url: NextRequest['nextUrl'],
  host?: string,
  redirectTo?: string,
) {
  const currentPath = !redirectTo ? '/dashboard' : redirectTo;
  const currentRedirectTo =
    currentPath === '/sign-in' ||
    currentPath === '/sign-up' ||
    currentPath === '/update'
      ? '/dashboard'
      : currentPath;
  const redirectToUrl = new URL(currentRedirectTo, url);
  redirectToUrl.host = !host ? redirectToUrl.host : host;
  return redirectToUrl;
}

function accountRoute(
  type: TAccount,
  request: NextRequest,
  redirectTo?: string,
) {
  const host = request.headers.get('host') ?? undefined;
  const url = request.nextUrl;
  const accountUrl = new URL(`/${type}`, url);

  const redirectToUrl = accountRedirect(url, host, redirectTo);
  accountUrl.searchParams.append('redirectTo', redirectToUrl.href);

  accountUrl.searchParams.append('source', 'finance');
  accountUrl.searchParams.append('env', 'dev');
  accountUrl.host = !host ? accountUrl.host : host;
  accountUrl.port = '4003';
  return accountUrl;
}

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookieStore = await cookies();

  const isRoutePath = allRoutes.some((route) => route.path === path);

  const isLogout = path === '/logout';

  if (isLogout) {
    return NextResponse.redirect(accountRoute('sign-in', request));
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
    return NextResponse.redirect(accountRoute('sign-in', request, path));
  }

  if (isAuthRoute && !isAuthenticated) {
    return NextResponse.redirect(accountRoute('sign-in', request, path));
  }

  if (path === '/profile') {
    return NextResponse.redirect(accountRoute('update', request, '/'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};