import { describe, expect, it, jest } from '@jest/globals';

import {
  getCurrentMonth,
  getMonthByIndex,
  getMonthIndex,
  validateMonth,
} from './month';
import { EMonth } from './enum';

describe('month', () => {
  describe('getCurrentMonth', () => {
    it('Should return the current month in string format and uppercase (EMonth).', () => {
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce(() => new Date(2023, 5, 1).getTime());

      const result = getCurrentMonth();
      expect(result).toEqual(EMonth.APRIL);
      jest.restoreAllMocks();
    });
  });
  describe('getMonthIndex', () => {
    it('Should return the correct index for a valid month.', () => {
      expect(getMonthIndex(EMonth.JANUARY)).toBe(0);
      expect(getMonthIndex(EMonth.DECEMBER)).toBe(11);
    });
  });

  describe('getMonthByIndex', () => {
    it('Should return the correct month for a valid index.', () => {
      expect(getMonthByIndex(0)).toBe('january');
      expect(getMonthByIndex(11)).toBe('december');
    });

    it('Should return undefined for indexes outside the valid range.', () => {
      expect(getMonthByIndex(-1)).toBeUndefined();
      expect(getMonthByIndex(12)).toBeUndefined();
    });
  });

  describe('validateMonth', () => {
    it('Should not throw error for valid months.', () => {
      expect(() => validateMonth(EMonth.JANUARY)).not.toThrow();
      expect(() => validateMonth(EMonth.DECEMBER)).not.toThrow();
    });
    it('Should throw an error for invalid months.', () => {
      expect(() => validateMonth('INVALID')).toThrow('The month provided is invalid: INVALID');
    });

  });
});