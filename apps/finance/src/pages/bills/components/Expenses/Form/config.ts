import type { ValidatorParams } from '@repo/services/validator/interface';

import { capitalize } from '@repo/services/string/string';

import { EExpenseType } from '@repo/business/finance/enum';

import { MONTH_KEYS } from '@repo/business/finance/expense/config';

import type {
  ExpenseFormInputType,
  ExpenseFormType,
  TExpenseInputExpenseForm,
} from './inteface';

const moneyValidator = ({ value }: ValidatorParams) => {
  const valid = !isNaN(Number(value)) && Number(value) > 0;
  return {
    valid,
    message: !valid ? 'Invalid monetary value' : '',
  };
};

const instalmentNumberValidator = ({ value }: ValidatorParams) => {
  const valid =
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 12;
  return {
    valid,
    message: !valid ? 'Value must be an integer between 1 and 12' : '',
  };
};

const booleanValidator = ({ value }: ValidatorParams) => {
  const valid = typeof value === 'boolean';
  return {
    valid,
    message: !valid ? 'Invalid boolean value' : '',
  };
};

const selectValidator = ({ value }: ValidatorParams) => {
  const valid = Boolean(value);
  return {
    valid,
    message: !valid ? 'A selection is required' : '',
  };
};

const inputFactories = {
    month: (month: string): ExpenseFormInputType => ({
        id: month as TExpenseInputExpenseForm,
        type: 'number',
        name: month,
        label: capitalize(month),
        validate: moneyValidator,
        placeholder: `Enter a ${capitalize(month)} Value`,
    }),
    monthPaid: (month: string): ExpenseFormInputType => ({
        id: `${month}_paid` as TExpenseInputExpenseForm,
        type: 'switch',
        name: `${month}_paid`,
        label: 'Paid',
        validate: booleanValidator,
    })
}

export const EXPENSE_FORM_TYPE: Array<ExpenseFormType> = [
  {
    type: 'create',
    inputs: [
      'type',
      'paid',
      'month',
      'supplier',
      'value',
      'instalment_number',
      'description',
    ],
  },
  {
    type: 'edit',
    inputs: [
      'type',
      'paid',
      'supplier',
      'instalment_number',
      'description',
      ...MONTH_KEYS.map((month) => month as TExpenseInputExpenseForm),
      ...MONTH_KEYS.map((month) => `${month}_paid` as TExpenseInputExpenseForm),
    ],
  },
];

const INPUT_TYPE_MONTHS: Array<ExpenseFormInputType> = MONTH_KEYS.map(inputFactories.month);

const INPUT_TYPE_MONTHS_WITH_PAID: Array<ExpenseFormInputType> = MONTH_KEYS.map(inputFactories.monthPaid);


export const EXPENSE_FORM_INPUT_TYPE: Array<ExpenseFormInputType> = [
  {
    id: 'type',
    type: 'select',
    name: 'type',
    label: 'Type',
    options: Object.values(EExpenseType).map((item) => ({
      value: item,
      label: item,
    })),
    validate: selectValidator,
    placeholder: 'Choose a type',
  },
  {
    id: 'paid',
    type: 'switch',
    name: 'paid',
    label: 'Paid',
    validate: booleanValidator,
  },
  {
    id: 'month',
    type: 'select',
    name: 'month',
    label: 'Month',
    options: MONTH_KEYS.map((item) => ({ value: item, label: item })),
    validate: selectValidator,
    placeholder: 'Choose a Month',
  },
  {
    id: 'supplier',
    type: 'select',
    name: 'supplier',
    label: 'Supplier',
    options: [],
    validate: selectValidator,
    placeholder: 'Choose a Month',
  },
  {
    id: 'value',
    type: 'number',
    name: 'value',
    label: 'Value',
    validate: moneyValidator,
    placeholder: 'Enter a Value',
  },
  {
    id: 'instalment_number',
    min: 1,
    max: 12,
    type: 'number',
    name: 'instalment_number',
    label: 'Instalment Number',
    validate: instalmentNumberValidator,
    placeholder: 'Enter a Instalment Number',
  },
  ...INPUT_TYPE_MONTHS,
  ...INPUT_TYPE_MONTHS_WITH_PAID,
];