import React from 'react';
import './Select.scss'; // Arquivo para estilização

type Option = {
  value: string | number;
  label: string;
};

interface SelectProps {
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
  value,
  label,
  inline,
  options,
  onChange,
  disabled = false,
  isInvalid = false,
  placeholder = 'Select...',
  invalidMessage,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={`select-container ${disabled ? 'select-disabled' : ''} ${inline ? 'select-inline' : ''}`}
    >
      {label && <label className="select-label">{label}</label>}
      <select
        value={value}
        onChange={handleChange}
        className={`select-dropdown ${isInvalid ? 'select-dropdown--invalid' : ''}`}
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
          <p className="select-error-message">{invalidMessage}</p>
      )}
    </div>
  );
};

export default Select;