import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import type { TIcon } from '@repo/ds/elements/icon/interface';
import Icon from '@repo/ds/elements/icon/Icon';

import './Sidebar.scss';

interface MenuChild {
  title: string;
  href: string;
  icon?: TIcon;
}

interface MenuItem {
  title: string;
  icon: TIcon;
  href?: string;
  children?: Array<MenuChild>;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const menu: Array<MenuItem> = [
    {
      title: 'Home',
      icon: 'home',
      href: 'dashboard',
    },
    {
      title: 'Perfil',
      icon: 'user',
      href: 'profile',
    },
    {
      title: 'Supplier',
      icon: 'box',
      children: [
        {
          title: 'Fornecedor',
          href: 'supplier',
          icon: 'box',
        },
        {
          title: 'Tipo de Fornecedor',
          href: 'supplier-type',
        },
      ],
    },

    {
      title: 'Configurações',
      icon: 'config',
      href: 'config',
    },
    {
      title: 'Sair',
      icon: 'sign-out',
      href: 'logout',
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggleButton" onClick={toggleSidebar}>
        <Icon icon={isOpen ? 'chevron-left' : 'chevron-right'} />
      </button>
      <div className="menu">
        {menu.map((item, index) => (
          <div key={index} className="menu__item">
            {item.href ? (
              <Link to={item.href} className="menu__item--link">
                <Icon icon={item.icon} />
                {isOpen && (
                  <span className="menu__item--title">{item.title}</span>
                )}
              </Link>
            ) : (
              <div
                className={`menu__item-parent`}
                onClick={() => toggleExpand(item.title)}
              >
                <div className="menu__item--link">
                  <Icon icon={item.icon} />
                  {isOpen && (
                    <div className="menu__item-parent-title">
                      <span className="menu__item--title">{item.title}</span>
                      <Icon
                        icon={
                          expandedItem === item.title
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                      />
                    </div>
                  )}
                </div>
                {expandedItem === item.title && item.children && (
                  <div className="submenu">
                    {item.children.map((child, childIndex) => (
                      <Link
                        to={child.href}
                        key={childIndex}
                        className="submenu__item"
                      >
                        {isOpen && (
                          <>
                            <Icon icon={child.icon} />
                            <span className="submenu__item--title">
                              {child.title}
                            </span>
                          </>
                        )}
                        {!isOpen && (
                          <span className="submenu__item--abbr">
                            {child.icon ? (
                              <Icon icon={child.icon} />
                            ) : (
                              child.title
                                .split('-')
                                .map((part) => part.charAt(0).toUpperCase())
                                .join('')
                            )}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

