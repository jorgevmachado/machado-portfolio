import Expense from '@repo/business/finance/expense/expense';

export const MELIMAIS_MERCADO_LIVRE_PERSONAL_FIXTURE: Expense = new Expense();
export const MERCADO_LIVRE_PERSONAL_FIXTURE: Expense = new Expense();

export const MERCADO_LIVRE_PERSONAL_LIST_FIXTURE: Array<Expense> = [
  MELIMAIS_MERCADO_LIVRE_PERSONAL_FIXTURE,
  MERCADO_LIVRE_PERSONAL_FIXTURE,
];