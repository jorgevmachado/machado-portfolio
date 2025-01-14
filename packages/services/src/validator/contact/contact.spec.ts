import { describe, expect, it } from '@jest/globals';

import ContactValidator from './contact';

describe('contact validator methods', () => {
  const validatorMessage = {
    valid: true,
    message: 'contact valid',
  };
  const contactValidator = new ContactValidator(validatorMessage);

  describe('email', () => {
    it('should return valid when received valid email address', () => {
      expect(contactValidator.email('nome@mail.com')).toEqual(
        contactValidator.validatorMessage,
      );
    });
    it('should return invalid when received invalid email address', () => {
      expect(contactValidator.email('nome.mail.com')).toEqual({
        valid: false,
        message: 'Please enter a valid email.',
      });
    });
  });

  describe('fixed', () => {
    it('should return valid when received valid phone fixed with mask', () => {
      expect(contactValidator.fixed('(11) 1234-5678')).toEqual(
        contactValidator.validatorMessage,
      );
    });
    it('should return valid when received valid phone fixed without mask', () => {
      expect(contactValidator.fixed('1112345678')).toEqual(
        contactValidator.validatorMessage,
      );
    });
    it('should return invalid when received invalid phone fixed', () => {
      expect(contactValidator.fixed('(11) 11234-5678')).toEqual({
        valid: false,
        message: 'Please enter a valid phone number.',
      });
    });
  });

  describe('mobile', () => {
    it('should return valid when received valid phone mobile with mask', () => {
      expect(contactValidator.mobile('(11) 12345-6789')).toEqual(
        contactValidator.validatorMessage,
      );
    });
    it('should return valid when received valid phone mobile without mask', () => {
      expect(contactValidator.mobile('11123456789')).toEqual(
        contactValidator.validatorMessage,
      );
    });
    it('should return invalid when received invalid mobile fixed', () => {
      expect(contactValidator.mobile('(11) 11234-56782')).toEqual({
        valid: false,
        message: 'Please enter a valid phone mobile number.',
      });
    });
  });
});
