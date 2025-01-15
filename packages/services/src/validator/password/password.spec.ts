import { describe, expect, it } from '@jest/globals';

import {
  confirmPassword,
  leastOneLetter,
  leastOneNumber,
  leastOneSpecialCharacter,
  minLength,
  validator,
} from './password';

describe('password validator methods', () => {
  describe('validator', () => {
    it('Should return valid for validator.', () => {
      expect(validator(8, '@b345678')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('should return invalid when the password is received with fewer characters than the minimum', () => {
      expect(validator(8, '1234567')).toEqual({
        valid: false,
        message: 'Must be at least 8 characters long.',
      });
    });

    it('should return invalid when the password is received without at least one letter', () => {
      expect(validator(8, '12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one letter.',
      });
    });

    it('should return invalid when the password is received without at least one number', () => {
      expect(validator(8, 'abcdefghi')).toEqual({
        valid: false,
        message: 'It must contain at least one number.',
      });
    });

    it('should return invalid when the password is received without at special character', () => {
      expect(validator(8, 'a12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });
  });

  describe('minLength', () => {
    it('Should return true for minimum length.', () => {
      expect(minLength(8, '12345678')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return false for minimum length.', () => {
      expect(minLength(8, '1234567')).toEqual({
        valid: false,
        message: 'Must be at least 8 characters long.',
      });
    });
  });

  describe('leastOneLetter', () => {
    it('Should return true for least one letter', () => {
      expect(leastOneLetter('a12345678')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return false for least one letter', () => {
      expect(leastOneLetter('12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one letter.',
      });
    });
  });

  describe('leastOneNumber', () => {
    it('Should return true for least one number', () => {
      expect(leastOneNumber('abcdefgh1')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return false for least one number', () => {
      expect(leastOneNumber('abcdefgh')).toEqual({
        valid: false,
        message: 'It must contain at least one number.',
      });
    });
  });

  describe('leastOneSpecialCharacter', () => {
    it('Should return true for least one number', () => {
      expect(leastOneSpecialCharacter('@12345678')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('Should return false for least one number', () => {
      expect(leastOneSpecialCharacter('12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });
  });

  describe('confirmPassword', () => {
    it('Should return valid for confirmPassword.', () => {
      expect(confirmPassword(8, '@b345678', '@b345678')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('should return Password confirmation does not match the password.', () => {
      expect(confirmPassword(8, '@b345678', '@b345679')).toEqual({
        valid: false,
        message: 'Password confirmation does not match the password.',
      });
    });

    it('should return invalid for confirmPassword.', () => {
      expect(confirmPassword(8, '@b345678', '2b345679')).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });
  });
});
