import { validate as isUuid } from 'uuid';

import { serialize } from '../object';

export function formatUrl(url: string, path: string, params = {}) {
  const query = serialize(params);
  const filteredUrl = [url, path].filter((i) => i).join('/');

  return `${filteredUrl}${query ? `?${query}` : ''}`;
}

export function uuid(currentDate: Date = new Date()) {
  let date = currentDate.getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const random = (date + Math.random() + 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c == 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

export function isUUID(value: string): boolean {
  return isUuid(value);
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function toSnakeCase(value: string) {
  return (
    value &&
    value
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)
      .map((word) => word.toLowerCase())
      .join('_')
  );
}

export function toCamelCase(value: string) {
  return value.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function separateCamelCase(value: string) {
  return value
    .split(/(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ');
}
