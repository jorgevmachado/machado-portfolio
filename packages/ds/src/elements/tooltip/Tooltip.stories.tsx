import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '../../utils/colors';

import { OAlign } from './options';

import Tooltip from './Tooltip';

const meta = {
  args: {
    align: 'bottom',
    title: 'title',
    context: 'neutral',
    content: 'Hello, this is a tooltip message',
    children: 'Default Tooltip',
  },
  title: 'Elements/Tooltip',
  argTypes: {
    align: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
      options: OAlign,
      control: { type: 'select' },
    },
    title: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    content: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
  },
  component: Tooltip,
  decorators: [
    (Story) => (
      <div
        style={{
          height: '25vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Exemplo' },
};
