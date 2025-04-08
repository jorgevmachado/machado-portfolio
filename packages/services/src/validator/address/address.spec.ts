import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import { cepValidator } from './address';

describe('address validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('cepValidator', () => {
    it('should return valid when received valid cep with mask', () => {
      const value =  '12345-678';
      expect(cepValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid zip code.',
      });
    });
    it('should return valid when received valid cep without mask', () => {
      const value =  '12345678';
      expect(cepValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid zip code.',
      });
    });
    it('should return invalid when received invalid cep', () => {
      expect(cepValidator({ value: '1234-567' })).toEqual({
        valid: false,
        message: 'Please enter a valid cep.',
      });
    });
    it('should return invalid when received undefined cep', () => {
      expect(cepValidator({})).toEqual(REQUIRED_FIELD);
    });
    it('should return invalid when received invalid type cep', () => {
      expect(cepValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });
});
