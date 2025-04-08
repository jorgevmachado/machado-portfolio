import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

/**
 * Validates if the value is a valid zip code.
 * @param value
 */
export function cepValidator({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }

  const hasMask = value.includes('-');
  const regex = hasMask ? /^\d{2}\d{3}-\d{3}$/ : /^\d{5}\d{3}$/;
  const valid = regex.test(value);
  return {
    valid,
    value: valid ? value : undefined,
    message: valid ? 'Valid zip code.' : 'Please enter a valid cep.',
  };
}
