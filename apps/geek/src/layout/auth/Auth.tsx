import React from 'react';

import Blank from '@repo/ui/layout/blank/Blank';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <Blank>{children}</Blank>;
}
