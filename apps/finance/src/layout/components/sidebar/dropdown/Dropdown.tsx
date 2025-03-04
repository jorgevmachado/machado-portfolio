import React, { useState } from 'react';

import Icon from '@repo/ds/elements/icon/Icon';

import { RouteProps } from '../../../../routes/interface';
import { formatPath } from '../../../../routes';

import LinkDropdown from './link-dropdown/LinkDropdown';

import './Dropdown.scss';

interface LinkDropdownProps {
  menu: RouteProps;
  isOpen: boolean;
  grandParentPath?: string;
}

export default function Dropdown({
  menu,
  isOpen,
  grandParentPath,
}: LinkDropdownProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <div className="dropdown">
      <div
        className="menu__item--link"
        onClick={() => toggleExpand(menu.title)}
      >
        <Icon icon={menu.icon} />
        {isOpen && (
          <div className="dropdown__title">
            <span className="menu__item--title">{menu.title}</span>
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
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}