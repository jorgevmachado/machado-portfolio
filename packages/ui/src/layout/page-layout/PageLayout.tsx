import React, {useEffect, useState} from 'react';

import type { User } from '@repo/business/auth/interface';

import useBreakpoint from '@repo/ds/hooks/use-breakpoint/useBreakpoint';

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
  sidebarOpen?: boolean;
  withAnimation?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  user,
  menu,
  title,
  children,
  navbarTitle,
  onLinkClick,
  sidebarOpen = true,
  withAnimation = true,
}) => {
  const { isMobile } = useBreakpoint();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  useEffect(() => {
    setIsSidebarOpen(!isMobile ? sidebarOpen : false);
  }, [isMobile, sidebarOpen]);

  return user ? (
    <>
      <Navbar user={user} title={navbarTitle ?? 'My App'} />
      {menu && (
        <Sidebar
          menu={menu}
          onToggle={handleSidebarToggle}
          isSidebarOpen={isSidebarOpen}
          onLinkClick={onLinkClick}
        />
      )}
      <Content
        title={title}
        isSidebarOpen={isSidebarOpen}
        withAnimation={withAnimation}
      >
        {children}
      </Content>
    </>
  ) : (
    <BaseLayout withAnimation={withAnimation}>{children}</BaseLayout>
  );
};

export default PageLayout;