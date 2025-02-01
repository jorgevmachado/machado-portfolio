import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import useResize from '@repo/ui/hooks/resize/useResize';

const meta = {
  args: {
    onMobile: () => {},
    onTablet: () => {},
    onDesktop: () => {},
    onWidescreen: () => {},
    onFullHD: () => {},
  },
  title: 'User-Interface/Hooks/useResize',
  argTypes: {
    onMobile: {
      option: 'onMobile',
      description: 'onMobile',
    },
    onTablet: {
      option: 'onTablet',
      description: 'onTablet',
    },
    onDesktop: {
      option: 'onDesktop',
      description: 'onDesktop',
    },
    onWidescreen: {
      option: 'onWidescreen',
      description: 'onWidescreen',
    },
    onFullHD: {
      option: 'onFullHD',
      description: 'onFullHD',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof useResize>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    const [screen, setScreen] = useState('');
    const [count, setCount] = useState(0);

    useResize(
      {
        onMobile: () => {
          makeIt('mobile');
        },
        onTablet: () => {
          makeIt('tablet');
        },
        onDesktop: () => {
          makeIt('desktop');
        },
        onWidescreen: () => {
          makeIt('wide');
        },
        onFullHD: () => {
          makeIt('fullhd');
        },
      },
      [count],
    );

    const makeIt = (s: string) => {
      setScreen(s);
      setCount(count + 1);
    };
    return (
      <div>
        <h1>{screen}</h1>
      </div>
    );
  },
};
