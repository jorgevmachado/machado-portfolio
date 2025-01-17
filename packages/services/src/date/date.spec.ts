import { describe, expect, it } from '@jest/globals';

import {
  calculateMaxDate,
  createDateFromYearMonthDay,
  isUnderMinimumAge,
  parseStartDate,
} from './dateUtils';
import {
  parseDateFromString,
  parseDateFromStringWithSeparator,
} from './stringToDateUtils';

describe('Date functions', () => {
  describe('isUnderMinimumAge', () => {
    it('returns true if the date is less than 18', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 17);
      expect(isUnderMinimumAge(date)).toBe(true);
    });
    it('returns false if the date is more than 18', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 20);
      expect(isUnderMinimumAge(date)).toBe(false);
    });
  });

  describe('parseDateFromString', () => {
    it('Must convert date string with international standard to date.', () => {
      expect(parseDateFromString('2000-01-01')).toEqual(new Date(2000, 0, 1));
    });

    it('Must convert the date string with Brazilian standard to date.', () => {
      expect(parseDateFromString('01/01/2000')).toEqual(new Date(2000, 0, 1));
    });

    it('It should return undefined because the month, year and day are out of range.', () => {
      expect(parseDateFromString('0-0-0')).toEqual(undefined);
    });

    it('Should return undefined because the separator pattern was not recognized.', () => {
      expect(parseDateFromString('20*02*200')).toBe(undefined);
    });

    it('It must return undefined because the values do not match the date.', () => {
      expect(parseDateFromString('yyyy-mm-dd')).toBe(undefined);
    });
  });

  describe('parseDateFromStringWithSeparator', () => {
    it('Must convert date string with international standard to date.', () => {
      expect(parseDateFromStringWithSeparator('2000-01-01', '-')).toEqual(
        new Date(2000, 0, 1),
      );
    });

    it('Must convert the date string with Brazilian standard to date.', () => {
      expect(parseDateFromStringWithSeparator('01/01/2000', '/')).toEqual(
        new Date(2000, 0, 1),
      );
    });

    it('It should return undefined because the pattern was not recognized.', () => {
      expect(parseDateFromStringWithSeparator('20*02*200')).toBe(undefined);
    });
  });

  describe('createDateFromYearMonthDay', () => {
    it('It must return the conversion of year month and day to Date', () => {
      expect(
        createDateFromYearMonthDay({
          day: 1,
          year: 2000,
          month: 0,
        }),
      ).toEqual(new Date(2000, 0, 1));
    });

    it('It must return the conversion of year month and day to Date with validation', () => {
      expect(
        createDateFromYearMonthDay({
          day: 1,
          year: 2000,
          month: 0,
          withValidation: true,
        }),
      ).toEqual(new Date(2000, 0, 1));
    });

    it('Converting year, month and day to Date must return undefined because the year is undefined', () => {
      expect(
        createDateFromYearMonthDay({
          day: 1,
          year: undefined,
          month: 0,
        }),
      ).toBe(undefined);
    });

    it('Converting year, month and day to Date with fallback must date', () => {
      expect(
        createDateFromYearMonthDay({
          day: 1,
          year: undefined,
          month: 0,
          fallback: true,
        }),
      ).toEqual(new Date(new Date().getFullYear(), 0, 1));
    });

    it('Converting year, month and day to Date must return undefined because the month is undefined', () => {
      expect(
        createDateFromYearMonthDay({
          day: 1,
          year: 2000,
          month: undefined,
        }),
      ).toBe(undefined);
    });

    it('Converting year, month and day to Date must return undefined because the day is undefined', () => {
      expect(
        createDateFromYearMonthDay({
          day: undefined,
          year: 2000,
          month: 0,
        }),
      ).toBe(undefined);
    });
  });

  describe('calculateMaxDate', () => {
    it('Must return the maximum date by a date', () => {
      const currentDate = new Date('2000-01-01');
      expect(calculateMaxDate(currentDate)).toEqual(currentDate);
    });

    it('Must return the maximum date by minAge', () => {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 18);
      expect(calculateMaxDate(new Date('2000-01-01'), 18)).toEqual(currentDate);
    });
  });

  describe('parseStartDate', () => {
    it('Must convert a string to date', () => {
      expect(
        parseStartDate({
          initialDate: {
            day: 20,
            year: 1990,
            month: 8,
          },
          stringDate: '2000-01-01',
        }),
      ).toEqual(new Date(2000, 0, 1));
    });

    it('Must convert a parseDate to date', () => {
      expect(
        parseStartDate({
          initialDate: {
            day: 20,
            year: 1990,
            month: 8,
          },
        }),
      ).toEqual(new Date(1990, 7, 20));
    });
  });
});
