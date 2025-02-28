import { extractLastItemFromUrl } from '../string';

export function extractLastNumberFromUrl(url?: string) {
  const lastItem = extractLastItemFromUrl(url);
  const lastNumber = Number(lastItem);
  if (isNaN(lastNumber)) {
    return 0;
  }
  return lastNumber;
}

export function isNumberEven(value: number) {
  if (value % 1 !== 0) {
    throw new Error('Please enter a integer number');
  }
  return value % 2 === 0;
}