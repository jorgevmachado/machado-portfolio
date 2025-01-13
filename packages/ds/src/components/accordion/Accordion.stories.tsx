import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { OContext } from '../../utils/colors';

import Text from '../../elements/text';

import Tag from '../tag';

import Accordion from './Accordion';

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
  title: 'Components/Accordion',
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
