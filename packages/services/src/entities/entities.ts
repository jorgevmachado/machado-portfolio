import type { FindEntityByParam } from './interface';

export function findEntityBy<T>({ key, value, list }: FindEntityByParam<T>) {
  return list.find((item) => item[key] === value);
}

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
