import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './DatePicker';

const meta = {
  args: {
    id: 'date-picker',
    name: 'DatePicker',
    open: undefined,
    value: '2025-01-01',
    locale: 'enUS',
    onChange: undefined,
    showTime: false,
    isInvalid: true,
    dateFormat: undefined,
    invalidMessage: 'Please enter a valid date',
  },
  title: 'Components/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
