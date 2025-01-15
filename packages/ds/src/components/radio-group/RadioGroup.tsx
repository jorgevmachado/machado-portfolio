import React from 'react';

import type { TContext } from '../../utils/colors';
import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../utils/use-generate-component-id';

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
  onActionClick?: (model: number | string | Array<string | number>) => void;
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

  const convertCurrentValueOfArray = () => {
    const convertCurrentValue: string | Array<string | number> =
      modelValue?.toString();
    return convertCurrentValue?.length ? convertCurrentValue.split(',') : [];
  };

  const valueIsMultiselect = (value: string | number) => {
    const arrayMultiSelect: Array<string | number> =
      convertCurrentValueOfArray();

    if (arrayMultiSelect.some((ft) => ft == value)) {
      return arrayMultiSelect.filter((ft) => ft !== value);
    }

    arrayMultiSelect.push(value);

    return arrayMultiSelect;
  };

  const isSelectedItem = (value: number | string) => {
    return multiSelect
      ? convertCurrentValueOfArray().some((sm) => sm === value)
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

  const buttonClassNameList = (value: string | number) =>
    joinClass([
      'radio-group__container--button',
      `${isSelectedItem(value) ? 'radio-group__container--button-selected' : ''}`,
      `${hasError() ? 'radio-group__container--button-error' : ''}`,
    ]);

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
            disabled={disabled}
            className={buttonClassNameList(value)}
            appearance={buttonAppearance(value)}
            aria-checked={isSelectedItem(value)}
            data-testid={`${dataTestId}-button-${index}`}
          >
            {label}
          </Button>
        ))}
      </div>
      {hasError() && <Feedback context="error">{requiredMessage}</Feedback>}
    </div>
  );

  return label ? (
    <fieldset
      className="radio-group__fieldset"
      data-testid={dataTestId}
      {...props}
    >
      {label && <Label label={label}></Label>}
      {template}
    </fieldset>
  ) : (
    template
  );
}
