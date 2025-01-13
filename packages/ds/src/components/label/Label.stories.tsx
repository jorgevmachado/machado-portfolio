import type { Meta, StoryObj } from '@storybook/react';

import Label from './Label';

const meta = {
  args: {
    tag: 'label',
    tip: '(Tip)',
    label: 'Label',
    componentId: 'label',
  },
  title: 'Components/Label',
  argTypes: {
    tag: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'label' },
      },
      options: ['label', 'legend'],
      control: { type: 'select' },
    },
    tip: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    label: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    componentId: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
  },
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
