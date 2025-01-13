import React, { useEffect, useState } from 'react';

import { Style } from '../interface';

interface FadeProps {
  enter?: boolean;
  delay?: number;
  timeout?: number;
  children: React.ReactNode;
}

const styledShow = (timeout: number): Style => ({
  opacity: 1,
  transition: `all ${timeout}s ease-in-out`,
});

const styledHide = (timeout: number): Style => ({
  opacity: 0,
  transition: `all ${timeout}s ease-in-out`,
});

export default function Fade({
  enter = true,
  delay = 0,
  timeout = 0.2,
  children,
}: FadeProps) {
  const [style, setStyle] = useState<Style>(styledHide(timeout));

  useEffect(() => {
    setTimeout(() => {
      setStyle(enter ? styledShow(timeout) : styledHide(timeout));
    }, delay);
  }, [enter]);

  return <div style={style}>{children}</div>;
}
