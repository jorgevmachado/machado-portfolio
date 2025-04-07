import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import {
  confirmPasswordValidator,
  leastOneLetter,
  leastOneNumber,
  leastOneSpecialCharacter,
  minLength,
  passwordValidator,
} from './password';

describe('password validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('minLength', () => {
    it('Should return valid for minimum length.', () => {
      expect(minLength({ min: 8, value: '12345678' })).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return invalid for minimum length.', () => {
      expect(minLength({ min: 8, value: '1234567' })).toEqual({
        valid: false,
        message: 'Must be at least 8 characters long.',
      });
    });

    it('Should return invalid when received undefined value minLength.', () => {
      expect(minLength({})).toEqual(REQUIRED_FIELD);
    });

    it('Should return invalid when received invalid minLength value type.', () => {
      expect(minLength({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });

  describe('leastOneLetter', () => {
    it('Should return valid for least one letter', () => {
      expect(leastOneLetter({ value: 'a12345678' })).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return invalid for least one letter', () => {
      expect(leastOneLetter({ value: '12345678' })).toEqual({
        valid: false,
        message: 'It must contain at least one letter.',
      });
    });

    it('Should return invalid when received undefined value for least one letter', () => {
      expect(leastOneLetter({})).toEqual(REQUIRED_FIELD);
    });

    it('Should return invalid when received invalid value type for least one letter', () => {
      expect(leastOneLetter({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });

  describe('leastOneNumber', () => {
    it('Should return valid for least one number', () => {
      expect(leastOneNumber({ value: 'abcdefgh1' })).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return invalid for least one number', () => {
      expect(leastOneNumber({ value: 'abcdefgh' })).toEqual({
        valid: false,
        message: 'It must contain at least one number.',
      });
    });

    it('Should return invalid when received undefined value for least one number', () => {
      expect(leastOneNumber({})).toEqual(REQUIRED_FIELD);
    });

    it('Should return invalid when received invalid type value for least one number', () => {
      expect(leastOneNumber({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });

  describe('leastOneSpecialCharacter', () => {
    it('Should return valid for least one number', () => {
      expect(leastOneSpecialCharacter({ value: '@12345678' })).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return invalid for least one number', () => {
      expect(leastOneSpecialCharacter({ value: '12345678' })).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });

    it('Should return invalid when received undefined value for least one number', () => {
      expect(leastOneSpecialCharacter({})).toEqual(REQUIRED_FIELD);
    });

    it('Should return invalid when received invalid value type for least one number', () => {
      expect(leastOneSpecialCharacter({ value: new Date() })).toEqual(
        INVALID_TYPE,
      );
    });
  });

  describe('passwordValidator', () => {
    it('Should return valid for validator.', () => {
      expect(passwordValidator({ value: '@b345678' })).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('should return invalid when the password is received with fewer characters than the minimum', () => {
      expect(passwordValidator({ min: 8, value: '1234567' })).toEqual({
        valid: false,
        message: 'Must be at least 8 characters long.',
      });
    });

    it('should return invalid when the password is received without at least one letter', () => {
      expect(passwordValidator({ value: '12345678' })).toEqual({
        valid: false,
        message: 'It must contain at least one letter.',
      });
    });

    it('should return invalid when the password is received without at least one number', () => {
      expect(passwordValidator({ value: 'abcdefghi' })).toEqual({
        valid: false,
        message: 'It must contain at least one number.',
      });
    });

    it('should return invalid when the password is received without at special character', () => {
      expect(passwordValidator({ value: 'a12345678' })).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });

    it('should return invalid when received undefined password', () => {
      expect(passwordValidator({})).toEqual(REQUIRED_FIELD);
    });

    it('should return invalid when received invalid password type', () => {
      expect(passwordValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });

  describe('confirmPasswordValidator', () => {
    it('Should return valid for confirmPassword.', () => {
      expect(
        confirmPasswordValidator({
          min: 8,
          value: '@b345678',
          optionalValue: '@b345678',
        }),
      ).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('should return Password confirmation does not match the password.', () => {
      expect(
        confirmPasswordValidator({
          value: '@b345678',
          optionalValue: '@b345679',
        }),
      ).toEqual({
        valid: false,
        message: 'Password confirmation does not match the password.',
      });
    });

    it('should return invalid for confirmPassword.', () => {
      expect(
        confirmPasswordValidator({
          value: '2b345679',
          optionalValue: '@b345678',
        }),
      ).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });

    it('should return invalid when received undefined confirmPassword', () => {
      expect(confirmPasswordValidator({})).toEqual(REQUIRED_FIELD);
    });

    it('should return invalid when received invalid value type in confirmPassword', () => {
      expect(
        confirmPasswordValidator({
          value: new Date(),
          optionalValue: '@b345678',
        }),
      ).toEqual(INVALID_TYPE);
    });
    it('should return invalid when received invalid optionalValue type in confirmPassword', () => {
      expect(
        confirmPasswordValidator({
          value: '@b345678',
          optionalValue: new Date(),
        }),
      ).toEqual(INVALID_TYPE);
    });
  });
});
