import { describe, expect, it } from '@jest/globals';

import {
  dateOfBirthValidator,
  genderValidator,
  nameValidator,
} from './personal';

describe('personal Validator methods', () => {
  describe('genderValidator', () => {
    it('should return valid when received female gender', () => {
      expect(genderValidator('female')).toEqual({
        valid: true,
        message: 'Valid gender.',
      });
    });
    it('should return valid when received male gender', () => {
      expect(genderValidator('MALE')).toEqual({
        valid: true,
        message: 'Valid gender.',
      });
    });
    it('should return valid when received other gender', () => {
      expect(genderValidator('other')).toEqual({
        valid: true,
        message: 'Valid gender.',
      });
    });

    it('should return invalid when received invalid gender', () => {
      expect(genderValidator('people')).toEqual({
        valid: false,
        message: 'Invalid Gender.',
      });
    });
    it('should return invalid when received undefined gender', () => {
      expect(genderValidator()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
  });

  describe('dateOfBirthValidator', () => {
    it('should return invalid when received undefined dateOfBirth', () => {
      expect(dateOfBirthValidator()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
    it('should return invalid when received invalid date string', () => {
      expect(dateOfBirthValidator('20/07/1990')).toEqual({
        valid: false,
        message: 'Invalid date.',
      });
    });
    it('should return invalid when received date under 18 year old.', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 17);
      expect(dateOfBirthValidator(date)).toEqual({
        valid: false,
        message: 'You must be over 18 years old.',
      });
    });

    it('should return valid when received date string over 18 year old.', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 20);
      expect(dateOfBirthValidator(date.toISOString())).toEqual({
        valid: true,
        message: 'valid date.',
      });
    });
  });

  describe('nameValidator', () => {
    it('should return valid when received valid name', () => {
      expect(nameValidator('Harry')).toEqual({
        valid: true,
        message: 'Valid name.',
      });
    });
    it('should return invalid when received undefined name', () => {
      expect(nameValidator()).toEqual({
        valid: false,
        message: 'the field is required.',
      });
    });
  });
});
