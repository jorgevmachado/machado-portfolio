import { ValidatorMessage } from '../interface';

import { REQUIRED_FIELD } from '../utils';

export function cpfValidator(value?: string): ValidatorMessage {
  if (!value) {
    return REQUIRED_FIELD;
  }
  const regex = /^(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid CPF.' : 'Please enter a valid cpf number.',
  };
}
