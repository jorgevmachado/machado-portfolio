import React, { CSSProperties, useEffect, useState } from 'react';

interface FadeProps {
  enter?: boolean;
  delay?: number;
  timeout?: number;
  children?: React.ReactNode;
  transitionType?: string;
}

const styledShow = (
  timeout: number,
  transitionType: string,
): CSSProperties => ({
  opacity: 1,
  transition: `${transitionType} ${timeout}s ease-in-out`,
});

const styledHide = (
  timeout: number,
  transitionType: string,
): CSSProperties => ({
  opacity: 0,
  transition: `${transitionType} ${timeout}s ease-in-out`,
});

export default function Fade({
  enter = true,
  delay = 0,
  timeout = 0.2,
  children = null,
  transitionType = 'all',
}: FadeProps) {
  const [style, setStyle] = useState<CSSProperties>(
    styledHide(timeout, transitionType),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setStyle(
        enter
          ? styledShow(timeout, transitionType)
          : styledHide(timeout, transitionType),
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [enter, delay, timeout]);

  return <div style={style}>{children}</div>;
}
