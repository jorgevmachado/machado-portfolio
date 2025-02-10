import ExpenseCategory from '@repo/business/finance/expense/category/expenseCategory';

import {
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
} from './type';

export const PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    name: 'Physical',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  });

export const DIGITAL_WALLET_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    name: 'Digital Wallet',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  });

export const VIRTUAL_24H_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    name: 'Virtual 24h',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  });

export const IFOOD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    name: 'Ifood',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  });

export const BANK_SLIP_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    name: 'Bank Slip',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  });

export const ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    name: 'Account Debit',
    type: ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
  });

export const LIST_EXPENSE_CATEGORY_FIXTURE: Array<ExpenseCategory> = [
  PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  DIGITAL_WALLET_EXPENSE_CATEGORY_FIXTURE,
  VIRTUAL_24H_EXPENSE_CATEGORY_FIXTURE,
  IFOOD_EXPENSE_CATEGORY_FIXTURE,
  BANK_SLIP_EXPENSE_CATEGORY_FIXTURE,
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE,
];