import Expense from '@repo/business/finance/expense/expense';

import { INGRID_RESIDENTIAL_EXPENSE_LIST_FIXTURE } from './ingrid';
import { MONTE_CARLO_RESIDENTIAL_EXPENSE_LIST_FIXTURE } from './monte-carlo';
import { MOTHER_EXPENSE_LIST_FIXTURE } from './mother';
import { PERSONAL_EXPENSE_LIST_FIXTURE } from './personal';
import { FinanceEntity } from '../../interface';

export const EXPENSE_LIST_FIXTURE: Array<Expense> = [
  ...INGRID_RESIDENTIAL_EXPENSE_LIST_FIXTURE,
  ...MONTE_CARLO_RESIDENTIAL_EXPENSE_LIST_FIXTURE,
  ...MOTHER_EXPENSE_LIST_FIXTURE,
  ...PERSONAL_EXPENSE_LIST_FIXTURE,
];

export const EXPENSE_FINANCE_ENTITY: FinanceEntity = {
  id: 'EXPENSE',
  label: 'Expense',
  alias: 'expenses',
  list: EXPENSE_LIST_FIXTURE,
};