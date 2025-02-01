import React from 'react';

import type { Metadata } from 'next';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Sign-up',
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return <section>{children}</section>;
}
