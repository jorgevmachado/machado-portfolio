import { isUUID } from '@repo/services/string/string';

export function findOneEntity(param: string, list: Array<unknown>) {
    const filterKey = isUUID(param) ? 'id' : 'name';
    return list.find((result) => result[filterKey] === param);
}