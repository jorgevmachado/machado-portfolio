import { describe, expect, it } from '@jest/globals';

import validator from './validator';

describe('Validator methods', () => {
  describe('isValidCep', () => {
    it('should return true when received valid cep with mask', () => {
      expect(validator.isValidCep('12345-678')).toBe(true);
    });

    it('should return true when received valid cep without mask', () => {
      expect(validator.isValidCep('12345678', false)).toBe(true);
    });

    it('should return false when received invalid cep', () => {
      expect(validator.isValidCep('1234-567')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should return true when received valid phone number with mask', () => {
      expect(validator.isValidPhone('(11) 1234-5678')).toBe(true);
    });

    it('should return true when received valid phone number without mask', () => {
      expect(validator.isValidPhone('1112345678', false)).toBe(true);
    });

    it('should return false when received invalid phone number', () => {
      expect(validator.isValidPhone('(11) 11234-5678')).toBe(false);
    });
  });

  describe('isValidMobile', () => {
    it('should return true when received valid mobile number with mask', () => {
      expect(validator.isValidMobile('(11) 12345-6789')).toBe(true);
    });

    it('should return true when received valid mobile number without mask', () => {
      expect(validator.isValidMobile('11123456789', false)).toBe(true);
    });

    it('should return false when received invalid mobile number', () => {
      expect(validator.isValidMobile('(11) 11234-56782')).toBe(false);
    });
  });

  describe('isValidCpf', () => {
    it('should return true when received valid cpf with mask', () => {
      expect(validator.isValidCpf('515.516.165-72')).toBe(true);
    });

    it('should return true when received valid cpf without mask', () => {
      expect(validator.isValidCpf('51551616572', false)).toBe(true);
    });

    it('should return false when received invalid cpf', () => {
      expect(validator.isValidCpf('515516165722')).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should return true when received valid email', () => {
      expect(validator.isValidEmail('nome@mail.com')).toEqual(true);
    });

    it('should return true when received invalid email', () => {
      expect(validator.isValidEmail('nome.mail.com')).toEqual(false);
    });
  });

  describe('isValidNumber', () => {
    it('should return true when received valid number', () => {
      expect(validator.isValidNumber('7')).toEqual(true);
    });

    it('should return true when received invalid number', () => {
      expect(validator.isValidNumber('seven')).toEqual(false);
    });
  });

  describe('isValidPassword', () => {
    it('should return true when received valid password', () => {
      expect(validator.isValidPassword('123456')).toEqual(true);
    });

    it('should return true when received invalid password', () => {
      expect(validator.isValidPassword('123')).toEqual(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true when received empty string value', () => {
      expect(validator.isEmpty('')).toEqual(true);
    });

    it('should return true when received boolean value', () => {
      expect(validator.isEmpty(false)).toEqual(true);
    });

    it('should return false when received object value', () => {
      expect(validator.isEmpty({})).toEqual(false);
    });
  });
});
