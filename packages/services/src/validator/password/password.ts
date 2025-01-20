import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

export function minLength({
  min = 8,
  value,
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
    message: valid
      ? 'Valid password.'
      : `Must be at least ${min} characters long.`,
  };
}

export function leastOneLetter({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /[a-zA-Z]/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid password.' : 'It must contain at least one letter.',
  };
}

export function leastOneNumber({ value }: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /[0-9]/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid password.' : 'It must contain at least one number.',
  };
}

export function leastOneSpecialCharacter({
  value,
}: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const regex = /[^a-zA-Z0-9]/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid
      ? 'Valid password.'
      : 'It must contain at least one special character.',
  };
}

export function passwordValidator({
  min = 8,
  value,
}: ValidatorParams): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string') {
    return INVALID_TYPE;
  }
  const minLengthValidator = minLength({ min, value });

  if (!minLengthValidator.valid) {
    return minLengthValidator;
  }

  const leastOneLetterValidator = leastOneLetter({ value });

  if (!leastOneLetterValidator.valid) {
    return leastOneLetterValidator;
  }
  const leastOneNumberValidator = leastOneNumber({ value });

  if (!leastOneNumberValidator.valid) {
    return leastOneNumberValidator;
  }
  const leastOneSpecialCharacterValidator = leastOneSpecialCharacter({ value });

  if (!leastOneSpecialCharacterValidator.valid) {
    return leastOneSpecialCharacterValidator;
  }

  return {
    valid: true,
    message: 'Valid password.',
  };
}

export function confirmPasswordValidator({
  min = 8,
  value,
  optionalValue,
}: ValidatorParams): ValidatorMessage {
  if (!value || !optionalValue) {
    return REQUIRED_FIELD;
  }
  if (typeof value !== 'string' || typeof optionalValue !== 'string') {
    return INVALID_TYPE;
  }
  const passwordValidated = passwordValidator({ value, min });

  if (!passwordValidated.valid) {
    return passwordValidated;
  }

  const valid = value === optionalValue;

  return {
    valid,
    message: valid
      ? 'Valid password.'
      : 'Password confirmation does not match the password.',
  };
}
