import React from 'react';
import type { TIcon } from '../../elements';
import ReactDatePicker from 'react-datepicker';

type ReactDatePickerProps = React.ComponentProps<typeof ReactDatePicker>;

export type OnChangeParams = {
  date?: Date;
  dates?: Array<Date>;
  event: React.SyntheticEvent<any, Event>;
}


export type DatePickerProps = Omit<ReactDatePickerProps, 'icon' | 'selected' | 'onChange'> &{
  tip?: string;
  icon?: React.ReactNode | TIcon;
  label?: string;
  onChange: (params: OnChangeParams) => void;
  selected?: Date;
  isInvalid?: boolean;
  placeholder?: string;
  invalidMessage?: string;
};