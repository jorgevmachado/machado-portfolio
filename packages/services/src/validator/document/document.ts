import { ValidatorMessage } from '../interface';

export default class DocumentValidator {
  constructor(public readonly validatorMessage: ValidatorMessage) {}

  cpf(value: string): ValidatorMessage {
    const regex = /^(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;

    if (regex.test(value)) {
      return this.validatorMessage;
    }

    return {
      valid: false,
      message: 'Please enter a valid cpf number.',
    };
  }
}
