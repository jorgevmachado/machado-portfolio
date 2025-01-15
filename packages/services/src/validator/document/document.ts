import { ValidatorMessage } from '../interface';

export function cpf(value: string): ValidatorMessage {
  const regex = /^(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid CPF.' : 'Please enter a valid cpf number.',
  };
}
