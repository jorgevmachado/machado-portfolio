import { ValidatorMessage } from './interface';

import AddressValidator from './address';
import ContactValidator from './contact';
import DocumentValidator from './document';
import PasswordValidator from './password';

class Validator {
  validatorMessage: ValidatorMessage = {
    valid: true,
    message: 'success',
  };

  public cep(value: string): ValidatorMessage {
    const validatorMessage = this.validatorMessage;
    validatorMessage.message = 'Valid zip code.';
    const addressValidator = new AddressValidator(validatorMessage);
    return addressValidator.cep(value);
  }

  public email(value: string): ValidatorMessage {
    const validatorMessage = this.validatorMessage;
    validatorMessage.message = 'Valid Email.';
    const contactValidator = new ContactValidator(validatorMessage);
    return contactValidator.email(value);
  }

  public phone(value: string): ValidatorMessage {
    const validatorMessage = this.validatorMessage;
    validatorMessage.message = 'Valid Phone.';
    const contactValidator = new ContactValidator(validatorMessage);
    return contactValidator.fixed(value);
  }

  public mobile(value: string): ValidatorMessage {
    const validatorMessage = this.validatorMessage;
    validatorMessage.message = 'Valid Mobile.';
    const contactValidator = new ContactValidator(validatorMessage);
    return contactValidator.mobile(value);
  }

  public cpf(value: string): ValidatorMessage {
    const validatorMessage = this.validatorMessage;
    validatorMessage.message = 'Valid CPF.';
    const documentValidator = new DocumentValidator(validatorMessage);
    return documentValidator.cpf(value);
  }

  public password(value: string, min: number = 8): ValidatorMessage {
    const validatorMessage = this.validatorMessage;
    validatorMessage.message = 'Valid password.';
    const passwordValidator = new PasswordValidator(validatorMessage);
    return passwordValidator.validator(min, value);
  }

  public number(value: string): ValidatorMessage {
    const regex = /^[0-9]+$/;
    if (regex.test(value)) {
      return this.validatorMessage;
    }
    return {
      valid: false,
      message: 'Please enter a valid number.',
    };
  }

  public isEmpty(value: unknown): boolean {
    const type = typeof value;

    if (type === 'boolean') {
      return !value;
    }

    if (type !== 'object') {
      return !value;
    }

    return false;
  }
}

export default new Validator();
