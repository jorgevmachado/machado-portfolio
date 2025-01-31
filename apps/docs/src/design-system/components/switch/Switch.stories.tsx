import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import Switch, { type SwitchProps } from '@repo/ds/components/switch/Switch';

const meta = {
  args: {
    label: 'Example',
    checked: false,
    context: 'neutral',
    onChange: undefined,
    disabled: undefined,
  },
  title: 'Design-System/Components/Switch',
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

    return (
      <div>
        <Switch
          {...args}
          checked={isChecked}
          onChange={(event, nextChecked) => {
            setIsChecked(nextChecked);
          }}
        />
      </div>
    );
  },
};
