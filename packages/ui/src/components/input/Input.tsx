import React, { useEffect, useState } from 'react';

import type { ValidatorMessage } from '@repo/services/validator/interface';

import Icon from '@repo/ds/elements/icon/Icon';
import InputComponent from '@repo/ds/components/input/Input';
import type { TContext } from '@repo/ds/utils/colors/interface';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: string;
  label?: string;
  context: TContext;
  validate: (value?: string) => ValidatorMessage;
}

import './Input.scss';

export default function Input({
  type,
  value,
  label,
  context,
  validate,
  ...props
}: InputProps) {
  const [currentValue, setCurrentValue] = useState<string>(value ?? '');
  const [onBlur, setOnBlur] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>();
  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [typeInput, setTypeInput] = useState<string | undefined>(type);
  const [icon, setIcon] = useState<'eye' | 'eye-close'>('eye-close');

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentValue(e.currentTarget.value);

  const toggleShowPassword = () => {
    if (typeInput === 'password') {
      setIcon('eye');
      setTypeInput('text');
      return;
    }
    setIcon('eye-close');
    setTypeInput('password');
  };

  useEffect(() => {
    if (onBlur) {
      const validateMessage = validate(currentValue);
      setInvalid(!validateMessage.valid);
      setInvalidMessage(
        !validateMessage.valid ? validateMessage.message : undefined,
      );
    }
  }, [currentValue, onBlur]);

  return (
    <InputComponent
      {...props}
      type={typeInput}
      label={label}
      value={currentValue}
      onBlur={() => setOnBlur(true)}
      onInput={onInput}
      variant="regular"
      className="input-ui"
      isInvalid={invalid}
      iconContext={context}
      invalidMessage={invalidMessage}
    >
      {type === 'password' && (
        <Icon
          icon={icon}
          onClick={toggleShowPassword}
          className="input-ui__password"
          data-children="icon-right"
        />
      )}
    </InputComponent>
  );
}
