import React, { useEffect, useState } from 'react';
import { imageTypeValidator } from '@repo/services';
import './Input.scss';

import { TIcon } from '@repo/ds/elements/icon/interface';
import Image from '@repo/ds/elements/image/Image';
import Text from '@repo/ds/elements/text/Text';

import Label from '@repo/ds/components/label/Label';
import Feedback from '@repo/ds/components/feedback/Feedback';
import joinClass from '@repo/ds/utils/join-class/joinClass';
import InputContent from './InputContent';

type InputPropsItem = Pick<
  React.HTMLProps<Element>,
  'onBlur' | 'onInput' | 'onChange' | 'onKeyDown' | 'onMouseDown'
>;
type HostProps = Omit<React.HTMLProps<HTMLDivElement>, keyof InputPropsItem>;

interface InputProps extends InputPropsItem, HostProps {
  tip?: string;
  type?: 'text' | 'textarea' | 'file' | 'password';
  icon?: React.ReactNode | TIcon;
  label?: string;
  value?: string;
  addon?: string;
  counter?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  isInvalid?: boolean;
  helperText?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  invalidMessage?: string;
}

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
  onKeyDown,
  isInvalid = false,
  className = '',
  helperText,
  placeholder,
  onMouseDown,
  iconPosition = 'left',
  invalidMessage,
  ...props
}: InputProps) {
  const [currentInputValue, setCurrentInputValue] = useState<string>(
    value ?? '',
  );
  const [currentIsInvalid, setCurrentIsInvalid] = useState<boolean>(isInvalid);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isInputMouseFocused, setIsInputMouseFocused] =
    useState<boolean>(false);

  const componentId = id ?? `input-${name}`;
  const labelId = componentId ? `${componentId}-label` : undefined;
  const helperId = componentId ? `${componentId}-helper` : undefined;

  const ariaAttributes = {
    'aria-invalid': currentIsInvalid || undefined,
    'aria-disabled': disabled,
    'aria-labelledby': label ? labelId : undefined,
    'aria-describedby': helperText ? `${componentId}-helper` : undefined,
    'aria-placeholder': placeholder,
  };

  useEffect(() => {
    setCurrentInputValue(value ?? '');
  }, [value]);

  const isFile = type === 'file';
  const isImage = isFile ? imageTypeValidator({ accept }).valid : false;
  const isTextArea = type === 'textarea';
  const isText = type === 'text';

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setHasInteracted(true);
    setCurrentIsInvalid(false);
    setIsInputMouseFocused(false);
    setIsInputFocused(false);
    if (required && !e.target.value.trim()) {
      setCurrentIsInvalid(true);
    }
    onBlur && onBlur(e);
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

  const handleInput = (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setCurrentInputValue(target.value);
    onInput && onInput(e);
  };

  const createEventHandler =
    <E extends React.SyntheticEvent>(
      updater?: React.Dispatch<React.SetStateAction<boolean>>,
      callback?: (e: E) => void,
    ) =>
    (e: E) => {
      updater && updater(true);
      callback && callback(e);
    };

  const classNameInputList = joinClass([
    'input__field',
    isTextArea && 'input__field--textarea',
    isFile && !isImage && 'input__field--file',
    isText && 'input__field--text',
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
          color={currentIsInvalid ? 'error-80' : 'neutral-90'}
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
          rows={isTextArea ? rows : undefined}
          name={name}
          value={currentInputValue}
          addon={addon}
          onBlur={handleBlur}
          counter={counter}
          onInput={handleInput}
          onChange={createEventHandler(setIsInputMouseFocused, onChange)}
          disabled={disabled}
          onKeyDown={createEventHandler(setIsInputMouseFocused, onKeyDown)}
          className={classNameInputList}
          placeholder={placeholder}
          onMouseDown={createEventHandler(setIsInputMouseFocused, onMouseDown)}
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
      {helperText && currentIsInvalid && (
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