import React from 'react';

interface SignUpLayoutProps {
  children: React.ReactNode;
}
export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return <section>{children}</section>;
}
