import React from 'react';

import type { TContext, TIcon } from '../../utils';

import joinClass from '../../utils/join-class';

import Icon from '../../elements/icon';

import {
  InclinedLeftPositionLeft,
  InclinedLeftPositionRight,
  InclinedRightPositionLeft,
  InclinedRightPositionRight,
} from './inclined-assets';

import './Tag.scss';

export type TDirection = 'left' | 'right';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode | TIcon;
  detail?: TDirection;
  context?: TContext;
  iconSide?: TDirection;
  inclined?: TDirection;
  wideIcon?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function Tag({
  icon,
  detail,
  context = 'neutral',
  iconSide,
  inclined,
  wideIcon,
  children,
  fullWidth,
  className,
  ...props
}: TagProps) {
  const classList = joinClass([
    'tag',
    `${context ? `tag__context-${context}` : ''}`,
    `${detail && !inclined ? `tag__detail--${detail}` : ''}`,
    `${inclined ? `tag__inclined--${inclined}` : ''}`,
    `${inclined ? 'tag__inclined' : ''}`,
    `${fullWidth ? 'tag__full-width' : ''}`,
    `${iconSide ? `tag__icon--side-${iconSide}` : ''}`,
    `${wideIcon ? 'tag__wide-icon' : ''}`,
    `${className ? className : ''}`,
  ]);

  return (
    <div className={classList} {...props}>
      {inclined === 'right' && (
        <div className="color-path tag__incline--right-position__left">
          <InclinedRightPositionLeft />
        </div>
      )}

      {inclined === 'left' && (
        <div className="color-path tag__incline--left-position__left">
          <InclinedLeftPositionLeft />
        </div>
      )}

      <div className="tag__content">
        {icon && <Icon className="tag__icon" icon={icon} />}
        {children}
      </div>

      {inclined === 'right' && (
        <div className="color-path tag__incline--right-position__right">
          <InclinedRightPositionRight />
        </div>
      )}

      {inclined === 'left' && (
        <div className="color-path tag__incline--left-position__right">
          <InclinedLeftPositionRight />
        </div>
      )}
    </div>
  );
}
