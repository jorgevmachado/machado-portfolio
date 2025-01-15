import { describe, expect, it } from '@jest/globals';

import { cpf } from './document';

describe('document validator methods', () => {
  describe('cpf', () => {
    it('should return valid when received valid cpf with mask', () => {
      expect(cpf('515.516.165-72')).toEqual({
        valid: true,
        message: 'Valid CPF.',
      });
    });

    it('should return valid when received valid cpf without mask', () => {
      expect(cpf('51551616572')).toEqual({
        valid: true,
        message: 'Valid CPF.',
      });
    });

    it('should return invalid when received invalid cpf', () => {
      expect(cpf('515516165722')).toEqual({
        valid: false,
        message: 'Please enter a valid cpf number.',
      });
    });
  });
});
