import React from 'react';

import type { Metadata } from 'next';

interface ResetPasswordLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Reset Password',
};

export default function ResetPasswordLayoutLayout({
  children,
}: ResetPasswordLayoutProps) {
  return <section>{children}</section>;
}
