import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import PageContent from './PageContent';

const meta = {
  args: {
    title: 'Page Layout title',
    children: 'Hello, World!',
    className: undefined,
    ariaLabelledBy: undefined,
    contentClassName: undefined,
  },
  title: 'Layout/PageContent',
  argTypes: {
    title: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Page Layout title' },
      },
      options: ['label', 'legend'],
      control: { type: 'select' },
    },
    children: {
      control: false,
      description: 'The child content or component rendered.',
    },
    className: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Page Layout title' },
      },
      options: ['label', 'legend'],
      control: { type: 'select' },
    },
    ariaLabelledBy: {
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
    contentClassName: {
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'text' },
    },
  },
  component: PageContent,
} satisfies Meta<typeof PageContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutTitle: Story = {
  args: {
    title: undefined,
    children: 'This example does not include a title.',
  },
};

export const LongContent: Story = {
  args: {
    title: 'A Page with a Lot of Content',
    children: (
      <>
        <p>
          This is a larger example to demonstrate how the layout adapts when
          there is a lot of content.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          ultricies neque quis arcu vestibulum, sit amet pharetra ex tempus.
          Donec pulvinar lectus eget massa convallis vehicula.
        </p>
        <p>
          Etiam vehicula viverra elit, id laoreet ipsum pulvinar gravida. Sed
          auctor viverra orci.
        </p>
        <p>
          More content here. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Cras ultricies neque quis arcu vestibulum, sit amet pharetra.
        </p>
      </>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-class',
    contentClassName: 'custom-content-class',
    title: 'Page Content with Custom Classes',
    children: (
      <p>
        This example demonstrates how custom classes can be passed to the main
        layout and content.
      </p>
    ),
  },
};

export const Accessible: Story = {
  args: {
    title: 'Accessible Page',
    ariaLabelledBy: 'accessible-title',
    children: (
      <p>
        This example demonstrates the use of the `aria-labelledby` prop for
        better screen reader support.
      </p>
    ),
  },
};
