import React, { CSSProperties, useCallback, useEffect, useState } from 'react';

import type { Direction } from '../interface';

export interface SlideProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  enter?: boolean;
  delay?: number;
  timeout?: number;
  children?: React.ReactNode;
  direction?: Direction;
  transitionType?: string;
}

export default function Slide({
  enter = true,
  delay = 50,
  timeout = 0.2,
  children = null,
  direction = 'right',
  transitionType = 'all',
  ...props
}: SlideProps) {
  const styledHide = useCallback(
    (
      timeout: number,
      direction: Direction,
      transitionType: string,
    ): CSSProperties => {
      const translate = {
        top: 'translateY(-10px)',
        left: 'translateX(-10px)',
        right: 'translateX(10px)',
        bottom: 'translateY(10px)',
      };

      return {
        opacity: 0,
        transform: translate[direction],
        transition: `${transitionType} ${timeout}s ease-in-out`,
      };
    },
    [],
  );

  const styledShow = useCallback(
    (timeout: number, transitionType: string): CSSProperties => ({
      opacity: 1,
      transform: '',
      transition: `${transitionType} ${timeout}s ease-in-out`,
    }),
    [],
  );

  const [animationStyle, setAnimationStyle] = useState<CSSProperties>(
    styledHide(timeout, direction, transitionType),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStyle(
        enter
          ? styledShow(timeout, transitionType)
          : styledHide(timeout, direction, transitionType),
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [enter, delay, timeout, transitionType, direction]);

  return (
    <div style={animationStyle} {...props}>
      {children}
    </div>
  );
}
