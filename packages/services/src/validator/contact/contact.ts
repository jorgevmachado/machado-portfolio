import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

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
    message: valid ? 'Valid Email.' : 'Please enter a valid email.',
  };
}

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
    message: valid
      ? 'Valid phone number.'
      : 'Please enter a valid phone number.',
  };
}

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
    message: valid
      ? 'Valid mobile number.'
      : 'Please enter a valid mobile number.',
  };
}
