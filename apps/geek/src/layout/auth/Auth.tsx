import React from 'react';

import Page from '@repo/ui/layout/page/Page';
import PageContent from '@repo/ui/layout/page-content/PageContent';

import { logout, menu } from '../menu';

interface AuthLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <Page
      menu={menu}
      logo={{ src: '/logo/logo.svg', alt: 'logo', title: 'logo' }}
      logout={logout}
      context="primary"
    >
      <PageContent title={title}>{children}</PageContent>
    </Page>
  );
}
