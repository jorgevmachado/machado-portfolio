import React from 'react';
import { TIcon, TIconPosition } from '../../elements';
import {TColors} from "../../utils";

type InputPropsItem = Pick<
  React.HTMLProps<Element>,
  'onBlur' | 'onInput' | 'onFocus' | 'onChange' | 'onKeyDown' | 'onMouseDown'
>;

type HostProps = Omit<React.HTMLProps<HTMLDivElement>, keyof InputPropsItem>;

export type TInputType = 'text' | 'file' | 'number' | 'email' | 'phone' | 'textarea' | 'password';

export interface InputProps extends InputPropsItem, HostProps {
  tip?: string;
  type?: TInputType;
  icon?: React.ReactNode | TIcon;
  label?: string;
  value?: string;
  addon?: string;
  counter?: string;
  disabled?: boolean;
  iconColor?: TColors;
  isInvalid?: boolean;
  autoFocus?: boolean;
  dataCyName?: string;
  helperText?: React.ReactNode;
  iconPosition?: TIconPosition;
  invalidMessage?: string;
}
