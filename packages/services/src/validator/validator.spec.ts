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
    it('should return invalid when received undefined cep', () => {
      expect(validator.cep()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
  });

  describe('email', () => {
    it('should return valid when received valid email', () => {
      expect(validator.email('nome@mail.com')).toEqual({
        valid: true,
        message: 'Valid Email.',
      });
    });

    it('should return invalid when received undefined email', () => {
      expect(validator.email()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
  });

  describe('phone', () => {
    it('should return true when received valid phone number with mask', () => {
      expect(validator.phone('(11) 1234-5678')).toEqual({
        valid: true,
        message: 'Valid phone number.',
      });
    });
    it('should return invalid when received undefined phone', () => {
      expect(validator.phone()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
  });

  describe('mobile', () => {
    it('should return true when received valid mobile number with mask', () => {
      expect(validator.mobile('(11) 12345-6789')).toEqual({
        valid: true,
        message: 'Valid mobile number.',
      });
    });
    it('should return invalid when received undefined mobile number', () => {
      expect(validator.mobile()).toEqual({
        valid: false,
        message: 'the field is required.',
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
    it('should return invalid when received undefined cpf number', () => {
      expect(validator.cpf()).toEqual({
        valid: false,
        message: 'the field is required.',
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
    it('should return invalid when received undefined password', () => {
      expect(validator.password()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
  });

  describe('name', () => {
    it('should return valid when received valid name', () => {
      expect(validator.name('Harry')).toEqual({
        valid: true,
        message: 'Valid name.',
      });
    });
    it('should return invalid when received undefined name', () => {
      expect(validator.name()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
  });

  describe('number', () => {
    it('should return valid when received valid number', () => {
      expect(validator.number('7')).toEqual({
        valid: true,
        message: 'valid number.',
      });
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
