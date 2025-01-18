import { describe, expect, it } from '@jest/globals';

import { REQUIRED_FIELD } from '../utils';

import { cepValidator } from './address';

describe('address validator methods', () => {
  describe('cepValidator', () => {
    it('should return valid when received valid cep with mask', () => {
      expect(cepValidator('12345-678')).toEqual({
        valid: true,
        message: 'Valid zip code.',
      });
    });
    it('should return valid when received valid cep without mask', () => {
      expect(cepValidator('12345678')).toEqual({
        valid: true,
        message: 'Valid zip code.',
      });
    });
    it('should return invalid when received invalid cep', () => {
      expect(cepValidator('1234-567')).toEqual({
        valid: false,
        message: 'Please enter a valid cep.',
      });
    });
    it('should return invalid when received undefined cep', () => {
      expect(cepValidator()).toEqual(REQUIRED_FIELD);
    });
  });
});
