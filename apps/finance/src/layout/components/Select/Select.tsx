import React from 'react';

import useGenerateComponentId from '@repo/ds/hooks/use-generate-component-id/useGenerateComponentId';
import Feedback from '@repo/ds/components/feedback/Feedback';

import './Select.scss';

type Option = {
  value: string | number;
  label: string;
};

interface SelectProps {
  id?: string;
  value: string | number;
  label?: string;
  inline?: boolean;
  options: Array<Option>;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  invalidMessage?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  value,
  label,
  inline = false,
  options,
  onChange,
  disabled = false,
  isInvalid = false,
  placeholder = 'Select...',
  invalidMessage,
}) => {
  const componentId = id ?? useGenerateComponentId('select-');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={`select ${inline ? 'select--inline' : ''} ${disabled ? 'select--disabled' : ''}`}
    >
      {label && <label className={`select__label ${isInvalid ? 'select__label--invalid' : ''}`}>{label}</label>}
      <select
        value={value}
        onChange={handleChange}
        className={`select__dropdown ${isInvalid ? 'select__dropdown--invalid' : ''}`}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isInvalid && invalidMessage && (
        <Feedback id={`${componentId}-feedback`} context="error">
          {invalidMessage}
        </Feedback>
      )}
    </div>
  );
};

export default Select;