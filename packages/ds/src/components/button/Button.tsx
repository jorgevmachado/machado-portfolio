import React, { useEffect } from 'react';

import joinClass from '../../utils/join-class';

import { Icon } from '../../elements';

import type { ButtonProps } from './interface';

import ButtonContent from './button-content';

import './Button.scss';

export default function Button({
  icon,
  size = 'medium',
  fluid,
  focus = false,
  weight = 'normal',
  loading = false,
  rounded,
  context = 'neutral',
  children,
  disabled,
  iconSize = '1em',
  className = '',
  appearance = 'standard',
  noIconBorder,
  iconPosition = 'left',
  iconClassName,
  loadingContext = 'neutral',
  notificationColor,
  notificationCounter,
  notificationClassName = '',
  notificationBackgroundColor,
  ...props
}: ButtonProps) {
  const hasLabel = Boolean(children);

  const isAppearanceIconButton = appearance === 'icon';

  useEffect(() => {
    if (!hasLabel && !props['aria-label']) {
      console.warn('You must define the aria-label if the button has no label');
    }
  }, [hasLabel, props['aria-label']]);

  const classNameList = joinClass([
    'button',
    size && `button__size--${size}`,
    fluid && 'button__fluid',
    focus && 'button__focus',
    weight && `button__weight--${weight}`,
    rounded && 'button__rounded',
    context && `button__context--${context}`,
    !hasLabel && 'button__no-label',
    isAppearanceIconButton && noIconBorder
      ? 'button__appearance--no-icon-border'
      : `button__appearance--${appearance}`,
    className,
  ]);

  const iconClassNameList = joinClass([
    `${!isAppearanceIconButton ? `button__icon--position-${iconPosition}` : ''}`,
    `${iconClassName ?? ''}`,
  ]);

  const notificationCounterClassNameList = joinClass([
    'button__content--notification-counter',
    `${notificationColor ? `ds-color-${notificationColor}` : 'ds-color-white'} `,
    `${notificationBackgroundColor ? `ds-bg-${notificationBackgroundColor}` : 'ds-bg-error-80'} `,
    notificationClassName,
  ]);

  return (
    <button
      {...props}
      role={appearance === 'icon' ? 'button' : undefined}
      disabled={disabled || loading}
      className={classNameList}
      aria-busy={loading ? 'true' : undefined}
      aria-disabled={disabled || loading ? 'true' : undefined}
    >
      {isAppearanceIconButton ? (
        <Icon icon={icon || 'react'} className={iconClassNameList} />
      ) : (
        <ButtonContent
          icon={icon}
          context={context}
          loading={loading}
          children={children}
          iconSize={iconSize}
          iconPosition={iconPosition}
          loadingContext={loadingContext}
          iconClassNameList={iconClassNameList}
          notificationCounter={notificationCounter}
          notificationCounterClassNameList={notificationCounterClassNameList}
        />
      )}
    </button>
  );
}
