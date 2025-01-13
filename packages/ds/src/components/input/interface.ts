import React from 'react';

import type { TContext } from '../../utils/colors';

type InputPropsItem = Pick<
  React.HTMLProps<Element>,
  'onBlur' | 'onInput' | 'onFocus' | 'onChange' | 'onKeyDown' | 'onMouseDown'
>;

type HostProps = Omit<React.HTMLProps<HTMLDivElement>, keyof InputPropsItem>;

export interface InputProps extends InputPropsItem, HostProps {
  tip?: string;
  type?: string;
  addon?: string;
  value?: string;
  label?: string;
  variant?: 'regular' | 'large';
  disabled?: boolean;
  multiline?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  dataCyName?: string;
  helperText?: React.ReactNode;
  iconContext?: TContext;
  floatingLabel?: boolean;
  invalidMessage?: string;
  hasFloatingSlots?: boolean;
}
