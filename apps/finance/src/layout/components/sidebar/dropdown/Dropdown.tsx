import React, { useState } from 'react';

import Icon from '@repo/ds/elements/icon/Icon';

import './Dropdown.scss';
import LinkDropdown from './link-dropdown/LinkDropdown';
import { RouteProps } from '../../../../routes/interface';

interface LinkDropdownProps {
    menu: RouteProps;
    isOpen: boolean;
}

export default function Dropdown({ menu, isOpen }: LinkDropdownProps) {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const toggleExpand = (item: string) => {
        setExpandedItem(expandedItem === item ? null : item);
    };

    return (
        <div className="dropdown" onClick={() => toggleExpand(menu.title)}>
            <div className="menu__item--link">
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
                    <LinkDropdown
                        title={menu.title}
                        path={menu.path}
                        icon={menu.icon}
                        isOpen={isOpen}
                    />
                    {menu.children.map((child, childIndex) => (
                        <LinkDropdown
                            key={childIndex}
                            title={child.title}
                            path={child.path}
                            icon={child.icon}
                            isOpen={isOpen}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}