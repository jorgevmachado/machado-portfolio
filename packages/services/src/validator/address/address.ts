import { ValidatorMessage } from '../interface';

export default class AddressValidator {
  constructor(public readonly validatorMessage: ValidatorMessage) {}

  cep(value: string): ValidatorMessage {
    const hasMask = value.includes('-');
    const regex = hasMask ? /^\d{2}\d{3}-\d{3}$/ : /^\d{5}\d{3}$/;

    if (regex.test(value)) {
      return this.validatorMessage;
    }

    return {
      valid: false,
      message: 'Please enter a valid cep.',
    };
  }
}
