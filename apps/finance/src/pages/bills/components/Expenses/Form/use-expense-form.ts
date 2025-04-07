import { useEffect, useState } from 'react';

import type {
  ExpenseForm,
  ExpenseFormErrors,
  ExpenseFormFields,
  ExpenseFormInputType,
  ExpenseFormType,
  TExpenseForm,
} from './inteface';
import { EXPENSE_FORM_INPUT_TYPE, EXPENSE_FORM_TYPE } from './config';

type UseExpenseForm = {
  type: TExpenseForm;
  onSubmit?: (values: ExpenseForm) => void;
};

export default function useExpenseForm({
  type,
  onSubmit,
}: UseExpenseForm) {
  const [currentForm, setCurrentForm] = useState<ExpenseFormType>({
    type,
    inputs: [],
  });

  const [inputs, setInputs] = useState<Array<ExpenseFormInputType>>([]);

  const [expenseForm, setExpenseForm] = useState<ExpenseForm>({
    valid: true,
    fields: {},
    errors: {},
    message: undefined,
  });

  useEffect(() => {
    const form = EXPENSE_FORM_TYPE.find((form) => form.type === type);
    if (form) {
      setCurrentForm(form);
      initializeInputs(form.inputs);
    }
  }, [type]);

  const initializeInputs = (inputsIds: Array<string>) => {
    const filteredInputs = EXPENSE_FORM_INPUT_TYPE.filter((input) =>
      inputsIds.includes(input.id),
    );

    const { fields, errors } = filteredInputs.reduce(
      (
        acc: { fields: ExpenseFormFields; errors: ExpenseFormErrors },
        input,
      ) => {
        (acc.fields as ExpenseFormFields)[
          input.name as keyof ExpenseFormFields
        ] = undefined;
        (acc.errors as ExpenseFormErrors)[
          input.name as keyof ExpenseFormErrors
        ] =
          type === 'edit'
            ? input.validate({
                value: (acc.fields as ExpenseFormFields)[
                  input.name as keyof ExpenseFormFields
                ],
              })
            : undefined;
        return acc;
      },
      {
        fields: {} as ExpenseFormFields,
        errors: {} as ExpenseFormErrors,
      },
    );

    setInputs(filteredInputs);
    setExpenseForm({ ...expenseForm, fields, errors });
  };

  const validateForm = () => {
    const expenseFormState = expenseForm;
    const { valid, errors, messages } = inputs.reduce(
      (acc, input) => {
        const validatorMessage = input.validate({
          value: expenseFormState.fields[input.name as keyof ExpenseFormFields],
        });
        if (!validatorMessage.valid) {
          acc.valid = false;
          (acc.messages as Array<string>).push(
            `${input.label}:${validatorMessage.message}`,
          );
        }
        (acc.errors as ExpenseFormErrors)[
          input.name as keyof ExpenseFormErrors
        ] = validatorMessage;
        return acc;
      },
      {
        valid: true,
        errors: {},
        messages: [],
      },
    );
    expenseFormState.valid = valid;
    expenseFormState.errors = errors;
    expenseFormState.message = messages
      .map((message) => `   ${message}`)
      .join('\n');

    setExpenseForm(expenseFormState);
  };

  const onInputHandler = (name: string, value: string) => {
    setExpenseForm((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    handleExpenseFormData();
    onSubmit && onSubmit(expenseForm);
  };

  const handleExpenseFormData = () => {
    const expenseFormState = expenseForm;
    const formData = new FormData();
    Object.entries(expenseFormState.fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    expenseFormState.formData = formData;
    setExpenseForm(expenseFormState);
  };

  return {
    inputs,
    expenseForm,
    currentForm,
    handleSubmit,
    onInputHandler,
  };
}