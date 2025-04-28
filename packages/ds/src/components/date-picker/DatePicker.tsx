'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import useGenerateComponentId from '../../hooks/use-generate-component-id';

import { Icon } from '../../elements';

import Label from '../label';
import Feedback from '../feedback';

import { joinClass } from '../../utils';

import { DatePickerProps, OnChangeParams } from './types';

import './DatePicker.scss';

const ReactDatePicker = dynamic<any>(
  async () => {
    await import('react-datepicker/dist/react-datepicker.css');
    return import('react-datepicker') as any;
  },
  { ssr: false },
);

const DatePicker = ({
  id,
  tip,
  icon,
  label,
  inline,
  children,
  onChange,
  selected,
  isInvalid = false,
  placeholder,
  invalidMessage,
  ...props
}: DatePickerProps) => {
  const [currentSelectedDate, setCurrentSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if(selected) {
      setCurrentSelectedDate(selected)
    }
  }, [selected]);

  const componentId = id ?? useGenerateComponentId('date-picker-');
  const labelId = componentId ? `${componentId}-label` : undefined;
  const feedbackId = componentId ? `${componentId}-feedback` : undefined;

  const classNameList = joinClass([
    'date-picker__container',
    inline && 'date-picker__container--inline',
  ]);



  return (
    <div className={classNameList}>
      {label && (
        <Label
          id={labelId}
          tip={tip}
          color={isInvalid ? 'error-80' : 'neutral-90'}
          label={label}
          className="date-picker__label"
          componentId={componentId}
        />
      )}
      <ReactDatePicker
        {...props}
        icon={icon && <Icon icon={icon} className="date-picker__icon" />}
        inline={inline}
        onChange={(value: any, event: any) => {
          const result: OnChangeParams = {
            event,
            date: undefined,
            dates: undefined,
          };
          if(value) {
            const isArray = Array.isArray(value);
            result.dates = isArray ? value : undefined;
            result.date = isArray ? undefined : value;
          }
          onChange(result)
        }}
        selected={currentSelectedDate}
        className={`date-picker__input ${isInvalid ? 'date-picker__input--error' : ''}`}
        placeholderText={placeholder}
      >
        {children}
      </ReactDatePicker>
      {isInvalid && (
        <Feedback id={feedbackId} context="error">
          {invalidMessage ?? ''}
        </Feedback>
      )}
    </div>
  );
};

export default DatePicker;
