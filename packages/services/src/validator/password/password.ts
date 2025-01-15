import { ValidatorMessage } from '../interface';

export function minLength(min: number, value: string): ValidatorMessage {
  const valid = value.length >= min;
  return {
    valid,
    message: valid
      ? 'Valid password.'
      : `Must be at least ${min} characters long.`,
  };
}

export function leastOneLetter(value: string): ValidatorMessage {
  const regex = /[a-zA-Z]/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid password.' : 'It must contain at least one letter.',
  };
}

export function leastOneNumber(value: string): ValidatorMessage {
  const regex = /[0-9]/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid password.' : 'It must contain at least one number.',
  };
}

export function leastOneSpecialCharacter(value: string): ValidatorMessage {
  const regex = /[^a-zA-Z0-9]/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid
      ? 'Valid password.'
      : 'It must contain at least one special character.',
  };
}

export function validator(min: number, value: string): ValidatorMessage {
  const minLengthValidator = minLength(min, value);

  if (!minLengthValidator.valid) {
    return minLengthValidator;
  }

  const leastOneLetterValidator = leastOneLetter(value);

  if (!leastOneLetterValidator.valid) {
    return leastOneLetterValidator;
  }
  const leastOneNumberValidator = leastOneNumber(value);

  if (!leastOneNumberValidator.valid) {
    return leastOneNumberValidator;
  }
  const leastOneSpecialCharacterValidator = leastOneSpecialCharacter(value);

  if (!leastOneSpecialCharacterValidator.valid) {
    return leastOneSpecialCharacterValidator;
  }

  return {
    valid: true,
    message: 'Valid password.',
  };
}

export function confirmPassword(
  min: number,
  password: string,
  value: string,
): ValidatorMessage {
  const passwordValidator = validator(min, value);

  if (!passwordValidator.valid) {
    return passwordValidator;
  }

  const valid = value === password;

  return {
    valid,
    message: valid
      ? 'Valid password.'
      : 'Password confirmation does not match the password.',
  };
}
