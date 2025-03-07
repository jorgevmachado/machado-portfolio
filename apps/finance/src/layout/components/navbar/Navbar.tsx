import React from 'react';

import joinClass from "@repo/ds/utils/join-class/joinClass";

import useUser from '@repo/ui/hooks/user/useUser';

import type { NavbarProps } from './interface';

import './Navbar.scss';

const Navbar: React.FC<NavbarProps> = ({ title, theme = 'finance'}: NavbarProps) => {
  const { user } = useUser();
  const classNameList = joinClass([
      'navbar',
      `navbar__theme--${theme}`
  ])
  return (
    <nav className={classNameList}>
      <div className="navbar__left">
        <span className="navbar__logo">{title}</span>
      </div>
      <div className="navbar__right">
        <div className="navbar__profile">
          Bem-vindo, <strong>{user.name}</strong>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;