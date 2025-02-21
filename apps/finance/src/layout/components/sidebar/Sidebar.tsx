import React, { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaBox,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa'; // Ícones do react-icons
import './Sidebar.scss';

interface MenuChild {
  title: string;
  href: string;
  icon?: JSX.Element;
}

interface MenuItem {
  title: string;
  icon: JSX.Element;
  href?: string;
  children?: Array<MenuChild>;
}

const Sidebar: React.FC = () => {
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
      icon: <FaHome />,
      href: 'dashboard',
    },
    {
      title: 'Perfil',
      icon: <FaUser />,
      href: 'profile',
    },
    {
      title: 'Supplier',
      icon: <FaBox />,
      children: [
        {
          title: 'Fornecedor',
          href: 'supplier', // Página de fornecedor
          icon: <FaBox />,
        },
        {
          title: 'Tipo de Fornecedor',
          href: 'supplier-type', // Página de tipo de fornecedor
        },
      ],
    },

    {
      title: 'Configurações',
      icon: <FaCog />,
      href: 'config',
    },
    {
      title: 'Sair',
      icon: <FaSignOutAlt />,
      href: 'logout',
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggleButton" onClick={toggleSidebar}>
        {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
      </button>
      <div className="menu">
        {menu.map((item, index) => (
          <div key={index} className="menu__item">
            {item.href ? (
              <Link to={item.href} className="menu__item--link">
                {item.icon}
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
                  {item.icon}
                  {isOpen && (
                    <div className="menu__item-parent-title">
                      <span className="menu__item--title">{item.title}</span>
                      {expandedItem === item.title ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </div>
                  )}
                </div>
                {/* Submenu */}
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
                            {child.icon}
                            <span className="submenu__item--title">
                              {child.title}
                            </span>
                          </>
                        )}
                        {!isOpen && (
                          <span className="submenu__item--abbr">
                            {child.icon ||
                              child.title
                                .split('-')
                                .map((part) => part.charAt(0).toUpperCase())
                                .join('')}
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

export default Sidebar;
