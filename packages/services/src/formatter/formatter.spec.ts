import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { cleanFormatter, sanitize } from './formatter';

describe('Formatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('sanitizeFormatter', () => {
    it('should return a sanitized string when the string is received', () => {
      expect(sanitize('boyS')).toBe('boy');
    });
  });

  describe('cleanFormatter', () => {
    it('should return a clean string when the string is received like cpf', () => {
      expect(cleanFormatter('000.000.000-00')).toBe('00000000000');
    });

    it('should return a clean string when the string is received like phone mobile', () => {
      expect(cleanFormatter('(00) 00000-0000')).toBe('00000000000');
    });

    it('should return a empty string when the string is received is not valid', () => {
      expect(cleanFormatter(undefined)).toBe('');
    });
  });
});
