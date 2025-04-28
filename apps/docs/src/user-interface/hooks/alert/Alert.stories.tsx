import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Alert, { AlertProps } from '@repo/ds/components/alert/Alert';
import Button from '@repo/ds/components/button/Button';

import AlertProvider from '@repo/ui/hooks/alert/AlertProvider';
import useAlert from '@repo/ui/hooks/alert/useAlert';

const meta = {
  args: {
    elem: Alert,
    children: 'Hello, World!',
  },
  title: 'User-Interface/Hooks/Alert',
  component: AlertProvider,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AlertProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const CustomComponent = ({ children, type }: AlertProps) => {
  return (
    <p>
      **custom type: {type}
      <br />
      {children}
    </p>
  );
};

const Child = () => {
  const { addAlert } = useAlert();
  const [count, setCount] = useState(0);

  const handleAddAlert = () => {
    setCount(count + 1);
    addAlert({ type: 'success', message: `${count + 1}` });
  };

  return (
    <Button type="button" onClick={handleAddAlert}>
      Submit
    </Button>
  );
};

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <AlertProvider elem={Alert}>
        <Child />
      </AlertProvider>
    );
  },
};

export const Custom: Story = {
  render: () => {
    return (
      <AlertProvider elem={CustomComponent}>
        <Child />
      </AlertProvider>
    );
  },
};
