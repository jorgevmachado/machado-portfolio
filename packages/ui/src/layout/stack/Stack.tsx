import React, { JSX } from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import './Stack.scss';

type Tag = keyof JSX.IntrinsicElements;
type Spacing = 'small' | 'medium' | 'large';
type Orientation = 'row' | 'column';

interface StackProps extends React.HTMLAttributes<HTMLElement | SVGElement> {
  tag?: Tag;
  spacing?: Spacing;
  children: React.ReactNode;
  orientation?: Orientation;
}
export default function Stack({
  tag = 'div',
  spacing = 'large',
  children,
  orientation = 'column',
  ...props
}: Readonly<StackProps>) {
  const CustomTag = tag;
  const classNameList = joinClass([
    'stack',
    spacing,
    orientation,
    props.className,
  ]);

  return (
    <CustomTag
      {...props}
      role={props.role || 'group'}
      className={classNameList}
    >
      {children}
    </CustomTag>
  );
}