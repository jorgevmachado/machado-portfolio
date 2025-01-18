import { describe, expect, it } from '@jest/globals';

import { REQUIRED_FIELD } from '../utils';

import { cpfValidator } from './document';

describe('document validator methods', () => {
  describe('cpf', () => {
    it('should return valid when received valid cpf with mask', () => {
      expect(cpfValidator('515.516.165-72')).toEqual({
        valid: true,
        message: 'Valid CPF.',
      });
    });

    it('should return valid when received valid cpf without mask', () => {
      expect(cpfValidator('51551616572')).toEqual({
        valid: true,
        message: 'Valid CPF.',
      });
    });

    it('should return invalid when received invalid cpf', () => {
      expect(cpfValidator('515516165722')).toEqual({
        valid: false,
        message: 'Please enter a valid cpf number.',
      });
    });

    it('should return invalid when received undefined cpf', () => {
      expect(cpfValidator()).toEqual(REQUIRED_FIELD);
    });
  });
});
