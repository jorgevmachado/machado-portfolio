import { describe, expect, it } from '@jest/globals';

import AddressValidator from './address';

describe('address validator methods', () => {
  const validatorMessage = {
    valid: true,
    message: 'address validator success',
  };
  const addressValidator = new AddressValidator(validatorMessage);
  describe('cep', () => {
    it('should return valid when received valid cep with mask', () => {
      expect(addressValidator.cep('12345-678')).toEqual(
        addressValidator.validatorMessage,
      );
    });
    it('should return valid when received valid cep without mask', () => {
      expect(addressValidator.cep('12345678')).toEqual(
        addressValidator.validatorMessage,
      );
    });
    it('should return invalid when received invalid cep', () => {
      expect(addressValidator.cep('1234-567')).toEqual({
        valid: false,
        message: 'Please enter a valid cep.',
      });
    });
  });
});
