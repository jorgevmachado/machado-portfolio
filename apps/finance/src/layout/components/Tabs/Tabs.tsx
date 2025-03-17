import React, { useState } from 'react';

import './Tabs.scss';

type TabItem = {
  title: string;
  children: React.ReactNode;
};

type TabsProps = {
  fluid?: boolean;
  tabItems: Array<TabItem>;
};

const Tabs: React.FC<TabsProps> = ({ tabItems, fluid = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`tabs ${fluid ? 'tabs--fluid' : ''}`}>
      <ul className="tabs__menu">
        {tabItems.map((item, index) => (
          <li
            key={`tab-${index}`}
            className={`tabs__menu--item ${
              activeIndex === index ? 'active' : ''
            }`}
            onClick={() => handleTabClick(index)}
          >
            {item.title}
          </li>
        ))}
      </ul>

      <div className="tabs__content">{tabItems[activeIndex]?.children}</div>
    </div>
  );
};

export default Tabs;