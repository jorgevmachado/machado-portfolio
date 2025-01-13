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
  readonly width?: string;
  readonly radius?: TRadius;
  readonly height?: string;
  readonly freeWidth?: string;
  readonly freeHeight?: string;
}

export default function Skeleton({
  width = '40',
  radius = 'none',
  height = '40',
  freeWidth,
  freeHeight,
  ...props
}: SkeletonProps) {
  const classList = joinClass([`skeleton__radius--${radius}`, props.className]);
  return (
    <div
      {...props}
      style={{ width: freeWidth, height: freeHeight }}
      className="skeleton"
      data-testid="skeleton"
    >
      <div
        style={{
          width: freeWidth || `${width}px`,
          height: freeHeight || `${height}px`,
        }}
        className={classList}
      ></div>
    </div>
  );
}
