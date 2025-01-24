import React from 'react';

import type { TContext } from '../../utils';
import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../hooks/use-generate-component-id';

import Button from '../button';
import Feedback from '../feedback';
import Label from '../label';

import './RadioGroup.scss';

export type TAppearance = 'standard' | 'range';

export interface OptionsProps {
  label: string | number;
  value: string | number;
}

export interface RadioGroupProps extends React.HTMLAttributes<Element> {
  name?: string;
  label?: string;
  options: Array<OptionsProps>;
  context?: TContext;
  disabled?: boolean;
  dataTestId?: string;
  appearance?: TAppearance;
  modelValue: string | number | Array<string | number>;
  multiSelect?: boolean;
  onActionClick: (model: number | string | Array<string | number>) => void;
  requiredMessage?: string;
}

export default function RadioGroup({
  id,
  name,
  label,
  options,
  context = 'neutral',
  disabled,
  dataTestId,
  appearance = 'standard',
  modelValue,
  multiSelect,
  onActionClick,
  requiredMessage,
  ...props
}: RadioGroupProps) {
  const generated = useGenerateComponentId('radio-group-');
  const componentId = id ?? generated;

  const selectedValues = React.useMemo(
    () =>
      (Array.isArray(modelValue)
        ? modelValue
        : modelValue?.toString().split(',')) ?? [],
    [modelValue],
  );

  const valueIsMultiselect = (value: string | number) => {
    if (selectedValues.includes(value)) {
      return selectedValues.filter((v) => v !== value);
    }
    return [...selectedValues, value];
  };

  const isSelectedItem = (value: number | string) => {
    return multiSelect
      ? selectedValues.some((sm) => sm === value)
      : value === modelValue;
  };

  const handleClick = (value: string | number) => {
    const updateVal = multiSelect ? valueIsMultiselect(value) : value;
    onActionClick && onActionClick(updateVal);
  };

  const hasError = () => {
    return !modelValue && !disabled && Boolean(requiredMessage);
  };

  const buttonAppearance = (value: string | number) => {
    return isSelectedItem(value) ? 'standard' : 'outline';
  };

  const buttonClassNameList = (value: string | number) => {
    const baseClassName = 'radio-group__container--button';
    return joinClass([
      'radio-group__container--button',
      isSelectedItem(value) && `${baseClassName}-selected`,
      hasError() && `${baseClassName}-error`,
    ]);
  };

  const classNameList = joinClass([
    'radio-group',
    `radio-group__context--${context}`,
    `radio-group__appearance--${appearance}`,
  ]);

  const template = (
    <div className={classNameList}>
      <div role="radiogroup" className="radio-group__container">
        {options?.map(({ value }, index) => (
          <input
            id={`input--${componentId}--${value}`}
            key={`input--${componentId}--${value}`}
            type="radio"
            name={name}
            value={value}
            checked={isSelectedItem(value)}
            onChange={() => {}}
            tabIndex={-1}
            className="radio-group__container--input"
            aria-hidden="true"
            data-testid={`${dataTestId}-radio-${index}`}
          />
        ))}
        {options?.map(({ value, label }, index) => (
          <Button
            key={value}
            role="radio"
            context={context}
            onClick={() => handleClick(value)}
            tabIndex={isSelectedItem(value) ? 0 : -1}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') handleClick(value);
            }}
            className={buttonClassNameList(value)}
            appearance={buttonAppearance(value)}
            aria-checked={isSelectedItem(value)}
            data-testid={`${dataTestId}-button-${index}`}
          >
            {label}
          </Button>
        ))}
      </div>
      {hasError() && (
        <Feedback context="error" id="radio-group-feedback">
          {requiredMessage}
        </Feedback>
      )}
    </div>
  );

  return label ? (
    <fieldset
      id={componentId}
      className="radio-group__fieldset"
      data-testid={dataTestId}
      {...props}
    >
      {label && <Label tag="legend" label={label}></Label>}
      {template}
    </fieldset>
  ) : (
    template
  );
}
