import React from 'react';

import type { TContext, TIcon, TIconPosition } from '../../../utils';

import { Icon, Spinner } from '../../../elements';

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

export default function ButtonContent({
  icon,
  context,
  loading,
  children,
  iconSize,
  iconPosition,
  loadingContext,
  iconClassNameList,
  notificationCounter,
  notificationCounterClassNameList,
}: ButtonContentProps) {
  return (
    <div className="button__content">
      {icon && iconPosition === 'left' && (
        <Icon icon={icon} size={iconSize} className={iconClassNameList} />
      )}
      <>
        <div>{children}</div>
        {notificationCounter && (
          <div className="button__content--notification">
            <div className={notificationCounterClassNameList}>
              {notificationCounter > 9 ? '9+' : notificationCounter}
            </div>
          </div>
        )}
      </>
      {icon && iconPosition === 'right' && (
        <Icon icon={icon} size={iconSize} className={iconClassNameList} />
      )}
      {loading && (
        <Spinner
          size={16}
          context={loadingContext ?? context}
          className="button__loading"
        />
      )}
    </div>
  );
}
