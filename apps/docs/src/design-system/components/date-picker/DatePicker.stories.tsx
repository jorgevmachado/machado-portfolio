import type { Meta, StoryObj } from '@storybook/react';

import { OIcon } from '@repo/ds/elements/icon/options';
import DatePicker from '@repo/ds/components/date-picker/DatePicker';

import React, { useState } from 'react';

const meta = {
  args: {
    id: 'date-picker-storybook',
    tip: undefined,
    icon: undefined,
    label: 'Date Picker',
    onChange: () => {},
    selected: new Date(),
    isInvalid: false,
    placeholder: 'Select a date',
    invalidMessage: 'Invalid date',
  },
  title: 'Design-System/Components/DatePicker',
  argTypes: {
    id: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'date-picker-storybook' },
      },
      control: { type: 'text' },
    },
    tip: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'date' },
      },
      control: { type: 'text' },
    },
    icon: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'react' },
      },
      options: OIcon,
      control: { type: 'select' },
    },
    label: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Date Picker' },
      },
      control: { type: 'text' },
    },
    selected: {
      table: {
        type: { summary: 'date' },
        defaultValue: { summary: 'new Date()' },
      },
      control: { type: 'date' },
    },
    isInvalid: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    placeholder: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select a date' },
      },
      control: { type: 'text' },
    },
    invalidMessage: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Date Picker is required' },
      },
      control: { type: 'text' },
    },
  },
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

type DatePickerProps = React.ComponentProps<typeof DatePicker>;

const TemplateDatePicker = (args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <DatePicker
      {...args}
      selected={selectedDate}
      onChange={({ date }) => setSelectedDate(date)}
    />
  );
};

export const Default: Story = {
  args: {},
  render: (args) => <TemplateDatePicker {...args} />,
};

export const WithCalendarIcon: Story = {
  args: {
    id: 'with-calendar-icon',
    icon: 'calendar',
    label:'With Calendar Icon',
    showIcon: true,
  },
  render: (args) => <TemplateDatePicker {...args} />,
}

export const WithCustomIcon: Story = {
  args: {
    id: 'with-custom-icon',
    icon: 'react',
    label:'With Custom Icon',
    showIcon: true,
  },
  render: (args) => <TemplateDatePicker {...args} />,
}

export const WithChildren: Story = {
  args: {
    id: 'with-children',
    label:'With Children',
    children: (
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    ),
  },
  render: (args) => <TemplateDatePicker {...args} />,
}

export const ClearDatePicker: Story = {
  args: {
    id: 'clear-date-picker',
    label:'Clear Date Picker',
    isClearable: true,
  },
  render: (args) => <TemplateDatePicker {...args} />,
}

export const MonthsShow: Story = {
  args: {
    id: 'months-show',
    label:'Months Show',
    monthsShown: 2
  },
  render: (args) => <TemplateDatePicker {...args} />,
}

export const ShowQuartierYearPicker: Story = {
  args: {
    id: 'show-quarter-year-picker',
    label:'Show Quarter Year Picker',
    dateFormat:'yyyy, QQQ',
    showQuarterYearPicker: true,
  },
  render: (args) => <TemplateDatePicker {...args} />,
}

export const showYearPicker: Story = {
  args: {
    id: 'show-year-picker',
    label:'Show Year Picker',
    dateFormat:'yyyy',
    showYearPicker: true,
  },
  render: (args) => <TemplateDatePicker {...args} />,
}


export const showTimeSelect: Story = {
  args: {
    id: 'show-time-select',
    label:'Show Time Select',
    showTimeSelect: true,
  },
  render: (args) => <TemplateDatePicker {...args} />,
}

export const rangePicker: Story = {
  args: {
    id: 'range-picker',
    label:'Show Range Picker',
    inline: true,
    selectsRange: true,
  },
  render: (args) => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const handleOnChange = (dates?: Array<Date>) => {
      const [start, end] = dates || [];
      setStartDate(start);
      setEndDate(end);
    }
    return (<DatePicker
      {...args}
      endDate={endDate}
      selected={startDate}
      startDate={startDate}
      onChange={({ dates }) => handleOnChange(dates)}
    />);
  },
}