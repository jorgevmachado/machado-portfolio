import ExpenseGroup from '@repo/business/finance/expense/group/expenseGroup';

export const PERSONAL_EXPENSE_GROUP_FIXTURE: ExpenseGroup = new ExpenseGroup({
  name: 'Personal',
});

export const INGRID_RESIDENTIAL_EXPENSE_GROUP_FIXTURE: ExpenseGroup = new ExpenseGroup({
    name: 'Ingrid Residential',
});

export const MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE: ExpenseGroup = new ExpenseGroup({
    name: 'Monte Carlo Residential',
});

export const MOTHER_EXPENSE_GROUP_FIXTURE: ExpenseGroup = new ExpenseGroup({
    name: 'Mother',
});


export const LIST_EXPENSE_GROUP_FIXTURE: Array<ExpenseGroup> = [
    PERSONAL_EXPENSE_GROUP_FIXTURE,
    INGRID_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
    MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
    MOTHER_EXPENSE_GROUP_FIXTURE
];