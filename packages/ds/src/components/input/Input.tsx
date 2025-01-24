import React, { useEffect, useState } from 'react';

import type { TContext } from '../../utils';

import joinClass from '../../utils/join-class';

import useGenerateComponentId from '../../hooks/use-generate-component-id';

import { Text } from '../../elements';

import Feedback from '../feedback';
import Label from '../label';

import InputContent from './input-content';

import './Input.scss';

type InputPropsItem = Pick<
  React.HTMLProps<Element>,
  'onBlur' | 'onInput' | 'onFocus' | 'onChange' | 'onKeyDown' | 'onMouseDown'
>;

type HostProps = Omit<React.HTMLProps<HTMLDivElement>, keyof InputPropsItem>;

export interface InputProps extends InputPropsItem, HostProps {
  tip?: string;
  type?: string;
  addon?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  multiline?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  dataCyName?: string;
  helperText?: React.ReactNode;
  iconContext?: TContext;
  floatingLabel?: boolean;
  invalidMessage?: string;
  hasFloatingSlots?: boolean;
}

export default function Input({
  id,
  tip,
  rows,
  name,
  type = 'text',
  addon,
  value,
  label,
  onBlur,
  onInput,
  onFocus,
  onChange,
  children,
  disabled = false,
  onKeyDown,
  multiline,
  isInvalid,
  autoFocus = false,
  maxLength,
  className,
  dataCyName,
  helperText,
  onMouseDown,
  placeholder = '',
  iconContext = 'primary',
  autoComplete,
  floatingLabel,
  invalidMessage,
  hasFloatingSlots,
  ...props
}: InputProps) {
  const [currentInputValue, setCurrentInputValue] = useState<string>(
    value || '',
  );
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isInputMouseFocused, setIsInputMouseFocused] =
    useState<boolean>(false);

  const componentId = id ?? useGenerateComponentId('input-');
  const labelId = `${componentId}-label`;

  const hasValue = Boolean(value || currentInputValue);
  const currentPlaceholder =
    floatingLabel && (hasValue || isInputFocused) ? '' : placeholder;
  const isShrink = floatingLabel && (hasValue || isInputFocused);

  const ariaAttributes = {
    'aria-invalid': isInvalid || undefined,
    'aria-disabled': disabled,
    'aria-labelledby': label ? labelId : undefined,
    'aria-describedby': helperText ? `${componentId}-helper` : undefined,
    'aria-placeholder': placeholder,
  };

  const createEventHandler =
    (
      updater?: React.Dispatch<React.SetStateAction<boolean>>,
      callback?: (e: any) => void,
    ) =>
    (e: any) => {
      if (updater) updater(true);
      if (callback) callback(e);
    };

  const handleBlur = (e: React.FocusEvent) => {
    setIsInputMouseFocused(false);
    setIsInputFocused(false);
    onBlur?.(e);
  };

  const handleInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value: inputValue } = e.target as HTMLInputElement;
    setCurrentInputValue(String(inputValue));
    onInput?.(e);
  };

  useEffect(() => {
    setCurrentInputValue(value || '');
  }, [value]);

  return (
    <div
      {...props}
      role="group"
      tabIndex={disabled ? -1 : 0}
      className={joinClass([
        'input',
        iconContext && `input__icon--context-${iconContext}`,
        className,
      ])}
    >
      {label && (
        <Label
          id={labelId}
          tip={tip}
          color={isInvalid ? 'error-80' : 'neutral-90'}
          label={label}
          className={joinClass([
            'input__label',
            floatingLabel && 'input__label--floating',
            isShrink && 'input__label--shrink',
          ])}
          componentId={componentId}
        />
      )}

      <div className="input__wrapper">
        <InputContent
          id={componentId}
          type={type}
          rows={rows}
          name={name}
          value={currentInputValue}
          addon={addon}
          onBlur={handleBlur}
          onInput={handleInput}
          onFocus={createEventHandler(setIsInputFocused, onFocus)}
          onChange={createEventHandler(setIsInputMouseFocused, onChange)}
          disabled={disabled}
          onKeyDown={createEventHandler(setIsInputMouseFocused, onKeyDown)}
          multiline={multiline}
          isInvalid={isInvalid}
          maxLength={maxLength}
          autoFocus={autoFocus}
          dataCyName={dataCyName}
          placeholder={currentPlaceholder}
          onMouseDown={createEventHandler(setIsInputMouseFocused, onMouseDown)}
          autoComplete={autoComplete}
          isInputMouseFocused={isInputMouseFocused}
          hasFloatingSlots={hasFloatingSlots}
          {...ariaAttributes}
        >
          {children}
        </InputContent>
      </div>
      {isInvalid && invalidMessage && (
        <Feedback id={`${componentId}-feedback`} context="error">
          {invalidMessage}
        </Feedback>
      )}
      {helperText && (
        <Text
          id={`${componentId}-helper`}
          tag="p"
          color="error-80"
          variant="small"
          weight="normal"
        >
          {helperText}
        </Text>
      )}
    </div>
  );
}
