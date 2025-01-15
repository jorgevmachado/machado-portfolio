import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import Auth from './Auth';

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
    googleAuth: {
      label: 'Sign in with Google',
    },
    signUpLink: {
      title: 'Dont have an account ?',
      label: 'Register here',
      context: 'primary',
      clickAction: () => {
        alert('redirect to sign up');
      },
    },
    signInLink: {
      title: 'Already have an account ?',
      label: 'Sign in here',
      context: 'primary',
      clickAction: () => {
        alert('redirect to sign in');
      },
    },
    description:
      'By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform.',
    facebookAuth: {
      label: 'Sign in with Facebook',
    },
    forgotPasswordLink: {
      title: undefined,
      label: 'I forgot my password',
      context: 'primary',
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

export const Default: Story = {
  args: {},
};
