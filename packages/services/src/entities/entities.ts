import type { FindEntityByParam } from './interface';

/**
 * Searches for an entity from a list and returns the result.
 * @param key
 * @param value
 * @param list
 */
export function findEntityBy<T>({ key, value, list }: FindEntityByParam<T>) {
  return list.find((item) => item[key] === value);
}

/**
 * Formats an entity or a group of entities by transforming everything that is null into undefined and everything that is data into Date.
 * @param obj
 */
export function transformObjectDateAndNulls<T, U>(obj: U): T {
  if (Array.isArray(obj)) {
    return obj.map(transformObjectDateAndNulls) as unknown as T;
  }

  if (obj && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newValue =
          typeof value === 'string' && ['created_at', 'updated_at', 'deleted_at']
              .includes(key)
              ? new Date(value)
              : value === null
                  ? undefined
                  : transformObjectDateAndNulls(value);
      return { ...acc, [key]: newValue };
    }, {} as T);
  }

  return obj as unknown as T;
}
