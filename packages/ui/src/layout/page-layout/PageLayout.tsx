import React from 'react';

import type { User } from '@repo/business/auth/interface';

import type { Route } from '../../utils';

import { Content, Navbar, Sidebar } from '../../components/v2';

import BaseLayout from '../base-layout';

interface PageLayoutProps {
  user?: User;
  menu?: Array<Route>;
  title?: string;
  children: React.ReactNode;
  navbarTitle?: string;
  onLinkClick?: (path: string) => void;
  withAnimation?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  user,
  menu,
  title,
  children,
  navbarTitle,
  onLinkClick,
  withAnimation = true,
}) => {
  return user ? (
    <>
      <Navbar user={user} title={navbarTitle ?? 'My App'} />
      { menu && ( <Sidebar menu={menu} onLinkClick={onLinkClick} /> )}
      <Content title={title} withAnimation={withAnimation}>
        {children}
      </Content>
    </>
  ) : (
    <BaseLayout withAnimation={withAnimation}>{children}</BaseLayout>
  );
};

export default PageLayout;