import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  generateUrl,
  getAccessTokenName,
  isTokenAuthenticated,
  validRequiredParameters,
} from './shared';

const publicRoutes: Array<string> = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
];

const privateRoutes: Array<string> = ['/update'];

const acceptRoutes: Array<string> = [
  ...publicRoutes,
  ...privateRoutes,
  '/dashboard',
];

const favIconsRoutes: Array<string> = [
    '/favicon.ico',
    '/law/favicon/favicon.ico',
    '/geek/favicon/favicon.ico',
    '/finance/favicon/favicon.ico',
];

const getCurrentAccessToken = async (source?: string) => {
  const cookieStore = await cookies();
  if (!source) {
    const lawAccessToken = cookieStore.get('lawAccessToken');
    if (lawAccessToken) {
      return lawAccessToken;
    }
    const geekAccessToken = cookieStore.get('geekAccessToken');
    if (geekAccessToken) {
      return geekAccessToken;
    }
    const financeAccessToken = cookieStore.get('financeAccessToken');
    if (financeAccessToken) {
      return financeAccessToken;
    }
    return;
  }
  const accessTokenName = getAccessTokenName(source);
  return cookieStore.get(accessTokenName);
};

const validateToken = async (source?: string) => {
  const cookieStore = await cookies();
  const accessToken = await getCurrentAccessToken(source);
  const isAuthenticated = isTokenAuthenticated(accessToken?.value);
  if (!isAuthenticated && accessToken) {
    cookieStore.delete(accessToken.name);
  }
  return isAuthenticated;
};

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const searchParams = url.searchParams;

  const source = searchParams.get('source') ?? undefined;
  const env = searchParams.get('env') ?? undefined;
  const redirectTo = searchParams.get('redirect_uri') ?? undefined;
  const redirectUrl = generateUrl({ url, env, source, redirectTo });

  if (!acceptRoutes.includes(path)) {
    if(favIconsRoutes.includes(path)) {
      return NextResponse.next();
    }
    const notFoundUrl = redirectUrl;
    notFoundUrl.searchParams.set('error', 'notfound');
    return NextResponse.redirect(notFoundUrl);
  }

  if (acceptRoutes.includes(path) && path !== '/dashboard') {
    const hasRequiredParameters = validRequiredParameters({
      env,
      source,
      redirectTo,
    });
    if (!hasRequiredParameters) {
      const emptyParameters = redirectUrl;
      emptyParameters.searchParams.set('error', 'emptyParameters');
      return NextResponse.redirect(emptyParameters);
    }
    const isAuthenticated = await validateToken(source);
    if (!isAuthenticated && privateRoutes.includes(path)) {
      const notAuthenticatedUrl = redirectUrl;
      const currentUrl = url;
      currentUrl.searchParams.delete('error');
      currentUrl.searchParams.delete('redirectTo');
      notAuthenticatedUrl.pathname = '/sign-in';
      notAuthenticatedUrl.searchParams.set('error', 'notAuthenticated');
      notAuthenticatedUrl.searchParams.set('redirectTo', currentUrl.href);
      return NextResponse.redirect(notAuthenticatedUrl);
    }

    if (isAuthenticated && publicRoutes.includes(path)) {
      const authenticatedUrl = redirectUrl;
      authenticatedUrl.searchParams.set('error', 'authenticated');
      return NextResponse.redirect(authenticatedUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};