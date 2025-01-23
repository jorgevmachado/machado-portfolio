import React from 'react';

import { Icon, Spinner } from '../../../elements';

import type { ButtonContentProps } from '../interface';

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
