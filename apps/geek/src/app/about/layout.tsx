import React from 'react';

import type { Metadata } from 'next';

interface AboutLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'About Geek | Geek',
  description: 'About Geek',
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <section>{children}</section>;
}
