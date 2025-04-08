import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import { cpfValidator } from './document';

describe('document validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('cpf', () => {
    it('should return valid when received valid cpf with mask', () => {
      const value = '515.516.165-72';
      expect(cpfValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid CPF.',
      });
    });

    it('should return valid when received valid cpf without mask', () => {
      const value = '51551616572';
      expect(cpfValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid CPF.',
      });
    });

    it('should return invalid when received invalid cpf', () => {
      expect(cpfValidator({ value: '515516165722' })).toEqual({
        valid: false,
        message: 'Please enter a valid cpf number.',
      });
    });

    it('should return invalid when received undefined cpf', () => {
      expect(cpfValidator({})).toEqual(REQUIRED_FIELD);
    });

    it('should return invalid when received invalid cpf type', () => {
      expect(cpfValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });
});
