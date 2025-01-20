import React from 'react';

import type { Metadata } from 'next';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'SignUp | Geek',
  description: 'SignUp Geek',
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return <section>{children}</section>;
}
