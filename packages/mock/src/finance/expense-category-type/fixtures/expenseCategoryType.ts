import ExpenseCategoryType from '@repo/business/finance/expense-category-type/expenseCategoryType';

import { FinanceEntity } from '../../interface';

export const CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    id: 'afc2939f-1b81-45a2-8d56-6f98b7ffeefd',
    name: 'Credit Card',
    created_at: new Date('2025-02-11T19:46:54.072Z'),
    updated_at: new Date('2025-02-11T19:46:54.072Z'),
    deleted_at: null,
  });

export const ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    id: '891572fd-9151-4a26-a426-7d259733cd96',
    name: 'Account Debit',
    created_at: new Date('2025-02-11T19:46:54.072Z'),
    updated_at: new Date('2025-02-11T19:46:54.072Z'),
    deleted_at: null,
  });

export const BANK_SLIP_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    id: 'c57af4eb-94d6-411f-8609-eefae681bcd4',
    name: 'Bank Slip',
    created_at: new Date('2025-02-11T19:46:54.072Z'),
    updated_at: new Date('2025-02-11T19:46:54.072Z'),
    deleted_at: null,
  });

export const PIX_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    id: '977d045d-1023-422c-97b9-d1935c09c84e',
    name: 'PIX',
    created_at: new Date('2025-02-11T19:46:54.073Z'),
    updated_at: new Date('2025-02-11T19:46:54.073Z'),
    deleted_at: null,
  });

export const LIST_EXPENSE_CATEGORY_TYPE_FIXTURE: Array<ExpenseCategoryType> = [
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
  BANK_SLIP_EXPENSE_CATEGORY_TYPE_FIXTURE,
  PIX_EXPENSE_CATEGORY_TYPE_FIXTURE,
];

export const EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY: FinanceEntity = {
  id: 'EXPENSE_CATEGORY_TYPE',
  label: 'Expense Category Type',
  alias: 'expense_category_types',
  list: LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
};