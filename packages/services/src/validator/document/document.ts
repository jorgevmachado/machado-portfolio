import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

/**
 * Validates if the value is a valid CPF.
 * @param value
 */
export function cpfValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /^(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;
  const valid = regex.test(value);
  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'Valid CPF.' : 'Please enter a valid cpf number.',
  };
}
