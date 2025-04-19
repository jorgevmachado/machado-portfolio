import React, { useEffect, useState } from 'react';

import { imageTypeValidator } from '@repo/services/validator/file/file';

import joinClass from '../../utils/join-class';

import useGenerateComponentId from '../../hooks/use-generate-component-id';

import { Text, Image } from '../../elements';

import Feedback from '../feedback';
import Label from '../label';

import { InputContent } from './input-content';

import type { InputProps } from './interface';

import './Input.scss';

export default function Input({
  id,
  tip,
  rows,
  icon,
  type = 'text',
  name,
  label,
  value,
  addon,
  accept,
  onBlur,
  onInput,
  onFocus,
  counter,
  disabled = false,
  children,
  onChange,
  required = false,
  iconColor,
  onKeyDown,
  isInvalid = false,
  autoFocus = false,
  maxLength,
  minLength,
  className = '',
  dataCyName,
  helperText,
  onMouseDown,
  iconPosition,
  placeholder = '',
  autoComplete,
  invalidMessage,
  ...props
}: InputProps) {
  const [currentInputValue, setCurrentInputValue] = useState<string>(
    value || '',
  );
  const [currentIsInvalid, setCurrentIsInvalid] = useState<boolean>(isInvalid);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isInputMouseFocused, setIsInputMouseFocused] =
    useState<boolean>(false);

  const componentId = id ?? useGenerateComponentId('input-');
  const labelId = componentId ? `${componentId}-label` : undefined;
  const helperId = componentId ? `${componentId}-helper` : undefined;

  const ariaAttributes = {
    'aria-invalid': currentIsInvalid || undefined,
    'aria-disabled': disabled,
    'aria-labelledby': label ? labelId : undefined,
    'aria-describedby': helperText ? helperId : undefined,
    'aria-placeholder': placeholder,
  };

  const isFile = type === 'file';
  const isImage = isFile ? imageTypeValidator({ accept }).valid : false;
  const isTextArea = type === 'textarea';
  const isText = type === 'text';

  const createEventHandler = <E extends React.SyntheticEvent>(updater?: React.Dispatch<React.SetStateAction<boolean>>, callback?: (e: E) => void) => (e: E) => {
      updater && updater(true);
      callback && callback(e);
    };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsInputMouseFocused(false);
    setIsInputFocused(false);
    if (required && !e.target.value.trim()) {
      setCurrentIsInvalid(true);
    }
    onBlur && onBlur(e);
  };

  const handleInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setCurrentInputValue(target.value);
    onInput && onInput(e);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const newValue = reader.result as string;
          setCurrentInputValue(newValue);
        }
      };
      reader.readAsDataURL(file);
      onChange && onChange(e);
    }
  };

  useEffect(() => {
    setCurrentInputValue(value || '');
  }, [value]);


  const classNameInputList = joinClass([
    'input__field',
    isTextArea && 'input__field--textarea',
    isFile && !isImage && 'input__field--file',
    isText && 'input__field--text',
    disabled && 'input__field--disabled',
    isInputFocused && 'input__field--focused',
    isInputMouseFocused && 'input__field--mouse-focused',
  ]);

  return (
    <div
      {...props}
      role="group"
      tabIndex={-1}
      className={`input ${className} ${currentIsInvalid ? 'input--error' : ''}`}
    >
      {label && (
        <Label
          id={labelId}
          tip={tip}
          color={isInvalid ? 'error-80' : 'neutral-90'}
          label={label}
          className={`input__label ${isImage ? 'input__label--image' : ''}`}
          componentId={componentId}
        />
      )}

      {isImage ? (
          <div className="input__picture">
            <Image
                src={currentInputValue === '' ? undefined : currentInputValue}
                alt="picture"
                className="input__picture--image"
            />
            <label htmlFor={`${name}-picture`} className="input__picture--label">
              <span className="input__picture--button">Choose Photo</span>
              <input
                  id={`${name}-picture`}
                  type="file"
                  name={name}
                  onBlur={handleBlur}
                  accept={accept}
                  className="input__picture--input"
                  onChange={createEventHandler(
                      setIsInputMouseFocused,
                      handleFileChange,
                  )}
              />
            </label>
          </div>
      ) : (
          <InputContent
              id={componentId}
              icon={icon}
              type={type}
              rows={rows}
              name={name}
              value={currentInputValue}
              addon={addon}
              onBlur={handleBlur}
              counter={counter}
              onInput={handleInput}
              onFocus={createEventHandler(setIsInputFocused, onFocus)}
              onChange={createEventHandler(setIsInputMouseFocused, onChange)}
              disabled={disabled}
              iconColor={iconColor}
              onKeyDown={createEventHandler(setIsInputMouseFocused, onKeyDown)}
              className={classNameInputList}
              maxLength={maxLength}
              minLength={minLength}
              autoFocus={autoFocus}
              dataCyName={dataCyName}
              placeholder={placeholder}
              onMouseDown={createEventHandler(setIsInputMouseFocused, onMouseDown)}
              autoComplete={autoComplete}
              iconPosition={iconPosition}
              {...ariaAttributes}
          >
            {children}
          </InputContent>
      )}
      {currentIsInvalid && (
        <Feedback id={`${componentId}-feedback`} context="error">
          {invalidMessage ?? ''}
        </Feedback>
      )}
      {helperText && currentIsInvalid &&  (
        <Text
          id={helperId}
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
