import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import type { AuthForm } from '@repo/ui/components/form/interface';
import Form from '@repo/ui/components/form/Form';

const meta = {
  args: {
    type: 'signUp',
    context: 'primary',
    loading: false,
    onSubmit: (values: AuthForm) => {
      return values;
    },
    children: <p>Welcome</p>,
    buttonLabel: 'save',
  },
  title: 'User-Interface/Components/Form',
  argTypes: {
    type: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: [
        'blank',
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
  render: (args) => {
    const [values, setValues] = useState<AuthForm | undefined>(undefined);
    const onSubmit = (authForm: AuthForm) => {
      setValues(authForm);
    };
    return (
      <>
        <Form {...args} onSubmit={onSubmit} />
        {values && (
          <div style={{ marginTop: '2rem' }}>
            <p>
              valid: {values.valid ? 'true' : 'false'} <br />
            </p>
          </div>
        )}
      </>
    );
  },
};
