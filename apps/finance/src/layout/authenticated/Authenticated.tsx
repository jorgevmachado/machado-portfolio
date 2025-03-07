import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import UserProvider from '@repo/ui/hooks/user/UserProvider';
import type { User } from '@repo/business/auth/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import PageLayout from '@repo/ui/layout/page-layout/PageLayout';

import { authService, getAccessToken, removeAccessToken } from '../../shared';
import { privateRoutes } from '../../routes';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const { addAlert } = useAlert();
  const router = useRouter();
  const token = getAccessToken() || '';
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (token) {
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

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return user ? (
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
  ) : null;
}
