import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Button from '@repo/ds/components/button/Button';
import Image from '@repo/ds/elements/image/Image';
import Text from '@repo/ds/elements/text/Text';

import { AuthProps } from './interface';

import Form from './Form/Form';

import ActionLink from './ActionLink';

import './Auth.scss';

export default function Auth({
  user,
  type,
  logo,
  title,
  context = 'neutral',
  onSubmit,
  signUpLink,
  signInLink,
  description,
  buttonLabel = 'Register',
  withGoogleAuth,
  withFacebookAuth,
  forgotPasswordLink,
  ...props
}: AuthProps) {
  const hasSocialAuth = withGoogleAuth || withFacebookAuth;

  const isSignIn = type === 'signIn';
  const isSignUp = type === 'signUp';
  const isUpdate = type === 'update';
  const isForgotPassword = type === 'forgotPassword';

  const classNameList = joinClass(['auth', `auth__type--${type}`]);

  return (
    <div {...props} className={classNameList}>
      {logo && (
        <Image
          src={logo.url}
          alt="auth logo"
          title="auth logo"
          style={{
            width: logo.width ?? '15rem',
            height: logo.height ?? '5rem',
          }}
        />
      )}
      {title && (
        <Text tag="h1" weight="bold" variant="xlarge" className="auth__title">
          {title}
        </Text>
      )}
      {description && (
        <Text tag="h2" variant="regular" className="auth__description">
          {description}
        </Text>
      )}
      {hasSocialAuth && !isUpdate && !isForgotPassword && (
        <div className="auth__social">
          {withGoogleAuth && (
            <div className="auth__social--google">
              <Button icon="google" fluid context="primary">
                {isSignIn ? 'SignIn with Google' : 'SignUp with Google'}
              </Button>
            </div>
          )}
          {withFacebookAuth && (
            <div className="auth__social--facebook">
              <Button icon="facebook" fluid context="primary">
                {isSignIn ? 'SignIn with Facebook' : 'SignUp with Facebook'}
              </Button>
            </div>
          )}
          {onSubmit && !isUpdate && (
            <div className="auth__social--internal">
              <Text className="auth__social--internal-text">
                {`Or ${isSignIn ? 'register' : 'sign up'}  with your email`}
              </Text>
            </div>
          )}
        </div>
      )}
      {onSubmit && (
        <Form
          user={user}
          type={type}
          context={context}
          onSubmit={onSubmit}
          className="auth__form"
          buttonLabel={buttonLabel}
        />
      )}
      <div className="auth__action">
        {forgotPasswordLink && !isUpdate && !isForgotPassword && (
          <ActionLink
            {...forgotPasswordLink}
            context={context}
            className="auth__action--forgot-password"
          />
        )}
        {signUpLink && isSignIn && (
          <ActionLink
            {...signUpLink}
            context={context}
            className="auth__action--signUp"
          />
        )}

        {signInLink && isSignUp && (
          <ActionLink
            {...signInLink}
            context={context}
            className="auth__action--signIn"
          />
        )}
      </div>
    </div>
  );
}
