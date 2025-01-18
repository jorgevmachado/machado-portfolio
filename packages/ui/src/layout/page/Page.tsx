import React, { useState } from 'react';

import { User } from '@repo/business/auth/interface';

import { TContext } from '@repo/ds/utils/colors/interface';

import { Logo, Menu } from '../../utils';

import Fade from '../../animations/fade';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

import './Page.scss';

interface PageProps {
  user?: User;
  logo?: Logo;
  menu?: Array<Menu>;
  logout?: Menu['items'][number];
  context?: TContext;
  children: React.ReactNode;
}

export default function Page({
  user,
  logo,
  menu,
  logout,
  context,
  children,
}: PageProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleToggleMenu = () => setShowMobileMenu(!showMobileMenu);

  const navbar = menu?.find((group) => group.key === 'navbar')?.items;

  return (
    <Fade enter={true}>
      <Header
        logo={logo}
        navbar={navbar}
        context={context}
        handleToggleMenu={handleToggleMenu}
      />
      <main className="page">
        <Sidebar
          user={user}
          menu={menu}
          context={context}
          logout={logout}
          showMobileMenu={showMobileMenu}
          handleToggleMenu={handleToggleMenu}
        />
        {children}
      </main>
    </Fade>
  );
}
