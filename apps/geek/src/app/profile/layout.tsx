import React from 'react';

import type { Metadata } from 'next';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Profile',
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <section>{children}</section>;
}
