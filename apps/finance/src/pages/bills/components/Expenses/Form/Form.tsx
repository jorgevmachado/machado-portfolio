import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  getCurrentMonth,
  MONTH_KEYS,
} from '@repo/business/finance/expense/config';

import Button from '@repo/ds/components/button/Button';

import { EExpenseType } from '@repo/business/finance/enum';

import Supplier from '@repo/business/finance/supplier/supplier';

import Expense from '@repo/business/finance/expense/expense';

import Select from '@repo/ds/components/select/Select';

import Input from '@repo/ds/components/input/Input';
import Switch from '@repo/ds/components/switch/Switch';

import { DependencyFallback } from '../../../../../layout/components';

import { ExpenseFormErrors, ExpenseFormFields } from './inteface';

import './Form.scss';

type FormProps = {
  expense?: Expense;
  suppliers: Array<Supplier>;
  handleSaveItem: (
    fields: ExpenseFormFields,
    expense?: Expense,
  ) => Promise<Expense>;
  handleCloseModal: () => void;
};

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
  expense,
  suppliers,
  handleSaveItem,
  handleCloseModal,
}) => {
  const router = useRouter();
  const [formFields, setFormFields] =
    useState<ExpenseFormFields>(defaultExpenseFields);

  const [errors, setErrors] = useState<ExpenseFormErrors>(defaultExpenseErrors);

  useEffect(() => {
    if (expense) {
      setFormFields((prevFields) => ({
        ...prevFields,
        ...expense,
        supplier: expense?.supplier as Supplier,
      }));
    }
  }, [expense]);

  const handleChange = (
    key: keyof ExpenseFormFields,
    value: string | boolean | number,
  ): void => {
    const valueTreated = treatValue(key, value);
    setFormFields((prev) => ({
      ...prev,
      [key]: valueTreated,
    }));
  };

  const handleValidation = () => {
    const newErrors: ExpenseFormErrors = { ...defaultExpenseErrors };
    let isValid = true;

    Object.keys(defaultExpenseErrors).forEach((key) => {
      const fieldValue = formFields[key as keyof ExpenseFormFields];
      const fieldValidator =
        defaultExpenseErrors[key as keyof ExpenseFormErrors];

      if (key === 'description') {
        newErrors[key as keyof ExpenseFormErrors] = {
          ...fieldValidator,
          valid: true,
        };
        return;
      }

      if (typeof fieldValue === 'boolean') {
        newErrors[key as keyof ExpenseFormErrors] = {
          ...fieldValidator,
          valid: true,
        };
        return;
      }

      if (expense) {
        if (key === 'value' || key === 'month') {
          newErrors[key as keyof ExpenseFormErrors] = {
            ...fieldValidator,
            valid: true,
          };
          return;
        }
      } else {
        if (
          MONTH_KEYS.includes(key) ||
          MONTH_KEYS.includes(key.replace('_paid', ''))
        ) {
          newErrors[key as keyof ExpenseFormErrors] = {
            ...fieldValidator,
            valid: true,
          };
          return;
        }
      }

      if (typeof fieldValue === 'number') {
        const isNumberValid = fieldValue >= 0;
        if (!isNumberValid) {
          isValid = false;
          newErrors[key as keyof ExpenseFormErrors] = {
            ...fieldValidator,
            valid: false,
          };
        }
      } else if (!fieldValue) {
        isValid = false;
        newErrors[key as keyof ExpenseFormErrors] = {
          ...fieldValidator,
          valid: false,
        };
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = handleValidation();
    if (!isFormValid) {
      return;
    }
    formFields.value = !formFields?.value
      ? formFields?.value
      : parseInt(formFields.value.toString(), 10);
    await handleSaveItem(formFields, expense);
    handleCloseModal();
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

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof ExpenseFormFields;
    const newValue = e.target.value;
    handleChange(name, newValue);
  };

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
          value={formFields?.type ?? ''}
          label="Type"
          options={Object.values(EExpenseType).map((item) => ({
            value: item,
            label: item,
          }))}
          onChange={(value) => handleChange('type', value as string)}
          isInvalid={!errors.type?.valid}
          placeholder="Choose a type"
          invalidMessage={errors.type?.message}
        />
        <Switch
          label="Paid"
          checked={formFields.paid ?? false}
          onChange={(event, value) => handleChange('paid', value)}
        />
      </div>
      {!expense && (
        <div className="form__group">
          <Select
            value={formFields?.month ?? getCurrentMonth()}
            label="Month"
            options={MONTH_KEYS.map((item) => ({
              value: item.toUpperCase(),
              label: item,
            }))}
            onChange={(value) => handleChange('month', value as string)}
            isInvalid={!errors.type?.valid}
            placeholder="Choose a Month"
            invalidMessage={errors.type?.message}
          />
        </div>
      )}

      <div className="form__group">
        <Select
          value={formFields?.supplier?.id ?? ''}
          label="Supplier"
          options={suppliers.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(value) => handleChange('supplier', value as string)}
          isInvalid={!errors.supplier?.valid}
          placeholder="Choose a supplier"
          invalidMessage={errors.supplier?.message}
        />
      </div>
      {!expense && (
        <div className="form__group">
          <Input
            type="text"
            name="value"
            label="Value"
            value={formFields?.value?.toString() ?? ''}
            onInput={onInputHandler}
            onBlur={handleValidation}
            isInvalid={!errors.value?.valid}
            placeholder="Enter a Value"
            invalidMessage={errors.value?.message}
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
                formFields[item as keyof ExpenseFormFields]?.toString() ?? ''
              }
              onInput={onInputHandler}
              onBlur={handleValidation}
              isInvalid={!errors[item as keyof ExpenseFormErrors]?.valid}
              placeholder={`Enter a ${item} Value`}
              invalidMessage={errors[item as keyof ExpenseFormErrors]?.message}
            />
            <Switch
              label="Paid"
              checked={Boolean(
                formFields[`${item}_paid` as keyof ExpenseFormFields],
              )}
              onChange={(event, value) =>
                handleChange(`${item}_paid` as keyof ExpenseFormFields, value)
              }
            />
          </div>
        ))}

      <div className="form__group">
        <Select
          value={formFields?.instalment_number ?? ''}
          label="Instalment Number"
          options={MONTH_KEYS.map((item, index) => ({
            value: index + 1,
            label: (index + 1).toString(),
          }))}
          onChange={(value) => handleChange('instalment_number', value)}
          isInvalid={!errors.instalment_number?.valid}
          placeholder="Choose a Installment Number"
          invalidMessage={errors.instalment_number?.message}
        />
      </div>

      <div className="form__group">
        <Input
          type="text"
          name="description"
          label="Description"
          value={formFields?.description ?? ''}
          onInput={onInputHandler}
          multiline
          placeholder="Enter a Description"
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