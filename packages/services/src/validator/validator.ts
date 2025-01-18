import { ValidatorMessage } from './interface';

export function numberValidator(value: string): ValidatorMessage {
  const regex = /^[0-9]+$/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'valid number.' : 'Please enter a valid number.',
  };
}

export function isEmptyValidator(value: unknown): boolean {
  const type = typeof value;

  if (type === 'boolean') {
    return !value;
  }

  if (type !== 'object') {
    return !value;
  }

  return false;
}
