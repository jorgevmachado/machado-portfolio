import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { OContext } from '@repo/ds/utils/colors/options';

import Auth from './Auth';
import { AuthForm } from './Form/interface';

const redirectAction = (destination: string) => {
  alert(`redirect to ${destination}`);
  action(`redirect to ${destination}`);
};

const meta = {
  args: {
    logo: {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHN5dygQnJFirBww40JLAsLuZHF0kOdBrzLw&s',
      width: undefined,
      height: undefined,
    },
    title: 'Sign in',
    context: 'neutral',
    children: 'FORM',
    description:
      'By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform.',
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

export const Default: Story = {
  args: {
    authLinks: [
      {
        order: 3,
        label: 'I forgot my password',
        context: 'primary',
        clickAction: () => redirectAction('forgot password'),
      },
      {
        order: 2,
        title: 'Already have an account ?',
        label: 'Sign in here',
        context: 'primary',
        clickAction: () => redirectAction('sign in'),
      },
      {
        order: 1,
        title: 'Dont have an account ?',
        label: 'Register here',
        context: 'primary',
        clickAction: () => redirectAction('sign up'),
      },
    ],
    authSocials: [
      {
        label: 'Sign in with Google',
        platform: 'google',
        onClick: () => redirectAction('google'),
      },
      {
        label: 'Sign in with Facebook',
        platform: 'facebook',
        onClick: () => redirectAction('facebook'),
      },
    ],
  },
};

export const SignUp: Story = {
  args: {
    type: 'signUp',
    title: 'Create an Account',
    description:
      'By creating an account, you agree to our Terms of Service and Privacy Policy.',
    authLinks: [
      {
        order: 1,
        title: 'Already have an account?',
        label: 'Sign in here',
        context: 'primary',
        clickAction: action('Redirect to sign in'),
      },
    ],
    authSocials: [
      {
        label: 'Sign up with Google',
        platform: 'google',
        onClick: action('Google sign up clicked'),
      },
      {
        label: 'Sign up with Facebook',
        platform: 'facebook',
        onClick: action('Facebook sign up clicked'),
      },
    ],
    onSubmit: (values: AuthForm) => {
      return values;
    },
  },
};

export const ForgotPassword: Story = {
  args: {
    type: 'forgotPassword',
    title: 'Reset your password',
    description:
      'Enter the email associated with your account and we’ll send you instructions to reset your password.',
    children: 'RESET FORM',
    authLinks: [
      {
        order: 1,
        label: 'go back to Sign in',
        context: 'primary',
        clickAction: () => redirectAction('sign in'),
      },
    ],
  },
};

export const NoSocialAuth: Story = {
  args: {
    type: 'signIn',
    title: 'Sign in without Social Login',
    description: 'Use only the account credentials to sign in.',
    authLinks: [
      {
        order: 1,
        title: 'Dont have an account?',
        label: 'Register now',
        context: 'primary',
        clickAction: () => redirectAction('sign up'),
      },
    ],
  },
};
