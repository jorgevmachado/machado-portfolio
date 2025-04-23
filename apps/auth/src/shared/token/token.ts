import { getAccessToken } from '../cookies';

export function getAccessTokenName(source?: string) {
  switch (source) {
    case 'geek':
      return 'geekAccessToken';
    case 'finance':
      return 'financeAccessToken';
    case 'law':
      return 'lawAccessToken';
    default:
      return 'accessToken';
  }
}

export function getCurrenAccessToken(source?: string) {
  if (!source) {
    const lawAccessToken = getAccessToken('lawAccessToken');
    if (lawAccessToken) {
      return lawAccessToken;
    }
    const geekAccessToken = getAccessToken('geekAccessToken');
    if (geekAccessToken) {
      return geekAccessToken;
    }
    const financeAccessToken = getAccessToken('financeAccessToken');
    if (financeAccessToken) {
      return financeAccessToken;
    }
    return;
  }

  const accessTokenName = getAccessTokenName(source);
  return getAccessToken(accessTokenName);
}

export function isTokenAuthenticated(token?: string) {
  if (!token) {
    return false;
  }

  try {
    const [, payload] = token.split('.');

    if (!payload) {
      return false;
    }

    const decodedPayload = JSON.parse(atob(payload));

    if (decodedPayload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedPayload.exp > currentTime;
    }

    return false;
  } catch (e) {
    return false;
  }
}
