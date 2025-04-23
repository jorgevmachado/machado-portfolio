import cookies from '@repo/services/cookies/cookies';

const currentDomain =
  typeof window !== 'undefined' ? window.location.hostname : '.localhost';

export function getAccessToken(key: string) {
  return cookies.get(key);
}

export function setAccessToken(token: string, key: string, domain: string = currentDomain) {
  return cookies.set(key, token, domain);
}

export function removeAccessToken(key: string, domain: string = currentDomain) {
  return cookies.remove(key, domain);
}