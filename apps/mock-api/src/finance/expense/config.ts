import { Request, Response } from 'express';

import { EExpenseType, EMonth } from '@repo/business/finance/enum';
import type { ExpenseEntity } from '@repo/business/finance/expense/interface';
import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';
import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

import { buildResponse } from '../../shared';
import { USER_FIXTURE } from '@repo/business/auth/fixtures/auth';

import { findEntityByKey, validateEntityType } from '../shared';

import { FinanceEntity } from '../interface';
import { SUPPLIER_FINANCE_ENTITY } from '../supplier';
import { BILL_FINANCE_ENTITY } from '../bill/bill';

export const EXPENSE_FINANCE_ENTITY: FinanceEntity = {
  id: 'EXPENSE',
  label: 'Expense',
  alias: 'expenses',
  bill: BILL_FINANCE_ENTITY,
  supplier: SUPPLIER_FINANCE_ENTITY,
  list: EXPENSE_LIST_FIXTURE,
};

const EXPENSE = {
  id: '1781d932-aaf8-4c8d-be3b-db23ffa602c7',
  year: new Date().getFullYear(),
  user: USER_FIXTURE,
  type: EExpenseType.VARIABLE,
  paid: false,
  total: 0,
  month: EMonth.JANUARY,
  value: 0,
  group: undefined,
  active: true,
  supplier: undefined,
  category: undefined,
  total_paid: 0,
  january: 0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january_paid: false,
  february_paid: false,
  march_paid: false,
  april_paid: false,
  may_paid: false,
  june_paid: false,
  july_paid: false,
  august_paid: false,
  september_paid: false,
  october_paid: false,
  november_paid: false,
  december_paid: false,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: undefined,
  description: undefined,
  instalment_number: 1,
};

export function create(req: Request, res: Response) {
  const {
    bill,
    year,
    type,
    paid,
    value,
    month,
    supplier,
    description,
    instalment_number,
  } = req.body;

  const entityRelations = expenseRelations(supplier, bill);

  if (entityRelations.statusCode !== 200) {
    return entityRelations;
  }

  const supplierEntity = entityRelations.response[
    'supplier'
  ] as ExpenseEntity['supplier'];

  const billEntity = entityRelations.response[':bill'] as ExpenseEntity['bill'];

  const expense = {
    ...EXPENSE,
    bill: billEntity,
    supplier: supplierEntity,
  };
  expense.year = year ?? expense.year;
  expense.type = type ?? expense.type;
  expense.paid = paid ?? expense.paid;
  expense.value = value ?? expense.value;
  expense.month = month ?? expense.month;
  expense.description = description ?? expense.description;
  expense.instalment_number = instalment_number ?? expense.instalment_number;

  const expenseBusiness = new ExpenseBusiness();
  const response = expenseBusiness.initializeExpense(expense);
  return buildResponse(res, {
    statusCode: 200,
    response,
  });
}

export function update(req: Request, res: Response) {
  const { id } = req.params;
  const {
    year,
    bill,
    type,
    supplier,
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    january_paid,
    february_paid,
    march_paid,
    april_paid,
    may_paid,
    june_paid,
    july_paid,
    august_paid,
    september_paid,
    october_paid,
    november_paid,
    december_paid,
    description,
    instalment_number,
  } = req.body;

  const entityRelations = expenseRelations(supplier, bill);

  if (entityRelations.statusCode !== 200) {
    return entityRelations;
  }

  const supplierEntity = entityRelations.response[
    'supplier'
  ] as ExpenseEntity['supplier'];

  const billEntity = entityRelations.response[':bill'] as ExpenseEntity['bill'];

  const expense = {
    ...EXPENSE,
    id,
    bill: billEntity,
    supplier: supplierEntity,
    created_at: new Date('1990-02-13T17:37:47.783Z'),
  };

  expense.year = year ?? expense.year;
  expense.type = type ?? expense.type;
  expense.bill = bill ?? expense.bill;
  expense.description = description ?? expense.description;
  expense.instalment_number = instalment_number ?? expense.instalment_number;
  expense.january = january ?? expense.january;
  expense.february = february ?? expense.february;
  expense.march = march ?? expense.march;
  expense.april = april ?? expense.april;
  expense.may = may ?? expense.may;
  expense.june = june ?? expense.june;
  expense.july = july ?? expense.july;
  expense.august = august ?? expense.august;
  expense.september = september ?? expense.september;
  expense.october = october ?? expense.october;
  expense.november = november ?? expense.november;
  expense.december = december ?? expense.december;
  expense.january_paid = january_paid ?? expense.january_paid;
  expense.february_paid = february_paid ?? expense.february_paid;
  expense.march_paid = march_paid ?? expense.march_paid;
  expense.april_paid = april_paid ?? expense.april_paid;
  expense.may_paid = may_paid ?? expense.may_paid;
  expense.june_paid = june_paid ?? expense.june_paid;
  expense.july_paid = july_paid ?? expense.july_paid;
  expense.august_paid = august_paid ?? expense.august_paid;
  expense.september_paid = september_paid ?? expense.september_paid;
  expense.october_paid = october_paid ?? expense.october_paid;
  expense.november_paid = november_paid ?? expense.november_paid;
  expense.december_paid = december_paid ?? expense.december_paid;

  const expenseBusiness = new ExpenseBusiness();
  const response = expenseBusiness.initializeExpense(expense);
  return buildResponse(res, {
    statusCode: 200,
    response,
  });
}

function expenseRelations(supplier: string, bill: string) {
  const supplierEntity = expenseRelation(
    supplier,
    EXPENSE_FINANCE_ENTITY.supplier,
    'name',
  );
  if (supplierEntity.statusCode !== 200) {
    return supplierEntity;
  }

  const billEntity = expenseRelation(bill, EXPENSE_FINANCE_ENTITY.bill, 'id');

  if (billEntity.statusCode !== 200) {
    return billEntity;
  }

  return {
    statusCode: 200,
    response: {
      bill: billEntity.response as ExpenseEntity['bill'],
      supplier: supplierEntity.response as ExpenseEntity['supplier'],
    },
  };
}

function expenseRelation(
  param: string,
  financeEntity: FinanceEntity,
  key: 'id' | 'name',
) {
  const { list, label } = financeEntity;
  const entity = findEntityByKey(param, list, key);

  if (!entity) {
    return validateEntityType(false, label);
  }

  return { statusCode: 200, response: entity };
}