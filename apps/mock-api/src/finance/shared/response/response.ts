import type { ResultResponse } from '../../../shared/interface';

import type { FinanceEntity } from '../../interface';

import { validateEntity, validateEntityNotFound } from '../validate';

interface CreateEntityResponseParams {
  name: string;
  type?: string;
  entity: unknown;
  financeEntity: FinanceEntity;
}

export function createEntityResponse({
  name,
  type,
  entity,
  financeEntity,
}: CreateEntityResponseParams): ResultResponse {
  const resultResponseValidate = validateEntity({ param: name, financeEntity });
  if (resultResponseValidate.statusCode !== 200) {
    return resultResponseValidate;
  }
  if (financeEntity.type) {
    const resultTypeResponseValidate = validateEntity({
      param: type,
      financeEntity: financeEntity.type,
      isType: true,
    });
    if (resultTypeResponseValidate.statusCode !== 200) {
      return resultTypeResponseValidate;
    }
  }
  return {
    response: entity,
    statusCode: 200,
  };
}
type UpdateEntityResponseParams = Omit<CreateEntityResponseParams, 'name'>;

export function updateEntityResponse({
  type,
  entity,
  financeEntity,
}: UpdateEntityResponseParams) {
  const resultResponseValidate = validateEntityNotFound(
    Boolean(entity),
    financeEntity.alias,
  );
  if (resultResponseValidate.statusCode !== 200) {
    return resultResponseValidate;
  }
  if (financeEntity.type) {
    const resultTypeResponseValidate = validateEntity({
      param: type,
      financeEntity: financeEntity.type,
      isType: true,
    });
    if (resultTypeResponseValidate.statusCode !== 200) {
      return resultTypeResponseValidate;
    }
  }
  return {
    response: entity,
    statusCode: 200,
  };
}

type RemoveEntityResponseParams = Omit<UpdateEntityResponseParams, 'type'>;

export function removeEntityResponse({
  entity,
  financeEntity,
}: RemoveEntityResponseParams) {
  const resultResponseValidate = validateEntityNotFound(
    Boolean(entity),
    financeEntity.alias,
  );
  if (resultResponseValidate.statusCode !== 200) {
    return resultResponseValidate;
  }
  return {
    response: { message: 'Successfully removed' },
    statusCode: 200,
  };
}