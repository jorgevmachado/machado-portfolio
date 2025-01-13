import type { Meta, StoryObj } from '@storybook/react';

import Feedback from './Feedback';

const meta = {
  args: {
    context: 'error',
    children: 'Hello, World!',
  },
  title: 'Components/Feedback',
  argTypes: {
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'error' },
      },
      options: ['error', 'success', 'attention'],
      control: { type: 'select' },
    },
  },
  component: Feedback,
} satisfies Meta<typeof Feedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
