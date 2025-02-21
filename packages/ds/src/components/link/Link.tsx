import React from 'react';

import joinClass from '../../utils/join-class';

import type { LinkProps } from './interface';

import LinkIcon from './link-icon';

import LinkNotification from './link-notification';

import './Link.scss';

export default function Link({
  icon,
  size = 'medium',
  weight = 'normal',
  context = 'neutral',
  children,
  iconColor,
  iconGroup,
  className,
  iconPosition = 'left',
  iconClassName,
  notificationColor,
  notificationCounter,
  notificationClassName,
  notificationBackgroundColor,
  ...props
}: LinkProps) {
  const classNameList = joinClass([
    'link',
    `link__context--${context}`,
    `link__size--${size}`,
    `link__weight--${weight}`,
    className,
  ]);

  const iconClassNameList = joinClass([
    `link__icon--position-${iconPosition}`,
    iconColor && `ds-color-${iconColor}`,
    iconClassName,
  ]);

  return (
    <a className={classNameList} {...props}>
      <div className="link__content">
        {icon && iconPosition === 'left' && (
          <LinkIcon
            icon={icon}
            group={iconGroup}
            color={iconColor}
            position="left"
            className={iconClassNameList}
          />
        )}
        <>
          <div>{children}</div>
          <LinkNotification
            color={notificationColor}
            context={context}
            counter={notificationCounter}
            className={notificationClassName}
            backgroundColor={notificationBackgroundColor}
          />
        </>
        {icon && iconPosition === 'right' && (
          <LinkIcon
            icon={icon}
            group={iconGroup}
            color={iconColor}
            position="right"
            className={iconClassNameList}
          />
        )}
      </div>
    </a>
  );
}
