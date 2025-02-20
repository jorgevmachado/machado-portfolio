import React, { useMemo, useState } from 'react';

import { Slide } from '../../animations';

import useResize from '../resize';

import AlertComponent, { Elem } from './AlertComponent';
import AlertContext, { AlertContextProps } from './AlertContext';

import { STYLE_ALERT, STYLE_DESKTOP, STYLE_MOBILE } from './styles';
import useAlertState from './useAlertState';

interface AlertProviderProps {
  elem: Elem;
  children: React.ReactNode;
}

export default function AlertProvider({ elem, children }: AlertProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { alerts, addAlert, removeAlert } = useAlertState();

  const STYLE = {
    ...STYLE_ALERT,
    ...(isMobile ? STYLE_MOBILE : STYLE_DESKTOP),
  };

  const DIRECTION = isMobile ? 'top' : 'right';

  const context: AlertContextProps = useMemo(
    () => ({
      alerts,
      add: (alert) => {
        addAlert(alert);
      },
    }),
    [alerts, addAlert],
  );

  if (typeof window !== 'undefined') {
    useResize(
      {
        onMobile: () => setIsMobile(true),
        onTablet: () => setIsMobile(true),
        onDesktop: () => setIsMobile(false),
        onWidescreen: () => setIsMobile(false),
        onFullHD: () => setIsMobile(false),
      },
      [setIsMobile],
    );
  }

  return (
    <AlertContext.Provider value={context}>
      <div style={STYLE}>
        {alerts.map((alert) => (
          <div key={alert.id} style={{ marginBottom: 15 }}>
            <Slide direction={DIRECTION} enter={alert.visible}>
              <AlertComponent
                elem={elem}
                alert={alert}
                onRemove={removeAlert}
              />
            </Slide>
          </div>
        ))}
      </div>
      {children}
    </AlertContext.Provider>
  );
}
