import React from 'react';
import { authRoutes } from 'geek/src/routes';
import { usePathname } from 'next/navigation';

import BaseLayout from '@repo/ui/layout/base-layout/BaseLayout';

import AuthenticatedLayout from './authenticated';

interface DefaultProps {
  children: React.ReactNode;
}
export default function Layout({ children }: DefaultProps) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.includes(pathname);
  return isAuthRoute ? (
    <BaseLayout>{children}</BaseLayout>
  ) : (
    <AuthenticatedLayout>{children}</AuthenticatedLayout>
  );
}