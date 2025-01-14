import { describe, expect, it, jest } from '@jest/globals';

import validator from './validator';

describe('Validator methods', () => {
  jest.mock('./address', () => {
    return {
      cep: () => {
        return {
          valid: true,
          message: 'Valid zip code.',
        };
      },
    };
  });
  jest.mock('./contact', () => {
    return {
      email: () => {
        return {
          valid: true,
          message: 'Valid Email.',
        };
      },
      phone: () => {
        return {
          valid: true,
          message: 'Valid Phone.',
        };
      },
      mobile: () => {
        return {
          valid: true,
          message: 'Valid Mobile.',
        };
      },
    };
  });
  jest.mock('./document', () => {
    return {
      cpf: () => {
        return {
          valid: true,
          message: 'Valid CPF.',
        };
      },
    };
  });
  jest.mock('./password', () => {
    return {
      validator: () => {
        return {
          valid: true,
          message: 'Valid password.',
        };
      },
    };
  });
  describe('cep', () => {
    it('should return true when received valid cep with mask', () => {
      expect(validator.cep('12345-678')).toEqual({
        valid: true,
        message: 'Valid zip code.',
      });
    });
  });

  describe('email', () => {
    it('should return true when received valid email', () => {
      expect(validator.email('nome@mail.com')).toEqual({
        valid: true,
        message: 'Valid Email.',
      });
    });
  });

  describe('phone', () => {
    it('should return true when received valid phone number with mask', () => {
      expect(validator.phone('(11) 1234-5678')).toEqual({
        valid: true,
        message: 'Valid Phone.',
      });
    });
  });

  describe('mobile', () => {
    it('should return true when received valid mobile number with mask', () => {
      expect(validator.mobile('(11) 12345-6789')).toEqual({
        valid: true,
        message: 'Valid Mobile.',
      });
    });
  });

  describe('cpf', () => {
    it('should return true when received valid cpf with mask', () => {
      expect(validator.cpf('515.516.165-72')).toEqual({
        valid: true,
        message: 'Valid CPF.',
      });
    });
  });

  describe('password', () => {
    it('should return valid when received valid password', () => {
      expect(validator.password('@b345678')).toEqual({
        valid: true,
        message: 'Valid password.',
      });
    });
  });

  describe('number', () => {
    it('should return valid when received valid number', () => {
      expect(validator.number('7')).toEqual(validator.validatorMessage);
    });

    it('should return true when received invalid number', () => {
      expect(validator.number('seven')).toEqual({
        valid: false,
        message: 'Please enter a valid number.',
      });
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
