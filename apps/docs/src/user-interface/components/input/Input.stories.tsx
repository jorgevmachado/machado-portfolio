import type { Meta, StoryObj } from '@storybook/react';

import type { ValidatorParams } from '@repo/services/validator/interface';

import { OContext } from '@repo/ds/utils/colors/options';

import Input from '@repo/ui/components/input/Input';

const meta = {
  args: {
    id: 'input-default',
    tip: 'Input Tip',
    type: 'text',
    name: 'input-default',
    label: 'Input Label',
    context: 'primary',
    validate: (validatorParams: ValidatorParams) => ({
      valid: true,
      message: `${validatorParams.value}`,
    }),
    placeholder: 'Input Placeholder',
  },
  title: 'User-Interface/Components/Input',
  argTypes: {
    type: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: [
        'text',
        'password',
        'email',
        'phone',
        'datepicker',
        'radio-group',
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
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const RadioGroupExample: Story = {
  args: {
    type: 'radio-group',
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ],
  },
};
