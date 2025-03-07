import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const router = useRouter();
  const pathname = usePathname();
  const { addAlert } = useAlert();

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticationRoute = useMemo(
    () => privateRoutes.some((route) => route.path === pathname),
    [pathname],
  );

  const token = useMemo(() => getAccessToken() || '', []);

  const fetchUser = useCallback(async () => {
    try {
      const fetchedUser = await authService.me();
      setUser(fetchedUser);
    } catch (error) {
      addAlert({ type: 'error', message: 'Your token has expired!' });
      removeAccessToken();
      router.push('/');
    }
  }, [addAlert, router]);

  const handleLinkClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  useEffect(() => {
    if (token && !isAuthenticationRoute) {
      fetchUser().then();
    }
  }, [token, isAuthenticationRoute, fetchUser]);

  if (isAuthenticationRoute || !user) {
    return <PageLayout>{children}</PageLayout>;
  }

  return (
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