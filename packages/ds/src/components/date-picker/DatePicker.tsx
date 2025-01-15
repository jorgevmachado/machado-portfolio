import React, { useEffect, useState } from 'react';

import DatePickerComponent from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Feedback from '../feedback';

import { DatePickerProps } from './interface';
import register from './Locale';

import './DatePicker.scss';

export default function DatePicker({
  id,
  name,
  open,
  value,
  locale = 'enUS',
  onChange,
  showTime,
  isInvalid,
  dateFormat,
  invalidMessage,
}: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(
    value ? new Date(value) : new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setCurrentDate(date);
    onChange?.(date?.toISOString());
  };

  useEffect(() => {
    register(locale);
  }, []);

  return (
    <div className="date-picker">
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
