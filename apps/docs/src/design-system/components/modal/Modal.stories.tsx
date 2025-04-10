import * as React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OColors, OContext } from '@repo/ds/utils/colors/options';

import Modal from '@repo/ds/components/modal/Modal';
import { ModalProps } from '@repo/ds/components/modal/types';
import Button from '@repo/ds/components/button/Button';

const meta = {
  args: {
    title: 'title modal',
    isOpen: false,
    context: 'primary',
    onClose: undefined,
    children: 'body modal',
    closeOnEsc: true,
    backDropColor: 'neutral-100',
    closeOnOutsideClick: true,
    removeBackgroundScroll: false,
  },
  title: 'Design-System/Components/Modal',
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
    width: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '500px' },
      },
      control: { type: 'text' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    maxHeight: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '80vh' },
      },
      control: { type: 'text' },
    },
    closeOnEsc: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    backDropColor: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral-100' },
      },
      options: OColors,
      control: { type: 'select' },
    },
    closeOnOutsideClick: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    removeBackgroundScroll: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  component: Modal,
  decorators: [
    (Story) => (
      <div style={{ height: '50vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const TemplateModal = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} context={args.context}>
        Abrir modal
      </Button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={args.children}
      />
    </>
  );
};

export const Default: Story = {
  args: { children: 'Exemplo' },
  render: (args) => <TemplateModal {...args} children={args.children} />,
};

export const WithScroll: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 128 }, (_, index) => index + 1).map((item) => (
          <div key={item}>CARD {item}</div>
        ))}
      </>
    ),
    removeBackgroundScroll: true,
  },
  render: (args) => <TemplateModal {...args} children={args.children} />,
};

export const WithCustomClose: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 128 }, (_, index) => index + 1).map((item) => (
          <div key={item}>CARD {item}</div>
        ))}
      </>
    ),
    customCloseIcon: (<button>X</button>),
  },
  render: (args) => <TemplateModal {...args} children={args.children} />,
};
