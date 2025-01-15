import { describe, expect, it } from '@jest/globals';

import { cep } from './address';

describe('address validator methods', () => {
  describe('cep', () => {
    it('should return valid when received valid cep with mask', () => {
      expect(cep('12345-678')).toEqual({
        valid: true,
        message: 'Valid zip code.',
      });
    });
    it('should return valid when received valid cep without mask', () => {
      expect(cep('12345678')).toEqual({
        valid: true,
        message: 'Valid zip code.',
      });
    });
    it('should return invalid when received invalid cep', () => {
      expect(cep('1234-567')).toEqual({
        valid: false,
        message: 'Please enter a valid cep.',
      });
    });
  });
});
