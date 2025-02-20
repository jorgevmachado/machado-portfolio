import type { FinanceEntity } from '../../interface';
import {findOneEntity} from "../../../shared";

interface CreateEntityParams {
  name?: string;
  type?: string;
  entity: FinanceEntity;
}
export function createEntity({ name, type, entity }: CreateEntityParams) {
  if (Boolean(entity.type)) {
    return createEntityWithType({ name, type, entity });
  }

  return createEntityByName({ name, entity });
}

interface UpdateEntityParams extends CreateEntityParams {
    param: string;
}
export function updateEntity({ param, name, type, entity }: UpdateEntityParams) {
    const newEntity = updateEntityByName({ param, name, entity });
    if(!newEntity) {
        return newEntity;
    }
    if (Boolean(entity.type) && type && type !== '') {
        const entityType = findOneEntity(type, entity.type.list as Array<Record<string, unknown>>);
        return {
            ...(newEntity as object),
            type: entityType,
        }
    }
    return newEntity;
}

type RemoveEntityParams = Pick<UpdateEntityParams, 'param' | 'entity'>;

export function removeEntity({ param, entity }: RemoveEntityParams) {
    const currentEntity = findOneEntity(param, entity.list as Array<Record<string, unknown>>);
    if(!currentEntity) {
        return currentEntity;
    }
    return {
        ...currentEntity,
        deleted_at: new Date(),
    }
}

function updateEntityByName({ param, name, entity }: UpdateEntityParams) {
    const currentEntity = findOneEntity(param, entity.list as Array<Record<string, unknown>>);
    if(!currentEntity) {
        return currentEntity;
    }
    return {
        ...(currentEntity as object),
        name
    }
}

function createEntityWithType({ name, type, entity }: CreateEntityParams) {
   const entityResult = createEntityByName({ name, entity });
    const entityTypeResult = createEntityByName({ name: type, entity: entity.type });
   if(!entityResult) {
     return entityResult;
   }
   return {
     ...(entityResult as object),
     type: entityTypeResult,
   }
}

function createEntityByName({ name, entity }: CreateEntityParams) {
    const result = findEntityByName(name, entity.list);
    if(!result) {
    return {
      id: 'ac0138cd-4910-4000-8000-000000000000',
      name,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    }
  }
  return result;
}

export function findEntityByName(name: string, list: Array<unknown>) {
    return list?.find((item) => item['name'] === name);
}