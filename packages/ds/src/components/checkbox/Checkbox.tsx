import React, { useEffect, useState } from 'react';

import type { TContext } from '../../utils';

import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../utils/use-generate-component-id';

import { Icon, Text } from '../../elements';

import './Checkbox.scss';

interface Changes {
  isChecked: boolean;
  newChecked: Array<string | number>;
}

interface CheckboxProps extends React.HTMLAttributes<HTMLLabelElement> {
  id?: string;
  value: string | number;
  large?: boolean;
  context?: Omit<TContext, 'error' | 'attention'>;
  disabled?: boolean;
  children?: React.ReactNode;
  modelValue?: boolean | Array<string | number>;
  dataCyName?: string;
  onCheckboxChange?: (result: Changes) => void;
}

export default function Checkbox({
  id,
  value,
  large,
  context = 'neutral',
  disabled,
  children,
  modelValue,
  dataCyName,
  onCheckboxChange,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const componentId = useGenerateComponentId(id ?? 'checkbox-');

  const variant = large ? 'large' : 'regular';

  useEffect(() => {
    if (Array.isArray(modelValue)) {
      setIsChecked(modelValue.includes(value));
      return;
    }
    setIsChecked(Boolean(modelValue));
  }, [modelValue, value]);

  const classNameList = joinClass([
    'checkbox',
    disabled && 'checkbox__disabled',
    isChecked && 'checkbox__checked',
    variant && `checkbox__variant--${variant}`,
    context && `checkbox__context--${context}`,
  ]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    // Atualiza imediatamente o estado interno
    setIsChecked(isChecked);

    // Notifica mudanças ao estado do componente pai (se necessário)
    if (modelValue !== undefined) {
      if (Array.isArray(modelValue)) {
        const newChecked = [...modelValue];
        isChecked
          ? newChecked.push(value)
          : newChecked.splice(modelValue.indexOf(value), 1);
        onCheckboxChange && onCheckboxChange({ isChecked, newChecked });
      } else {
        onCheckboxChange &&
          onCheckboxChange({ isChecked, newChecked: [value] });
      }
    }
  };

  return (
    <label {...props} htmlFor={componentId} className={classNameList}>
      <div className="checkbox__wrapper">
        <input
          id={componentId}
          type="checkbox"
          value={value}
          data-cy={dataCyName}
          checked={isChecked}
          disabled={disabled}
          onChange={handleOnChange}
          tabIndex={0}
          className="checkbox__wrapper--input"
        />
        <Icon icon="check" className="checkbox__wrapper--icon-check" />
      </div>
      <Text tag="span" className="checkbox__label" draggable={false}>
        {children}
      </Text>
    </label>
  );
}
