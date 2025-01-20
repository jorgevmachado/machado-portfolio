import React from 'react';

import { User } from '@repo/business/auth/interface';

import { TContext } from '@repo/ds/utils/colors/interface';

import { AuthForm } from './Form/interface';

export type TAuth =
  | 'blank'
  | 'signUp'
  | 'signIn'
  | 'update'
  | 'forgotPassword'
  | 'resetPassword';

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

export interface AuthProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  type?: TAuth;
  user?: User;
  logo?: LogoProps;
  title?: string;
  context?: TContext;
  loading?: boolean;
  onSubmit?: (values: AuthForm) => void;
  googleAuth?: AuthSocial;
  signUpLink?: AuthLink;
  signInLink?: AuthLink;
  description?: string;
  facebookAuth?: AuthSocial;
  forgotPasswordLink?: AuthLink;
}
