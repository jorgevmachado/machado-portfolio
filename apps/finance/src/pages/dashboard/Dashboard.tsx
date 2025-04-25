import React, { useState } from 'react';
import DatePicker from '@repo/ds/components/date-picker/DatePicker';

export default function Dashboard() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleOnChange = (date?: Date, dates?: Array<Date>) => {
    if (date) {
      setStartDate(date);
      return;
    }
    const [start, end] = dates || [];
    setStartDate(start);
    setEndDate(end);
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ gap: '2rem', display: 'flex', flexDirection: 'column' }}>
        <DatePicker
          id="default"
          label="Default"
          selected={startDate}
          onChange={({ date, dates }) => handleOnChange(date, dates)}
          onCalendarOpen={() => console.log('Calendar opened')}
          onCalendarClose={() => console.log('Calendar closed')}
        />
        <DatePicker
          id="with-calendar-icon"
          label="With Calendar Icon"
          showIcon
          selected={startDate}
          onChange={({ date }) => handleOnChange(date)}
        />
        <DatePicker
          id="with-custom-icon"
          icon="calendar"
          label="With Custom Icon"
          showIcon
          selected={startDate}
          onChange={({ date }) => handleOnChange(date)}
        />
        <DatePicker
          id="with-children"
          label="With Children"
          selected={startDate}
          onChange={({ date }) => handleOnChange(date)}
        >
          <div style={{ color: "red" }}>Don't forget to check the weather!</div>
        </DatePicker>
        <DatePicker
          id="clear-date-picker"
          label="Clear Date Picker"
          selected={startDate}
          onChange={({ date }) => handleOnChange(date)}
          isClearable
        />
        <DatePicker
          id="close-on-scroll"
          label="Close On Scrollr"
          selected={startDate}
          onChange={({ date }) => handleOnChange(date)}
          closeOnScroll={(e) => e.target === document}
        />
        <DatePicker
          id="months-show"
          label="Months Show"
          selected={startDate}
          monthsShown={2}
          onChange={({ date }) => handleOnChange(date)}
        />
        <DatePicker
          id="show-quarter-year-picker"
          label="Show Quarter Year Picker"
          selected={startDate}
          dateFormat="yyyy, QQQ"
          showQuarterYearPicker
          onChange={({ date }) => handleOnChange(date)}
        />
        <DatePicker
          id="show-year-picker"
          label="Show Year Picker"
          selected={startDate}
          dateFormat="yyyy"
          showYearPicker
          onChange={({ date }) => handleOnChange(date)}
        />
        <DatePicker
          id="show-time-select"
          label="Show Time Select"
          selected={startDate}
          showTimeSelect
          onChange={({ date }) => handleOnChange(date)}
        />
        <DatePicker
          id="range-picker"
          label="Show Range Picker"
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          onChange={({ dates }) => handleOnChange(undefined, dates)}
        />
      </div>
    </div>
  );
}
