import React, { useEffect, useRef, useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import DatePickerComponent from 'react-datepicker';

import {
  calculateMaxDate,
  parseStartDate,
} from '@repo/services/date/dateUtils';
import { ValidatorMessage } from '@repo/services/validator/interface';

import Input from '@repo/ds/components/input/Input';

import { currentDateLocale, register } from './utils';
import { DatePickerProps } from './interface';

import './DatePicker.scss';

export default function DatePicker({
  id,
  tip,
  name,
  value,
  label,
  minAge,
  locale = 'enUS',
  maxDate,
  minDate,
  validate,
  showTime,
  dateFormat,
  initialDate,
  placeholder,
}: DatePickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [currentDate, setCurrentDate] = useState<Date | null>(
    () =>
      parseStartDate({
        initialDate,
        stringDate: value,
      }) ?? null,
  );

  const [currentValue, setCurrentValue] = useState<string>('');

  const [validateMessage, setValidateMessage] = useState<
    ValidatorMessage | undefined
  >(undefined);

  useEffect(() => {
    register(locale);
    value && validateCurrentValue(currentDate);
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      return;
    }
    setCurrentDate(date);
    validateCurrentValue(date);
  };

  const validateCurrentValue = (date: Date | null) => {
    const input = !date ? '' : currentDateLocale(date, locale);
    const validateMessage = !date ? undefined : validate(date);
    setCurrentValue(input);
    setValidateMessage(validateMessage);
  };

  return (
    <div className="date-picker" ref={ref}>
      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-expect-error*/}
      <DatePickerComponent
        selected={currentDate}
        onChange={(value) => handleDateChange(value)}
        showTimeSelect={showTime}
        dateFormat={dateFormat}
        locale={locale}
        maxDate={calculateMaxDate(maxDate, minAge)}
        minDate={minDate}
        showYearDropdown
        scrollableYearDropdown
        popperClassName="some-custom-class"
        popperPlacement="bottom-start"
        customInput={
          <Input
            id={id}
            type="text"
            tip={tip}
            label={label}
            name={name}
            value={currentValue}
            readOnly={true}
            placeholder={placeholder}
            isInvalid={!validateMessage?.valid}
            invalidMessage={validateMessage?.message}
          />
        }
      />
    </div>
  );
}
