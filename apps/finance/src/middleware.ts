import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { allRoutes, publicRoutes } from './routes';

function RedirectToSignIn(request: NextRequest, redirectTo?: string) {
  const host = request.headers.get('host');
  const url = request.nextUrl;
  const currentRedirectTo = !redirectTo ? '/dashboard' : redirectTo;
  const redirectToUrl = new URL(currentRedirectTo, url);
  redirectToUrl.host = !host ? redirectToUrl.host : host;
  return redirectToUrl;
}

function SignInRoute(request: NextRequest, redirectTo?: string) {
  const host = request.headers.get('host');
  const url = request.nextUrl;
  const accountUrl = new URL('/sign-in', url);
  accountUrl.searchParams.append('source', 'finance');
  accountUrl.searchParams.append('env', 'dev');
  const redirectToUrl = RedirectToSignIn(request, redirectTo)
  accountUrl.searchParams.append('redirectTo', redirectToUrl.href);
  accountUrl.host = !host ? accountUrl.host : host;
  accountUrl.port = '4003';
  return accountUrl;
}

function UpdateRoute(request: NextRequest, redirectTo?: string) {
  const host = request.headers.get('host');
  const url = request.nextUrl;
  const accountUrl = new URL('/update', url);
  accountUrl.searchParams.append('source', 'finance');
  accountUrl.searchParams.append('env', 'dev');
  const redirectToUrl = RedirectToSignIn(request, redirectTo)
  accountUrl.searchParams.append('redirectTo', redirectToUrl.href);
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
    return NextResponse.redirect(SignInRoute(request));
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
    return NextResponse.redirect(SignInRoute(request, path));
  }

  if(isAuthRoute && !isAuthenticated) {
    return NextResponse.redirect(SignInRoute(request, path));
  }

  if(path === '/profile') {
    return NextResponse.redirect(UpdateRoute(request, '/'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};