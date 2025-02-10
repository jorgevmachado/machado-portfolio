import ExpenseCategoryType from '@repo/business/finance/expense/category/type/expenseCategoryType';

export const CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    name: 'Credit Card',
  });

export const ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    name: 'Account Debit',
  });

export const BANK_SLIP_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    name: 'Bank Slip',
  });

export const PIX_EXPENSE_CATEGORY_TYPE_FIXTURE: ExpenseCategoryType =
  new ExpenseCategoryType({
    name: 'PIX',
  });

export const LIST_EXPENSE_CATEGORY_TYPE_FIXTURE: Array<ExpenseCategoryType> = [
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
  BANK_SLIP_EXPENSE_CATEGORY_TYPE_FIXTURE,
  PIX_EXPENSE_CATEGORY_TYPE_FIXTURE,
];