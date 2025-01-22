import React from 'react';

import joinClass from '../../utils/join-class';

import './Skeleton.scss';

export type TRadius =
  | 'none'
  | 'small'
  | 'regular'
  | 'large'
  | 'rounded'
  | 'circle';

export const ORadius: Array<TRadius> = [
  'none',
  'small',
  'regular',
  'large',
  'rounded',
  'circle',
];

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly width?: string | number;
  readonly height?: string | number;
  readonly radius?: TRadius;
}

export default function Skeleton({
  width = 80,
  radius = 'none',
  height = 80,
  style,
  ...props
}: SkeletonProps) {
  const classList = joinClass([`skeleton__radius--${radius}`, props.className]);

  const inlineStyles = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      {...props}
      style={inlineStyles}
      className="skeleton"
      data-testid="skeleton"
    >
      <div style={inlineStyles} className={classList}></div>
    </div>
  );
}
