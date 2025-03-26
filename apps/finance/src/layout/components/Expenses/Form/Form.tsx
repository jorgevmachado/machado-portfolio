import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { ValidatorParams } from '@repo/services/validator/interface';

import {
  getCurrentMonth,
  MONTH_KEYS,
} from '@repo/business/finance/expense/config';

import Button from '@repo/ds/components/button/Button';

import { EExpenseType } from '@repo/business/finance/enum';

import Supplier from '@repo/business/finance/supplier/supplier';

import Select from '@repo/ds/components/select/Select';

import { DependencyFallback } from '../../index';

import './Form.scss';
import Input from '@repo/ui/components/input/Input';
import Expense from '@repo/business/finance/expense/expense';
import Switch from '@repo/ds/components/switch/Switch';
import { ExpenseForm, ExpenseFormErrors, ExpenseFormFields } from './inteface';

type FormProps = {
  billId: string;
  expense?: Expense;
  suppliers: Array<Supplier>;
  setLoading: (value: boolean) => void;
  handleCloseModal: () => void;
};

function moneyValidator({ value }: ValidatorParams) {
  return {
    valid: true,
    message: '',
  };
}

function descriptionValidator({ value }: ValidatorParams) {
  return {
    valid: true,
    message: '',
  };
}

const defaultExpenseErrors: ExpenseFormErrors = {
  paid: {
    valid: true,
    message: 'Please select a paid status.',
  },
  type: {
    valid: true,
    message: 'Please select a type.',
  },
  value: {
    valid: true,
    message: 'Please input a value.',
  },
  month: {
    valid: true,
    message: 'Please select a month.',
  },
  supplier: {
    valid: true,
    message: 'Please select a supplier.',
  },
  description: {
    valid: true,
    message: 'Please input a description.',
  },
  instalment_number: {
    valid: true,
    message: 'Please input a instalment number.',
  },
  january: {
    valid: true,
    message: 'Please input a january value.',
  },
  january_paid: {
    valid: true,
    message: '',
  },
  february: {
    valid: true,
    message: 'Please input a february value.',
  },
  february_paid: {
    valid: true,
    message: '',
  },
  march: {
    valid: true,
    message: 'Please input a march value.',
  },
  march_paid: {
    valid: true,
    message: '',
  },
  april: {
    valid: true,
    message: 'Please input a april value.',
  },
  april_paid: {
    valid: true,
    message: '',
  },
  may: {
    valid: true,
    message: 'Please input a may value.',
  },
  may_paid: {
    valid: true,
    message: '',
  },
  june: {
    valid: true,
    message: 'Please input a june value.',
  },
  june_paid: {
    valid: true,
    message: '',
  },
  july: {
    valid: true,
    message: 'Please input a july value.',
  },
  july_paid: {
    valid: true,
    message: '',
  },
  august: {
    valid: true,
    message: 'Please input a august value.',
  },
  august_paid: {
    valid: true,
    message: '',
  },
  september: {
    valid: true,
    message: 'Please input a september value.',
  },
  september_paid: {
    valid: true,
    message: '',
  },
  october: {
    valid: true,
    message: 'Please input a october value.',
  },
  october_paid: {
    valid: true,
    message: '',
  },
  november: {
    valid: true,
    message: 'Please input a november value.',
  },
  november_paid: {
    valid: true,
    message: '',
  },
  december: {
    valid: true,
    message: 'Please input a december value.',
  },
  december_paid: {
    valid: true,
    message: '',
  },
};

const defaultExpenseFields: ExpenseFormFields = {
  paid: false,
  month: getCurrentMonth(),
  january_paid: false,
  february_paid: false,
  march_paid: false,
  april_paid: false,
  may_paid: false,
  june_paid: false,
  july_paid: false,
  august_paid: false,
  september_paid: false,
  october_paid: false,
  november_paid: false,
  december_paid: false,
  instalment_number: 1,
};

const Form: React.FC<FormProps> = ({
  billId,
  expense,
  suppliers,
  setLoading,
  handleCloseModal,
}) => {
  const router = useRouter();
  const [expenseForm, setExpenseForm] = useState<ExpenseForm>({
    valid: true,
    fields: defaultExpenseFields,
    errors: defaultExpenseErrors,
    message: undefined,
  });

  const validateForm = () => {
    const messages: Array<string> = [];
    const expenseFormState = expenseForm;
    const expenseFormErrors = expenseFormState.errors;
    const expenseFormFields = expenseFormState.fields;

    if (!expenseFormFields.type) {
      expenseFormErrors.type.valid = false;
      messages.push(expenseFormErrors.type.message);
    }

    if (
      (!expenseFormFields.month ||
        (expenseFormFields.month as unknown) === '') &&
      !expense
    ) {
      expenseFormErrors.month.valid = false;
      messages.push(expenseFormErrors.month.message);
    }

    if (!expenseFormFields.supplier) {
      expenseFormErrors.supplier.valid = false;
      messages.push(expenseFormErrors.supplier.message);
    }

    if (!expenseFormFields.value && !expense) {
      expenseFormErrors.value.valid = false;
      messages.push(expenseFormErrors.value.message);
    }

    if (!expenseFormFields.instalment_number) {
      expenseFormErrors.instalment_number.valid = false;
      messages.push(expenseFormErrors.instalment_number.message);
    }

    if (!expenseFormFields.january && expense) {
      expenseFormErrors.january.valid = false;
      messages.push(expenseFormErrors.january.message);
    }

    if (!expenseFormFields.february && expense) {
      expenseFormErrors.february.valid = false;
      messages.push(expenseFormErrors.february.message);
    }

    if (!expenseFormFields.march && expense) {
      expenseFormErrors.march.valid = false;
      messages.push(expenseFormErrors.march.message);
    }

    if (!expenseFormFields.april && expense) {
      expenseFormErrors.april.valid = false;
      messages.push(expenseFormErrors.april.message);
    }

    if (!expenseFormFields.may && expense) {
      expenseFormErrors.may.valid = false;
      messages.push(expenseFormErrors.may.message);
    }

    if (!expenseFormFields.june && expense) {
      expenseFormErrors.june.valid = false;
      messages.push(expenseFormErrors.june.message);
    }

    if (!expenseFormFields.july && expense) {
      expenseFormErrors.july.valid = false;
      messages.push(expenseFormErrors.july.message);
    }

    if (!expenseFormFields.august && expense) {
      expenseFormErrors.august.valid = false;
      messages.push(expenseFormErrors.august.message);
    }

    if (!expenseFormFields.september && expense) {
      expenseFormErrors.september.valid = false;
      messages.push(expenseFormErrors.september.message);
    }

    if (!expenseFormFields.october && expense) {
      expenseFormErrors.october.valid = false;
      messages.push(expenseFormErrors.october.message);
    }

    if (!expenseFormFields.november && expense) {
      expenseFormErrors.november.valid = false;
      messages.push(expenseFormErrors.november.message);
    }

    if (!expenseFormFields.december && expense) {
      expenseFormErrors.december.valid = false;
      messages.push(expenseFormErrors.december.message);
    }
    // TODO MUST BE REMOVED BEFORE COMMIT
    console.log('# => messages => ', messages);

    if (
      !expenseFormErrors.type.valid ||
      !expenseFormErrors.month.valid ||
      !expenseFormErrors.supplier.valid ||
      !expenseFormErrors.value.valid ||
      !expenseFormErrors.instalment_number.valid ||
      !expenseFormErrors.january.valid ||
      !expenseFormErrors.february.valid ||
      !expenseFormErrors.march.valid ||
      !expenseFormErrors.april.valid ||
      !expenseFormErrors.may.valid ||
      !expenseFormErrors.june.valid ||
      !expenseFormErrors.july.valid ||
      !expenseFormErrors.august.valid ||
      !expenseFormErrors.september.valid ||
      !expenseFormErrors.october.valid ||
      !expenseFormErrors.november.valid ||
      !expenseFormErrors.december.valid
    ) {
      expenseFormState.valid = false;
      expenseFormState.message = messages
        .map((message) => `   ${message}`)
        .join('\n');
    }

    expenseFormState.errors = expenseFormErrors;

    setExpenseForm(expenseFormState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    // TODO MUST BE REMOVED BEFORE COMMIT
    console.log('# => expenseForm => valid', expenseForm.valid);
    console.log('# => expenseForm => fields', expenseForm.fields);
    console.log('# => expenseForm => errors', expenseForm.errors);
    console.log('# => expenseForm => message', expenseForm.message);
  };

  const treatValue = (
    key: keyof ExpenseFormFields,
    value: string | boolean | number,
  ) => {
    if (key === 'supplier') {
      return suppliers.find((item) => item.id === value);
    }
    return value;
  };

  const handleChange = (
    key: keyof ExpenseFormFields,
    value: string | boolean | number,
  ): void => {
    const valueTreated = treatValue(key, value);
    setExpenseForm((prev) => ({
      ...prev,
      fields: { ...prev.fields, [key]: valueTreated },
    }));
  };

  useEffect(() => {
    const supplier = suppliers.find(
      (item) => item.id === expense?.supplier?.id,
    );
    const expenseFormState = expenseForm;
    expenseFormState.fields = {
      ...expenseFormState.fields,
      type: expense?.type ?? expenseFormState.fields.type,
      month: expense?.month ?? expenseFormState.fields.month,
      supplier: supplier ?? expenseFormState.fields.supplier,
      value: expense?.value ?? expenseFormState.fields.value,
      instalment_number:
        expense?.instalment_number ?? expenseFormState.fields.instalment_number,
      description: expense?.description ?? expenseFormState.fields.description,
      january: expense?.january ?? expenseFormState.fields.january,
      february: expense?.february ?? expenseFormState.fields.february,
      march: expense?.march ?? expenseFormState.fields.march,
      april: expense?.april ?? expenseFormState.fields.april,
      may: expense?.may ?? expenseFormState.fields.may,
      june: expense?.june ?? expenseFormState.fields.june,
      july: expense?.july ?? expenseFormState.fields.july,
      august: expense?.august ?? expenseFormState.fields.august,
      september: expense?.september ?? expenseFormState.fields.september,
      october: expense?.october ?? expenseFormState.fields.october,
      november: expense?.november ?? expenseFormState.fields.november,
      december: expense?.december ?? expenseFormState.fields.december,
      january_paid:
        expense?.january_paid ?? expenseFormState.fields.january_paid,
      february_paid:
        expense?.february_paid ?? expenseFormState.fields.february_paid,
      march_paid: expense?.march_paid ?? expenseFormState.fields.march_paid,
      april_paid: expense?.april_paid ?? expenseFormState.fields.april_paid,
      may_paid: expense?.may_paid ?? expenseFormState.fields.may_paid,
      june_paid: expense?.june_paid ?? expenseFormState.fields.june_paid,
      july_paid: expense?.july_paid ?? expenseFormState.fields.july_paid,
      august_paid: expense?.august_paid ?? expenseFormState.fields.august_paid,
      september_paid:
        expense?.september_paid ?? expenseFormState.fields.september_paid,
      october_paid:
        expense?.october_paid ?? expenseFormState.fields.october_paid,
      november_paid:
        expense?.november_paid ?? expenseFormState.fields.november_paid,
      december_paid:
        expense?.december_paid ?? expenseFormState.fields.december_paid,
    };
    setExpenseForm(expenseFormState);
    // TODO MUST BE REMOVED BEFORE COMMIT
    console.log('# => expenseForm => fields => ', expenseForm.fields);
  }, [expense]);

  return suppliers.length === 0 ? (
    <DependencyFallback
      dependencyName="Supplier"
      resourceName="Supplier"
      button={{
        label: 'Create Supplier',
        onClick: () => router.push('/suppliers'),
      }}
    />
  ) : (
    <form
      onSubmit={handleSubmit}
      style={{ overflowY: 'auto', maxHeight: '600px' }}
    >
      <div className="form__group form__group--inline">
        <Select
          value={expenseForm?.fields?.type ?? ''}
          label="Type"
          options={Object.values(EExpenseType).map((item) => ({
            value: item,
            label: item,
          }))}
          onChange={(value) => handleChange('type', value as string)}
          isInvalid={!expenseForm?.errors.type?.valid}
          placeholder="Choose a type"
          invalidMessage={expenseForm?.errors.type?.message}
        />
        <Switch
          label="Paid"
          checked={expenseForm?.fields.paid ?? false}
          onChange={(event, value) => handleChange('paid', value)}
        />
      </div>
      {!expense && (
        <div className="form__group">
          <Select
            value={expenseForm?.fields?.month ?? getCurrentMonth()}
            label="Month"
            options={MONTH_KEYS.map((item) => ({
              value: item.toUpperCase(),
              label: item,
            }))}
            onChange={(value) => handleChange('month', value as string)}
            isInvalid={!expenseForm?.errors.type?.valid}
            placeholder="Choose a Month"
            invalidMessage={expenseForm?.errors.type?.message}
          />
        </div>
      )}

      <div className="form__group">
        <Select
          value={expenseForm?.fields?.supplier?.id ?? ''}
          label="Supplier"
          options={suppliers.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(value) => handleChange('supplier', value as string)}
          isInvalid={!expenseForm?.errors.supplier?.valid}
          placeholder="Choose a supplier"
          invalidMessage={expenseForm?.errors.supplier?.message}
        />
      </div>
      {!expense && (
        <div className="form__group">
          <Input
            type="text"
            name="value"
            label="Value"
            value={expenseForm?.fields?.value?.toString() ?? ''}
            context="primary"
            onChange={(e) => handleChange('value', e.target.value)}
            validate={(value) => moneyValidator(value)}
            placeholder="Enter a Value"
            reloadValidate={expenseForm?.errors.value}
          />
        </div>
      )}

      {expense &&
        MONTH_KEYS.map((item) => (
          <div key={item} className="form__group form__group--inline">
            <Input
              type="text"
              name={item}
              label={item}
              value={
                expenseForm?.fields[
                  item as keyof ExpenseFormFields
                ]?.toString() ?? ''
              }
              context="primary"
              onChange={(e) =>
                handleChange(item as keyof ExpenseFormFields, e.target.value)
              }
              validate={(value) => moneyValidator(value)}
              placeholder={`Enter a ${item} Value`}
              reloadValidate={expenseForm?.errors.value}
            />
            <Switch
              label="Paid"
              checked={Boolean(
                expenseForm?.fields[`${item}_paid` as keyof ExpenseFormFields],
              )}
              onChange={(event, value) =>
                handleChange(`${item}_paid` as keyof ExpenseFormFields, value)
              }
            />
          </div>
        ))}

      <div className="form__group">
        <Select
          value={expenseForm?.fields?.instalment_number ?? ''}
          label="Instalment Number"
          options={MONTH_KEYS.map((item, index) => ({
            value: index + 1,
            label: (index + 1).toString(),
          }))}
          onChange={(value) => handleChange('instalment_number', value)}
          isInvalid={!expenseForm?.errors.instalment_number?.valid}
          placeholder="Choose a Installment Number"
          invalidMessage={expenseForm?.errors.instalment_number?.message}
        />
      </div>

      <div className="form__group">
        <Input
          type="text"
          name="description"
          label="Description"
          value={expenseForm?.fields?.description ?? ''}
          context="primary"
          onChange={(e) => handleChange('description', e.target.value)}
          validate={(value) => descriptionValidator(value)}
          multiline
          placeholder="Enter a Description"
          reloadValidate={expenseForm?.errors.description}
        />
      </div>

      <div className="form__actions">
        <Button type="submit" context="success">
          Save
        </Button>
        <Button context="error" appearance="outline" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Form;