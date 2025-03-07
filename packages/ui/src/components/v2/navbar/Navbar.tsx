import React from 'react';

import type { NavbarProps } from './interface';

import './Navbar.scss';

const Navbar: React.FC<NavbarProps> = ({ user, title }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span className="navbar__logo">{title}</span>
      </div>
      <div className="navbar__right">
        <div className="navbar__profile">
          {user?.name ? (
            <>
              Bem-vindo, <strong>{user.name}</strong>{' '}
            </>
          ) : (
            'Bem vindo'
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;