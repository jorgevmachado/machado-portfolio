import { CSSProperties } from 'react';

export const STYLE_ALERT: CSSProperties = {
  position: 'fixed',
  top: 15,
  right: 0,
  zIndex: 50,
};

export const STYLE_MOBILE: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export const STYLE_DESKTOP: CSSProperties = {
  right: 15,
};
