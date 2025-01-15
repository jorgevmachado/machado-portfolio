import React from 'react';

import { User } from '@repo/business/auth/interface';

import { TContext } from '@repo/ds/utils/colors/interface';

export type TAuth = 'signUp' | 'signIn' | 'update' | 'forgotPassword';

export interface LogoProps {
  src: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
}

export interface AuthLink {
  title?: string;
  label: string;
  context?: TContext;
  clickAction: () => void;
}

export interface AuthSocial
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
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

export interface AuthProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User;
  logo?: LogoProps;
  title?: string;
  context?: TContext;
  googleAuth?: AuthSocial;
  signUpLink?: AuthLink;
  signInLink?: AuthLink;
  description?: string;
  facebookAuth?: AuthSocial;
  forgotPasswordLink?: AuthLink;
}
