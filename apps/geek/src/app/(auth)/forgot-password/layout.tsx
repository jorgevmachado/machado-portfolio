import React from 'react';

import type { Metadata } from 'next';

interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Forgot Password | Geek',
  description: 'Forgot Password Geek',
};

export default function ForgotPasswordLayoutLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return <section>{children}</section>;
}
