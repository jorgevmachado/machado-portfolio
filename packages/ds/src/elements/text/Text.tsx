import React from 'react';

import { isObject } from '@repo/services';

import joinClass from '../../utils/join-class';

import { formattedText, isReactNode } from './config';

import type { TextProps } from './interface';

import './Text.scss';

export default function Text({
  tag = 'p',
  color = 'neutral-90',
  weight = 'normal',
  variant = 'regular',
  htmlFor,
  children,
  className,
  ...props
}: TextProps) {
  const CustomTag = tag as React.ElementType;

  const text =
    isReactNode(children) || isObject(children)
      ? undefined
      : formattedText(children as string);

  return (
    <CustomTag
      className={joinClass([
        'text',
        `ds-color-${color}`,
        `text__variant--${variant}`,
        `text__weight--${weight}`,
        className,
      ])}
      htmlFor={htmlFor}
      {...props}
    >
      {!text ? children : text}
    </CustomTag>
  );
}
