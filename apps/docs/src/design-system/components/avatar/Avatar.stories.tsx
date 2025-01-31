import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';
import { OSimplySize } from '@repo/ds/utils/sizes/options';

import Avatar from '@repo/ds/components/avatar/Avatar';

import '../../../styles/main.scss';

const src =
  'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728950400&semt=ais_hybrid';

const meta = {
  args: {
    src: undefined,
    size: 'medium',
    name: 'Harry Potter Junior',
    context: 'neutral',
    initialsLength: 3,
    hasNotification: false,
  },
  title: 'Design-System/Components/Avatar',
  argTypes: {
    src: {
      type: { name: 'string' },
      table: {
        defaultValue: { summary: src },
      },
      control: { type: 'text' },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
      options: OSimplySize,
      control: { type: 'select' },
    },
    name: {
      type: { name: 'string' },
      table: {
        defaultValue: { summary: 'Harry Potter Junior' },
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
    initialsLength: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
      control: { type: 'number' },
    },
    hasNotification: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    src,
  },
};

export const WithNotification: Story = {
  args: {
    src,
    name: 'User With Notification',
    hasNotification: true,
  },
};
