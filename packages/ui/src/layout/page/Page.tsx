import React, { useState } from 'react';

import type { User } from '@repo/business/auth/interface';

import type { TContext } from '@repo/ds/utils/colors/interface';
import joinClass from '@repo/ds/utils/join-class/joinClass';

import type { Logo, Menu } from '../../utils';

import Fade from '../../animations/fade';

import Header from '../../components/header';
import Sidebar from '../../components/v1/sidebar';

import './Page.scss';

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User;
  logo?: Logo;
  menu?: Array<Menu>;
  logout?: Menu['items'][number];
  context?: TContext;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export default function Page({
  user,
  logo,
  menu = [],
  logout,
  context,
  children,
  ariaLabel = 'Page Layout',
  className = '',
  ...props
}: PageProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleToggleMenu = () => setShowMobileMenu(!showMobileMenu);

  const navbar = menu?.find((group) => group.key === 'navbar')?.items;

  return (
    <Fade enter={true}>
      <div
        role="main"
        className={joinClass(['page', className])}
        aria-label={ariaLabel}
        {...props}
      >
        <Header
          logo={logo}
          navbar={navbar}
          context={context}
          handleToggleMenu={handleToggleMenu}
        />
        <main className="page__content">
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
      </div>
    </Fade>
  );
}
