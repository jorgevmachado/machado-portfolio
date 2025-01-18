import { describe, expect, it } from '@jest/globals';

import {
  confirmPasswordValidator,
  leastOneLetter,
  leastOneNumber,
  leastOneSpecialCharacter,
  minLength,
  passwordValidator,
} from './password';
import { REQUIRED_FIELD } from '../utils';

describe('password validator methods', () => {
  describe('passwordValidator', () => {
    it('Should return valid for validator.', () => {
      expect(passwordValidator('@b345678')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('should return invalid when the password is received with fewer characters than the minimum', () => {
      expect(passwordValidator('1234567', 8)).toEqual({
        valid: false,
        message: 'Must be at least 8 characters long.',
      });
    });

    it('should return invalid when the password is received without at least one letter', () => {
      expect(passwordValidator('12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one letter.',
      });
    });

    it('should return invalid when the password is received without at least one number', () => {
      expect(passwordValidator('abcdefghi')).toEqual({
        valid: false,
        message: 'It must contain at least one number.',
      });
    });

    it('should return invalid when the password is received without at special character', () => {
      expect(passwordValidator('a12345678')).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });

    it('should return invalid when received undefined password', () => {
      expect(passwordValidator()).toEqual(REQUIRED_FIELD);
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

  describe('confirmPasswordValidator', () => {
    it('Should return valid for confirmPassword.', () => {
      expect(confirmPasswordValidator('@b345678', '@b345678', 8)).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });

    it('should return Password confirmation does not match the password.', () => {
      expect(confirmPasswordValidator('@b345678', '@b345679')).toEqual({
        valid: false,
        message: 'Password confirmation does not match the password.',
      });
    });

    it('should return invalid for confirmPassword.', () => {
      expect(confirmPasswordValidator('2b345679', '@b345678')).toEqual({
        valid: false,
        message: 'It must contain at least one special character.',
      });
    });

    it('should return invalid when received undefined confirmPassword', () => {
      expect(confirmPasswordValidator()).toEqual(REQUIRED_FIELD);
    });
  });
});
