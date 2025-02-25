import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useRouter } from 'next/navigation';
import { authService, getAccessToken, removeAccessToken } from '../../shared';
import UserProvider from '@repo/ui/hooks/user/UserProvider';
import type { User } from '@repo/business/auth/interface';
import { Content, Navbar, Sidebar } from '../components';
import useAlert from '@repo/ui/hooks/alert/useAlert';
import Config from '../../pages/config';
import Profile from '../../pages/profile';
import Dashboard from '../../pages/dashboard';
import Contact from '../../pages/contact';
import SupplierType from '../../pages/supplier-type';
import Supplier from '../../pages/supplier';
import ExpenseCategoryType from '../../pages/category-type';

interface AuthenticatedLayoutProps {
  title?: string;
}
export default function AuthenticatedLayout({
  title,
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
  return user ? (
    <UserProvider user={user}>
      <Router>
        <Navbar />
        <Sidebar />
        <Content title={title}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="config" element={<Config />} />
            <Route path="supplier-type" element={<SupplierType />} />
            <Route path="supplier" element={<Supplier />} />
            <Route path="category-type" element={<ExpenseCategoryType />} />
            <Route path="logout" element={<Contact />} />
          </Routes>
        </Content>
      </Router>
    </UserProvider>
  ) : null;
}
