import React from 'react';

import { type TColors, type TIcon, getIcon } from '../../utils';
import joinClass from '../../utils/join-class';

import './Icon.scss';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly icon: React.ReactNode | TIcon;
  readonly size?: string | number;
  readonly color?: TColors;
}

export default function Icon({
  icon,
  size,
  color,
  className,
  ...props
}: IconProps) {
  const classNameList = joinClass(
    ['icon', color && `icon__color--${color}`, className].filter(Boolean),
  );
  const ariaLabel = typeof icon === 'string' ? icon : undefined;

  const currentIcon =
    typeof icon === 'string' ? getIcon(icon as TIcon, size, color) : icon;

  return (
    <span {...props} className={classNameList} aria-label={ariaLabel}>
      {currentIcon}
    </span>
  );
}
