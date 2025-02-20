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
  const resultResponseValidate = validateEntity({ name, financeEntity });
  if (resultResponseValidate.statusCode !== 200) {
    return resultResponseValidate;
  }
  if (financeEntity.type) {
    const resultTypeResponseValidate = validateEntity({
      name: type,
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
      name: type,
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