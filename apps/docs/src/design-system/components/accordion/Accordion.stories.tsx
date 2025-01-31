import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import Tag from '@repo/ds/components/tag/Tag';
import Text from '@repo/ds/elements/text/Text';

import Accordion from '@repo/ds/components/accordion/Accordion';

const meta = {
  args: {
    title: 'Accordion Title',
    isOpen: false,
    context: 'neutral',
    children: 'Hello World',
    disabled: false,
    iconFormat: 'small',
    isBorderless: false,
    childrenTitle: undefined,
  },
  title: 'Design-System/Components/Accordion',
  argTypes: {
    title: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    isOpen: {
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
    iconFormat: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'small' },
      },
      options: ['small', 'big'],
      control: { type: 'select' },
    },
    isBorderless: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithChildrenTitle: Story = {
  args: {
    isOpen: true,
    childrenTitle: (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: '4px',
        }}
      >
        <div style={{ width: '100%', display: 'flex', gap: '12px' }}>
          <Text>client name</Text>
          <Tag context="primary">Tag</Tag>
        </div>
        <Text>Date</Text>
      </div>
    ),
  },
};
