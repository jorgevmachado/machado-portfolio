import { ValidatorMessage } from '../interface';

export function email(value: string): ValidatorMessage {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid Email.' : 'Please enter a valid email.',
  };
}

export function fixed(value: string): ValidatorMessage {
  const regex = /^\(?\d{2}\)? ?\d{4}-?\d{4}$/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid
      ? 'Valid phone number.'
      : 'Please enter a valid phone number.',
  };
}

export function mobile(value: string): ValidatorMessage {
  const regex = /^\(?\d{2}\)? ?\d{5}-?\d{4}$/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid
      ? 'Valid mobile number.'
      : 'Please enter a valid mobile number.',
  };
}
