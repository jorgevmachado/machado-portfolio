import { describe, expect, it } from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import { yearValidator, dateOfBirthValidator } from './date';

describe('date validator methods', () => {
  describe('yearValidator', () => {
    it('should return valid when received valid year', () => {
      expect(yearValidator({ value: 2021 })).toEqual({
        valid: true,
        message: 'Valid year.',
      });
    });

    it('should return invalid when received invalid year', () => {
      expect(yearValidator({ value: 99999 })).toEqual({
        valid: false,
        message: 'Please enter a valid year.',
      });
    });

    it('should return invalid when received undefined year', () => {
      expect(yearValidator({})).toEqual(REQUIRED_FIELD);
    });

    it('should return invalid when received invalid year type', () => {
      expect(yearValidator({ value: '2022' })).toEqual(INVALID_TYPE);
    });
  });

  describe('dateOfBirthValidator', () => {
    it('should return invalid when received undefined dateOfBirth', () => {
      expect(dateOfBirthValidator({})).toEqual(REQUIRED_FIELD);
    });

    it('should return invalid when received dateOfBirth type', () => {
      expect(dateOfBirthValidator({ value: 100 })).toEqual(INVALID_TYPE);
    });

    it('should return invalid when received invalid date string', () => {
      expect(dateOfBirthValidator({ value: '20/07/1990' })).toEqual({
        valid: false,
        message: 'Invalid date.',
      });
    });

    it('should return invalid when received date under 18 year old.', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 17);
      expect(dateOfBirthValidator({ value: date })).toEqual({
        valid: false,
        message: 'You must be over 18 years old.',
      });
    });

    it('should return valid when received date string over 18 year old.', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 20);
      expect(dateOfBirthValidator({ value: date.toISOString() })).toEqual({
        valid: true,
        message: 'valid date.',
      });
    });
  });
});