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
