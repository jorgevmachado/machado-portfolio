import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import Button from '@repo/ds/components/button/Button';
import Dropdown from '@repo/ds/components/dropdown/Dropdown';
import Link from '@repo/ds/components/link/Link';

const meta = {
  args: {
    type: 'button',
    label: 'activator',
    context: 'neutral',
    disabled: false,
    children: 'Hello, World!',
  },
  title: 'Design-System/Components/Dropdown',
  argTypes: {
    type: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
      options: ['link', 'button'],
      control: { type: 'select' },
    },
    label: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
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
  },
  component: Dropdown,
  decorators: [
    (Story) => (
      <div style={{ height: '25vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DropdownWithLink: Story = {
  args: {
    type: 'link',
    label: 'options',
    context: 'info',
  },
  render: (args) => {
    return (
      <Dropdown {...args}>
        {['options 1', 'options 2', 'options 3'].map((item) => (
          <Link key={item} context={args.context} onClick={() => alert(item)}>
            {item}
          </Link>
        ))}
      </Dropdown>
    );
  },
};

export const DropdownWithButton: Story = {
  args: {
    type: 'button',
    label: 'options',
    context: 'primary',
  },
  render: (args) => {
    return (
      <Dropdown {...args}>
        {['options 1', 'options 2', 'options 3'].map((item) => (
          <Button key={item} context={args.context} onClick={() => alert(item)}>
            {item}
          </Button>
        ))}
      </Dropdown>
    );
  },
};
