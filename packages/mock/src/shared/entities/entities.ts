import { isUUID } from '@repo/services/string/string';

export function findOneEntity(param: string, list: Array<Record<string, unknown>>) {
    const filterKey = isUUID(param) ? 'id' : 'name';
    if(!['id', 'name'].includes(filterKey)) {
        return;
    }
    return list.find((result) => result[filterKey] === param);
}