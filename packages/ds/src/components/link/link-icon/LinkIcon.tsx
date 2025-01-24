import React from 'react';

import joinClass from '../../../utils/join-class';

import { Icon } from '../../../elements';

import type { LinkProps } from '../interface';

interface LinkIconProps {
  icon: LinkProps['icon'];
  color?: LinkProps['iconColor'];
  position?: LinkProps['iconPosition'];
  className?: LinkProps['iconClassName'];
}
export default function LinkIcon({
  icon,
  color,
  position = 'left',
  className,
}: LinkIconProps) {
  const classNameList = joinClass([
    `link__icon--position-${position}`,
    color && `ds-color-${color}`,
    className,
  ]);

  return <Icon icon={icon} className={classNameList} />;
}
