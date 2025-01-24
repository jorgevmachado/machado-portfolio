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
        <h2>Fade example</h2>
        <p>This is content that fades in and out with a fade animation.</p>
      </>
    ),
    transitionType: 'all',
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
    children: {
      control: false,
      description:
        'The child content or component rendered within the fade effect.',
    },
  },
  component: Fade,
} satisfies Meta<typeof Fade>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [show, setShow] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '25rem',
        }}
      >
        <Fade {...args} enter={show} children={args.children} />
        <Button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</Button>
      </div>
    );
  },
};

export const WithDelay: Story = {
  args: {
    delay: 1000,
  },
  render: (args) => {
    const [show, setShow] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '25rem',
        }}
      >
        <Fade {...args} enter={show}>
          {args.children}
        </Fade>
        <Button onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show after 1 second'}
        </Button>
      </div>
    );
  },
};

export const LongTimeout: Story = {
  args: {
    timeout: 2,
  },
  render: (args) => {
    const [show, setShow] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '25rem',
        }}
      >
        <Fade {...args} enter={show}>
          {args.children}
        </Fade>
        <Button onClick={() => setShow(!show)}>
          {show ? 'Hide slowly' : 'Show slowly'}
        </Button>
      </div>
    );
  },
};

export const MultipleFades: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Fade enter={show} delay={200} timeout={0.5}>
            <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
              Box 1
            </div>
          </Fade>
          <Fade enter={show} delay={500} timeout={0.5}>
            <div style={{ backgroundColor: 'lightgreen', padding: '10px' }}>
              Box 2
            </div>
          </Fade>
          <Fade enter={show} delay={800} timeout={0.5}>
            <div style={{ backgroundColor: 'lightcoral', padding: '10px' }}>
              Box 3
            </div>
          </Fade>
        </div>
        <Button style={{ width: '25rem' }} onClick={() => setShow(!show)}>
          {show ? 'Hide all' : 'Show with delays'}
        </Button>
      </div>
    );
  },
};

export const ControlledByArgs: Story = {
  args: {
    enter: true,
    delay: 500,
    timeout: 0.5,
  },
  render: (args) => (
    <Fade {...args}>
      <div style={{ border: '1px solid black', padding: '10px' }}>
        Completely controlled by **Args**
      </div>
    </Fade>
  ),
};
