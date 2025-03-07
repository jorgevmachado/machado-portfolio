import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import type { User } from '@repo/business/auth/interface';
import UserProvider from '@repo/ui/hooks/user/UserProvider';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import PageLayout from '@repo/ui/layout/page-layout/PageLayout';

import { authService, getAccessToken, removeAccessToken } from '../shared';

import { privateRoutes } from '../routes';

interface DefaultProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DefaultProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { addAlert } = useAlert();

  const [user, setUser] = useState<User>();

  const isAuthenticationRoute = privateRoutes.some(
    (route) => route.path === pathname,
  );

  const token = getAccessToken() || '';

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    if (token && !isAuthenticationRoute) {
      authService
        .me()
        .then((response) => {
          setUser(response);
        })
        .catch(() => {
          addAlert({ type: 'error', message: 'Your token has expired!' });
          removeAccessToken();
          router.push('/');
        });
    }
  }, [token]);

  return isAuthenticationRoute || !user ? (
    <PageLayout>{children}</PageLayout>
  ) : (
    <UserProvider user={user}>
      <PageLayout
        user={user}
        menu={privateRoutes}
        navbarTitle="Finance"
        onLinkClick={handleLinkClick}
      >
        {children}
      </PageLayout>
    </UserProvider>
  );
}