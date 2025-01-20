import { ValidatorMessage } from './interface';

export const REQUIRED_FIELD: ValidatorMessage = {
  valid: false,
  message: 'the field is required.',
};

export const INVALID_TYPE: ValidatorMessage = {
  valid: false,
  message: 'the field is invalid type.',
};
