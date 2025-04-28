import React, { useState } from 'react';

import Icon from '@repo/ds/elements/icon/Icon';

import { formatPath, type Route } from '../../../../utils';

import LinkDropdown from './link-dropdown/LinkDropdown';

import './Dropdown.scss';

interface LinkDropdownProps {
  menu: Route;
  isOpen: boolean;
  onLinkClick: (path: string) => void;
  grandParentPath?: string;
}

export default function Dropdown({
  menu,
  isOpen,
  onLinkClick,
  grandParentPath,
}: LinkDropdownProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <div className="dropdown">
      <div
        className="sidebar__menu--item-link"
        onClick={() => toggleExpand(menu.title)}
      >
        <Icon icon={menu.icon} />
        {isOpen && (
          <div className="dropdown__title">
            <span className="sidebar__menu--item-link__title">
              {menu.title}
            </span>
            <Icon
              icon={expandedItem === menu.title ? 'chevron-up' : 'chevron-down'}
            />
          </div>
        )}
      </div>
      {expandedItem === menu.title && menu.children && (
        <div className="dropdown__submenu">
          {menu.children.map((child) => (
            <div key={child.key}>
              {child.children ? (
                <Dropdown
                  menu={child}
                  isOpen={isOpen}
                  onLinkClick={onLinkClick}
                  grandParentPath={menu.path}
                />
              ) : (
                <LinkDropdown
                  title={child.title}
                  path={formatPath({
                    parentPath: menu.path,
                    childPath: child.path,
                    grandParentPath,
                  })}
                  icon={child.icon}
                  isOpen={isOpen}
                  onLinkClick={onLinkClick}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}