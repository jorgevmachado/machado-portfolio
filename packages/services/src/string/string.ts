import { validate as isUuid } from 'uuid';

import { serialize } from '../object';

export const linkingWords: Array<string> = ['de', 'da', 'do', 'das', 'dos'];

/**
 * Generates a UUID (universally unique identifier) 'string' based on the given date.
 * @param currentDate
 */
export function uuid(currentDate: Date = new Date()) {
  let date = currentDate.getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const random = (date + Math.random() + 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c == 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

/**
 * Checks if a 'string' is a valid UUID.
 * @param value
 */
export function isUUID(value: string): boolean {
  return isUuid(value);
}

/**
 * Returns the initials of a string with a specific number of letters.
 * @param value
 * @param length
 * @param stopWords
 */
export function initials(
  value: string,
  length: number = 0,
  stopWords: Array<string> = linkingWords,
) {
  if (length <= 0) {
    return capitalize(value);
  }

  const normalized = normalize(value);
  const normalizedStopWords = stopWords.map((word) => normalize(word.toLowerCase()));

  const nameParts = normalized.split(' ');

  const relevantWords = nameParts.filter(
    (word) =>
      word.length > 1 && !normalizedStopWords.includes(normalize(word.toLowerCase())),
  );

  return relevantWords
    .map((word) => word?.[0]?.toUpperCase() || '')
    .slice(0, length)
    .join('');
}

/**
 * Removes accents and extra spaces and Normalizes multiple spaces to a single space.
 * @param value
 */
export function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Constructs a formatted URL with additional path ('path') and query parameters ('params').
 * @param url
 * @param path
 * @param params
 */
export function formatUrl(url: string, path: string, params = {}) {
  const query = serialize(params);
  const filteredUrl = [url, path].filter((i) => i).join('/');

  return `${filteredUrl}${query ? `?${query}` : ''}`;
}

/**
 * Returns a 'string' with the first letter capitalized.
 * @param value
 */
export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Converts camel case (or similar) strings to snake case (`snake_case` format).
 * @param value
 */
export function toSnakeCase(value: string) {
  return (
    value &&
    value
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)
      .map((word) => word.toLowerCase())
      .join('_')
  );
}

/**
 * Converts strings in `snake_case` format to camel case.
 * @param value
 */
export function toCamelCase(value: string) {
  return value.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Searches for duplicates in a list of objects based on a defined key ('id' or 'name').
 * @param list
 * @param key
 */
export function findRepeated<T extends { id: string; name?: string }>(
  list: Array<T>,
  key: 'id' | 'name',
) {
  const fieldSet = new Set<string>();

  for (const item of list) {
    if (fieldSet.has(item[key])) {
      return item[key];
    }
    fieldSet.add(item[key]);
  }

  return;
}

/**
 * Truncates a string to the specified length and converts it to uppercase.
 * @param value
 * @param length
 * @param isNormalize
 */
export function truncateString(value: string, length: number = 0, isNormalize: boolean = true): string {
  if (!value || length <= 0) {
    return '';
  }
  const currentValue = isNormalize ? normalize(value) : value;
  return currentValue.slice(0, length).toUpperCase();
}

/**
 * Splits words in camel case ('CamelCase') to a version with spaces and individual capitalization.
 * @param value
 */
export function separateCamelCase(value: string) {
  return value
    .split(/(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ');
}

/**
 * Converts a given snake_case string into a human-readable normal case string.
 * @param {string} value
 */
export function snakeCaseToNormal(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue.includes('_')) {
    if (trimmedValue === trimmedValue.toLowerCase() || trimmedValue === trimmedValue.toUpperCase()) {
      return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1).toLowerCase();
    }
    return trimmedValue;
  }

  return trimmedValue
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palavra
      .join(' ');
}

/**
 * Extracts the last segment of a URL.
 * @param url
 */
export function extractLastItemFromUrl(url?: string) {
  if (!url) {
    return '';
  }
  const sanitizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const segments = sanitizedUrl.split('/');
  return segments[segments.length - 1];
}