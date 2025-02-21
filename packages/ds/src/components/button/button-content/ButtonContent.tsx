import React from 'react';

import type { TContext } from '../../../utils';

import {
  Icon,
  Spinner,
  type TIcon, TIconGroup,
  type TIconPosition,
} from '../../../elements';

export interface ButtonContentProps {
  icon?: React.ReactNode | TIcon;
  context: TContext;
  loading: boolean;
  iconSize: string | number;
  children?: React.ReactNode;
  iconGroup?: TIconGroup;
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
  iconSize,
  children,
  iconGroup,
  iconPosition,
  loadingContext,
  iconClassNameList,
  notificationCounter,
  notificationCounterClassNameList,
}: ButtonContentProps) {
  return (
    <div className="button__content">
      {icon && iconPosition === 'left' && (
        <Icon icon={icon} size={iconSize} group={iconGroup} className={iconClassNameList} />
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
        <Icon icon={icon} size={iconSize} group={iconGroup} className={iconClassNameList} />
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
