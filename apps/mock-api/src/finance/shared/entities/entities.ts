import { uuid } from '@repo/services/string/string';

import type { FinanceEntity } from '../../interface';
import { findOneEntity } from '../../../shared';
import { validateEntityType } from '../validate';

interface CreateEntityParams {
  name?: string;
  type?: string;
  entity: FinanceEntity;
}

interface EntityRelation {
  key: 'id' | 'name';
  param: string;
  financeEntity: FinanceEntity;
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
export function updateEntity({
  param,
  name,
  type,
  entity,
}: UpdateEntityParams) {
  const newEntity = updateEntityByName({ param, name, entity });
  if (!newEntity) {
    return newEntity;
  }
  if (Boolean(entity.type) && type && type !== '') {
    const entityType = findOneEntity(
      type,
      entity.type.list as Array<Record<string, unknown>>,
    );
    return {
      ...(newEntity as object),
      type: entityType,
    };
  }
  return newEntity;
}

type RemoveEntityParams = Pick<UpdateEntityParams, 'param' | 'entity'>;

export function removeEntity({ param, entity }: RemoveEntityParams) {
  const currentEntity = findOneEntity(
    param,
    entity.list as Array<Record<string, unknown>>,
  );
  if (!currentEntity) {
    return currentEntity;
  }
  return {
    ...currentEntity,
    deleted_at: new Date(),
  };
}

function updateEntityByName({ param, name, entity }: UpdateEntityParams) {
  const currentEntity = findOneEntity(
    param,
    entity.list as Array<Record<string, unknown>>,
  );
  if (!currentEntity) {
    return currentEntity;
  }
  return {
    ...(currentEntity as object),
    name,
  };
}

function createEntityWithType({ name, type, entity }: CreateEntityParams) {
  const entityResult = createEntityByName({ name, entity });
  const entityTypeResult = createEntityByName({
    name: type,
    entity: entity.type,
  });
  if (!entityResult) {
    return entityResult;
  }
  return {
    ...(entityResult as object),
    type: entityTypeResult,
  };
}

function createEntityByName({ name, entity }: CreateEntityParams) {
  const result = findEntityByName(name, entity.list);
  if (!result) {
    return {
      id: uuid(),
      name,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    };
  }
  return result;
}

export function findEntityByName(name: string, list: Array<unknown>) {
  return findEntityByKey(name, list, 'name');
}

export function findEntityById(id: string, list: Array<unknown>) {
  return findEntityByKey(id, list, 'id');
}

export function findEntityByKey(
  param: string,
  list: Array<unknown>,
  key: 'id' | 'name',
) {
  return list?.find(
    (item) => item[key]?.toLowerCase() === param?.toLowerCase(),
  );
}

export function findEntityRelationByKey({ key, param, financeEntity}: EntityRelation) {
  const { list, label } = financeEntity;
  const entity = findEntityByKey(param, list, key);

  if (!entity) {
    return validateEntityType(false, label);
  }

  return { statusCode: 200, response: entity };
}

export function findEntityRelations (relations: Array<EntityRelation>) {
  const result = {
    statusCode: 200,
    response: {}
  }
  for (const relation of relations) {
    const relationEntity = findEntityRelationByKey(relation);
    if(relationEntity.statusCode !== 200) {
      return relationEntity;
    }
    result.response[relation.financeEntity.label.toLowerCase()] = relationEntity.response;
  }
  return result;
}