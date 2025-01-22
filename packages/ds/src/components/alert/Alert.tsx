import React, { useCallback } from 'react';

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
  const classNameList = joinClass(
    [
      'alert',
      type && `alert__type--${type}`,
      hasCloseButton && 'alert__borderless',
    ].filter(Boolean),
  );

  const ariaLive =
    type === 'error' || type === 'warning' ? 'assertive' : 'polite';

  const handleLinkClick = useCallback(() => {
    if (link?.clickAction) link.clickAction();
  }, [link]);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  return (
    <div {...props} role="alert" aria-live={ariaLive} className={classNameList}>
      <Icon icon={type} className="alert__icon--title" />
      <div className="alert__content">
        {children}
        {link && (
          <span
            role="button"
            tabIndex={0}
            onClick={handleLinkClick}
            className="alert__content--link"
            onKeyDown={(e) => e.key === 'Enter' && link.clickAction()}
          >
            {link.text}
          </span>
        )}
      </div>
      {hasCloseButton && (
        <Icon
          icon="close"
          className="alert__icon--close"
          onClick={handleClose}
        />
      )}
    </div>
  );
}
