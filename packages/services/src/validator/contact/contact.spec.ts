import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { INVALID_TYPE, REQUIRED_FIELD } from '../utils';

import { emailValidator, mobileValidator, phoneValidator } from './contact';

describe('contact validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('emailValidator', () => {
    it('should return valid when received valid email address', () => {
      const value = 'name@mail.com';
      expect(emailValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid Email.',
      });
    });
    it('should return invalid when received invalid email address', () => {
      expect(emailValidator({ value: 'name.mail.com' })).toEqual({
        valid: false,
        message: 'Please enter a valid email.',
      });
    });
    it('should return invalid when received undefined email address', () => {
      expect(emailValidator({})).toEqual(REQUIRED_FIELD);
    });
    it('should return invalid when received invalid email address type', () => {
      expect(emailValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });

  describe('phoneValidator', () => {
    it('should return valid when received valid phone fixed with mask', () => {
      const value = '(11) 1234-5678';
      expect(phoneValidator({ value  })).toEqual({
        valid: true,
        value,
        message: 'Valid phone number.',
      });
    });
    it('should return valid when received valid phone fixed without mask', () => {
      const value = '1112345678';
      expect(phoneValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid phone number.',
      });
    });
    it('should return invalid when received invalid phone fixed', () => {
      expect(phoneValidator({ value: '(11) 11234-5678' })).toEqual({
        valid: false,
        message: 'Please enter a valid phone number.',
      });
    });
    it('should return invalid when received undefined phone fixed', () => {
      expect(phoneValidator({})).toEqual(REQUIRED_FIELD);
    });
    it('should return invalid when received invalid phone fixed type', () => {
      expect(phoneValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });

  describe('mobileValidator', () => {
    it('should return valid when received valid phone mobile with mask', () => {
      const value = '(11) 12345-6789';
      expect(mobileValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid mobile number.',
      });
    });
    it('should return valid when received valid phone mobile without mask', () => {
      const value = '11123456789';
      expect(mobileValidator({ value })).toEqual({
        valid: true,
        value,
        message: 'Valid mobile number.',
      });
    });
    it('should return invalid when received invalid mobile', () => {
      expect(mobileValidator({ value: '(11) 11234-56782' })).toEqual({
        valid: false,
        message: 'Please enter a valid mobile number.',
      });
    });
    it('should return invalid when received undefined mobile', () => {
      expect(mobileValidator({})).toEqual(REQUIRED_FIELD);
    });
    it('should return invalid when received invalid mobile type', () => {
      expect(mobileValidator({ value: new Date() })).toEqual(INVALID_TYPE);
    });
  });
});
