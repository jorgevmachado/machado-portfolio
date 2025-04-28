import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { extractLastNumberFromUrl, isNumberEven } from './number';

describe('Number functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('extractLastNumberFromUrl', () => {
    it('should return a number when the string is received', () => {
      expect(extractLastNumberFromUrl('https://www.google.com/123')).toEqual(
        123,
      );
    });

    it('should return a 0 when the url is undefined', () => {
      expect(extractLastNumberFromUrl()).toEqual(0);
    });

    it('should return 0 if the last item in the URL is not a number', () => {
      expect(extractLastNumberFromUrl('https://www.google.com/abc')).toEqual(0);
    });

    it('should return 0 if the URL is empty', () => {
      expect(extractLastNumberFromUrl('')).toEqual(0);
    });

    it('should return the correct number when the URL ends with a mix of numbers and strings', () => {
      expect(extractLastNumberFromUrl('https://www.google.com/123abc')).toEqual(
        0,
      );
    });
  });

  describe('isNumberEven', () => {
    it('should return true for an even number', () => {
      expect(isNumberEven(4)).toBe(true);
    });

    it('should return false for an odd number', () => {
      expect(isNumberEven(3)).toBe(false);
    });

    it('should throw an error for a decimal number', () => {
      expect(() => isNumberEven(3.5)).toThrow('Please enter a integer number');
    });

    it('should return true for a negative even number', () => {
      expect(isNumberEven(-2)).toBe(true);
    });

    it('should return false for a negative odd number', () => {
      expect(isNumberEven(-3)).toBe(false);
    });
  });
});