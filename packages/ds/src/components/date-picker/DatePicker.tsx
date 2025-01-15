import React, { useEffect, useState } from 'react';

import DatePickerComponent from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../utils/use-generate-component-id';

import Feedback from '../feedback';
import Label from '../label';

import { DatePickerProps } from './interface';
import register from './Locale';

import './DatePicker.scss';

export default function DatePicker({
  id,
  tip,
  name,
  open,
  value,
  label,
  locale = 'enUS',
  onChange,
  showTime,
  isInvalid,
  dateFormat,
  invalidMessage,
}: DatePickerProps) {
  const generated = useGenerateComponentId('date-picker-');
  const componentId = id ?? generated;

  const [currentDate, setCurrentDate] = useState<Date | null>(
    value ? new Date(value) : new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setCurrentDate(date);
    onChange?.(date?.toISOString());
  };

  const labelClassNameList = joinClass([
    'date-picker__label',
    `${isInvalid ? 'date-picker__label--invalid' : ''}`,
  ]);

  useEffect(() => {
    register(locale);
  }, []);

  return (
    <div className="date-picker">
      {label && (
        <Label
          tip={tip}
          label={label}
          className={labelClassNameList}
          componentId={componentId}
        />
      )}
      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-expect-error*/}
      <DatePickerComponent
        open={open}
        selected={currentDate}
        onChange={(value) => handleDateChange(value)}
        showTimeSelect={showTime}
        dateFormat={dateFormat}
        locale={locale}
      />
      <input
        id={id}
        name={name}
        value={currentDate?.toString()}
        style={{ display: 'none' }}
        readOnly={true}
      />
      {isInvalid && invalidMessage && (
        <Feedback context="error">{invalidMessage}</Feedback>
      )}
    </div>
  );
}
