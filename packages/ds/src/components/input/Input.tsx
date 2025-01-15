import React, { useEffect, useState } from 'react';

import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../utils/use-generate-component-id';

import Text from '../../elements/text';

import Feedback from '../feedback';
import Label from '../label';

import InputItem from './inputItem';
import type { InputProps } from './interface';

import './Input.scss';

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
  variant,
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
  const [inputHasValue, setInputHasValue] = useState<boolean>(false);
  const [isInputMouseFocused, setIsInputMouseFocused] =
    useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState<string>('');

  const isShrink = floatingLabel && (inputHasValue || isInputFocused);

  const generated = useGenerateComponentId('input-');
  const componentId = id ?? generated;

  const getAriaAttributes = {
    'aria-invalid': Boolean(isInvalid).toString(),
  };

  const childrenElements: { [key: string]: JSX.Element } = {};

  React.Children.map(children, (element: any) => {
    if (element) {
      const key = element.props['data-children'] as string;
      childrenElements[key] = element;
    }
  });

  const onBlurHandler = (e: React.FocusEvent) => {
    setIsInputMouseFocused(false);
    setIsInputFocused(false);
    onBlur?.(e);
  };

  const onInputHandler = (e: React.FormEvent) => {
    const { value: inputValue } = e.target as HTMLInputElement;
    setInputHasValue(Boolean(inputValue));
    setCurrentInputValue(String(inputValue));
    onInput?.(e);
  };

  const onFocusHandler = (e: React.FocusEvent) => {
    setIsInputFocused(true);
    onFocus?.(e);
  };

  const onChangeHandler = (e: React.KeyboardEvent) => {
    setIsInputMouseFocused(true);
    onChange?.(e);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<Element>) => {
    setIsInputMouseFocused(true);
    onKeyDown?.(event);
  };

  const onMouseDownHandler = (e: React.MouseEvent) => {
    setIsInputMouseFocused(true);
    onMouseDown?.(e);
  };

  const classNameList = joinClass([
    'input',
    `${iconContext ? `input__icon--${iconContext}` : ''}`,
    `${floatingLabel ? 'input__label--floating' : ''}`,
    `${isShrink ? 'input__label--shrink' : ''}`,
    `${isInvalid ? 'input__invalid' : ''}`,
    `${className ? className : ''}`,
  ]);

  const labelClassNameList = joinClass([
    'input__label',
    `${isInvalid ? 'input__label--invalid' : ''}`,
    `${childrenElements['icon-left'] ? 'input__label--icon-left' : ''}`,
  ]);

  const inputItemClassNameList = joinClass([
    'input__item',
    `${childrenElements['icon-left'] ? 'input__item--icon-left' : ''}`,
    `${childrenElements['icon'] || childrenElements['icon-right'] ? 'input__item--icon-right' : ''}`,
    `${addon ? 'input__item--addon' : ''}`,
    `${childrenElements['append'] && !hasFloatingSlots ? 'input__item--append' : 'input__item--floating-append'}`,
    `${childrenElements['counter'] ? 'input__item--counter' : ''}`,
    `${childrenElements['prepend'] && !hasFloatingSlots ? 'input__item--prepend' : 'input__item--floating-prepend'}`,
    `input__item--variant-${variant}`,
    `${isInvalid ? 'input__item--invalid' : ''}`,
    `${disabled ? 'input__item--disabled' : ''}`,
    `${multiline ? 'input__item--multiline' : ''}`,
    `${isInputMouseFocused ? 'input__item--mouse-focus' : ''}`,
  ]);

  useEffect(() => {
    setInputHasValue(Boolean(value));
    setCurrentInputValue(String(value));
  }, [value]);

  useEffect(() => {
    setCurrentPlaceholder(isShrink ? (placeholder ?? '') : '');
  }, [isShrink]);

  useEffect(() => {
    setCurrentPlaceholder(placeholder);
  }, [placeholder]);

  return (
    <div {...props} className={classNameList}>
      {label && (
        <Label
          tip={tip}
          label={label}
          className={labelClassNameList}
          componentId={componentId}
        />
      )}
      <InputItem
        type={type}
        rows={rows}
        name={name}
        value={currentInputValue}
        addon={addon}
        onBlur={onBlurHandler}
        onInput={onInputHandler}
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
        disabled={disabled}
        onKeyDown={onKeyDownHandler}
        className={`${!hasFloatingSlots ? 'input__row' : ''}`}
        multiline={multiline}
        maxLength={maxLength}
        autoFocus={autoFocus}
        dataCyName={dataCyName}
        placeholder={currentPlaceholder}
        onMouseDown={onMouseDownHandler}
        componentId={componentId}
        autoComplete={autoComplete}
        inputClassList={inputItemClassNameList}
        {...getAriaAttributes}
      >
        {childrenElements['icon-left']}
        {childrenElements['prepend']}
        {childrenElements['append']}
        {childrenElements['counter']}
        {childrenElements['icon-right']}
      </InputItem>
      {isInvalid && invalidMessage && (
        <Feedback context="error">{invalidMessage}</Feedback>
      )}
      {!invalidMessage && helperText && (
        <Text tag="p" color="neutral-90" variant="small" weight="normal">
          {helperText}
        </Text>
      )}
    </div>
  );
}
