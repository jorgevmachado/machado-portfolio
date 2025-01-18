import { describe, expect, it } from '@jest/globals';

import { isEmptyValidator, numberValidator } from './validator';

describe('Validator methods', () => {
  describe('numberValidator', () => {
    it('should return valid when received valid number', () => {
      expect(numberValidator('7')).toEqual({
        valid: true,
        message: 'valid number.',
      });
    });

    it('should return true when received invalid number', () => {
      expect(numberValidator('seven')).toEqual({
        valid: false,
        message: 'Please enter a valid number.',
      });
    });
  });

  describe('isEmptyValidator', () => {
    it('should return true when received empty string value', () => {
      expect(isEmptyValidator('')).toEqual(true);
    });

    it('should return true when received boolean value', () => {
      expect(isEmptyValidator(false)).toEqual(true);
    });

    it('should return false when received object value', () => {
      expect(isEmptyValidator({})).toEqual(false);
    });
  });
});
