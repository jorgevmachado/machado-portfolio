import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '../../utils';

import Icon from '../../elements/icon';

import Button from '../button';

import Input from './Input';

const meta = {
  args: {
    tip: '(Tip)',
    type: 'text',
    addon: undefined,
    value: '',
    label: 'Label',
    variant: 'regular',
    disabled: false,
    multiline: false,
    isInvalid: false,
    autoFocus: false,
    placeholder: 'Placeholder',
    iconContext: 'neutral',
    floatingLabel: false,
    invalidMessage: undefined,
  },
  title: 'Components/Input',
  argTypes: {
    tip: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '(Tip)' },
      },
    },
    rows: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '20' },
      },
      control: { type: 'number' },
    },
    type: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    addon: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0.00' },
      },
      control: { type: 'text' },
    },
    value: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    label: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
      control: { type: 'text' },
    },
    variant: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
      options: ['large', 'regular'],
      control: { type: 'radio' },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    multiline: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    isInvalid: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    autoFocus: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    dataCyName: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'input' },
      },
      control: { type: 'text' },
    },
    placeholder: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'placeholder' },
      },
      control: { type: 'text' },
    },
    iconContext: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'radio' },
    },
    floatingLabel: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    invalidMessage: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    hasFloatingSlots: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'click',
      description: 'click event',
    },
    onInput: {
      action: 'input',
      description: 'input event',
    },
    onFocus: {
      action: 'focus',
      description: 'focus event',
    },
    onMouseDown: {
      action: 'mousedown',
      description: 'mousedown event',
    },
    onBlur: {
      action: 'blur',
      description: 'blur event',
    },
  },
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithButtons: Story = {
  args: {},
  render: (args) => (
    <Input {...args}>
      <Button size="small" context="primary" data-children="prepend">
        prepend
      </Button>
      <Button size="small" context="primary" data-children="append">
        append
      </Button>
    </Input>
  ),
};

export const WithFloatingButtons: Story = {
  args: {
    hasFloatingSlots: true,
  },
  render: (args) => (
    <Input {...args}>
      <Button
        size="small"
        style={{
          top: '50%',
          right: '4px',
          position: 'absolute',
          transform: 'translateY(-50%)',
        }}
        context="primary"
        data-children="append"
      >
        append
      </Button>
    </Input>
  ),
};

export const WithAddon: Story = {
  args: {
    addon: '0,00',
  },
};

export const WithError: Story = {
  args: {
    isInvalid: true,
    invalidMessage: 'Digite um email válido',
  },
};

export const WithFloatingLabel: Story = {
  args: {
    placeholder: 'Testando',
    floatingLabel: true,
  },
};

export const WithRightIcon: Story = {
  args: {
    iconContext: 'primary',
  },
  render: (args) => (
    <Input {...args}>
      <Icon icon="react" data-children="icon-right" />
    </Input>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    iconContext: 'secondary',
  },
  render: (args) => (
    <Input {...args}>
      <Icon icon="react" data-children="icon-left" />
    </Input>
  ),
};

export const WithBothIcons: Story = {
  args: {
    rows: 10,
    iconContext: 'info',
  },
  render: (args) => (
    <Input {...args}>
      <Icon icon="user" data-children="icon-left" />
      <Icon icon="like" data-children="icon-right" />
    </Input>
  ),
};

export const Multiline: Story = {
  args: {
    rows: 20,
    multiline: true,
  },
};

export const WithCounter: Story = {
  render: (args) => (
    <Input {...args}>
      <div data-children="counter">9+</div>
    </Input>
  ),
};
