import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Page from '@repo/ui/layout/page/Page';
import PageContent from '@repo/ui/layout/page-content/PageContent';

import { logout, menu } from './menu';
import {authService, getAccessToken, removeAccessToken} from '../../shared';
import UserProvider from '@repo/ui/hooks/user/UserProvider';
import type { User } from '@repo/business/auth/interface';

interface AuthenticatedLayoutProps {
  title?: string;
  children: React.ReactNode;
}
export default function AuthenticatedLayout({
  title,
  children,
}: AuthenticatedLayoutProps) {
  const router = useRouter();
  const token = getAccessToken() || '';
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (token) {
      authService.me().then((response) => {
        setUser(response);
      });
    }
  }, [token]);
  const currentMenu = menu.map((item) => ({
    ...item,
    items: item.items.map((subItem) => ({
      ...subItem,
      onRedirect: () => router.push(subItem.href || '/'),
    })),
  }));

  return user ? (
    <UserProvider user={user}>
      <Page
          user={user}
        menu={currentMenu}
        logo={{ src: '/logo/logo.svg', alt: 'logo', title: 'logo' }}
        logout={{
          ...logout,
          onRedirect: () =>  {
            removeAccessToken();
            router.push('/sign-in');
          },
        }}
        context="primary"
      >
        <PageContent title={title}>{children}</PageContent>
      </Page>
    </UserProvider>
  ) : null;
}
