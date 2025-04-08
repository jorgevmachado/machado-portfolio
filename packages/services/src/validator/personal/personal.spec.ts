import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import { genderValidator, nameValidator } from './personal';

describe('personal Validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('genderValidator', () => {
    it('should return valid when received female gender', () => {
      const value = 'female';
      expect(genderValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid gender.',
      });
    });
    it('should return valid when received male gender', () => {
      const value = 'MALE';
      expect(genderValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid gender.',
      });
    });
    it('should return valid when received other gender', () => {
      const value = 'other';
      expect(genderValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid gender.',
      });
    });

    it('should return invalid when received invalid gender', () => {
      expect(genderValidator({ value: 'people' })).toEqual({
        valid: false,
        message: 'Invalid Gender.',
      });
    });
    it('should return invalid when received undefined gender', () => {
      expect(genderValidator({})).toEqual(REQUIRED_FIELD);
    });

    it('should return invalid when received invalid gender type', () => {
      expect(genderValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });

  describe('nameValidator', () => {
    const value = 'Harry';
    it('should return valid when received valid name', () => {
      expect(nameValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid name.',
      });
    });
    it('should return invalid when received undefined name', () => {
      expect(nameValidator({})).toEqual(REQUIRED_FIELD);
    });

    it('should return invalid when received invalid name type', () => {
      expect(nameValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });
});
