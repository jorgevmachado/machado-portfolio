import React, { useState } from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Icon from '@repo/ds/elements/icon/Icon';

import { RouteProps } from '../../../../routes/interface';
import { formatPath } from '../../../../routes';

import type { TTheme } from '../interface';

import LinkDropdown from './link-dropdown/LinkDropdown';

import './Dropdown.scss';

interface LinkDropdownProps {
  menu: RouteProps;
  theme: TTheme;
  isOpen: boolean;
  onLinkClick: (path: string) => void;
  grandParentPath?: string;
}

export default function Dropdown({
  menu,
  theme,
  isOpen,
  onLinkClick,
  grandParentPath,
}: LinkDropdownProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const classNameList = joinClass(['dropdown', `dropdown__theme--${theme}`]);

  return (
    <div className={classNameList}>
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
                  theme={theme}
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