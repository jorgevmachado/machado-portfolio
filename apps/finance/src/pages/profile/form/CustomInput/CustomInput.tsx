import React, { useEffect, useState } from 'react';

import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';

import Input, { InputProps } from '@repo/ds/components/input/Input';
import RadioGroup, {
  OptionsProps,
} from '@repo/ds/components/radio-group/RadioGroup';
import Image from '@repo/ds/elements/image/Image';

import { TInput } from '../types';

import './CustomInput.scss';

type InputValidator = Partial<ValidatorMessage>;

type CustomInputProps = Omit<InputProps, 'onInput'> & {
  type: TInput;
  options?: Array<OptionsProps>;
  onInput?: (name: string, value: string) => void;
  validate: (validatorParams: ValidatorParams) => ValidatorMessage;
  formatter?: (value?: string) => string;
  reloadValidate?: ValidatorMessage;
};

export default function CustomInput({
  tip,
  type,
  name,
  label,
  value,
  options = [],
  onInput,
  validate,
  formatter,
  multiline,
  reloadValidate,
  ...props
}: CustomInputProps) {
  const [currentValue, setCurrentValue] = useState<string>(value ?? '');
  const [inputValidator, setInputValidator] = useState<InputValidator>({
    valid: false,
    message: undefined,
  });

  const handleValidate = (validatorMessage?: ValidatorMessage) => {
    const currentValidatorMessage =
      validatorMessage ?? validate({ value: currentValue });
    setInputValidator({
      valid: currentValidatorMessage.valid,
      message: !currentValidatorMessage.valid
        ? currentValidatorMessage.message
        : undefined,
    });
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setCurrentValue(newValue);
    onInput && onInput(name ?? '', newValue);
  };

  const onActionClickHandler = (value: string) => {
    setCurrentValue(value);
    onInput && onInput(name ?? '', value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          const newValue = reader.result as string;
          setCurrentValue(newValue);
          onInput && onInput(name ?? '', newValue);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  const renderRadioGroup = () => (
    <div className="form-input__radio-group">
      <RadioGroup
        id={props.id}
        name={name}
        label={label}
        options={options}
        appearance="standard"
        modelValue={currentValue}
        onClick={(event) => event.preventDefault()}
        onActionClick={(value) => onActionClickHandler(value as string)}
      />
    </div>
  );

  const renderPictureInput = () => (
    <div className="form-input__picture">
      <Image
          src={currentValue === '' ? undefined : currentValue}
          alt="picture"
          className="form-input__picture--image"
      />
      <label htmlFor="avatar-upload" className="form-input__picture--label">
        <span className="form-input__picture--button">Choose Photo</span>
        <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="form-input__picture--input"
            onChange={handleFileChange}
        />
      </label>
    </div>
  );

  const renderInput = () => (
    <Input
      {...props}
      tip={tip}
      name={name}
      type={type}
      label={label}
      value={formatter ? formatter(currentValue) : currentValue}
      onBlur={() => handleValidate()}
      onInput={onInputHandler}
      multiline={multiline}
      isInvalid={!inputValidator.valid}
      invalidMessage={inputValidator?.message}
    />
  );

  const render = (type: TInput) => {
    switch (type) {
      case 'picture':
        return renderPictureInput();
      case 'radio-group':
        return renderRadioGroup();
      default:
        return renderInput();
    }
  };

  useEffect(() => {
    if (reloadValidate) {
      handleValidate(reloadValidate);
    }
  }, [reloadValidate]);

  return render(type);
}