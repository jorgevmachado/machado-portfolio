import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserProvider from '@repo/ui/hooks/user/UserProvider';
import type { User } from '@repo/business/auth/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { authService, getAccessToken, removeAccessToken } from '../../shared';
import { formatPath, privateRoutes } from '../../routes';

import { Content, Navbar, Sidebar } from '../components';

export default function AuthenticatedLayout() {
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
  return user ? (
    <UserProvider user={user}>
      <Router>
        <Navbar />
        <Sidebar />
        <Content>
          <Routes>
            {privateRoutes.map((route) =>
              route.children ? (
                route.children.map((child) =>
                  child.children ? (
                    child.children.map((grandChild) => (
                      <Route
                        key={grandChild.key}
                        path={formatPath({
                          parentPath: child.path,
                          childPath: grandChild.path,
                          grandParentPath: route.path,
                        })}
                        element={grandChild.element}
                      />
                    ))
                  ) : (
                    <Route
                      key={child.key}
                      path={formatPath({
                        parentPath: route.path,
                        childPath: child.path,
                      })}
                      element={child.element}
                    />
                  ),
                )
              ) : (
                <Route
                  key={route.key}
                  path={route.path}
                  element={route.element}
                />
              ),
            )}

            {/*<Route path="*" element={<Navigate to="/dashboard" replace />} />*/}
          </Routes>
        </Content>
      </Router>
    </UserProvider>
  ) : null;
}
