import ExpenseGroup from '@repo/business/finance/expense-group/expenseGroup';

import { FinanceEntity } from '../../interface';

export const PERSONAL_EXPENSE_GROUP_FIXTURE: ExpenseGroup = new ExpenseGroup({
  id: '34e7d8a8-c185-45d1-9e5b-dbb4ad3024fa',
  name: 'Personal',
  created_at: new Date('2025-02-11T19:46:54.068Z'),
  updated_at: new Date('2025-02-11T19:46:54.068Z'),
  deleted_at: null,
});

export const INGRID_RESIDENTIAL_EXPENSE_GROUP_FIXTURE: ExpenseGroup =
  new ExpenseGroup({
    id: 'd6b22851-5a43-4051-8f3d-5838c984b6b9',
    name: 'Ingrid Residential',
    created_at: new Date('2025-02-11T19:46:54.067Z'),
    updated_at: new Date('2025-02-11T19:46:54.067Z'),
    deleted_at: null,
  });

export const MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE: ExpenseGroup =
  new ExpenseGroup({
    id: '51d112db-20e9-45ba-b16e-bcb27c6490ab',
    name: 'Monte Carlo Residential',
    created_at: new Date('2025-02-11T19:46:54.068Z'),
    updated_at: new Date('2025-02-11T19:46:54.068Z'),
    deleted_at: null,
  });

export const MOTHER_EXPENSE_GROUP_FIXTURE: ExpenseGroup = new ExpenseGroup({
  id: '15458fb3-a863-4604-b62e-d4dceb32a95c',
  name: 'Mother',
  created_at: new Date('2025-02-11T19:46:54.069Z'),
  updated_at: new Date('2025-02-11T19:46:54.069Z'),
  deleted_at: null,
});

export const LIST_EXPENSE_GROUP_FIXTURE: Array<ExpenseGroup> = [
  PERSONAL_EXPENSE_GROUP_FIXTURE,
  INGRID_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
  MOTHER_EXPENSE_GROUP_FIXTURE,
];

export const EXPENSE_GROUP_FINANCE_ENTITY: FinanceEntity = {
  id: 'EXPENSE_GROUP',
  label: 'Expense Group',
  list: LIST_EXPENSE_GROUP_FIXTURE,
};