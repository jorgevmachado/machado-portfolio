import React from 'react';

interface SignInLayoutProps {
  children: React.ReactNode;
}
export default function SignInLayout({ children }: SignInLayoutProps) {
  return <section>{children}</section>;
}
