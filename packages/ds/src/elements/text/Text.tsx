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

  const tagProps = CustomTag === 'label' ? { htmlFor } : {};

  const text =
    isReactNode(children) || isObject(children)
      ? children
      : formattedText(children as string);

  return (
    <CustomTag
      className={joinClass(
        [
          'text',
          `ds-color-${color}`,
          `text__variant--${variant}`,
          `text__weight--${weight}`,
          className,
        ].filter(Boolean),
      )}
      {...props}
      {...tagProps}
    >
      {text || children}
    </CustomTag>
  );
}
