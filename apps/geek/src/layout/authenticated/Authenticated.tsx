import React from 'react';
import { useRouter } from 'next/navigation';

import Page from '@repo/ui/layout/page/Page';
import PageContent from '@repo/ui/layout/page-content/PageContent';

import { logout, menu } from '../menu';

interface AuthenticatedLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  title,
  children,
}: AuthenticatedLayoutProps) {
  const router = useRouter();
  const currentMenu = menu.map((item) => ({
    ...item,
    items: item.items.map((subItem) => ({
      ...subItem,
      onRedirect: () => router.push(subItem.href || '/'),
    })),
  }));

  return (
    <Page
      menu={currentMenu}
      logo={{ src: '/logo/logo.svg', alt: 'logo', title: 'logo' }}
      logout={{
        ...logout,
        onRedirect: () => router.push('/dashboard?logout=true'),
      }}
      context="primary"
    >
      <PageContent title={title}>{children}</PageContent>
    </Page>
  );
}
