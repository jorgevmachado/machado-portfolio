import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ENTITY_USER_COMPLETE_FIXTURE } from '@repo/business/auth/fixture/user';

import { LOGO, LOGOUT_MENU, MENU } from '@repo/ui/utils/menu/menu';
import { OContext } from '@repo/ds/utils/colors/options';

import Page from '@repo/ui/layout/page/Page';
import PageContent from '@repo/ui/layout/page-content/PageContent';

const meta = {
  args: {
    user: ENTITY_USER_COMPLETE_FIXTURE,
    logo: {
      src: 'https://placehold.co/150',
      alt: 'logo',
      title: 'logo',
      width: 80,
      height: 80,
      onClick: () => alert('Open Home'),
    },
    menu: MENU,
    logout: LOGOUT_MENU,
    context: 'primary',
    children: <PageContent title="Hello World!" children="PAGE" />,
    className: undefined,
  },
  title: 'User-Interface/Layout/Page',
  argTypes: {
    user: {
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: JSON.stringify(ENTITY_USER_COMPLETE_FIXTURE) },
      },
      control: { type: 'object' },
    },
    logo: {
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: JSON.stringify(LOGO) },
      },
      control: { type: 'object' },
    },
    menu: {
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: JSON.stringify(MENU) },
      },
      control: { type: 'object' },
    },
    logout: {
      table: {
        type: { summary: 'array' },
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
    className: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
  },
  component: Page,
  decorators: [
    (Story) => (
      <div style={{ height: '50vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutMenu: Story = {
  args: {
    menu: [],
  },
};

export const NoSidebar: Story = {
  args: {
    menu: MENU.filter((group) => group.key === 'navbar'), // Apenas Navbar
    logout: undefined,
  },
};
