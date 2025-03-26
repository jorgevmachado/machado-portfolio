import React, { useState } from 'react';
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

type ExpenseParams = {
  bill: string;
  paid?: boolean;
  type?: EExpenseType;
  value?: number;
  month?: EMonth;
  supplier?: Supplier;
  description?: string;
  instalment_number?: number;
};

type ExpenseFormErrors = {
  paid?: ValidatorMessage;
  type?: ValidatorMessage;
  value?: ValidatorMessage;
  month?: ValidatorMessage;
  supplier?: ValidatorMessage;
  description?: ValidatorMessage;
  instalment_number?: ValidatorMessage;
};

type FormProps = {
  billId: string;
  suppliers: Array<Supplier>;
  setLoading: (value: boolean) => void;
  setIsModalVisible: (value: boolean) => void;
};

function monthValidator({ value }: ValidatorParams) {
  return {
    valid: true,
    message: '',
  };
}

const Form: React.FC<FormProps> = ({
  billId,
  setIsModalVisible,
  suppliers,
  setLoading,
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
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const treatValue = (key: keyof ExpenseParams, value: string) => {
    if (key === 'supplier') {
      return suppliers.find((item) => item.id === value) ?? '';
    }
    return value;
  };

  const handleChange = (key: keyof ExpenseParams, value: string): void => {
    const valueTreated = treatValue(key, value);
    setFields((prev) => ({ ...prev, [key]: valueTreated }));
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
    <form onSubmit={handleSubmit}>
      <div className="form__group">
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
      <div className="form__actions">
        <Button type="submit" context="success">
          Save
        </Button>
        <Button
          context="error"
          appearance="outline"
          onClick={() => setIsModalVisible(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Form;