import React from 'react';

import { User } from '@repo/business/auth/interface';

import { TContext } from '@repo/ds/utils/colors/interface';

import type { OnAuthSubmit, TAuth } from '../interface';

export type TInput =
  | 'cpf'
  | 'name'
  | 'gender'
  | 'email'
  | 'whatsUp'
  | 'password'
  | 'dateOfBirth'
  | 'passwordConfirmation';

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  user?: User;
  type: TAuth;
  context: TContext;
  onSubmit: (onAuthSubmit: OnAuthSubmit) => void;
  buttonLabel?: string;
}
