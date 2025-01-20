import React, { useEffect, useState } from 'react';

import type { Direction, Style } from '../interface';

const styledShow = (timeout: number): Style => ({
  opacity: 1,
  transform: '',
  transition: `all ${timeout}s ease-in-out`,
});

const styledHide = (timeout: number, direction: Direction): Style => {
  const translate = {
    top: 'translateY(-10px)',
    left: 'translateX(-10px)',
    right: 'translateX(10px)',
    bottom: 'translateY(10px)',
  };

  return {
    opacity: 0,
    transform: translate[direction],
    transition: `all ${timeout}s ease-in-out`,
  };
};

export interface SlideProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  enter: boolean;
  delay?: number;
  timeout?: number;
  children: React.ReactNode;
  direction?: Direction;
}
export default function Slide({
  enter,
  delay = 50,
  timeout = 0.2,
  children,
  direction = 'right',
  ...props
}: SlideProps) {
  const [style, setStyle] = useState<Style>(styledHide(timeout, direction));

  useEffect(() => {
    setTimeout(() => {
      setStyle(enter ? styledShow(timeout) : styledHide(timeout, direction));
    }, delay);
  }, [enter]);

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
}
