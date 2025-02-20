import ExpenseCategory from '@repo/business/finance/expense-category/expenseCategory';

import { FinanceEntity } from '../../interface';

import {
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY,
} from '../../expense-category-type';


export const PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '843be2db-1ecc-4774-a6ae-65fdc707a728',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Physical',
    created_at: new Date('2025-02-11T19:46:54.080Z'),
    updated_at: new Date('2025-02-11T19:46:54.080Z'),
    deleted_at: null,
  });

export const DIGITAL_WALLET_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'da1b68e0-5717-4cc7-8dcf-9503c18032cc',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Digital Wallet',
    created_at: new Date('2025-02-11T19:46:54.080Z'),
    updated_at: new Date('2025-02-11T19:46:54.080Z'),
    deleted_at: null,
  });

export const VIRTUAL_24H_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '3a5a37a5-909d-4196-ad76-647067733f0b',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Virtual 24h',
    created_at: new Date('2025-02-11T19:46:54.080Z'),
    updated_at: new Date('2025-02-11T19:46:54.080Z'),
    deleted_at: null,
  });

export const IFOOD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '861cb73d-eb18-462e-a92d-6efe25ad7e5b',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Ifood',
    created_at: new Date('2025-02-11T19:46:54.080Z'),
    updated_at: new Date('2025-02-11T19:46:54.080Z'),
    deleted_at: null,
  });

export const BANK_SLIP_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '291be24d-7870-40e8-8bf4-58dfcfcf31c6',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Bank Slip',
    created_at: new Date('2025-02-11T19:46:54.081Z'),
    updated_at: new Date('2025-02-11T19:46:54.081Z'),
    deleted_at: null,
  });

export const ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '087b2528-0814-4a6b-8c62-99539fe77165',
    type: ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Account Debit',
    created_at: new Date('2025-02-11T19:46:54.081Z'),
    updated_at: new Date('2025-02-11T19:46:54.081Z'),
    deleted_at: null,
  });

export const LIST_EXPENSE_CATEGORY_FIXTURE: Array<ExpenseCategory> = [
  PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  DIGITAL_WALLET_EXPENSE_CATEGORY_FIXTURE,
  VIRTUAL_24H_EXPENSE_CATEGORY_FIXTURE,
  IFOOD_EXPENSE_CATEGORY_FIXTURE,
  BANK_SLIP_EXPENSE_CATEGORY_FIXTURE,
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE,
];

export const EXPENSE_CATEGORY_FINANCE_ENTITY: FinanceEntity = {
  id: 'EXPENSE_CATEGORY',
  label: 'Expense Category',
  alias: 'expense_categories',
  list: LIST_EXPENSE_CATEGORY_FIXTURE,
  type: EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY,
};