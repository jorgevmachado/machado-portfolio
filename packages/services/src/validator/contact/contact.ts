import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

/**
 * Validates if the value is a valid email.
 * @param value
 */
export function emailValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const valid = regex.test(value);
  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'Valid Email.' : 'Please enter a valid email.',
  };
}

/**
 * Validates if the value is a valid phone number.
 * @param value
 */
export function phoneValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /^\(?\d{2}\)? ?\d{4}-?\d{4}$/;
  const valid = regex.test(value);
  return {
    valid,
    value: valid ? value : undefined,
    message: valid
      ? 'Valid phone number.'
      : 'Please enter a valid phone number.',
  };
}

/**
 * Validates if the value is a valid cell phone.
 * @param value
 */
export function mobileValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /^\(?\d{2}\)? ?\d{5}-?\d{4}$/;
  const valid = regex.test(value);
  return {
    valid,
    value: valid ? value : undefined,
    message: valid
      ? 'Valid mobile number.'
      : 'Please enter a valid mobile number.',
  };
}
