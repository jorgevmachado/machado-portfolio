import { ValidatorMessage } from '../interface';

export function cep(value: string): ValidatorMessage {
  const hasMask = value.includes('-');
  const regex = hasMask ? /^\d{2}\d{3}-\d{3}$/ : /^\d{5}\d{3}$/;
  const valid = regex.test(value);
  return {
    valid,
    message: valid ? 'Valid zip code.' : 'Please enter a valid cep.',
  };
}
