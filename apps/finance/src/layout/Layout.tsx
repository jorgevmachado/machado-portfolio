import React from 'react';
import { authRoutes } from 'geek/src/routes';
import { usePathname } from 'next/navigation';
import AuthLayout from './auth';
import AuthenticatedLayout from './authenticated';

interface DefaultProps {
  title?: string;
  children: React.ReactNode;
}
export default function Layout({ title, children }: DefaultProps) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.includes(pathname);
  return isAuthRoute ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <AuthenticatedLayout title={title}>{children}</AuthenticatedLayout>
  );
}