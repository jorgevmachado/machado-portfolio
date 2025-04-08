import { EGender } from '@repo/business/shared/enum';

import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

/**
 * Validates whether the value is a valid name.
 * @param value
 * @param min
 */
export function nameValidator({
  value,
  min = 2,
}: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }

  const valid = value.length >= min;
  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'Valid name.' : 'Name must be at least 2 characters long.',
  };
}

/**
 * Validates whether the value is a valid gender.
 * @param value
 */
export function genderValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }

  const valid =
    value.toUpperCase() === EGender.MALE ||
    value.toUpperCase() === EGender.FEMALE ||
    value.toUpperCase() === EGender.OTHER;

  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'Valid gender.' : 'Invalid Gender.',
  };
}