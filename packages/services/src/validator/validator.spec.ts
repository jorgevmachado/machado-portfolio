import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { isEmptyValidator, numberValidator } from './validator';
import { INVALID_TYPE } from './utils';

describe('Validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('numberValidator', () => {
    it('should return valid when received valid number', () => {
      const value = '7';
      expect(numberValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'valid number.',
      });
    });

    it('should return invalid when received invalid number', () => {
      expect(numberValidator({ value: 'seven' })).toEqual({
        valid: false,
        message: 'Please enter a valid number.',
      });
    });

    it('should return invalid when received empty param', () => {
      expect(numberValidator({})).toEqual({
        valid: false,
        message: 'Please enter a valid number.',
      });
    });

    it('should return invalid when received invalid param', () => {
      expect(numberValidator({ value: new Date() })).toEqual(INVALID_TYPE);
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
