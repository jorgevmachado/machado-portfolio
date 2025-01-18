import { describe, expect, it } from '@jest/globals';

import { sanitize } from './formatter';

describe('Formatter', () => {
  describe('sanitizeFormatter', () => {
    it('should return a sanitized string when the string is received', () => {
      expect(sanitize('boyS')).toBe('boy');
    });
  });
});
