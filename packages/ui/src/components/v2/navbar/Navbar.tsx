import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import type { NavbarProps } from './interface';

import './Navbar.scss';

const Navbar: React.FC<NavbarProps> = ({
  user,
  title,
  theme = 'finance',
}: NavbarProps) => {
  const classNameList = joinClass(['navbar', `navbar__theme--${theme}`]);

  return (
    <nav className={classNameList}>
      <div className="navbar__left">
        <span className="navbar__logo">{title}</span>
      </div>
      <div className="navbar__right">
          <div className="navbar__profile">
              {user?.name
                  ?  (<>Bem-vindo, <strong>{user.name}</strong> </>)
                  : 'Bem vindo'
              }
          </div>
      </div>
    </nav>
  );
};

export default Navbar;