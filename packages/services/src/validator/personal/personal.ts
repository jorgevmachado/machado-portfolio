import { EGender } from '@repo/business/api/nest/enum';

import { isUnderMinimumAge } from '../../date';

import { ValidatorMessage } from '../interface';

import { REQUIRED_FIELD } from '../utils';

export function nameValidator(
  value?: string,
  min: number = 2,
): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  const valid = value.length >= min;
  return {
    valid,
    message: valid ? 'Valid name.' : 'Name must be at least 2 characters long.',
  };
}

export function genderValidator(value?: string): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }

  const valid =
    value.toUpperCase() === EGender.MALE ||
    value.toUpperCase() === EGender.FEMALE ||
    value.toUpperCase() === EGender.OTHER;

  return {
    valid,
    message: valid ? 'Valid gender.' : 'Invalid Gender.',
  };
}

export function dateOfBirthValidator(value?: string | Date): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
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
