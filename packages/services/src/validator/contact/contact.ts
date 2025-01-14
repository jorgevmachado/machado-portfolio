import { ValidatorMessage } from '../interface';

export default class ContactValidator {
  constructor(public readonly validatorMessage: ValidatorMessage) {}

  email(value: string): ValidatorMessage {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (regex.test(value)) {
      return this.validatorMessage;
    }

    return {
      valid: false,
      message: 'Please enter a valid email.',
    };
  }

  fixed(value: string): ValidatorMessage {
    const regex = /^\(?\d{2}\)? ?\d{4}-?\d{4}$/;

    if (regex.test(value)) {
      return this.validatorMessage;
    }

    return {
      valid: false,
      message: 'Please enter a valid phone number.',
    };
  }

  mobile(value: string): ValidatorMessage {
    const regex = /^\(?\d{2}\)? ?\d{5}-?\d{4}$/;

    if (regex.test(value)) {
      return this.validatorMessage;
    }

    return {
      valid: false,
      message: 'Please enter a valid phone mobile number.',
    };
  }
}
