'use client';
import React from 'react';

import BillProvider from './BillProvider';

import List from './list';

export default function Page() {
  return (
    <BillProvider>
      <List />
    </BillProvider>
  );
}