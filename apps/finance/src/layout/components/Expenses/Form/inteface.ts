import React from 'react';

import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';

import { EExpenseType, EMonth } from '@repo/business/finance/enum';
import Supplier from '@repo/business/finance/supplier/supplier';

export type TForm = 'create' | 'edit';

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  type: TForm;
  loading?: boolean;
}

export type ExpenseForm = {
  valid: boolean;
  fields: ExpenseFormFields;
  errors: ExpenseFormErrors;
  message?: string;
  formData?: FormData;
};

export type ExpenseFormFields = {
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

export type ExpenseFormErrors = {
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

export type TExpenseInputForm =
  | 'paid'
  | 'type'
  | 'value'
  | 'month'
  | 'january'
  | 'january_paid'
  | 'february'
  | 'february_paid'
  | 'march'
  | 'march_paid'
  | 'april'
  | 'april_paid'
  | 'may'
  | 'may_paid'
  | 'june'
  | 'june_paid'
  | 'july'
  | 'july_paid'
  | 'august'
  | 'august_paid'
  | 'september'
  | 'september_paid'
  | 'october'
  | 'october_paid'
  | 'november'
  | 'november_paid'
  | 'december'
  | 'december_paid'
  | 'supplier'
  | 'description'
  | 'instalment_number';

export type TExpenseInput = 'text' | 'number' | 'select' | 'switch';

export type ExpenseFormType = {
  type: FormProps['type'];
  inputs: Array<TExpenseInputForm>;
};

export type ExpenseFormInputType = {
  id: TExpenseInputForm;
  min?: number;
  max?: number;
  name: string;
  type: TExpenseInput;
  label: string;
  options?: Array<{ value: string; label: string }>;
  validate: (validatorParams: ValidatorParams) => ValidatorMessage;
  formatter?: (value?: string) => string;
  placeholder?: string;
};