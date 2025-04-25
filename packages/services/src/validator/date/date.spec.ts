import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import {
  dateOfBirthValidator,
  dayValidator,
  isDateString,
  monthValidator,
  yearValidator,
} from './date';

describe('date validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('yearValidator', () => {
    it('should return valid when received valid year', () => {
      expect(yearValidator({ value: 2021 })).toEqual({
        valid: true,
        value: 2021,
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

  describe('monthValidator', () => {
    it('must return valid for months between 0 and 12.', () => {
      expect(monthValidator({ value: 0 })).toEqual({
        valid: true,
        value: 0,
        message: 'Valid month.',
      });
      expect(monthValidator({ value: 12 })).toEqual({
        valid: true,
        value: 12,
        message: 'Valid month.',
      });
      expect(monthValidator({ value: 6 })).toEqual({
        valid: true,
        value: 6,
        message: 'Valid month.',
      });
    });

    it('should return invalid for months outside the range.', () => {
      expect(monthValidator({ value: -1 })).toEqual({
        valid: false,
        value: undefined,
        message: 'Please enter a valid month.',
      });
      expect(monthValidator({ value: 13 })).toEqual({
        valid: false,
        value: undefined,
        message: 'Please enter a valid month.',
      });
    });

    it('should return a type error for non-numeric inputs.', () => {
      expect(monthValidator({ value: 'January' })).toEqual(INVALID_TYPE);
      expect(monthValidator({ value: true })).toEqual(INVALID_TYPE);
    });

    it('should return a required field error for missing entries.', () => {
      expect(monthValidator({ value: undefined })).toEqual(REQUIRED_FIELD);
    });
  });

  describe('dayValidator', () => {
    it('must return valid for days between 1 and 31.', () => {
      expect(dayValidator({ value: 1 })).toEqual({
        valid: true,
        value: 1,
        message: 'Valid day.',
      });
      expect(dayValidator({ value: 31 })).toEqual({
        valid: true,
        value: 31,
        message: 'Valid day.',
      });
      expect(dayValidator({ value: 15 })).toEqual({
        valid: true,
        value: 15,
        message: 'Valid day.',
      });
    });

    it('should return invalid for days outside the range.', () => {
      expect(dayValidator({ value: 0 })).toEqual({
        valid: false,
        value: undefined,
        message: 'Please enter a valid day.',
      });
      expect(dayValidator({ value: 32 })).toEqual({
        valid: false,
        value: undefined,
        message: 'Please enter a valid day.',
      });
      expect(dayValidator({ value: -5 })).toEqual({
        valid: false,
        value: undefined,
        message: 'Please enter a valid day.',
      });
    });

    it('should return a type error for non-numeric inputs.', () => {
      expect(dayValidator({ value: '15th' })).toEqual(INVALID_TYPE);
    });

    it('should return a required field error for missing entries.', () => {
      expect(dayValidator({ value: undefined })).toEqual(REQUIRED_FIELD);
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
      const value = date.toISOString();
      expect(dateOfBirthValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'valid date.',
      });
    });
  });

  describe('isDateString', () => {
    it('Must return valid for string with international standard date.', () => {
      const value = '2000-01-01';
      expect(isDateString({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid date string.',
      });
    });

    it('Must return valid for string iso with international standard date.', () => {
      const value = '2000-01-01T00:00:00Z';
      expect(isDateString({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid date string.',
      });
    });

    it('Must return valid for string iso with timezone and international standard date.', () => {
      const value = '2000-01-01T00:00:00.000Z';
      expect(isDateString({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid date string.',
      });
    });

    it('Must return valid for string with Brazilian standard date.', () => {
      const value = '01/01/2000';
      expect(isDateString({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid date string.',
      });
    });

    it('should return a required field error for missing date string.', () => {
      expect(isDateString({ value: undefined })).toEqual(REQUIRED_FIELD);
    });

    it('should return a type error for non string date.', () => {
      expect(isDateString({ value: 1 })).toEqual(INVALID_TYPE);
    });
  });
});