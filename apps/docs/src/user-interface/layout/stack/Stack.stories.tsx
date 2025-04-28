import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@repo/ui/layout/stack/Stack';

const meta = {
    args: {
        tag: 'section',
        spacing: 'large',
        orientation: 'row',
        children: <>
            <h2>Title</h2>
            <h2>Subtitle</h2>
        </>,
    },
    title: 'User-Interface/Layout/Stack',
    component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};