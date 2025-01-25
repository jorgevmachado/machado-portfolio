import React from 'react';

import BaseLayout from '@repo/ui/layout/base-layout/BaseLayout';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <BaseLayout>{children}</BaseLayout>;
}
