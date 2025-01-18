import { describe, expect, it } from '@jest/globals';

import { REQUIRED_FIELD } from '../utils';

import { emailValidator, mobileValidator, phoneValidator } from './contact';

describe('contact validator methods', () => {
  describe('emailValidator', () => {
    it('should return valid when received valid email address', () => {
      expect(emailValidator('nome@mail.com')).toEqual({
        valid: true,
        message: 'Valid Email.',
      });
    });
    it('should return invalid when received invalid email address', () => {
      expect(emailValidator('nome.mail.com')).toEqual({
        valid: false,
        message: 'Please enter a valid email.',
      });
    });
    it('should return invalid when received undefined email address', () => {
      expect(emailValidator()).toEqual(REQUIRED_FIELD);
    });
  });

  describe('phoneValidator', () => {
    it('should return valid when received valid phone fixed with mask', () => {
      expect(phoneValidator('(11) 1234-5678')).toEqual({
        valid: true,
        message: 'Valid phone number.',
      });
    });
    it('should return valid when received valid phone fixed without mask', () => {
      expect(phoneValidator('1112345678')).toEqual({
        valid: true,
        message: 'Valid phone number.',
      });
    });
    it('should return invalid when received invalid phone fixed', () => {
      expect(phoneValidator('(11) 11234-5678')).toEqual({
        valid: false,
        message: 'Please enter a valid phone number.',
      });
    });
    it('should return invalid when received undefined phone fixed', () => {
      expect(phoneValidator()).toEqual(REQUIRED_FIELD);
    });
  });

  describe('mobileValidator', () => {
    it('should return valid when received valid phone mobile with mask', () => {
      expect(mobileValidator('(11) 12345-6789')).toEqual({
        valid: true,
        message: 'Valid mobile number.',
      });
    });
    it('should return valid when received valid phone mobile without mask', () => {
      expect(mobileValidator('11123456789')).toEqual({
        valid: true,
        message: 'Valid mobile number.',
      });
    });
    it('should return invalid when received invalid mobile', () => {
      expect(mobileValidator('(11) 11234-56782')).toEqual({
        valid: false,
        message: 'Please enter a valid mobile number.',
      });
    });
    it('should return invalid when received undefined mobile', () => {
      expect(mobileValidator()).toEqual(REQUIRED_FIELD);
    });
  });
});
