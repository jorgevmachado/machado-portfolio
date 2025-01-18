import React from 'react';

import { TContext } from '@repo/ds/utils/colors';

import { Logo, Menu } from '../../utils';

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
          <div className="header__brand--logo" onClick={logo.onClick}>
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
      <nav className="header__nav">
        <ul className="header__nav--list">
          {navbar?.map((item) => (
            <li
              key={item.key}
              className={`header__nav--list-item ${item.items?.length ? 'header__nav--list-dropdown' : ''}`}
            >
              {!item.items?.length ? (
                <Link
                  context={context}
                  onClick={item?.onRedirect}
                  className="header__nav--list-link"
                >
                  {item.label}
                </Link>
              ) : (
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
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// HEADER
// HEADER__CONTEXT

// HEADER__BRAND
// HEADER__BRAND--BUTTON
// HEADER__BRAND--LOGO

// HEADER__NAV
// HEADER__NAV--LIST
// HEADER__NAV--LIST-ITEM
// HEADER__NAV--LIST-LINK
// HEADER__NAV--LIST-DROPDOWN
// HEADER__NAV--LIST-DROPDOWN__LINK
