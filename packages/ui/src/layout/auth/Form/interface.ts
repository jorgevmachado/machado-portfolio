import React from 'react';

import {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';

import { TContext } from '@repo/ds/utils/colors/interface';

import { TAuth } from '../interface';

import { TInput } from './input/Input';

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  type?: Omit<TAuth, 'base-layout'>;
  context?: TContext;
  loading?: boolean;
  onSubmit?: (values: AuthForm) => void;
  buttonLabel?: string;
}

export type TInputForm =
  | 'cpf'
  | 'name'
  | 'email'
  | 'gender'
  | 'whatsapp'
  | 'password'
  | 'dateOfBirth'
  | 'passwordConfirmation';

export interface AuthForm {
  valid: boolean;
  fields: AuthFields;
  errors: AuthErrors;
  message?: string;
  formData?: FormData;
}

export interface AuthFields {
  cpf?: string;
  name?: string;
  email?: string;
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
  gender?: ValidatorMessage;
  whatsup?: ValidatorMessage;
  password?: ValidatorMessage;
  dateOfBirth?: ValidatorMessage;
  passwordConfirmation?: ValidatorMessage;
}

export interface FormType {
  type: FormProps['type'];
  inputs: Array<TInputForm>;
  buttonLabel: string;
}

export interface InputType {
  id: TInputForm;
  name: string;
  type: TInput;
  label: string;
  minAge?: number;
  options?: Array<{ value: string; label: string }>;
  validate: (validatorParams: ValidatorParams) => ValidatorMessage;
  formatter?: (value?: string) => string;
  placeholder?: string;
}
