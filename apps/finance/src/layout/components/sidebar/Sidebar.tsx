import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Icon from '@repo/ds/elements/icon/Icon';

import Dropdown from './dropdown';

import type { SidebarProps } from './interface';

import './Sidebar.scss';

export default function Sidebar({ menu, theme = 'finance' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const classNameList = joinClass([
    'sidebar',
    `sidebar__theme--${theme}`,
    isOpen ? 'sidebar__open' : 'sidebar__closed',
  ]);

  return (
    <div className={classNameList}>
      <button className="sidebar__toggle-button" onClick={toggleSidebar}>
        <Icon icon={isOpen ? 'chevron-left' : 'chevron-right'} />
      </button>
      <div className="sidebar__menu">
        {menu?.map((item, index) => (
          <div key={index} className="sidebar__menu--item">
            {!item.children ? (
              <Link to={item.path} className="sidebar__menu--item-link">
                <Icon icon={item.icon} />
                {isOpen && (
                  <span className="sidebar__menu--item-link__title">
                    {item.title}
                  </span>
                )}
              </Link>
            ) : (
              <Dropdown menu={item} isOpen={isOpen} theme={theme} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
