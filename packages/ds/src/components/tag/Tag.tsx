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
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,

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

  const renderInclined = (inclined: TDirection, position: 'left' | 'right') => {
    const inclinedMap = {
      left: {
        left: <InclinedLeftPositionLeft />,
        right: <InclinedLeftPositionRight />,
      },
      right: {
        left: <InclinedRightPositionLeft />,
        right: <InclinedRightPositionRight />,
      },
    };

    return inclinedMap[inclined]?.[position] ?? null;
  };

  return (
    <div
      className={classList}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...props}
    >
      {inclined === 'right' && (
        <div className="color-path tag__incline--right-position__left">
          {renderInclined(inclined, 'left')}
        </div>
      )}

      {inclined === 'left' && (
        <div className="color-path tag__incline--left-position__left">
          {renderInclined(inclined, 'left')}
        </div>
      )}

      <div className="tag__content">
        {icon && <Icon className="tag__icon" icon={icon} />}
        {children}
      </div>

      {inclined === 'right' && (
        <div className="color-path tag__incline--right-position__right">
          {renderInclined(inclined, 'right')}
        </div>
      )}

      {inclined === 'left' && (
        <div className="color-path tag__incline--left-position__right">
          {renderInclined(inclined, 'right')}
        </div>
      )}
    </div>
  );
}
