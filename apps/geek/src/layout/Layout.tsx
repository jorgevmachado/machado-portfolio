'use client';
import React from 'react';

import { usePathname } from 'next/navigation';

import AuthLayout from './auth';
import PublicLayout from './public';
import { publicRoutes } from '../routes';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const pathname = usePathname();
  const isAuthRoute = publicRoutes.includes(pathname);

  return isAuthRoute ? (
    <PublicLayout>{children}</PublicLayout>
  ) : (
    <AuthLayout title={title}>{children}</AuthLayout>
  );
}
