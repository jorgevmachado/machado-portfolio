import React from 'react';

import type { TIcon } from '@repo/ds/elements/icon/interface';
import Icon from '@repo/ds/elements/icon/Icon';

import './LinkDropdown.scss';

interface LinkDropdownProps {
  title: string;
  path: string;
  icon?: TIcon;
  isOpen: boolean;
  onLinkClick: (path: string) => void;
}
export default function LinkDropdown({
  title,
  path,
  icon,
  isOpen,
  onLinkClick,
}: LinkDropdownProps) {
  const abbrTitle = (title: string) =>
    title
      .split('-')
      .map((part) => part.charAt(0).toUpperCase())
      .join('');

  return (
    <div
      key={title}
      className="link-dropdown"
      onClick={() => onLinkClick && onLinkClick(path)}
    >
      {isOpen && (
        <>
          <Icon icon={icon} />
          <span className="link-dropdown__title">{title}</span>
        </>
      )}
      {!isOpen && (
        <span className="link-dropdown__abbr">
          {icon ? <Icon icon={icon} /> : abbrTitle(title)}
        </span>
      )}
    </div>
  );
}