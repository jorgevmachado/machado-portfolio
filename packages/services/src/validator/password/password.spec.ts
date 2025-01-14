import { describe, expect, it } from '@jest/globals';

import PasswordValidator from './password';

describe('password validator methods', () => {
  const validatorMessage = {
    valid: true,
    message: 'password valid',
  };

  describe('validator', () => {
    const passwordValidator = new PasswordValidator(validatorMessage);
    it('Should return valid for validator.', () => {
      expect(passwordValidator.validator(8, '@b345678')).toEqual(
        passwordValidator.validatorMessage,
      );
    });
    it('should return invalid when the password is received with fewer characters than the minimum', () => {
      expect(passwordValidator.validator(8, '1234567')).toEqual({
        valid: false,
        message: 'Must be at least 8 characters long.',
      });
    });

    it('should return invalid when the password is received without at least one letter', () => {
      expect(passwordValidator.validator(8, '12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one letter.',
      });
    });

    it('should return invalid when the password is received without at least one number', () => {
      expect(passwordValidator.validator(8, 'abcdefghi')).toEqual({
        valid: false,
        message: 'It must contain at least one number.',
      });
    });

    it('should return invalid when the password is received without at special character', () => {
      expect(passwordValidator.validator(8, 'a12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });
  });

  describe('minLength', () => {
    const passwordValidator = new PasswordValidator(validatorMessage);
    it('Should return true for minimum length.', () => {
      expect(passwordValidator.minLength(8, '12345678')).toEqual(
        passwordValidator.validatorMessage,
      );
    });

    it('Should return false for minimum length.', () => {
      expect(passwordValidator.minLength(8, '1234567')).toEqual({
        valid: false,
        message: 'Must be at least 8 characters long.',
      });
    });
  });

  describe('leastOneLetter', () => {
    const passwordValidator = new PasswordValidator(validatorMessage);
    it('Should return true for least one letter', () => {
      expect(passwordValidator.leastOneLetter('a12345678')).toEqual(
        passwordValidator.validatorMessage,
      );
    });

    it('Should return false for least one letter', () => {
      expect(passwordValidator.leastOneLetter('12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one letter.',
      });
    });
  });

  describe('leastOneNumber', () => {
    const passwordValidator = new PasswordValidator(validatorMessage);
    it('Should return true for least one number', () => {
      expect(passwordValidator.leastOneNumber('abcdefgh1')).toEqual(
        passwordValidator.validatorMessage,
      );
    });

    it('Should return false for least one number', () => {
      expect(passwordValidator.leastOneNumber('abcdefgh')).toEqual({
        valid: false,
        message: 'It must contain at least one number.',
      });
    });
  });

  describe('leastOneSpecialCharacter', () => {
    const passwordValidator = new PasswordValidator(validatorMessage);
    it('Should return true for least one number', () => {
      expect(passwordValidator.leastOneSpecialCharacter('@12345678')).toEqual(
        passwordValidator.validatorMessage,
      );
    });

    it('Should return false for least one number', () => {
      expect(passwordValidator.leastOneSpecialCharacter('12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });
  });
});
