import React from 'react';

interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}
export default function ForgotPasswordLayoutLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return <section>{children}</section>;
}
