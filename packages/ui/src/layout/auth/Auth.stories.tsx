import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ENTITY_USER_COMPLETE_FIXTURE } from '@repo/business';
import { OContext } from '@repo/ds/utils/colors/options';

import { AuthProps, OnAuthSubmit } from './interface';

import Auth from './Auth';

const meta = {
  args: {
    user: ENTITY_USER_COMPLETE_FIXTURE,
    type: 'signIn',
    logo: {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHN5dygQnJFirBww40JLAsLuZHF0kOdBrzLw&s',
      width: undefined,
      height: undefined,
    },
    title: 'Sign in',
    context: 'neutral',
    onSubmit: () => {},
    signUpLink: {
      title: 'Dont have an account ?',
      label: 'Register here\n',
      clickAction: () => {
        alert('redirect to sign up');
      },
    },
    signInLink: {
      title: 'Already have an account ?',
      label: 'Sign in here',
      clickAction: () => {
        alert('redirect to sign in');
      },
    },
    description:
      'By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform.',
    buttonLabel: 'Sign in',
    withGoogleAuth: true,
    withFacebookAuth: true,
    forgotPasswordLink: {
      title: undefined,
      label: 'I forgot my password',
      clickAction: () => {
        alert('redirect to forgot password');
      },
    },
  },
  title: 'Layout/Auth',
  argTypes: {
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
  },
  component: Auth,
} satisfies Meta<typeof Auth>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderAuth = (args: AuthProps) => {
  const [onAuthSubmit, setOnAuthSubmit] = useState<OnAuthSubmit>();

  const onSubmit = (submit: OnAuthSubmit) => {
    setOnAuthSubmit(submit);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Auth {...args} onSubmit={onSubmit} />
      {onAuthSubmit && (
        <>
          <p>valid: {onAuthSubmit.valid ? 'true' : 'false'} </p>
          <p>
            messages:
            <ul>
              {onAuthSubmit.messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </p>
          <p>
            result:
            {onAuthSubmit?.result ? (
              <ul>
                <li>id: {onAuthSubmit?.result?.id}</li>
                <li>cpf: {onAuthSubmit?.result?.cpf}</li>
                <li>email: {onAuthSubmit?.result?.email}</li>
                <li>gender: {onAuthSubmit?.result?.gender}</li>
                <li>whatsUp: {onAuthSubmit?.result?.whatsUp}</li>
                <li>
                  dateOfBirth: {onAuthSubmit?.result?.dateOfBirth?.toString()}
                </li>
                <li>password: {onAuthSubmit?.result?.password}</li>
                <li>
                  passwordConfirmation:{' '}
                  {onAuthSubmit?.result?.passwordConfirmation}
                </li>
              </ul>
            ) : (
              <span>undefined</span>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export const Default: Story = {
  args: {
    user: undefined,
  },
  render: renderAuth,
};

export const SignUp: Story = {
  args: {
    user: undefined,
    type: 'signUp',
    title: 'sign Up',
    description:
      'By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform.',
    withGoogleAuth: true,
    withFacebookAuth: true,
    forgotPasswordLink: {
      title: undefined,
      label: 'I forgot my password',
      clickAction: () => {
        alert('redirect to forgot password');
      },
    },
  },
  render: renderAuth,
};

export const Update: Story = {
  args: {
    type: 'update',
    logo: undefined,
    title: 'My personal data',
    buttonLabel: 'Save',
    description: undefined,
  },
  render: renderAuth,
};

export const ForgotPassword: Story = {
  args: {
    type: 'forgotPassword',
    title: 'Forgot my Password',
    buttonLabel: 'Save',
    description: undefined,
  },
  render: renderAuth,
};
