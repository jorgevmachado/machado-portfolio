import React from 'react';
import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';
import type { User } from '@repo/business/auth/interface';

export type FormProps = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  user?: User;
  type: 'signUp' | 'signIn' | 'update';
  context: 'primary' | 'secondary';
  loading?: boolean;
  onSubmit?: (values: AuthForm) => void;
  buttonLabel?: string;
};

export type AuthForm = {
  valid: boolean;
  fields: AuthFields;
  errors: AuthErrors;
  message?: string;
  formData?: FormData;
};

export type AuthFields = {
  cpf?: string;
  name?: string;
  email?: string;
  gender?: string;
  whatsapp?: string;
  password?: string;
  dateOfBirth?: string;
  passwordConfirmation?: string;
};

export type AuthErrors = {
  cpf?: ValidatorMessage;
  name?: ValidatorMessage;
  email?: ValidatorMessage;
  gender?: ValidatorMessage;
  whatsapp?: ValidatorMessage;
  password?: ValidatorMessage;
  dateOfBirth?: ValidatorMessage;
  passwordConfirmation?: ValidatorMessage;
};

export type FormType = {
  type: FormProps['type'];
  inputs: Array<TInputForm>;
  buttonLabel: string;
};

export type TInputForm =
  | 'cpf'
  | 'name'
  | 'email'
  | 'gender'
  | 'picture'
  | 'whatsapp'
  | 'password'
  | 'date_of_birth'
  | 'password_confirmation';

export type InputType = {
  id: TInputForm;
  name: string;
  type: TInput;
  label: string;
  value: string;
  minAge?: number;
  options?: Array<InputOption>;
  validate: (validatorParams: ValidatorParams) => ValidatorMessage;
  formatter?: (value?: string) => string;
  placeholder?: string;
};

type InputOption = {
  value: string;
  label: string;
};

export type TInput =
  | 'text'
  | 'email'
  | 'phone'
  | 'number'
  | 'picture'
  | 'password'
  | 'datepicker'
  | 'radio-group';