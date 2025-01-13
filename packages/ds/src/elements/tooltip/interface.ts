import React from 'react';
import type { TContext } from '../../utils/colors';

export type TAlign =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  align?: TAlign;
  title?: string;
  content: string;
  context?: TContext;
  children: React.ReactNode;
}
