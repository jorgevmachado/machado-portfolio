import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '@repo/ds/components/button/Button';

import '../../styles/main.scss';

import Fade from './Fade';

const meta = {
  args: {
    enter: true,
    delay: 0,
    timeout: 0.2,
    children: (
      <>
        <h1>FADE TEST</h1>
      </>
    ),
  },
  title: 'Animations/Fade',
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
  component: Fade,
} satisfies Meta<typeof Fade>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Fade {...args} enter={show} children={args.children} />
        <Button onClick={() => setShow(!show)}>TOGGLE</Button>
      </>
    );
  },
};
