import * as React from 'react';
import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '../../utils/colors';

import Switch, { SwitchProps } from './Switch';

const meta = {
  args: {
    label: 'Example',
    checked: false,
    context: 'neutral',
    onChange: undefined,
    disabled: undefined,
  },
  title: 'Components/Switch',
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    checked: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Exemplo' },
  render: (args: SwitchProps) => {
    const [isChecked, setIsChecked] = useState(args.checked);

    useEffect(() => {
      if (isChecked !== args.checked) {
        setIsChecked(args.checked);
      }
    }, [args]);

    return (
      <div>
        <Switch
          {...args}
          checked={isChecked}
          onChange={(event, checked) => {
            console.log(event.target);
            setIsChecked(!checked);
          }}
        />
      </div>
    );
  },
};
