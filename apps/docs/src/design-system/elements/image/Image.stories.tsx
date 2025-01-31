import type { Meta, StoryObj } from '@storybook/react';

import Image from '@repo/ds/elements/image/Image';

const src =
  'https://w7.pngwing.com/pngs/173/127/png-transparent-geek-logo-graphy-others-photography-artwork-sales-thumbnail.png';

const meta = {
  args: {
    fit: undefined,
    lazyLoad: false,
    fallback: true,
  },
  title: 'Design-System/Elements/Image',
  argTypes: {
    fit: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'cover' },
      },
      options: ['cover', 'contain'],
      control: { type: 'radio' },
    },
    lazyLoad: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fallback: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { src },
};
