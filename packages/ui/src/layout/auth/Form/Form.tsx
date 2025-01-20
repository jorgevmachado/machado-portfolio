import React, { useEffect, useState } from 'react';

import Button from '@repo/ds/components/button/Button';
import Input from './input';
import joinClass from '@repo/ds/utils/join-class/joinClass';

import {
  AuthErrors,
  AuthFields,
  AuthForm,
  FormProps,
  FormType,
  InputType,
  TInputForm,
} from './interface';

import { FORM_TYPE, INPUT_TYPE } from './config';

import './Form.scss';

export default function Form({
  type,
  context = 'primary',
  loading,
  onSubmit,
  buttonLabel = 'save',
  ...props
}: FormProps) {
  const classNameList = joinClass(['form', `${props.className ?? ''}`]);

  const [currentForm, setCurrentForm] = useState<FormType>({
    type: 'signUp',
    inputs: [],
    buttonLabel,
  });

  const [inputs, seTInputForms] = useState<Array<InputType>>([]);
  const [authForm, setAuthForm] = useState<AuthForm>({
    valid: true,
    fields: {},
    errors: {},
    message: undefined,
  });
  const [submit, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
    if (submit) {
      validateForm();
      handleAuthFormData();
      onSubmit && onSubmit(authForm);
      setSubmit(false);
    }
  }, [submit]);

  const initForm = () => {
    const formType = FORM_TYPE.find((form) => form.type === type);
    if (formType) {
      setCurrentForm(formType);
      initInputs(formType.inputs);
    }
  };

  const initInputs = (inputs: Array<TInputForm>) => {
    const currentInputForms = INPUT_TYPE.filter((input) =>
      inputs.includes(input.id),
    );
    seTInputForms(currentInputForms);
    initAuthForm(currentInputForms);
  };

  const initAuthForm = (inputs: Array<InputType>) => {
    const fields: AuthFields = {};
    const errors: AuthErrors = {};
    inputs.forEach((input) => {
      fields[input.name as keyof AuthFields] = '';
      errors[input.name as keyof AuthErrors] =
        type === 'update'
          ? input.validate({ value: fields[input.name as keyof AuthFields] })
          : undefined;
    });
    setAuthForm({
      ...authForm,
      fields,
      errors,
    });
  };

  const validateForm = () => {
    const messages: Array<string> = [];
    const authFormState = authForm;
    inputs.forEach((input) => {
      const validatorMessage = input.validate({
        value: authFormState.fields[input.name as keyof AuthFields],
      });
      if (!validatorMessage.valid) {
        authFormState.valid = false;
        messages.push(`${input.label}:${validatorMessage.message}`);
      }
      authFormState.errors[input.name as keyof AuthErrors] = validatorMessage;
    });
    authFormState.message = messages
      .map((message) => `   ${message}`)
      .join('\n');
    setAuthForm(authFormState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
  };

  const handleAuthFormData = () => {
    const authFormState = authForm;
    const formData = new FormData();
    Object.entries(authFormState.fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    authFormState.formData = formData;
    setAuthForm(authFormState);
  };

  const onInputHandler = (name: string, value: string) => {
    const authFormState = authForm;
    authFormState.fields[name as keyof AuthFields] = value;
    setAuthForm(authFormState);
  };

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
            reloadValidate={authForm.errors[input.name as keyof AuthErrors]}
          />
        </div>
      ))}
      <Button type="submit" context={context} fluid loading={loading}>
        {currentForm.buttonLabel}
      </Button>
    </form>
  );
}
