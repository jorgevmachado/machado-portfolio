import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { USER_ENTITY_FIXTURE } from '@repo/business/auth/fixtures/auth';

import { OContext } from '@repo/ds/utils/colors/options';

import { PROFILE_MENU } from '@repo/ui/utils/menu/menu';
import Profile from '@repo/ui/components/profile/Profile';

const meta = {
  args: {
    name: USER_ENTITY_FIXTURE.name,
    email: USER_ENTITY_FIXTURE.email,
    context: 'primary',
    picture: USER_ENTITY_FIXTURE.picture ?? 'https://placehold.co/150',
    children: 'Hello, World!',
    profileMenu: PROFILE_MENU,
  },
  title: 'User-Interface/Components/Profile',
  argTypes: {
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
  },
  component: Profile,
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithNeutralContext: Story = {
  args: {
    context: 'neutral',
  },
};

export const WithoutPicture: Story = {
  args: {
    picture: '',
  },
};

export const NoMenuLink: Story = {
  args: {
    profileMenu: undefined,
  },
};

export const CustomChildren: Story = {
  args: {
    children: <p>Bem vindo ao sistema!</p>,
  },
};
