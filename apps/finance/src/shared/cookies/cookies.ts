import cookies from '@repo/services/cookies/cookies';

const domain =  typeof window !== 'undefined' ? window.location.hostname : '.localhost';

export function getAccessToken() {
  return cookies.get('financeAccessToken');
}

export function setAccessToken(token: string) {
    return cookies.set('financeAccessToken', token, domain);
}

export function removeAccessToken() {
    return cookies.remove('financeAccessToken', domain);
}