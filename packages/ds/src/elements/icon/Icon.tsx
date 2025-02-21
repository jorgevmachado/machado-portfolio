import React from 'react';

import joinClass from '../../utils/join-class';
import type { TColors } from '../../utils';

import type { TIcon, TIconGroup } from './interface';
import { getIcon } from './service';

import './Icon.scss';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly icon: React.ReactNode | TIcon;
  readonly size?: string | number;
  readonly color?: TColors;
  readonly group?: TIconGroup;
}

export default function Icon({
  icon,
  size,
  color,
  group,
  className,
  ...props
}: IconProps) {
  const classNameList = joinClass([
    'icon',
    color && `icon__color--${color}`,
    className,
  ]);
  const ariaLabel = typeof icon === 'string' ? icon : undefined;

  const currentIcon =
    typeof icon === 'string'
      ? getIcon({ name: icon as TIcon, size, color, group })
      : icon;

  return (
    <span {...props} className={classNameList} aria-label={ariaLabel}>
      {currentIcon}
    </span>
  );
}
