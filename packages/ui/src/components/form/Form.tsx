import React from 'react';

import Button from '@repo/ds/components/button/Button';
import joinClass from '@repo/ds/utils/join-class/joinClass';

import Input from '../input';

import { AuthErrors, FormProps } from './interface';

import useForm from './hooks';

import './Form.scss';

export default function Form({
  type,
  context = 'primary',
  loading,
  onSubmit,
  children,
  buttonLabel = 'save',
  ...props
}: FormProps) {
  if (type === 'blank') {
    return <>{children}</>;
  }
  const { currentForm, authForm, inputs, onInputHandler, handleSubmit } =
    useForm({
      type,
      buttonLabel,
      onSubmit,
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
          <Input
            id={input.id}
            type={input.type}
            name={input.name}
            label={input.label}
            options={input.options}
            onInput={onInputHandler}
            context={context}
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
      <Button type="submit" context={context} fluid loading={loading}>
        {currentForm.buttonLabel}
      </Button>
    </form>
  );
}
