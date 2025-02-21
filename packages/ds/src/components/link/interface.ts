import React from 'react';

import type { TColors, TContext, TSimplySIze, TWeight } from '../../utils';
import type { TIcon, TIconGroup, TIconPosition } from '../../elements';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode | TIcon;
  size?: TSimplySIze;
  weight?: TWeight;
  context?: TContext;
  children: React.ReactNode;
  iconColor?: TColors;
  iconGroup?: TIconGroup;
  iconPosition?: TIconPosition;
  iconClassName?: string;
  notificationColor?: TColors;
  notificationCounter?: number;
  notificationClassName?: string;
  notificationBackgroundColor?: TColors;
}
