import React, { CSSProperties, useMemo, useState } from 'react';

import { Slide } from '../../animations';

import Alert, { AlertData } from './alert';
import AlertContext, { AlertContextProps } from './AlertContext';

import AlertComponent, { Elem } from './AlertComponent';
import useResize from '../resize';

interface AlertProviderProps {
  elem: Elem;
  children: React.ReactNode;
}

const STYLE_ALERT: CSSProperties = {
  position: 'fixed',
  top: 15,
  right: 0,
  zIndex: 50,
};

const STYLE_MOBILE: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const STYLE_DESKTOP: CSSProperties = {
  right: 15,
};

export default function AlertProvider({ elem, children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Array<Alert>>([]);
  const [isMobile, setIsMobile] = useState(false);

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
    [alerts],
  );

  useResize(
    {
      onMobile: () => setIsMobile(true),
      onTablet: () => setIsMobile(true),
      onDesktop: () => setIsMobile(false),
      onWidescreen: () => setIsMobile(false),
      onFullHD: () => setIsMobile(false),
    },
    [],
  );

  const addAlert = (alert: AlertData) => {
    const build = new Alert(alert);
    setAlerts((prev) => [...prev, build]);
  };

  const removeAlert = (alert: Alert) => {
    setAlerts((prev) =>
      prev.map((al) => {
        if (al.id === alert.id) {
          al.visible = false;
        }
        return al;
      }),
    );
    setTimeout(() => {
      setAlerts((prev) => prev.filter((al) => al.id !== alert.id));
    }, 500);
  };

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
