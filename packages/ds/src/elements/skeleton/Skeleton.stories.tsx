import type { Meta, StoryObj } from '@storybook/react';

import Skeleton, { ORadius } from './Skeleton';

const meta = {
  args: {
    width: 120,
    radius: 'none',
    height: 80,
  },
  title: 'Elements/Skeleton',
  argTypes: {
    width: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '120' },
      },
      control: { type: 'number' },
    },
    radius: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
      options: ORadius,
      control: { type: 'select' },
    },
    height: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '80' },
      },
      control: { type: 'number' },
    },
  },
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
