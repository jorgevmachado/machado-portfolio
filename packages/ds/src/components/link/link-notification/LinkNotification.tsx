import React from 'react';

import { joinClass } from '../../../utils';

import type { LinkProps } from '../interface';

interface LinkNotificationProps {
  color?: LinkProps['notificationColor'];
  context: LinkProps['context'];
  counter?: LinkProps['notificationCounter'];
  className?: LinkProps['notificationClassName'];
  backgroundColor?: LinkProps['notificationBackgroundColor'];
}
export default function LinkNotification({
  color,
  context,
  counter,
  className,
  backgroundColor,
}: LinkNotificationProps) {
  const classNameList = joinClass([
    'link__content--notification-counter',
    color ? `ds-color-${color}` : 'ds-color-white',
    backgroundColor ? `ds-bg-${backgroundColor}` : `ds-bg-${context}-80`,
    className,
  ]);

  return (
    counter && (
      <div className="link__content--notification">
        <div className={classNameList}>{counter > 9 ? '9+' : counter}</div>
      </div>
    )
  );
}
