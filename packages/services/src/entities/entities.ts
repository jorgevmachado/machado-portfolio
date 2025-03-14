import type { FindEntityByParam } from './interface';

export function findEntityBy<T>({ key, value, list }: FindEntityByParam<T>) {
  return list.find((item) => item[key] === value);
}