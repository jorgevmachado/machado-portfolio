import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';

import {
  getCurrentMonth,
  MONTH_KEYS,
} from '@repo/business/finance/expense/config';

import Button from '@repo/ds/components/button/Button';

import { EExpenseType, EMonth } from '@repo/business/finance/enum';

import Supplier from '@repo/business/finance/supplier/supplier';

import Select from '@repo/ds/components/select/Select';

import { DependencyFallback } from '../../index';

import './Form.scss';
import Input from '@repo/ui/components/input/Input';
import Expense from '@repo/business/finance/expense/expense';
import Switch from "@repo/ds/components/switch/Switch";

type ExpenseParams = {
  bill: string;
  paid?: boolean;
  type?: EExpenseType;
  value?: number;
  month?: EMonth;
  january?: number;
  january_paid?: boolean;
  february?: number;
  february_paid?: boolean;
  march?: number;
  march_paid?: boolean;
  april?: number;
  april_paid?: boolean;
  may?: number;
  may_paid?: boolean;
  june?: number;
  june_paid?: boolean;
  july?: number;
  july_paid?: boolean;
  august?: number;
  august_paid?: boolean;
  september?: number;
  september_paid?: boolean;
  october?: number;
  october_paid?: boolean;
  november?: number;
  november_paid?: boolean;
  december?: number;
  december_paid?: boolean;
  supplier?: Supplier;
  description?: string;
  instalment_number?: number;
};

type ExpenseFormErrors = {
  paid?: ValidatorMessage;
  type?: ValidatorMessage;
  value?: ValidatorMessage;
  month?: ValidatorMessage;
  january?: ValidatorMessage;
  january_paid?: ValidatorMessage;
  february?: ValidatorMessage;
  february_paid?: ValidatorMessage;
  march?: ValidatorMessage;
  march_paid?: ValidatorMessage;
  april?: ValidatorMessage;
  april_paid?: ValidatorMessage;
  may?: ValidatorMessage;
  may_paid?: ValidatorMessage;
  june?: ValidatorMessage;
  june_paid?: ValidatorMessage;
  july?: ValidatorMessage;
  july_paid?: ValidatorMessage;
  august?: ValidatorMessage;
  august_paid?: ValidatorMessage;
  september?: ValidatorMessage;
  september_paid?: ValidatorMessage;
  october?: ValidatorMessage;
  october_paid?: ValidatorMessage;
  november?: ValidatorMessage;
  november_paid?: ValidatorMessage;
  december?: ValidatorMessage;
  december_paid?: ValidatorMessage;
  supplier?: ValidatorMessage;
  description?: ValidatorMessage;
  instalment_number?: ValidatorMessage;
};

type FormProps = {
  billId: string;
  expense?: Expense;
  suppliers: Array<Supplier>;
  setLoading: (value: boolean) => void;
  handleCloseModal: () => void;
};

function monthValidator({ value }: ValidatorParams) {
  return {
    valid: true,
    message: '',
  };
}

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

const Form: React.FC<FormProps> = ({
  billId,
  expense,
  suppliers,
  setLoading,
  handleCloseModal,
}) => {
  const router = useRouter();
  const [fields, setFields] = useState<ExpenseParams>({ bill: billId });
  const [errors, setErrors] = useState<Partial<ExpenseFormErrors>>({
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
      message: ''
    },
    january_paid: {
      valid: true,
      message: ''
    },
    february: {
      valid: true,
      message: ''
    },
    february_paid: {
      valid: true,
      message: ''
    },
    march: {
      valid: true,
      message: ''
    },
    march_paid: {
      valid: true,
      message: ''
    },
    april: {
      valid: true,
      message: ''
    },
    april_paid: {
      valid: true,
      message: ''
    },
    may: {
      valid: true,
      message: ''
    },
    may_paid: {
      valid: true,
      message: ''
    },
    june: {
      valid: true,
      message: ''
    },
    june_paid: {
      valid: true,
      message: ''
    },
    july: {
      valid: true,
      message: ''
    },
    july_paid: {
      valid: true,
      message: ''
    },
    august: {
      valid: true,
      message: ''
    },
    august_paid: {
      valid: true,
      message: ''
    },
    september: {
      valid: true,
      message: ''
    },
    september_paid: {
      valid: true,
      message: ''
    },
    october: {
      valid: true,
      message: ''
    },
    october_paid: {
      valid: true,
      message: ''
    },
    november: {
      valid: true,
      message: ''
    },
    november_paid: {
      valid: true,
      message: ''
    },
    december: {
      valid: true,
      message: ''
    },
    december_paid: {
      valid: true,
      message: ''
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const treatValue = (key: keyof ExpenseParams, value: string | boolean) => {
    if (key === 'supplier') {
      return suppliers.find((item) => item.id === value) ?? '';
    }
    return value;
  };

  const handleChange = (key: keyof ExpenseParams, value: string | boolean): void => {
    const valueTreated = treatValue(key, value);
    setFields((prev) => ({ ...prev, [key]: valueTreated }));
  };

  useEffect(() => {
    const supplier = suppliers.find((item) => item.id === expense?.supplier?.id);
    setFields((prev) => ({
      ...prev,
      type: expense?.type,
      month: expense?.month ?? getCurrentMonth(),
      supplier,
      value: expense?.value,
      instalment_number: expense?.instalment_number,
    }))
    // TODO MUST BE REMOVED BEFORE COMMIT
    console.log('# => expense => ', expense);

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
    <form onSubmit={handleSubmit} style={{overflowY: 'auto', maxHeight: '600px'}}>
      <div className="form__group form__group--inline">
        <Select
          value={fields?.type ?? ''}
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
        <Switch label="Paid" checked={fields.paid ?? false} onChange={(event, value) => handleChange('paid', value)}/>
      </div>
      <div className="form__group">
        <Select
          value={fields?.month ?? getCurrentMonth()}
          label="Month"
          options={MONTH_KEYS.map((item) => ({ value: item, label: item }))}
          onChange={(value) => handleChange('month', value as string)}
          isInvalid={!errors.type?.valid}
          placeholder="Choose a Month"
          invalidMessage={errors.type?.message}
        />
      </div>
      <div className="form__group">
        <Select
          value={fields?.supplier?.id ?? ''}
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
      <div className="form__group">
        <Input
          type="text"
          name="value"
          label="Value"
          value={fields?.value?.toString() ?? ''}
          context="primary"
          onChange={(e) => handleChange('value', e.target.value)}
          validate={(value) => moneyValidator(value)}
          placeholder="Enter a Value"
          reloadValidate={errors.value}
        />
      </div>
      { MONTH_KEYS.map((item) => (
          <div key={item} className="form__group form__group--inline">
            <Input
                type="text"
                name={item}
                label={item}
                value={fields[item as keyof ExpenseParams]?.toString() ?? ''}
                context="primary"
                onChange={(e) => handleChange(item as keyof ExpenseParams, e.target.value)}
                validate={(value) => moneyValidator(value)}
                placeholder={`Enter a ${item} Value`}
                reloadValidate={errors.value}
            />
            <Switch label="Paid" checked={Boolean(fields[`${item}_paid` as keyof ExpenseParams])} onChange={(event, value) => handleChange(`${item}_paid` as keyof ExpenseParams, value)}/>
          </div>
      ))}
      <div className="form__group">
        <Input
          min="1"
          max="12"
          type="number"
          name="instalment_number"
          label="Instalment Number"
          value={fields?.instalment_number?.toString() ?? '1'}
          context="primary"
          onChange={(e) => handleChange('instalment_number', e.target.value)}
          validate={(year) => monthValidator(year)}
          placeholder="Enter a Instalment Number"
          reloadValidate={errors.instalment_number}
        />
      </div>
      <div className="form__group">
        <Input
            type="text"
            name="description"
            label="Description"
            value={fields?.description ?? ''}
            context="primary"
            onChange={(e) => handleChange('description', e.target.value)}
            validate={(value) => descriptionValidator(value)}
            multiline
            placeholder="Enter a Description"
            reloadValidate={errors.description}
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