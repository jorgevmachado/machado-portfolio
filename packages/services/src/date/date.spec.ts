import { describe, expect, it } from '@jest/globals';

import { isUnderMinYearsOld } from './date';

describe('Date functions', () => {
  describe('isUnderMinYearsOld', () => {
    it('returns true if the date is less than 18', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 17);
      expect(isUnderMinYearsOld(date)).toBe(true);
    });
    it('returns false if the date is more than 18', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 20);
      expect(isUnderMinYearsOld(date)).toBe(false);
    });
  });
});
