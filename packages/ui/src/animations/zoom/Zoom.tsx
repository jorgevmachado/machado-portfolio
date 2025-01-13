import React, { useEffect, useState } from 'react';

interface ZoomProps {
  enter: boolean;
  delay?: number;
  timeout?: number;
  children: React.ReactNode;
}

type Style = React.HTMLAttributes<HTMLDivElement>['style'];

const styledShow = (timeout: number): Style => ({
  transform: 'scale(1)',
  transition: `all ${timeout}s cubic-bezier(1, 0.01, 0, 0.99)`,
});

const styledHide = (timeout: number): Style => ({
  transform: 'scale(0)',
  transition: `all ${timeout}s cubic-bezier(1, 0.01, 0, 0.99)`,
});

export default function Zoom({
  enter,
  delay = 0,
  timeout = 0.2,
  children,
}: ZoomProps) {
  const [style, setStyle] = useState<Style>(styledHide(timeout));

  useEffect(() => {
    setTimeout(() => {
      setStyle(enter ? styledShow(timeout) : styledHide(timeout));
    }, delay);
  }, [enter]);

  return <div style={{ ...style, width: 'fit-content' }}>{children}</div>;
}
