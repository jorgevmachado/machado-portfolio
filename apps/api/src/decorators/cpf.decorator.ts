import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function CPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CPFConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'CPF' })
export class CPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string) {
    cpf = cpf.replace(/\D+/g, '');
    if (cpf.length !== 11) {
      return false;
    }

    if (cpf === '00000000000') {
      return false;
    }

    let sum: number = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    return remainder === parseInt(cpf.substring(10, 11));
  }
  defaultMessage() {
    return 'CPF is invalid';
  }
}
