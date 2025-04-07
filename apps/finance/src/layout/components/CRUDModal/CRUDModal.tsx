import React from 'react';

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

type CRUDModalProps = {
  title: string;
  actions?: CRUDModalPropsActions;
  children: React.ReactNode;
};

const CRUDModal: React.FC<CRUDModalProps> = ({ title, actions, children }) => {
  return (
    <div className="crud-modal">
      <div className="crud-modal__content">
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
  );
};

export default CRUDModal;