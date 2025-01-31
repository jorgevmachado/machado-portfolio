import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import Spinner from '@repo/ds/elements/spinner/Spinner';

const meta = {
  args: {
    size: 32,
    context: 'primary',
  },
  title: 'Design-System/Elements/Spinner',
  argTypes: {
    size: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '32' },
      },
      control: { type: 'range', min: 16, max: 300 },
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
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
