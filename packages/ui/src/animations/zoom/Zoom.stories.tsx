import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '@repo/ds/components/button/Button';

import '../../styles/main.scss';

import Zoom from './Zoom';

const meta = {
  args: {
    enter: true,
    delay: 0,
    timeout: 0.2,
    children: (
      <>
        <h1>ZOOM TEST</h1>
      </>
    ),
  },
  title: 'Animations/Zoom',
  argTypes: {
    enter: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: { type: 'boolean' },
    },
    delay: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
      control: { type: 'number' },
    },
    timeout: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '.2' },
      },
      control: { type: 'number' },
    },
  },
  component: Zoom,
} satisfies Meta<typeof Zoom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
      setShow(!show);
    };

    return (
      <>
        <Zoom {...args} enter={show}>
          <Button>TEST</Button>
        </Zoom>
        <Button onClick={handleToggle}>TOGGLE</Button>
      </>
    );
  },
};
