import React from 'react';

import joinClass from '../../utils/join-class';

import Icon from '../../elements/icon';

import './Alert.scss';

export type TAlert = 'info' | 'lamp' | 'error' | 'warning' | 'success';

interface LinkProps {
  text: string;
  clickAction: () => void;
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: TAlert;
  link?: LinkProps;
  onClose?: () => void;
  children: React.ReactNode;
  hasCloseButton?: boolean;
}

export default function Alert({
  type,
  link,
  onClose,
  children,
  hasCloseButton,
  ...props
}: AlertProps) {
  const classNameList = joinClass([
    'alert',
    `alert__type--${type}`,
    `${hasCloseButton ? 'alert__borderless' : ''}`,
  ]);
  return (
    <div {...props} className={classNameList}>
      <Icon icon={type} className="alert__icon--title" />
      <div className="alert__content">
        {children}
        {link && (
          <span className="alert__content--link" onClick={link.clickAction}>
            {' '}
            {link.text}{' '}
          </span>
        )}
      </div>
      {hasCloseButton && (
        <Icon icon="close" className="alert__icon--close" onClick={onClose} />
      )}
    </div>
  );
}
