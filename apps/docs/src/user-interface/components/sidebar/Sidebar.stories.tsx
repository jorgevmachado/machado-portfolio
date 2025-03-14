import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ENTITY_USER_FIXTURE } from '@repo/mock/auth/fixture';
import { OContext } from '@repo/ds/utils/colors/options';

import { LOGOUT_MENU, MENU } from '@repo/ui/utils/menu/menu';

import Sidebar from '@repo/ui/components/v1/sidebar/Sidebar';

const meta = {
  args: {
    user: ENTITY_USER_FIXTURE,
    menu: MENU,
    logout: LOGOUT_MENU,
    context: 'primary',
    showMobileMenu: false,
    handleToggleMenu: () => alert('Toggle Menu'),
  },
  title: 'User-Interface/Components/v1/Sidebar',
  argTypes: {
    user: {
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: JSON.stringify(ENTITY_USER_FIXTURE) },
      },
      control: { type: 'object' },
    },
    menu: {
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: JSON.stringify(MENU) },
      },
      control: { type: 'object' },
    },
    logout: {
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: JSON.stringify(LOGOUT_MENU) },
      },
      control: { type: 'object' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    showMobileMenu: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    handleToggleMenu: {
      option: 'handleToggleMenu',
      description: 'handleToggleMenu click void',
    },
  },
  component: Sidebar,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithNoUser: Story = {
  args: {
    user: undefined,
  },
};

export const WithEmptyMenu: Story = {
  args: {
    menu: [],
    logout: undefined,
  },
};

export const MobileView: Story = {
  args: {
    showMobileMenu: true,
  },
};
