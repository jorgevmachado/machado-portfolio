import type { ValidatorMessage, ValidatorParams } from '../interface';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

/**
 * Validates whether the value has the minimum number of characters.
 * @param min
 * @param value
 */
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
    value: valid ? value : undefined,
    message: valid
      ? 'Valid password.'
      : `Must be at least ${min} characters long.`,
  };
}

/**
 * Validates if the value has at least one letter.
 * @param value
 */
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
    value: valid ? value : undefined,
    message: valid ? 'Valid password.' : 'It must contain at least one letter.',
  };
}

/**
 * Validates if the value has at least one number.
 * @param value
 */
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
    value: valid ? value : undefined,
    message: valid ? 'Valid password.' : 'It must contain at least one number.',
  };
}

/**
 * Validates if the value has at least one special character
 * @param value
 */
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
    value: valid ? value : undefined,
    message: valid
      ? 'Valid password.'
      : 'It must contain at least one special character.',
  };
}

/**
 * Validates if the value is a valid password.
 * @param min
 * @param value
 */
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
    value,
    message: 'Valid password.',
  };
}

/**
 * Validates whether the value of a password confirmation is a valid password.
 * @param min
 * @param value
 * @param optionalValue
 */
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
    value: valid ? value : undefined,
    message: valid
      ? 'Valid password.'
      : 'Password confirmation does not match the password.',
  };
}
