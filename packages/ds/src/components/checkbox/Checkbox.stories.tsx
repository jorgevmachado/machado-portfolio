import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '../../utils/colors';

import Checkbox from './Checkbox';

const meta = {
  args: {
    id: 'foo',
    value: 'one',
    large: false,
    context: 'neutral',
    disabled: false,
    children: 'Hello World',
    modelValue: true,
  },
  title: 'Components/Checkbox',
  argTypes: {
    id: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    value: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    large: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    modelValue: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
