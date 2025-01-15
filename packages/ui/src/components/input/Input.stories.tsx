import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  args: {
    id: 'input-default',
    name: 'Default Name',
    label: 'Default Name Label',
    context: 'primary',
    placeholder: 'Default Placeholder',
    validate: () => ({
      valid: true,
      message: 'name',
    }),
  },
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InputPassword: Story = {
  args: {
    id: 'input-password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    // @ts-ignore
    validate: (value?: string) => {
      if (!value) {
        return {
          valid: false,
          message: 'the field is required.',
        };
      }
      return {
        valid: true,
        message: 'password valid',
      };
    },
  },
};
