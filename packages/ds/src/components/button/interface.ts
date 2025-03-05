import React from 'react';

import type { TColors, TContext, TSimplySIze, TWeight } from '../../utils';
import { TIcon, TIconGroup, TIconPosition } from '../../elements';

export type TAppearance = 'icon' | 'outline' | 'standard' | 'borderless';

export const OAppearance: Array<TAppearance> = [
  'icon',
  'outline',
  'standard',
  'borderless',
];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode | TIcon;
  size?: TSimplySIze;
  fluid?: boolean;
  focus?: boolean;
  weight?: TWeight;
  loading?: boolean;
  rounded?: boolean;
  context?: TContext;
  selected?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  iconSize?: string | number;
  iconGroup?: TIconGroup;
  appearance?: TAppearance;
  noIconBorder?: boolean;
  iconPosition?: TIconPosition;
  iconClassName?: string;
  loadingContext?: TContext;
  notificationColor?: TColors;
  notificationCounter?: number;
  notificationClassName?: string;
  notificationBackgroundColor?: TColors;
}
