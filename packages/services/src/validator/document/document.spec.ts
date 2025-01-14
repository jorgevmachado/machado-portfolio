import { describe, expect, it } from '@jest/globals';

import DocumentValidator from './document';

describe('document validator methods', () => {
  const validatorMessage = {
    valid: true,
    message: 'document valid',
  };

  const documentValidator = new DocumentValidator(validatorMessage);

  describe('cpf', () => {
    it('should return valid when received valid cpf with mask', () => {
      expect(documentValidator.cpf('515.516.165-72')).toEqual(
        documentValidator.validatorMessage,
      );
    });

    it('should return valid when received valid cpf without mask', () => {
      expect(documentValidator.cpf('51551616572')).toEqual(
        documentValidator.validatorMessage,
      );
    });

    it('should return invalid when received invalid cpf', () => {
      expect(documentValidator.cpf('515516165722')).toEqual({
        valid: false,
        message: 'Please enter a valid cpf number.',
      });
    });
  });
});
