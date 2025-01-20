import React from 'react';

import type { Metadata } from 'next';

interface ResetPasswordLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Reset Password | Geek',
  description: 'Reset Password Geek',
};

export default function ResetPasswordLayoutLayout({
  children,
}: ResetPasswordLayoutProps) {
  return <section>{children}</section>;
}
