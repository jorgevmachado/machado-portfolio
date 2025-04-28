import React from 'react';

import type { TColors, TContext } from '../../utils';

export type ModalProps =  React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  isOpen: boolean;
  width?: string;
  context?: TContext;
  onClose(): void;
  children: React.ReactNode;
  maxHeight?: string;
  closeOnEsc?: boolean;
  backDropColor?: TColors;
  customCloseIcon?: React.ReactElement;
  closeOnOutsideClick?: boolean;
  removeBackgroundScroll?: boolean;
}

export type UseModalProps = Omit<ModalProps,  'isOpen' |'onClose' | 'children'> & {
    body: React.ReactNode;
}