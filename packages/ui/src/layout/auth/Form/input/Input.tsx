import React, { useEffect, useState } from 'react';

import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';

import RadioGroup, {
  OptionsProps,
} from '@repo/ds/components/radio-group/RadioGroup';
import InputComponent from '@repo/ds/components/input/Input';
import type { TContext } from '@repo/ds/utils/colors/interface';

import './Input.scss';

export type TInput =
  | 'text'
  | 'password'
  | 'email'
  | 'phone'
  | 'datepicker'
  | 'radio-group';

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'type' | 'onInput'
  > {
  tip?: string;
  type: TInput;
  value?: string;
  label?: string;
  options?: Array<OptionsProps>;
  context: TContext;
  onInput?: (name: string, value: string) => void;
  validate: (validatorParams: ValidatorParams) => ValidatorMessage;
  formatter?: (value?: string) => string;
  reloadValidate?: ValidatorMessage;
}

export default function Input({
  tip,
  name,
  type,
  value,
  label,
  options = [],
  context,
  onInput,
  validate,
  formatter,
  reloadValidate,
  ...props
}: InputProps) {
  const [currentValue, setCurrentValue] = useState<string>(value ?? '');
  const [onBlur, setOnBlur] = useState<boolean>(false);
  const [inputValidator, setInputValidator] = useState<{
    invalid: boolean;
    message?: string;
  }>({ invalid: false, message: undefined });

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value);
    onInput && onInput(name ?? '', e.currentTarget.value);
  };

  const onActionClickHandler = (value: string) => {
    setCurrentValue(value);
    onInput && onInput(name ?? '', value);
  };

  const handleValidate = (validatorMessage?: ValidatorMessage) => {
    const currentValidatorMessage = validatorMessage
      ? validatorMessage
      : validate({ value: currentValue });

    setInputValidator({
      invalid: !currentValidatorMessage.valid,
      message: !currentValidatorMessage.valid
        ? currentValidatorMessage.message
        : undefined,
    });
  };

  useEffect(() => {
    if (onBlur) {
      handleValidate();
    }
  }, [currentValue, onBlur]);

  useEffect(() => {
    if (reloadValidate) {
      handleValidate(reloadValidate);
    }
  }, [reloadValidate]);

  return (
    <>
      {type !== 'radio-group' && (
        <InputComponent
          {...props}
          tip={tip}
          name={name}
          type={type}
          label={label}
          value={formatter ? formatter(currentValue) : currentValue}
          onBlur={() => setOnBlur(true)}
          onInput={onInputHandler}
          variant="regular"
          isInvalid={inputValidator.invalid}
          iconContext={context}
          invalidMessage={inputValidator?.message}
        />
      )}
      {type === 'radio-group' && options?.length && (
        <div className="form-input__radio-group">
          <RadioGroup
            id={props.id}
            name={name}
            label={label}
            options={options}
            context={context}
            appearance="standard"
            modelValue={currentValue}
            onClick={(event) => event.preventDefault()}
            onActionClick={(value) => onActionClickHandler(value as string)}
          />
        </div>
      )}
    </>
  );
}
