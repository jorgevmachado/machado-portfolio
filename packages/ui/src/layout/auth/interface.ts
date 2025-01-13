import React from 'react';

import { User } from '@repo/business/auth/interface';

import { TContext } from '@repo/ds/utils/colors/interface';

export type TAuth = 'signUp' | 'signIn' | 'update' | 'forgotPassword';

export interface LogoProps {
  url: string;
  width?: string;
  height?: string;
}

export interface AuthLink {
  title?: string;
  label: string;
  context?: TContext;
  clickAction: () => void;
}

export interface OnAuthSubmit {
  valid: boolean;
  result?: {
    id?: User['id'];
    cpf: User['cpf'];
    role: User['role'];
    name: User['name'];
    email: User['email'];
    gender: User['gender'];
    whatsUp: User['whatsup'];
    password: string;
    dateOfBirth: User['date_of_birth'];
    passwordConfirmation: string;
  };
  messages: Array<string>;
}

export interface AuthProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  user?: User;
  type: TAuth;
  logo?: LogoProps;
  title?: string;
  context?: TContext;
  onSubmit?: (onSubmit: OnAuthSubmit) => void;
  signUpLink?: AuthLink;
  signInLink?: AuthLink;
  description?: string;
  buttonLabel?: string;
  withGoogleAuth?: boolean;
  withFacebookAuth?: boolean;
  forgotPasswordLink?: AuthLink;
}
