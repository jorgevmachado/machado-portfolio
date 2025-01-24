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
    transitionType: 'all',
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
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      control: { type: 'number' },
    },
    timeout: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '.2' },
      },
      control: { type: 'number' },
    },
    transitionType: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'all' },
      },
      control: { type: 'text' },
    },
  },
  component: Zoom,
} satisfies Meta<typeof Zoom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Zoom {...args} enter={show}>
          <div
            style={{
              padding: '20px',
              backgroundColor: '#eff0f1',
              textAlign: 'center',
              borderRadius: '5px',
            }}
          >
            <h3>ZOOM Content</h3>
          </div>
        </Zoom>
        <Button onClick={handleToggle}>
          {show ? 'HIDE ZOOM' : 'SHOW ZOOM'}
        </Button>
      </div>
    );
  },
};

export const WithDelay: Story = {
  args: {
    delay: 500,
    timeout: 1,
    children: (
      <div
        style={{
          padding: '15px',
          textAlign: 'center',
          background: '#e4f7e4',
          borderRadius: '4px',
        }}
      >
        Zoom with Delay!
      </div>
    ),
  },
};

export const CustomTransition: Story = {
  args: {
    transitionType: 'transform',
    timeout: 1.5,
    children: (
      <div
        style={{
          padding: '15px',
          textAlign: 'center',
          background: '#fef5d4',
          borderRadius: '4px',
        }}
      >
        Custom Transition
      </div>
    ),
  },
};
