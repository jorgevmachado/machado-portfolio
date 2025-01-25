import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import { AuthForm } from './interface';
import Form from './Form';

const meta = {
  args: {
    type: 'signUp',
    context: 'primary',
    onSubmit: (values: AuthForm) => {
      return values;
    },
  },
  title: 'Layout/Auth/Form',
  argTypes: {
    type: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: [
        'base-layout',
        'signUp',
        'signIn',
        'update',
        'forgotPassword',
        'resetPassword',
      ],
      control: { type: 'select' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
  },
  component: Form,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
