import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import BaseLayout from '@repo/ui/layout/base-layout/BaseLayout';

const meta = {
  args: {
    children: (
      <>
        <h1>Blank Layout</h1>
        <p>Hello World</p>
      </>
    ),
    className: undefined,
    ariaLabel: undefined,
    withAnimation: undefined,
  },
  title: 'User-Interface/Layout/BaseLayout',
  component: BaseLayout,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BaseLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const NoAnimation: Story = {
  args: {
    withAnimation: false,
  },
};

export const CustomClass: Story = {
  args: {
    className: 'custom-class',
    children: (
      <div>
        <h2>Custom Class Example</h2>
        <p>This layout has an additional CSS class applied.</p>
      </div>
    ),
  },
};

export const OverflowContent: Story = {
  args: {
    children: (
      <div>
        <h2>Overflow Content Test</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
          ipsum non enim fringilla tincidunt. Curabitur volutpat, nibh id
          egestas vehicula, ligula erat vulputate quam, sit amet pharetra urna
          turpis hendrerit dui.
        </p>
        <p>
          Praesent vel scelerisque nulla, vitae molestie orci. Proin vehicula
          feugiat nulla nec pellentesque.
        </p>
      </div>
    ),
  },
};
