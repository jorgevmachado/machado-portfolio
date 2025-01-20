import React from 'react';

import type { Metadata } from 'next';

interface SignInLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'SignIn | Geek',
  description: 'SignIn Geek',
};

export default function SignInLayout({ children }: SignInLayoutProps) {
  return <section>{children}</section>;
}
