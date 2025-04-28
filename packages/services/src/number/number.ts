import { extractLastItemFromUrl } from '../string';

/**
 * Checks if a number is even. Also validates if the number is an integer and throws an error if it is not.
 * @param value
 */
export function isNumberEven(value: number) {
  if (value % 1 !== 0) {
    throw new Error('Please enter a integer number');
  }
  return value % 2 === 0;
}

/**
 * Extract the last segment of the URL and try to convert it to a number.
 * @param url
 */
export function extractLastNumberFromUrl(url?: string) {
  const lastItem = extractLastItemFromUrl(url);
  const lastNumber = Number(lastItem);
  if (isNaN(lastNumber)) {
    return 0;
  }
  return lastNumber;
}

