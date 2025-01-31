import React, { useEffect, useState } from 'react';

import {
  AuthErrors,
  AuthFields,
  AuthForm,
  FormType,
  InputType,
} from '../interface';
import { FORM_TYPE, INPUT_TYPE } from '../config';

interface UseFormProps {
  type: FormType['type'];
  onSubmit?: (values: AuthForm) => void;
  buttonLabel: string;
}

export default function useForm({ type, buttonLabel, onSubmit }: UseFormProps) {
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

  const initializeInputs = (inputIds: Array<string>) => {
    const filteredInputs = INPUT_TYPE.filter((input) =>
      inputIds.includes(input.id),
    );
    const { fields, errors } = filteredInputs.reduce(
      (acc, input) => {
        (acc.fields as AuthFields)[input.name as keyof AuthFields] = '';
        (acc.errors as AuthErrors)[input.name as keyof AuthErrors] =
          type === 'update'
            ? input.validate({
                value: (acc.fields as AuthFields)[
                  input.name as keyof AuthFields
                ],
              })
            : undefined;
        return acc;
      },
      {
        fields: {},
        errors: {},
      },
    );
    setInputs(filteredInputs);
    setAuthForm({ ...authForm, fields, errors });
  };

  const validateForm = () => {
    const authFormState = authForm;
    const { valid, errors, messages } = inputs.reduce(
      (acc, input) => {
        const validatorMessage = input.validate({
          value: authFormState.fields[input.name as keyof AuthFields],
        });

        if (!validatorMessage.valid) {
          acc.valid = false;
          (acc.messages as Array<string>).push(
            `${input.label}:${validatorMessage.message}`,
          );
        }

        (acc.errors as AuthErrors)[input.name as keyof AuthErrors] =
          validatorMessage;
        return acc;
      },
      {
        valid: true,
        errors: {},
        messages: [],
      },
    );
    authFormState.valid = valid;
    authFormState.errors = errors;
    authFormState.message = messages
      .map((message) => `   ${message}`)
      .join('\n');

    setAuthForm(authFormState);
  };

  const onInputHandler = (name: string, value: string) => {
    setAuthForm((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    handleAuthFormData();
    onSubmit && onSubmit(authForm);
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

  return {
    inputs,
    authForm,
    currentForm,
    handleSubmit,
    onInputHandler,
  };
}
