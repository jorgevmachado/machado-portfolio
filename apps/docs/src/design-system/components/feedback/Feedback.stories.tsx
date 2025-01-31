import type { Meta, StoryObj } from '@storybook/react';

import Feedback from '@repo/ds/components/feedback/Feedback';

const meta = {
  args: {
    id: 'feedback-storybook',
    context: 'error',
    children: 'Hello, World!',
  },
  title: 'Design-System/Components/Feedback',
  argTypes: {
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'error' },
      },
      options: ['error', 'success', 'attention'],
      control: { type: 'select' },
    },
    children: {
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  component: Feedback,
} satisfies Meta<typeof Feedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
