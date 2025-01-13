import React, { useState } from 'react';

import { TContext } from '../../utils/colors';
import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../utils/use-generate-component-id';

import Icon from '../../elements/icon';
import Text from '../../elements/text';

import './Radio.scss';

export interface RadioProps extends React.HTMLProps<HTMLLabelElement> {
  value: string | number;
  error?: boolean;
  large?: boolean;
  context?: Omit<TContext, 'error'>;
  children: React.ReactNode;
  disabled?: boolean;
  modelValue?: string | number;
  dataTestId?: string;
  onItemClick?: (model: number | string) => void;
}

export default function Radio({
  value,
  error,
  large,
  context = 'primary',
  children,
  disabled,
  modelValue,
  dataTestId,
  onItemClick,
  ...props
}: RadioProps) {
  const [isFocused, setIsFocused] = useState(false);
  const componentId = useGenerateComponentId('radio-');

  const variant = large ? 'large' : 'regular';

  const shouldBeChecked = () => {
    return modelValue === value;
  };

  const handleChange = () => {
    setIsFocused(true);
    onItemClick && onItemClick(value);
  };

  const classNameList = joinClass([
    'radio',
    `radio__context--${context}`,
    `${error ? 'radio__error' : ''}`,
    `${disabled ? 'radio__disabled' : ''}`,
    `${isFocused ? 'radio__focused' : ''}`,
    `radio__variant--${variant}`,
    `${shouldBeChecked() ? 'radio__checked' : ''}`,
  ]);
  return (
    <label
      role="radioButton"
      onClick={handleChange}
      aria-label="radio button"
      className={classNameList}
      data-testid={dataTestId}
      {...props}
    >
      <div className="radio__wrapper">
        <input
          id={componentId}
          type="radio"
          name={props.name}
          value={value}
          onBlur={() => setIsFocused(false)}
          checked={shouldBeChecked()}
          disabled={disabled}
          tabIndex={0}
          onChange={handleChange}
          className="radio__wrapper--input"
          aria-checked={shouldBeChecked()}
          data-destid={`${dataTestId}-radio-input`}
        />
        <Icon icon="check" size="0.8rem" className="radio__wrapper--icon" />
      </div>
      <Text tag="label" htmlFor={componentId} className="radio__label">
        {children}
      </Text>
    </label>
  );
}
