import type { Meta, StoryObj } from '@storybook/react';

import { OColors, OContext } from '@repo/ds/utils/colors/options';
import { OIcon, OIconPosition } from '@repo/ds/elements/icon/options';
import { OSimplySize } from '@repo/ds/utils/sizes/options';
import { OWeight } from '@repo/ds/utils/fonts/options';

import type { TAppearance } from '@repo/ds/components/button/interface';

import Button from '@repo/ds/components/button/Button';

import '../../../styles/main.scss';

const OAppearance: Array<TAppearance> = [
  'icon',
  'outline',
  'standard',
  'borderless',
];

const meta = {
  args: {
    icon: undefined,
    size: 'medium',
    fluid: false,
    focus: false,
    weight: 'normal',
    loading: false,
    rounded: false,
    context: 'neutral',
    children: 'Hello, World!',
    disabled: false,
    appearance: 'standard',
    noIconBorder: false,
    iconPosition: 'left',
    iconClassName: undefined,
    loadingContext: undefined,
    notificationColor: undefined,
    notificationCounter: undefined,
    notificationClassName: undefined,
    notificationBackgroundColor: undefined,
  },
  title: 'Design-System/Components/Button',
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
        defaultValue: { summary: 'medium' },
      },
      options: OSimplySize,
      control: { type: 'radio' },
    },
    fluid: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    focus: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    weight: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
      options: OWeight,
      control: { type: 'radio' },
    },
    loading: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    rounded: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
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
    appearance: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'standard' },
      },
      options: OAppearance,
      control: { type: 'select' },
    },
    noIconBorder: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    iconPosition: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
      options: OIconPosition,
      control: { type: 'radio' },
    },
    iconClassName: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    loadingContext: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    notificationColor: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'white' },
      },
      options: OColors,
      control: { type: 'select' },
    },
    notificationCounter: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      control: { type: 'number' },
    },
    notificationBackgroundColor: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary-100' },
      },
      options: OColors,
      control: { type: 'select' },
    },
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
