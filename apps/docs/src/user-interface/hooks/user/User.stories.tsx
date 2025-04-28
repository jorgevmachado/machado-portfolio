import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { USER_ENTITY_FIXTURE } from '@repo/business/auth/fixtures/auth';

import UserProvider from '@repo/ui/hooks/user/UserProvider';
import useUser from '@repo/ui/hooks/user/useUser';

const meta = {
  args: {
    user: USER_ENTITY_FIXTURE,
    children: 'Hello, World!',
  },
  title: 'User-Interface/Hooks/User',
  component: UserProvider,
} satisfies Meta<typeof UserProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const Component = () => {
  const { user } = useUser();
  return (
    <>
      <h1>Component - user</h1>
      <p>{user.name}</p>
    </>
  );
};

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <UserProvider user={args.user}>
        <Component />
      </UserProvider>
    );
  },
};