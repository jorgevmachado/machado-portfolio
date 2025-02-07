import { extractLastItemFromUrl } from '../string';

export function extractLastNumberFromUrl(url?: string) {
  const lastItem = extractLastItemFromUrl(url);
  const lastNumber = Number(lastItem);
  if (isNaN(lastNumber)) {
    return 0;
  }
  return lastNumber;
}