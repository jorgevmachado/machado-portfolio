import type { Meta, StoryObj } from '@storybook/react';

import { OVariant, OWeight } from '@repo/ds/utils/fonts/options';
import { OColors } from '@repo/ds/utils/colors/options';

import Text from '@repo/ds/elements/text/Text';

const meta = {
  args: {
    tag: 'p',
    color: 'neutral-90',
    weight: 'normal',
    variant: 'regular',
    htmlFor: undefined,
    children: 'Hello World!',
  },
  title: 'Design-System/Elements/Text',
  argTypes: {
    tag: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'p' },
      },
      options: ['p', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
      description: 'Tag HTML element example: p, h1, h2, h3, h4, h5, h6',
    },
    color: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral-90' },
      },
      options: OColors,
      control: { type: 'select' },
    },
    weight: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
      options: OWeight,
      control: { type: 'select' },
    },
    variant: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
      options: OVariant,
      control: { type: 'select' },
    },
    htmlFor: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const NextLine: Story = {
  args: {
    variant: 'large',
    children: 'Hello ++next line ++World',
  },
};

export const StrongPartText: Story = {
  args: {
    variant: 'large',
    children: 'Hello *strong* World',
  },
};

export const ItalicPartText: Story = {
  args: {
    variant: 'large',
    children: 'Hello _em_ World',
  },
};

export const LabelWithFor: Story = {
  args: {
    tag: 'label',
    htmlFor: 'input-id',
    children: 'Input Label',
  },
};
