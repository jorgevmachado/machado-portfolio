import { describe, expect, it } from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import { genderValidator, nameValidator } from './personal';

describe('personal Validator methods', () => {
  describe('genderValidator', () => {
    it('should return valid when received female gender', () => {
      expect(genderValidator({ value: 'female' })).toEqual({
        valid: true,
        message: 'Valid gender.',
      });
    });
    it('should return valid when received male gender', () => {
      expect(genderValidator({ value: 'MALE' })).toEqual({
        valid: true,
        message: 'Valid gender.',
      });
    });
    it('should return valid when received other gender', () => {
      expect(genderValidator({ value: 'other' })).toEqual({
        valid: true,
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
    it('should return valid when received valid name', () => {
      expect(nameValidator({ value: 'Harry' })).toEqual({
        valid: true,
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
