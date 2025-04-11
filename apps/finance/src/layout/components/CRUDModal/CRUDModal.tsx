import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Button from '@repo/ds/components/button/Button';

import './CRUDModal.scss';

type CRUDModalPropsActionsButton = {
  label?: string;
  onClick: () => void;
};

type CRUDModalPropsActions = {
  error: CRUDModalPropsActionsButton;
  success: CRUDModalPropsActionsButton;
};

type CRUDModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  title: string;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
  onClose?: () => void;
  actions?: CRUDModalPropsActions;
  children: React.ReactNode;
};

const CRUDModal: React.FC<CRUDModalProps> = ({
  isOpen,
  title,
  width,
  onClose,
  actions,
  children,
  maxWidth = '400px',
  maxHeight = '80vh',
  className,
  ...props
}) => {
  const style = {
    width: width ?? undefined,
    maxWidth: width ?? maxWidth,
    maxHeight,
  };
  return isOpen ? (
    <div
      className={joinClass(['crud-modal', className && className])}
      {...props}
    >
      <div className="crud-modal__content" style={style}>
        {onClose && (
          <button
            aria-label="Close"
            className="crud-modal__content--close"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        <h2>{title}</h2>
        {children}
        {actions && (
          <div className="crud-modal__content--actions">
            <Button
              context="success"
              onClick={actions.success && actions.success.onClick}
            >
              {(actions.success && actions.success.label) ?? 'Save'}
            </Button>
            <Button
              context="error"
              appearance="outline"
              onClick={actions.error && actions.error.onClick}
            >
              {(actions.error && actions.error.label) ?? 'Cancel'}
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default CRUDModal;