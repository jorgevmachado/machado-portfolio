import type { Meta, StoryObj } from '@storybook/react';

import { OColors } from '@repo/ds/utils/colors/options';
import { OIcon } from '@repo/ds/elements/icon/options';

import Icon from '@repo/ds/elements/icon/Icon';

const meta = {
  args: {
    icon: 'react',
    size: '3em',
    color: 'neutral-90',
  },
  title: 'Design-System/Elements/Icon',
  argTypes: {
    icon: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'react' },
      },
      options: OIcon,
      control: { type: 'select' },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1em' },
      },
    },
    color: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral-90' },
      },
      options: OColors,
      control: { type: 'select' },
    },
  },
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
