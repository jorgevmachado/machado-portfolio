import type { Meta, StoryObj } from '@storybook/react';

import { ENTITY_USER_COMPLETE_FIXTURE } from '@repo/business';
import { OContext } from '@repo/ds/utils/colors/options';
import { PROFILE_MENU } from '../../utils';

import Profile from './Profile';

const meta = {
  args: {
    name: ENTITY_USER_COMPLETE_FIXTURE.name,
    email: ENTITY_USER_COMPLETE_FIXTURE.email,
    context: 'primary',
    picture: ENTITY_USER_COMPLETE_FIXTURE.picture,
    children: 'Hello, World!',
    profileMenu: PROFILE_MENU,
  },
  title: 'Components/Profile',
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
