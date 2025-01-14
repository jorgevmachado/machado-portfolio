import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}
export default function LoginLayout({ children }: LoginLayoutProps) {
  return <section>{children}</section>;
}
