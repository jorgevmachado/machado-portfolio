import { NextRequest } from 'next/server';

export function getOriginalUrl(
  source: string,
  env: string,
  request: NextRequest,
) {
  switch (source) {
    case 'geek':
      return env === 'production'
        ? 'https://geek.com.br'
        : 'http://geek.com.br:3002';
    case 'finance':
      return env === 'production'
        ? 'https://finance.com.br'
        : 'http://finance.com.br:3003';
    case 'law':
      return env === 'production'
        ? 'https://law.com.br'
        : 'http://law.com.br:3004';
    default:
      const referer = request.headers.get('referer') || '';
      return referer || request.url;
  }
}