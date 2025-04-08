import { INVALID_TYPE } from './utils';

import type { ValidatorMessage, ValidatorParams } from './interface';

/**
 * Validates if it is a valid number.
 * @param value
 */
export function numberValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return {
      valid: false,
      message: 'Please enter a valid number.',
    };
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /^[0-9]+$/;
  const valid = regex.test(value);
  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'valid number.' : 'Please enter a valid number.',
  };
}

/**
 * Validates if validator is empty.
 * @param value
 */
export function isEmptyValidator(value: unknown): boolean {
  const type = typeof value;

  if (type === 'boolean') {
    return !value;
  }

  if (type !== 'object') {
    return !value;
  }

  return false;
}
