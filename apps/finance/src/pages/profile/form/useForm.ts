import React, { useEffect, useState } from 'react';

import type { User } from '@repo/business/auth/interface';

import type {AuthErrors, AuthFields, AuthForm, FormType, InputType} from './types';

import { FORM_TYPE, INPUT_TYPE } from './config';

type UseFormProps = {
  user?: User;
  type: FormType['type'];
  onSubmit?: (values: AuthForm) => void;
  buttonLabel: string;
};

export default function useForm({
  user,
  type,
  buttonLabel,
  onSubmit,
}: UseFormProps) {

  const [currentForm, setCurrentForm] = useState<FormType>({
    type,
    inputs: [],
    buttonLabel,
  });
  const [inputs, setInputs] = useState<Array<InputType>>([]);
  const [authForm, setAuthForm] = useState<AuthForm>({
    valid: true,
    fields: {},
    errors: {},
    message: undefined,
  });

  const onInputHandler = (name: string, value: string) => {
    setAuthForm((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const initializeInputs = (inputIds: Array<string>) => {
    const filteredInputs = INPUT_TYPE.filter((input) =>
      inputIds.includes(input.id),
    );

    const { fields, errors } = filteredInputs.reduce<{
      fields: AuthFields;
      errors: AuthErrors;
    }>(
        (acc, input) => {
          const fieldValue = user?.[input.id as keyof User]?.toString() || '';
          acc.fields[input.id as keyof AuthFields] = fieldValue;

          acc.errors[input.id as keyof AuthErrors] =
              user
                  ? input.validate({ value: fieldValue })
                  : { valid: true, message: '' };

          return acc;
        },
        { fields: {}, errors: {} }
    );

    const currentInputs = filteredInputs.map((input) => ({
      ...input,
      value: fields[input.id as keyof AuthFields] ?? '',
    }));
    setInputs(currentInputs);
    setAuthForm({ ...authForm, fields, errors });
  };

  const validateForm = () => {
    const { valid, errors, messages } = inputs.reduce((acc, input) => {
      const validatorMessage = input.validate({
        value: authForm.fields[input.name as keyof AuthFields],
      });

      if(!validatorMessage.valid) {
        acc.valid = false;
        (acc.messages as Array<string>).push(`${input.label}:${validatorMessage.message}`);
      }
      (acc.errors as AuthErrors)[input.name as keyof AuthErrors] = validatorMessage;
      return acc;
    }, {valid: true, errors: {}, messages: []});

    setAuthForm((prev) => ({
      ...prev,
      valid,
      errors,
      message: messages.map((message) => `   ${message}`).join('\n')
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    handleAuthFormData();
    onSubmit && onSubmit(authForm);
  };

  const handleAuthFormData = () => {
    const formData = new FormData();
    Object.entries(authForm.fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    setAuthForm((prev) => ({
      ...prev,
      formData,
    }));
  }

  useEffect(() => {
    const form = FORM_TYPE.find((form) => form.type === type);
    if (form) {
      setCurrentForm({
        ...form,
        buttonLabel,
      });
      initializeInputs(form.inputs);
    }
  }, [type]);

  return {
    inputs,
    authForm,
    currentForm,
    handleSubmit,
    onInputHandler,
  };
}