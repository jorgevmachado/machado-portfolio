import { isUnderMinimumAge } from '../../date';

import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

export function yearValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  if (typeof value !== 'number') {
    return INVALID_TYPE;
  }

  const valid = value >= 1 && value <= 9999;
  return {
    valid,
    message: valid ? 'Valid year.' : 'Please enter a valid year.',
  };
}

export function dateOfBirthValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  if (typeof value === 'number') {
    return INVALID_TYPE;
  }

  const date = typeof value !== 'string' ? value : new Date(value);

  if (date.toString() === 'Invalid Date') {
    return {
      valid: false,
      message: 'Invalid date.',
    };
  }

  return isUnderMinimumAge(date)
      ? {
        valid: false,
        message: 'You must be over 18 years old.',
      }
      : {
        valid: true,
        message: 'valid date.',
      };
}