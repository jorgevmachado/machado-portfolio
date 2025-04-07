import type { ResultResponse } from '../../../shared/interface';

import type { FinanceEntity } from '../../interface';

import { conflictException, notFoundException } from '../../../shared';
import { isUUID } from '@repo/services/string/string';

interface ValidateEntityParams {
  param: string;
  isType?: boolean;
  isNotFound?: boolean;
  financeEntity: FinanceEntity;
}

export function validateEntity({
  param,
  isType,
  isNotFound,
  financeEntity,
}: ValidateEntityParams): ResultResponse {
  const filter = {
    key: isUUID(param) ? 'id' : 'name',
    value: param,
  };
  const exists = financeEntity?.list?.find(
    (item) => item[filter.key] === filter.value,
  );

  if (isNotFound) {
    return validateEntityNotFound(Boolean(exists), financeEntity.alias);
  }
  return isType
    ? validateEntityType(Boolean(exists), financeEntity.label)
    : validateEntityName(Boolean(exists), exists?.['name'] ?? 'field');
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