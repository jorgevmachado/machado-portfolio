'use client';
import React from 'react';

import { usePathname } from 'next/navigation';

import { authRoutes } from '../routes';

import AuthLayout from './auth';
import AuthenticatedLayout from './authenticated';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.includes(pathname);

  return isAuthRoute ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <AuthenticatedLayout title={title}>{children}</AuthenticatedLayout>
  );
}
