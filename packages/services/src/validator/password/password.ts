import { ValidatorMessage } from '../interface';

export default class PasswordValidator {
  constructor(public readonly validatorMessage: ValidatorMessage) {}

  validator(min: number, value: string): ValidatorMessage {
    const minLength = this.minLength(min, value);

    if (!minLength.valid) {
      return minLength;
    }

    const leastOneLetter = this.leastOneLetter(value);

    if (!leastOneLetter.valid) {
      return leastOneLetter;
    }
    const leastOneNumber = this.leastOneNumber(value);

    if (!leastOneNumber.valid) {
      return leastOneNumber;
    }
    const leastOneSpecialCharacter = this.leastOneSpecialCharacter(value);

    if (!leastOneSpecialCharacter.valid) {
      return leastOneSpecialCharacter;
    }

    return this.validatorMessage;
  }
  minLength(min: number, value: string): ValidatorMessage {
    if (value.length >= min) {
      return this.validatorMessage;
    }

    return {
      valid: false,
      message: `Must be at least ${min} characters long.`,
    };
  }

  leastOneLetter(value: string): ValidatorMessage {
    const regex = /[a-zA-Z]/;
    if (regex.test(value)) {
      return this.validatorMessage;
    }

    return {
      valid: false,
      message: 'It must contain at least one letter.',
    };
  }

  leastOneNumber(value: string): ValidatorMessage {
    const regex = /[0-9]/;
    if (regex.test(value)) {
      return this.validatorMessage;
    }
    return {
      valid: false,
      message: 'It must contain at least one number.',
    };
  }

  leastOneSpecialCharacter(value: string): ValidatorMessage {
    const regex = /[^a-zA-Z0-9]/;
    if (regex.test(value)) {
      return this.validatorMessage;
    }
    return {
      valid: false,
      message: 'It must contain at least one special character.',
    };
  }
}
