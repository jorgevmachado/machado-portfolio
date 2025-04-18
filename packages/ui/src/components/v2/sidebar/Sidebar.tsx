import React, { useState } from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Icon from '@repo/ds/elements/icon/Icon';

import Dropdown from './dropdown';

import type { SidebarProps } from './interface';

import './Sidebar.scss';

export default function Sidebar({
  menu,
  onToggle,
  onLinkClick,
  isSidebarOpen = true,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(isSidebarOpen);

  const handleOnClick = (path: string) => {
    onLinkClick
      ? onLinkClick(path)
      : window !== undefined
        ? (window.location.href = path)
        : null;
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle && onToggle(newState);
  };

  const classNameList = joinClass([
    'sidebar',
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
              <div
                className="sidebar__menu--item-link"
                onClick={() => handleOnClick(item.path)}
              >
                <Icon icon={item.icon} />
                {isOpen && (
                  <span className="sidebar__menu--item-link__title">
                    {item.title}
                  </span>
                )}
              </div>
            ) : (
              <Dropdown
                menu={item}
                isOpen={isOpen}
                onLinkClick={handleOnClick}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
