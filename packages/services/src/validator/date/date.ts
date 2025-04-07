import { isUnderMinimumAge } from '../../date';

import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

/**
 * Validates whether the past year's value is valid.
 * @param value
 * @param min
 * @param max
 */
export function yearValidator({ value, min = 1, max = 9999 }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  if (typeof value !== 'number') {
    return INVALID_TYPE;
  }

  const valid = value >= min && value <= max;
  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'Valid year.' : 'Please enter a valid year.',
  };
}

/**
 * Validates if the past month value is valid.
 * @param value
 */
export function monthValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value && value !== 0) {
    return REQUIRED_FIELD;
  }

  if (typeof value !== 'number') {
    return INVALID_TYPE;
  }

  const invalid = value < 0 || value > 12;

  return {
    valid: !invalid,
    value: !invalid ? value : undefined,
    message: !invalid ? 'Valid month.' : 'Please enter a valid month.',
  }
}

/**
 * Ensure that the day is within the appropriate bounds of being greater than 1 and less than and equal to 31.
 * @param value
 */
export function dayValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value  && value !== 0) {
    return REQUIRED_FIELD;
  }

  if (typeof value !== 'number') {
    return INVALID_TYPE;
  }

  const valid = value >= 1 && value <= 31;
  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'Valid day.' : 'Please enter a valid day.',
  };
}

/**
 * Validate if it is a valid date and if you are of legal age
 * @param value
 */
export function dateOfBirthValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
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
        value,
        message: 'valid date.',
      };
}