import React from 'react';

import useGenerateComponentId from '../../hooks/use-generate-component-id';

import Feedback from '../feedback';

import Label from '../label';

import './Select.scss';


type Option = {
  value: string | number;
  label: string;
};

interface SelectProps {
  id?: string;
  tip?: string;
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
  tip,
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
  const labelId = `${componentId}-label`;
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={`select ${inline ? 'select--inline' : ''} ${disabled ? 'select--disabled' : ''}`}
    >
      {label && (
       <Label
           id={labelId}
           tip={tip}
           label={label}
           color={isInvalid ? 'error-80' : 'neutral-90'}
           className="select__label"
           componentId={componentId}
        />
      )}
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