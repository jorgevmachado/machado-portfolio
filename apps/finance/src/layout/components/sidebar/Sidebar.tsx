import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@repo/ds/elements/icon/Icon';

import './Sidebar.scss';
import { privateRoutes } from '../../../routes';
import Dropdown from './dropdown';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggleButton" onClick={toggleSidebar}>
        <Icon icon={isOpen ? 'chevron-left' : 'chevron-right'} />
      </button>
      <div className="menu">
        {privateRoutes.map((item, index) => (
          <div key={index} className="menu__item">
            {!item.children ? (
              <Link to={item.path} className="menu__item--link">
                <Icon icon={item.icon} />
                {isOpen && (
                  <span className="menu__item--title">{item.title}</span>
                )}
              </Link>
            ) : (
              <Dropdown menu={item} isOpen={isOpen} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
