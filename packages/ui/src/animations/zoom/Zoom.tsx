import React, { CSSProperties, useCallback, useEffect, useState } from 'react';

interface ZoomProps {
  enter: boolean;
  style?: React.HTMLAttributes<HTMLDivElement>['style'];
  delay?: number;
  timeout?: number;
  children?: React.ReactNode;
  transitionType?: string;
}

export default function Zoom({
  enter,
  style = {},
  delay = 0,
  timeout = 0.2,
  children = null,
  transitionType = 'all',
}: ZoomProps) {
  const getStyled = useCallback(
    (scale: number): CSSProperties => ({
      transform: `scale(${scale})`,
      transition: `${transitionType} ${timeout}s cubic-bezier(1, 0.01, 0, 0.99)`,
    }),
    [timeout, transitionType],
  );

  const [zoomStyle, setZoomStyle] = useState<CSSProperties>(getStyled(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomStyle(getStyled(enter ? 1 : 0));
    }, delay);
    return () => clearTimeout(timer);
  }, [enter, delay, getStyled]);

  return (
    <div
      style={{ ...zoomStyle, ...style, width: 'fit-content' }}
      aria-hidden={!enter}
    >
      {children}
    </div>
  );
}
