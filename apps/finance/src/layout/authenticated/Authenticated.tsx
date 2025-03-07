import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrowserRouter as Router } from 'react-router-dom';

import UserProvider from '@repo/ui/hooks/user/UserProvider';
import type { User } from '@repo/business/auth/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import Sidebar from '@repo/ui/components/v2/sidebar/Sidebar';
import Navbar from '@repo/ui/components/v2/navbar/Navbar';

import { authService, getAccessToken, removeAccessToken } from '../../shared';
import { privateRoutes } from '../../routes';

import { Content,  } from '../components';

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

  const theme = 'finance';
  return user ? (
    <UserProvider user={user}>
      <Router>
        <Navbar user={user} title="Finance" theme={theme} />
        <Sidebar
          menu={privateRoutes}
          theme={theme}
          onLinkClick={handleLinkClick}
        />
        <Content>{children}</Content>
      </Router>
    </UserProvider>
  ) : null;
}
