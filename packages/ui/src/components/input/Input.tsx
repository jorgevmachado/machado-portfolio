import React, { useEffect, useState } from 'react';

import type { ValidatorMessage } from '@repo/services/validator/interface';

import InputComponent from '@repo/ds/components/input/Input';
import type { TContext } from '@repo/ds/utils/colors/interface';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: string;
  label?: string;
  validate: (value: string) => ValidatorMessage;
  context: TContext;
}

export default function Input({
  value,
  label,
  validate,
  context,
  ...props
}: InputProps) {
  const [currentValue, setCurrentValue] = useState<string>(value ?? '');
  const [onBlur, setOnBlur] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>();
  const [invalidMessage, setInvalidMessage] = useState<string>();

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentValue(e.currentTarget.value);

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
      label={label}
      value={currentValue}
      onBlur={() => setOnBlur(true)}
      onInput={onInput}
      variant="regular"
      isInvalid={invalid}
      iconContext={context}
      invalidMessage={invalidMessage}
    />
  );
}
