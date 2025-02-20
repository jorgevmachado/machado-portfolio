import type { ResultResponse } from '../../../shared/interface';

import type { FinanceEntity } from '../../interface';

import { conflictException, notFoundException } from '../../../shared';

interface ValidateEntityParams {
  name: string;
  isType?: boolean;
  isNotFound?: boolean;
  financeEntity: FinanceEntity;
}

export function validateEntity({
  name,
  isType,
  isNotFound,
  financeEntity,
}: ValidateEntityParams): ResultResponse {
  const exists = financeEntity?.list?.some((item) => item['name'] === name);
  if (isNotFound) {
    return validateEntityNotFound(exists, financeEntity.alias);
  }
  return isType
    ? validateEntityType(exists, financeEntity.label)
    : validateEntityName(exists, name);
}

export function validateEntityName(exists: boolean, name: string) {
  if (exists) {
    return conflictException(`Key (name)=(${name}) already exists.`);
  }
  return { statusCode: 200 };
}

export function validateEntityType(exists: boolean, label: string) {
  if (!exists) {
    return conflictException(
      `The selected ${label ?? 'field'} does not exist, try another one or create one.`,
    );
  }
  return { statusCode: 200 };
}

export function validateEntityNotFound(exists: boolean, alias: string) {
  if (!exists) {
    return notFoundException(`${alias} not found`);
  }
  return { statusCode: 200 };
}