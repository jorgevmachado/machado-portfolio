import type { Meta, StoryObj } from '@storybook/react';

import PageContent from './PageContent';

const meta = {
  args: {
    title: 'Page Layout title',
    children: 'Hello, World!',
  },
  title: 'Layout/PageContent',
  argTypes: {
    title: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Page Layout title' },
      },
      options: ['label', 'legend'],
      control: { type: 'select' },
    },
  },
  component: PageContent,
} satisfies Meta<typeof PageContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
