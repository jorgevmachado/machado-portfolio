import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '@repo/ds/components/button/Button';

import '../../styles/main.scss';

import Slide from './Slide';

const meta = {
  args: {
    enter: true,
    delay: 50,
    timeout: 0.2,
    children: (
      <>
        <h1>SLIDE TEST</h1>
      </>
    ),
    direction: 'right',
    transitionType: 'all',
  },
  title: 'Animations/Slide',
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
        type: { summary: 'number' },
        defaultValue: { summary: '50' },
      },
      control: { type: 'number' },
    },
    timeout: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.2' },
      },
      control: { type: 'number' },
    },
    direction: {
      name: 'direction',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
      description: 'Direction of the animation.',
    },
  },
  component: Slide,
} satisfies Meta<typeof Slide>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Example' },
  render: (args) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
      setShow(!show);
    };
    return (
      <>
        <Slide {...args} enter={show}>
          {args.children}
        </Slide>
        <Button onClick={handleToggle} style={{ marginTop: '2rem' }}>
          {show ? 'HIDE SLIDE' : 'SHOW SLIDE'}
        </Button>
      </>
    );
  },
};

export const DirectionTop: Story = {
  args: {
    direction: 'top',
    children: (
      <div
        style={{ background: '#f0f0f0', padding: '10px', textAlign: 'center' }}
      >
        Slide from Top
      </div>
    ),
  },
};

export const DirectionBottom: Story = {
  args: {
    direction: 'bottom',
    children: (
      <div
        style={{ background: '#f0f0f0', padding: '10px', textAlign: 'center' }}
      >
        Slide from Bottom
      </div>
    ),
  },
};

export const CustomTimeout: Story = {
  args: {
    timeout: 1.5,
    children: (
      <div
        style={{ background: '#ffcccc', padding: '10px', textAlign: 'center' }}
      >
        Custom Timeout (1.5s)
      </div>
    ),
  },
};

export const CustomDelay: Story = {
  args: {
    delay: 1000,
    children: (
      <div
        style={{ background: '#d9f7d9', padding: '10px', textAlign: 'center' }}
      >
        Custom Delay (1s)
      </div>
    ),
  },
};

export const DynamicContent: Story = {
  render: (args) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
      setShow(!show);
    };

    return (
      <>
        <Slide {...args} enter={show}>
          <p>{show ? 'Content Visible' : 'Content Hidden'}</p>
        </Slide>
        <Button onClick={handleToggle}>{show ? 'HIDE' : 'SHOW'}</Button>
      </>
    );
  },
};
