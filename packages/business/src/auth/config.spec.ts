import { describe, expect, it, jest } from '@jest/globals';

import { cleanFormatter, validateMobile } from './config';
import { mobileValidator } from '@repo/services/validator/contact/contact';

jest.mock('@repo/services/validator/contact/contact');

const mockPhone: string = '(11) 99456-7890';
const mockPhoneFormatted: string = '11994567890';

describe('config utilities', () => {
  describe('cleanFormatter', () => {
    it('should return the formatted value removing all special characters', () => {
      const result = cleanFormatter(mockPhone, true);

      expect(result).toBe(mockPhoneFormatted);
    });

    it('should return the formatted value keeping the characters when cleanAllFormatter is false', () => {
      const result = cleanFormatter('123-456-7890', false);

      expect(result).toBe('123-456-7890');
    });

    it('should return undefined if the given value is undefined', () => {
      const result = cleanFormatter(undefined, true);

      expect(result).toBeUndefined();
    });

    it('should return an empty string if the given value is an empty string', () => {
      const result = cleanFormatter('', true);

      expect(result).toBe('');
    });
  });

  describe('validateMobile', () => {
    const mockValidatorSuccessResponse = {
      valid: true,
      message: 'Valid mobile number.',
    };
    it('should return the formatted value if it is valid', () => {
      (mobileValidator as jest.Mock).mockReturnValue(
        mockValidatorSuccessResponse,
      );

      const result = validateMobile(mockPhone, true);

      expect(result).toBe(mockPhoneFormatted);
      expect(mobileValidator).toHaveBeenCalledWith({
        value: mockPhoneFormatted,
      });
    });

    it('should throw error if number is invalid', () => {
      const mockValidatorErrorResponse = {
        valid: false,
        message: 'Please enter a valid mobile number.',
      };
      const value = '123';

      (mobileValidator as jest.Mock).mockReturnValue(
        mockValidatorErrorResponse,
      );

      expect(() => validateMobile(value, true)).toThrow(
        mockValidatorErrorResponse.message,
      );
      expect(mobileValidator).toHaveBeenCalledWith({ value });
    });

    it('should return a valid formatted number while maintaining formatting when cleanAllFormatter is false', () => {
      (mobileValidator as jest.Mock).mockReturnValue(
        mockValidatorSuccessResponse,
      );

      const result = validateMobile(mockPhone, false);

      expect(result).toBe(mockPhone);
      expect(mobileValidator).toHaveBeenCalledWith({
        value: mockPhoneFormatted,
      });
    });

    it('should throw error when value is undefined', () => {
      const mockValidatorRequiredResponse = {
        valid: false,
        message: 'the field is required.',
      };
      (mobileValidator as jest.Mock).mockReturnValue(
        mockValidatorRequiredResponse,
      );

      expect(() => validateMobile(undefined, true)).toThrow(
        mockValidatorRequiredResponse.message,
      );
      expect(mobileValidator).toHaveBeenCalledWith({ value: undefined });
    });
  });
});