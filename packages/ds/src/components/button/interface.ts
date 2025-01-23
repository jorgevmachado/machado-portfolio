import React from 'react';

import type {
  TColors,
  TContext,
  TIcon,
  TIconPosition,
  TSimplySIze,
  TWeight,
} from '../../utils';

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
  children?: React.ReactNode;
  disabled?: boolean;
  iconSize?: string | number;
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

export interface ButtonContentProps {
  icon?: React.ReactNode | TIcon;
  context: TContext;
  loading: boolean;
  children?: React.ReactNode;
  iconSize: string | number;
  iconPosition: TIconPosition;
  loadingContext: TContext;
  iconClassNameList: string;
  notificationCounter?: number;
  notificationCounterClassNameList: string;
}
