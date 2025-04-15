import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Button from '@repo/ds/components/button/Button';

import type { AuthErrors, FormProps } from './types';

import useForm from './useForm';

import CustomInput from './CustomInput';

import './Form.scss';

export default function Form({
  user,
  type,
  context = 'primary',
  loading,
  onSubmit,
  children,
  buttonLabel = 'save',
  ...props
}: FormProps) {
  const { inputs, authForm, currentForm, onInputHandler, handleSubmit } =
    useForm({
      user,
      type,
      onSubmit,
      buttonLabel,
    });

  const classNameList = joinClass(['form', `${props.className ?? ''}`]);

  return (
    <form
      {...props}
      id={`form-${type}`}
      onSubmit={handleSubmit}
      className={classNameList}
    >
      {inputs.map((input, index) => (
        <div
          key={`form-input-${input.id}-${index}`}
          className={`form__${input.id}`}
        >
          <CustomInput
            id={input.id}
            type={input.type}
            name={input.name}
            label={input.label}
            value={input.value}
            options={input.options}
            onInput={onInputHandler}
            validate={(params) =>
              input.name !== 'passwordConfirmation'
                ? input.validate(params)
                : input.validate({
                    value: params.value,
                    optionalValue: authForm?.fields?.password,
                  })
            }
            formatter={input.formatter}
            placeholder={input.placeholder}
            aria-invalid={Boolean(
              authForm.errors[input.name as keyof AuthErrors],
            )}
            reloadValidate={
              authForm.errors[input.name as keyof AuthErrors] || undefined
            }
            aria-describedby={`error-${input.id}`}
          />
        </div>
      ))}
      <div className="form__actions">
        <Button type="submit" context="neutral" fluid loading={loading} className="form__actions--button">
          {currentForm.buttonLabel}
        </Button>
      </div>
    </form>
  );
}