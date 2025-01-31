import React from 'react';

import type { User } from '@repo/business/auth/interface';

import type { TContext } from '@repo/ds/utils/colors/interface';

import type { AuthForm } from '../../components/form/interface';

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
  hasLogo?: boolean;
}

export interface AuthLink {
  order: number;
  title?: string;
  label: string;
  context?: TContext;
  ariaLabel?: string;
  clickAction: () => void;
}

export type TSocialPlatform = 'google' | 'facebook' | 'github' | 'twitter';

export interface AuthSocial
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  platform: TSocialPlatform;
  ariaLabel?: string;
}

interface AuthPropsBase extends React.HTMLAttributes<HTMLDivElement> {
  type?: TAuth;
  user?: User;
  logo?: LogoProps;
  title?: string;
  context?: TContext;
  loading?: boolean;
  description?: string;
}

export type AuthProps = Omit<AuthPropsBase, 'onSubmit'> & {
  onSubmit?: (values: AuthForm) => void;
  authLinks?: Array<AuthLink>;
  authSocials?: Array<AuthSocial>;
  formSocialText?: string;
};
