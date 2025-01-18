import { ValidatorMessage } from '@repo/services/validator/interface';

export interface AuthFields {
  cpf?: string;
  name?: string;
  email?: string;
  token?: string;
  gender?: string;
  whatsup?: string;
  password?: string;
  dateOfBirth?: string;
  passwordConfirmation?: string;
}

export interface AuthErrors {
  cpf?: ValidatorMessage;
  name?: ValidatorMessage;
  email?: ValidatorMessage;
  token?: ValidatorMessage;
  gender?: ValidatorMessage;
  whatsup?: ValidatorMessage;
  password?: ValidatorMessage;
  dateOfBirth?: ValidatorMessage;
  passwordConfirmation?: ValidatorMessage;
}

export type AuthFormState =
  | {
      valid: boolean;
      fields: AuthFields;
      errors?: AuthErrors;
      message?: string;
    }
  | undefined;
