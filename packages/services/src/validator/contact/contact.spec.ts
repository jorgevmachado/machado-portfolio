import { describe, expect, it } from '@jest/globals';

import { email, fixed, mobile } from './contact';

describe('contact validator methods', () => {
  describe('email', () => {
    it('should return valid when received valid email address', () => {
      expect(email('nome@mail.com')).toEqual({
        valid: true,
        message: 'Valid Email.',
      });
    });
    it('should return invalid when received invalid email address', () => {
      expect(email('nome.mail.com')).toEqual({
        valid: false,
        message: 'Please enter a valid email.',
      });
    });
  });

  describe('fixed', () => {
    it('should return valid when received valid phone fixed with mask', () => {
      expect(fixed('(11) 1234-5678')).toEqual({
        valid: true,
        message: 'Valid phone number.',
      });
    });
    it('should return valid when received valid phone fixed without mask', () => {
      expect(fixed('1112345678')).toEqual({
        valid: true,
        message: 'Valid phone number.',
      });
    });
    it('should return invalid when received invalid phone fixed', () => {
      expect(fixed('(11) 11234-5678')).toEqual({
        valid: false,
        message: 'Please enter a valid phone number.',
      });
    });
  });

  describe('mobile', () => {
    it('should return valid when received valid phone mobile with mask', () => {
      expect(mobile('(11) 12345-6789')).toEqual({
        valid: true,
        message: 'Valid mobile number.',
      });
    });
    it('should return valid when received valid phone mobile without mask', () => {
      expect(mobile('11123456789')).toEqual({
        valid: true,
        message: 'Valid mobile number.',
      });
    });
    it('should return invalid when received invalid mobile fixed', () => {
      expect(mobile('(11) 11234-56782')).toEqual({
        valid: false,
        message: 'Please enter a valid mobile number.',
      });
    });
  });
});
