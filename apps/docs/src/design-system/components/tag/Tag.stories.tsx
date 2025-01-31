import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';
import { OIcon } from '@repo/ds/utils/icons/options';

import Tag from '@repo/ds/components/tag/Tag';

const ODirection = ['left', 'right'];

const meta = {
  args: {
    icon: undefined,
    detail: undefined,
    context: 'neutral',
    iconSide: undefined,
    inclined: undefined,
    wideIcon: undefined,
    children: 'Hello, World!',
    fullWidth: undefined,
  },
  title: 'Design-System/Components/Tag',
  argTypes: {
    icon: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'react' },
      },
      options: OIcon,
      control: { type: 'select' },
    },
    detail: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      options: ODirection,
      control: { type: 'select' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    iconSide: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      options: ODirection,
      control: { type: 'select' },
    },
    inclined: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      options: ODirection,
      control: { type: 'select' },
    },
    wideIcon: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'boolean' },
    },
    fullWidth: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'boolean' },
    },
  },
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
