import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import RadioGroup, {
  type RadioGroupProps,
} from '@repo/ds/components/radio-group/RadioGroup';

const defaultExample = [
  { value: 'natural-person', label: 'Natural Person' },
  { value: 'legal-entity', label: 'Legal entity' },
];

const defaultRangeExample = Array.from(new Array(9), (_, i) => ({
  value: i + 1,
  label: i + 1,
}));

const defaultExampleMultiselect = [
  { value: 'photos', label: 'Photos' },
  { value: 'location', label: 'Location' },
  { value: 'others', label: 'Other reasons' },
];

const meta = {
  args: {
    options: defaultExample,
    context: 'neutral',
    appearance: 'standard',
    modelValue: 'natural-person',
    onActionClick: (value) => console.log(value),
  },
  title: 'Design-System/Components/RadioGroup',
  argTypes: {
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' },
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
    appearance: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'standard' },
      },
      options: ['standard', 'range'],
      control: { type: 'select' },
    },
    modelValue: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'natural-person' },
      },
      control: { type: 'text' },
    },
    dataTestId: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'radio-test' },
      },
      control: { type: 'text' },
    },
  },
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const RenderTemplate = (args: RadioGroupProps) => {
  const [model, setModel] = useState<number | string | Array<string | number>>(
    args.modelValue as string | number | Array<string | number>,
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RadioGroup
        {...args}
        onActionClick={(value) => {
          setModel(value);
        }}
        modelValue={model}
      />
      {model && <p>Model value: {model}</p>}
    </div>
  );
};

export const Default: Story = {
  args: {
    modelValue: 'natural-person',
    options: defaultExample,
  },
  render: RenderTemplate,
};

export const WithLabel: Story = {
  args: {
    label: 'Choose an option',
    options: defaultExample,
  },
  render: RenderTemplate,
};

export const WithRangeAppearance: Story = {
  args: {
    appearance: 'range',
    options: defaultRangeExample,
    modelValue: 1,
  },
  render: RenderTemplate,
};

export const WithRequiredMessage: Story = {
  args: {
    modelValue: undefined,
    requiredMessage: 'Choose an option',
    options: defaultExample,
  },
  render: RenderTemplate,
};

export const WithRangeAndRequiredMessage: Story = {
  args: {
    appearance: 'range',
    context: 'primary',
    options: defaultRangeExample,
    modelValue: undefined,
    requiredMessage: 'Choose an option',
  },
  render: RenderTemplate,
};

export const WithMultiselect: Story = {
  args: {
    label: 'Choose several options',
    options: defaultExampleMultiselect,
    multiSelect: true,
    modelValue: ['location'],
  },
  render: RenderTemplate,
};
