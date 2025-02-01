import React, { useEffect } from 'react';

import { AlertProps } from '@repo/ds/components/alert/Alert';

import Alert from './alert';

export type Elem = (props: AlertProps) => React.JSX.Element;

interface AlertComponentProps {
  elem: Elem;
  alert: Alert;
  onRemove: (alert: Alert) => void;
}

export default function AlertComponent({
  elem,
  alert,
  onRemove,
}: AlertComponentProps) {
  useEffect(() => {
    setTimeout(() => {
      onRemove(alert);
    }, alert.delay);
  }, []);

  return elem({
    type: alert.type,
    onClose: () => onRemove(alert),
    children: alert.message as string,
    hasCloseButton: true,
  });
}
