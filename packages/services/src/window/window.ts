export function isBrowser() {
  return typeof window !== 'undefined';
}

export function isDocument() {
  return typeof document !== 'undefined';
}

export function documentCookie() {
  return isDocument() ? document.cookie : '';
}
