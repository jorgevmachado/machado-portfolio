import { ValidatorMessage } from './interface';

import {
  email as emailValidator,
  fixed as fixedValidator,
  mobile as mobileValidator,
} from './contact';

import { cep as cepValidator } from './address';
import { cpf as cpfValidator } from './document';

import { validator as passwordValidator } from './password';

class Validator {
  public cep(value?: string): ValidatorMessage {
    if (!value) {
      return {
        valid: false,
        message: 'the field is required.',
      };
    }
    return cepValidator(value);
  }

  public email(value?: string): ValidatorMessage {
    if (!value) {
      return {
        valid: false,
        message: 'the field is required.',
      };
    }
    return emailValidator(value);
  }

  public phone(value?: string): ValidatorMessage {
    if (!value) {
      return {
        valid: false,
        message: 'the field is required.',
      };
    }
    return fixedValidator(value);
  }

  public mobile(value?: string): ValidatorMessage {
    if (!value) {
      return {
        valid: false,
        message: 'the field is required.',
      };
    }
    return mobileValidator(value);
  }

  public cpf(value?: string): ValidatorMessage {
    if (!value) {
      return {
        valid: false,
        message: 'the field is required.',
      };
    }
    return cpfValidator(value);
  }

  public password(value?: string, min: number = 8): ValidatorMessage {
    if (!value) {
      return {
        valid: false,
        message: 'the field is required.',
      };
    }
    return passwordValidator(min, value);
  }

  public name(value?: string, min: number = 2): ValidatorMessage {
    if (!value) {
      return {
        valid: false,
        message: 'the field is required.',
      };
    }

    const valid = value.length >= min;
    return {
      valid,
      message: valid
        ? 'Valid name.'
        : 'Name must be at least 2 characters long.',
    };
  }

  public number(value: string): ValidatorMessage {
    const regex = /^[0-9]+$/;
    const valid = regex.test(value);
    return {
      valid,
      message: valid ? 'valid number.' : 'Please enter a valid number.',
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
