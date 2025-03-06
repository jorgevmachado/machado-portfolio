import Expense from '@repo/business/finance/expense/expense';

export const NETFLIX_STREAMING_PERSONAL_FIXTURE: Expense = new Expense();
export const HBO_MAX_STREAMING_PERSONAL_FIXTURE: Expense = new Expense();

export const STREAMING_PERSONAL_LIST_FIXTURE: Array<Expense> = [
  NETFLIX_STREAMING_PERSONAL_FIXTURE,
  HBO_MAX_STREAMING_PERSONAL_FIXTURE,
];