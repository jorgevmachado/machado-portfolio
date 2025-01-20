import cookies from '@repo/services/cookies/cookies';

export function getAccessToken() {
  return cookies.get('geekAccessToken');
}

export function setAccessToken(token: string) {
  return cookies.set('geekAccessToken', token, '.geek.com.br');
}

export function removeAccessToken() {
  return cookies.remove('geekAccessToken', 'http://localhost:3000');
}
