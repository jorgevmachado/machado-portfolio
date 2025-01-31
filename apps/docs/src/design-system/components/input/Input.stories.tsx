import * as React from 'react';
import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import Button from '@repo/ds/components/button/Button';
import Icon from '@repo/ds/elements/icon/Icon';

import type { InputProps } from '@repo/ds/components/input/interface';

import Input from '@repo/ds/components/input/Input';

const meta = {
  args: {
    tip: '(Tip)',
    type: 'text',
    addon: undefined,
    value: '',
    label: 'Label',
    disabled: false,
    multiline: false,
    isInvalid: false,
    autoFocus: false,
    placeholder: 'Placeholder',
    iconContext: 'neutral',
    floatingLabel: false,
    invalidMessage: undefined,
  },
  title: 'Design-System/Components/Input',
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

const InputRender = ({ value, ...props }: InputProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value ?? '');
  const [onBlur, setOnBlur] = useState<boolean>(false);
  const [inputValidator, setInputValidator] = useState<{
    invalid: boolean;
    message?: string;
  }>({ invalid: false, message: undefined });
  const [valueOnChange, setValueOnChange] = useState<string>('');

  useEffect(() => {
    if (onBlur) {
      setInputValidator({
        invalid: currentValue === '',
        message: 'is Required',
      });
    }
  }, [currentValue, onBlur]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueOnChange(e.target.value);
  };

  return (
    <>
      <Input
        {...props}
        value={value}
        onBlur={() => setOnBlur(true)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentValue(e.target.value)
        }
        onChange={handleOnChange}
        isInvalid={inputValidator.invalid}
        invalidMessage={inputValidator.message}
      />
      <p>Current Value: {currentValue}</p>
      <p>On Change Value: {valueOnChange}</p>
    </>
  );
};

export const Default: Story = {
  args: {},
  render: (args) => <InputRender {...args} />,
};

export const InputPassword: Story = {
  args: {
    type: 'password',
  },
};

export const InputIconRight: Story = {
  args: {
    label: 'Input Icon Right',
    children: <Icon icon="react" data-children="icon-right" />,
    placeholder: 'Input Icon Right Placeholder',
    iconContext: 'primary',
  },
};

export const InputIconLeft: Story = {
  args: {
    label: 'Input Icon Left',
    children: <Icon icon="react" data-children="icon-left" />,
    placeholder: 'Input Icon Left Placeholder',
    iconContext: 'primary',
  },
};

export const InputIconRightAndLeft: Story = {
  args: {
    label: 'Input Icon Right and  Left',
    placeholder: 'Input Icon Right and Left Placeholder',
    iconContext: 'primary',
  },
  render: (args) => (
    <Input {...args}>
      <Icon icon="user" data-children="icon-left" />
      <Icon icon="like" data-children="icon-right" />
    </Input>
  ),
};

export const InputMultiline: Story = {
  args: {
    rows: 20,
    multiline: true,
  },
};

export const InputPrepend: Story = {
  args: {
    label: 'Input Prepend',
    children: (
      <Button size="small" context="primary" data-children="prepend">
        prepend
      </Button>
    ),
    placeholder: 'Input Prepend Placeholder',
    iconContext: 'primary',
  },
};

export const InputAppend: Story = {
  args: {
    label: 'Input Append',
    children: (
      <Button size="small" context="primary" data-children="append">
        append
      </Button>
    ),
    placeholder: 'Input Append Placeholder',
    iconContext: 'primary',
  },
};

export const InputPrependAndAppend: Story = {
  args: {
    label: 'Input Prepend and Append',
    placeholder: 'Input Prepend and Append Placeholder',
    iconContext: 'primary',
  },
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

export const InputFloatingAppend: Story = {
  args: {
    label: 'Input Floating Append',
    children: (
      <Button size="small" context="primary" data-children="append">
        append
      </Button>
    ),
    placeholder: 'Input Floating Append Placeholder',
    iconContext: 'primary',
    hasFloatingSlots: true,
  },
};

export const InputAddon: Story = {
  args: {
    addon: '0,00',
  },
};

export const InputCounter: Story = {
  args: {
    children: <div data-children="counter">9+</div>,
  },
};

export const InputFloatingLabel: Story = {
  args: {
    label: 'Input Floating Label',
    placeholder: 'Input Label',
    floatingLabel: true,
  },
};
