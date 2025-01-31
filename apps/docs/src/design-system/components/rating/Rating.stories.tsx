import type { Meta, StoryObj } from '@storybook/react';

import { OContext } from '@repo/ds/utils/colors/options';

import Rating from '@repo/ds/components/rating/Rating';

const meta = {
  args: {
    length: 5,
    rating: 4.7587,
    context: 'neutral',
    halfStar: false,
    ratingInfo: undefined,
    ratingCount: undefined,
    roundRating: false,
    ratingInfoText: 'Service Satisfaction',
  },
  title: 'Design-System/Components/Rating',
  argTypes: {
    length: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
      control: { type: 'number' },
    },
    rating: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      control: { type: 'number' },
    },
    context: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: OContext,
      control: { type: 'select' },
    },
    halfStar: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    ratingInfo: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    ratingCount: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
      control: { type: 'number' },
    },
    roundRating: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    ratingInfoText: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Service Satisfaction' },
      },
      control: { type: 'text' },
    },
  },
  component: Rating,
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Exemplo' },
};

export const RatingLength: Story = {
  args: {
    length: 5,
    rating: 4.9,
    ratingCount: 102,
  },
};

export const RatingInfo: Story = {
  args: {
    length: 5,
    rating: 4.9,
    ratingInfo: true,
    ratingCount: 102,
  },
};

export const RatingWithHalfStar: Story = {
  args: {
    length: 5,
    rating: 3.5,
    halfStar: true,
  },
};

export const RatingRatingLabelRounded: Story = {
  args: {
    length: 5,
    rating: 2.5,
    roundRating: true,
  },
};
