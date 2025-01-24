import React from 'react';

import type { TContext } from '@repo/ds/utils/colors';

import type { Logo, Menu } from '../../utils';

import Image from '@repo/ds/elements/image/Image';

import Button from '@repo/ds/components/button/Button';
import Dropdown from '@repo/ds/components/dropdown/Dropdown';
import Link from '@repo/ds/components/link/Link';

import './Header.scss';

interface NavbarProps {
  logo?: Logo;
  navbar?: Menu['items'];
  context?: TContext;
  handleToggleMenu?: () => void;
}

export default function Header({
  logo,
  navbar,
  context = 'neutral',
  handleToggleMenu,
}: NavbarProps) {
  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) =>
    logo?.onClick && logo.onClick(e);
  const hasItems = (item: Menu['items'][number]) => !!item?.items?.length;

  return (
    <header className={`header header__context--${context}`}>
      <div className="header__brand">
        <Button
          icon="hamburger"
          onClick={handleToggleMenu}
          context={context}
          className="header__brand--button"
          aria-label="sidebar"
          appearance="icon"
          noIconBorder={true}
        />
        {logo && (
          <div
            className="header__brand--logo"
            onClick={handleLogoClick}
            tabIndex={0}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              width={logo.width}
              height={logo.height}
            />
          </div>
        )}
      </div>
      <nav className="header__nav" aria-label="main navigation">
        <ul role="menu" className="header__nav--list">
          {navbar?.map((item) => (
            <li
              key={item.key}
              role={item.items?.length ? 'menuitem' : 'menu'}
              className={`header__nav--list-item ${item.items?.length ? 'header__nav--list-dropdown' : ''}`}
            >
              {hasItems(item) ? (
                <Dropdown label={item.label} type="link" context={context}>
                  {item?.items?.map((subItem) => (
                    <Link
                      key={subItem.key}
                      context={context}
                      iconColor={`${context}-100`}
                      onClick={subItem?.onRedirect}
                      className="header__nav--list-link"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </Dropdown>
              ) : (
                <Link
                  context={context}
                  onClick={item?.onRedirect}
                  className="header__nav--list-link"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
