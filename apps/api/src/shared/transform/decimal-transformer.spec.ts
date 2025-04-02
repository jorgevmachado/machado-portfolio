import { beforeEach, describe, expect, it } from '@jest/globals';

import { DecimalTransformer } from './decimal-transformer';

describe('DecimalTransformer', () => {
  let transformer: DecimalTransformer;

  beforeEach(() => {
    transformer = new DecimalTransformer();
  });

  describe('to', () => {
    it('should convert a number to string', () => {
      const result = transformer.to(123.45);
      expect(result).toBe('123.45');
    });

    it('should return null if number is undefined', () => {
      const result = transformer.to(undefined);
      expect(result).toBeNull();
    });

    it('should return null if number is null.', () => {
      const result = transformer.to(null as unknown as number);
      expect(result).toBeNull();
    });
  });

  describe('from', () => {
    it('should convert a decimal string to number', () => {
      const result = transformer.from('123.45');
      expect(result).toBe(123.45);
    });

    it('should return null if the decimal string is undefined', () => {
      const result = transformer.from(undefined);
      expect(result).toBeNull();
    });

    it('should return null if the decimal string is null', () => {
      const result = transformer.from(null as unknown as string);
      expect(result).toBeNull();
    });

    it('should return NaN if the decimal string is not valid', () => {
      const result = transformer.from('invalid-number');
      expect(result).toBeNaN();
    });
  });
});