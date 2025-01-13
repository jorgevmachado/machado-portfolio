import { describe, expect, it } from '@jest/globals';

import formatter from './formatter';

describe('Formatter', () => {
  describe('sanitize', () => {
    it('should return a sanitized string when the string is received', () => {
      expect(formatter.sanitize('boyS')).toBe('boy');
    });
  });

  describe('maskPhone', () => {
    it('should return a phone number when the string is received', () => {
      expect(formatter.maskPhone('00000000000')).toEqual('(00) 00000-0000');
    });
  });

  describe('maskCurrency', () => {
    it('should return formatted currency when currency is received', () => {
      expect(formatter.maskCurrency(9.99)).toEqual('R$ 9,99');
    });
  });

  describe('removeCurrencyMask', () => {
    it('should return number when received currency', () => {
      expect(formatter.removeCurrencyMask('R$ 900')).toEqual(900);
    });
  });

  describe('maskCep', () => {
    it('should return a cep when the string is received', () => {
      expect(formatter.maskCep('00000000')).toEqual('00000-000');
    });
  });

  describe('maskCpf', () => {
    it('should return a cpf when the string is received', () => {
      expect(formatter.maskCpf('00000000000')).toEqual('000.000.000-00');
    });
  });
});
